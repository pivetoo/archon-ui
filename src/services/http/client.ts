import axios, { type AxiosRequestConfig } from "axios"
import { translate } from "../../i18n/store"
import { ACCESS_TOKEN_KEY, AUTH_STORAGE_KEYS, OIDC_CLIENT_ID_KEY, REFRESH_TOKEN_KEY } from "../storage/keys"
import type { ApiResponse, ApiError } from "./types"

declare module "axios" {
  export interface AxiosRequestConfig {
    silent?: boolean
  }
  export interface InternalAxiosRequestConfig {
    silent?: boolean
  }
}

let globalLoaderContext: any = null
let apiBaseURL: string = ""
let identityManagementURL: string = ""
let requestLanguage: string = "pt-BR"
let authFailureHandler: (() => void) | null = null

const formatMessage = (key: string, ...values: Array<string | number>) => {
  return values.reduce(
    (message: string, value, index) => message.replace(`{${index}}`, String(value)),
    translate(key) as string
  )
}

export const setGlobalLoaderContext = (context: any) => {
  globalLoaderContext = context
}

export const setApiBaseURL = (url: string) => {
  apiBaseURL = url
  httpClient.updateBaseURL(url)
}

export const getApiBaseURL = () => apiBaseURL

export const setIdentityManagementURL = (url: string) => {
  identityManagementURL = url
}

export const getIdentityManagementURL = () => identityManagementURL

export const setRequestLanguage = (language: string) => {
  requestLanguage = language
}

export const getRequestLanguage = () => requestLanguage

export const setAuthFailureHandler = (handler: (() => void) | null) => {
  authFailureHandler = handler
}

/** Resultado da renovacao. Devolve o pacote inteiro para nao existir uma segunda leitura da resposta. */
export interface RefreshedTokens {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiresIn: number
}

let pendingRefresh: Promise<RefreshedTokens> | null = null

const performTokenRefresh = async (): Promise<RefreshedTokens> => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
  const oidcClientId = localStorage.getItem(OIDC_CLIENT_ID_KEY) || import.meta.env.VITE_OIDC_CLIENT_ID

  if (!refreshToken || !identityManagementURL || !oidcClientId) {
    throw new Error("missing_refresh_prerequisites")
  }

  const form = new URLSearchParams()
  form.set("grant_type", "refresh_token")
  form.set("client_id", oidcClientId)
  form.set("refresh_token", refreshToken)

  const response = await axios.post(
    `${identityManagementURL.replace(/\/+$/, "")}/connect/token`,
    form,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Language": requestLanguage,
      },
    }
  )

  const accessToken = response.data?.access_token
  const newRefreshToken = response.data?.refresh_token

  if (!accessToken) {
    throw new Error("missing_access_token")
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  if (newRefreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken)
  }

  return {
    accessToken,
    refreshToken: newRefreshToken ?? refreshToken,
    tokenType: response.data?.token_type ?? "Bearer",
    expiresIn: Number(response.data?.expires_in ?? 0),
  }
}

/**
 * Ponto ÚNICO de renovação de token, com single-flight.
 *
 * Precisa ser único porque o IdentityManagement **rotaciona** refresh token: ao renovar, ele revoga o
 * token apresentado e emite outro. Duas renovações concorrentes fazem a segunda apresentar um token
 * já revogado, e o tratamento de erro derruba a sessão do usuário no meio do uso.
 *
 * Havia uma segunda implementação em `AuthService.refreshAccessToken`, sem essa proteção. Hoje ela
 * delega para cá.
 */
export const refreshAccessToken = (): Promise<RefreshedTokens> => {
  if (!pendingRefresh) {
    pendingRefresh = performTokenRefresh().finally(() => {
      pendingRefresh = null
    })
  }
  return pendingRefresh
}

/** Limpa toda a sessão local. Usado no logout e quando a renovação falha em definitivo. */
export const clearAuthStorage = () => {
  AUTH_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key))
}

/**
 * Sessão acabou: limpa o local e devolve o controle para a aplicação.
 *
 * O `authFailureHandler` é registrado pelo `AuthProvider`, então normalmente existe. O redirect duro
 * fica só como último recurso — para a janela entre o boot e o efeito que registra o handler, e para
 * quem monte o client fora de um `AuthProvider`. Antes daqui esse redirect era o comportamento
 * padrão de um dos dois ramos, ignorando o router e perdendo a rota atual.
 */
const handleSessionEnded = () => {
  clearAuthStorage()

  if (authFailureHandler) {
    authFailureHandler()
    return
  }

  window.location.href = "/"
}

/**
 * Desembrulha o envelope `ApiResponse` do Archon quando ele existe.
 *
 * A logica estava repetida nos cinco verbos. A checagem tambem exige agora que `message` seja
 * string: um endpoint que devolva legitimamente um objeto com campo `message` de outro tipo era
 * tratado como envelope, e o `data` real se perdia.
 */
function unwrapEnvelope<T>(payload: unknown): ApiResponse<T> {
  if (payload && typeof payload === "object" && "message" in payload && typeof (payload as { message: unknown }).message === "string") {
    return payload as ApiResponse<T>
  }

  return {
    message: "",
    data: payload as T,
  }
}

class HttpClient {
  private instance

  constructor() {
    this.instance = axios.create({
      baseURL: apiBaseURL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 60000,
    })

    this.setupInterceptors()
  }

  updateBaseURL(url: string) {
    this.instance.defaults.baseURL = url
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      config.headers["Accept-Language"] = requestLanguage

      if (globalLoaderContext && !config.silent) {
        globalLoaderContext.showLoader()
      }

      return config
    })

    this.instance.interceptors.response.use(
      (response) => {
        if (globalLoaderContext && !response.config?.silent) {
          globalLoaderContext.hideLoader()
        }
        return response
      },
      async (error) => {
        if (globalLoaderContext && !error.config?.silent) {
          globalLoaderContext.hideLoader()
        }
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
          const oidcClientId = localStorage.getItem(OIDC_CLIENT_ID_KEY) || import.meta.env.VITE_OIDC_CLIENT_ID

          if (refreshToken && identityManagementURL && oidcClientId) {
            try {
              const { accessToken } = await refreshAccessToken()
              originalRequest.headers.Authorization = `Bearer ${accessToken}`
              return this.instance(originalRequest)
            } catch (refreshError) {
              handleSessionEnded()

              return Promise.reject(refreshError)
            }
          } else {
            const isAuthEndpoint = originalRequest.url?.includes("/auth/")

            if (!isAuthEndpoint) {
              // Mesmo desfecho do ramo acima: a sessao acabou. Os dois ramos tratavam isso de forma
              // diferente — um chamava o handler, o outro redirecionava na marra.
              handleSessionEnded()
            }
          }
        }

        const apiError = this.transformError(error)
        return Promise.reject(apiError)
      }
    )
  }

  private transformError(error: any): ApiError {
    if (error.response) {
      const { status, data } = error.response

      let message = data.message || data.title
      let errors = data.errors

      // ProblemDetails (RFC 7807) carrega type/title/status pra debugging HTTP,
      // nao sao mensagens de validacao pro usuario. Descartar pra nao vazar no toast.
      if (errors && typeof errors === "object" && !Array.isArray(errors)
          && "type" in errors && "title" in errors && "status" in errors) {
        errors = undefined
      }

      if (!errors && typeof data === "object" && !message) {
        const keys = Object.keys(data)
        const isValidationError = keys.length > 0 && keys.every((key) => Array.isArray(data[key]))

        if (isValidationError) {
          errors = data
          const errorCount = keys.length
          message =
            errorCount === 1
              ? translate("client.validation.single")
              : formatMessage("client.validation.many", errorCount)
        }
      }

      if (!message && errors) {
        const errorCount = Object.keys(errors).length
        message =
          errorCount === 1
            ? translate("client.validation.single")
            : formatMessage("client.validation.many", errorCount)
      }

      if (!message) {
        message = translate("common.error.request")
      }

      return {
        message,
        status,
        errors,
        isApiError: true,
      }
    } else if (error.request) {
      return {
        message: translate("common.error.connection"),
        status: 0,
        isApiError: true,
      }
    } else {
      return {
        message: error.message || translate("common.error.unknown"),
        status: 500,
        isApiError: true,
      }
    }
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.get(url, config)

    return unwrapEnvelope<T>(response.data)
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.post(url, data, config)

    return unwrapEnvelope<T>(response.data)
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.put(url, data, config)

    return unwrapEnvelope<T>(response.data)
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.delete(url, config)

    return unwrapEnvelope<T>(response.data)
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.patch(url, data, config)

    return unwrapEnvelope<T>(response.data)
  }
}

export const httpClient = new HttpClient()
