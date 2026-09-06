import { OIDC_PROMPT_LOGIN_KEY } from "../storage/keys"

// Logout explicito do usuario: o proximo redirecionamento para o IdentityManagement leva `prompt=login`,
// para a sessao que ainda existe la (SSO) nao reautenticar sozinha quem acabou de sair.
export const markPromptLogin = () => {
  try {
    sessionStorage.setItem(OIDC_PROMPT_LOGIN_KEY, "1")
  } catch {
    // sessionStorage indisponivel: sem a marca, o pior caso e o comportamento antigo (SSO no proximo authorize)
  }
}

// Le e apaga a marca: ela vale para um unico redirecionamento.
export const consumePromptLogin = () => {
  try {
    const marked = sessionStorage.getItem(OIDC_PROMPT_LOGIN_KEY) === "1"
    if (marked) {
      sessionStorage.removeItem(OIDC_PROMPT_LOGIN_KEY)
    }
    return marked
  } catch {
    return false
  }
}
