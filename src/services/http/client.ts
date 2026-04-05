import axios, { type AxiosRequestConfig } from "axios"
import { translate } from "../../i18n/store"
import type { ApiResponse, ApiError } from "./types"

let globalLoaderContext: any = null
let apiBaseURL: string = ""
let identityManagementURL: string = ""
let requestLanguage: string = "pt-BR"
const ACCESS_TOKEN_KEY = "@Archon:accessToken"
const REFRESH_TOKEN_KEY = "@Archon:refreshToken"
const USER_KEY = "@Archon:user"
const CONTRACT_KEY = "@Archon:contract"

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

      if (globalLoaderContext) {
        globalLoaderContext.showLoader()
      }

      return config
    })

    this.instance.interceptors.response.use(
      (response) => {
        if (globalLoaderContext) {
          globalLoaderContext.hideLoader()
        }
        return response
      },
      async (error) => {
        if (globalLoaderContext) {
          globalLoaderContext.hideLoader()
        }
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

          if (refreshToken && identityManagementURL) {
            try {
              const response = await axios.post(
                `${identityManagementURL}/api/auth/RefreshToken`,
                { refreshToken },
                {
                  headers: {
                    "Content-Type": "application/json",
                    "Accept-Language": requestLanguage,
                  },
                }
              )

              const accessToken = response.data?.data?.accessToken ?? response.data?.accessToken
              const newRefreshToken = response.data?.data?.refreshToken ?? response.data?.refreshToken

              localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
              if (newRefreshToken) {
                localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken)
              }

              originalRequest.headers.Authorization = `Bearer ${accessToken}`
              return this.instance(originalRequest)
            } catch (refreshError) {
              localStorage.removeItem(ACCESS_TOKEN_KEY)
              localStorage.removeItem(REFRESH_TOKEN_KEY)
              localStorage.removeItem(USER_KEY)
              localStorage.removeItem(CONTRACT_KEY)

              return Promise.reject(refreshError)
            }
          } else {
            const isAuthEndpoint = originalRequest.url?.includes("/auth/")

            if (!isAuthEndpoint) {
              window.location.href = "/"
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

    if (response.data && typeof response.data === "object" && "message" in response.data) {
      return response.data
    }

    return {
      message: "",
      data: response.data,
    }
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.post(url, data, config)

    if (response.data && typeof response.data === "object" && "message" in response.data) {
      return response.data
    }

    return {
      message: "",
      data: response.data,
    }
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.put(url, data, config)

    if (response.data && typeof response.data === "object" && "message" in response.data) {
      return response.data
    }

    return {
      message: "",
      data: response.data,
    }
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.delete(url, config)

    if (response.data && typeof response.data === "object" && "message" in response.data) {
      return response.data
    }

    return {
      message: "",
      data: response.data,
    }
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const response = await this.instance.patch(url, data, config)

    if (response.data && typeof response.data === "object" && "message" in response.data) {
      return response.data
    }

    return {
      message: "",
      data: response.data,
    }
  }
}

export const httpClient = new HttpClient()
