import axios from "axios"
import { getIdentityManagementURL, getRequestLanguage } from "../http/client"

export interface ContractUser {
  userId: number
  username: string
  email: string
  name: string
  avatarUrl?: string
  isActive: boolean
  lastLoginAt?: string
  roleId: number
  roleName: string
  isRoot: boolean
  assignedAt: string
}

export interface ContractRole {
  id: number
  name: string
  description: string
  contractId: number
  isRoot: boolean
  isDefault: boolean
}

export interface CreateUserInContractPayload {
  username: string
  email: string
  password: string
  name: string
  roleId: number
}

const getAccessToken = () => localStorage.getItem("@Archon:accessToken")

const getHeaders = () => {
  const accessToken = getAccessToken()
  return {
    "Content-Type": "application/json",
    "Accept-Language": getRequestLanguage(),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  }
}

const unwrap = <T,>(response: { data: T | { data?: T } }): T => {
  if (response.data && typeof response.data === "object" && "data" in response.data) {
    return (response.data as { data: T }).data
  }
  return response.data as T
}

const buildUrl = (path: string): string => {
  const base = getIdentityManagementURL().replace(/\/+$/, "")
  const normalizedBase = /\/api$/i.test(base) ? base : `${base}/api`
  return `${normalizedBase}${path.startsWith("/") ? path : `/${path}`}`
}

export class UsersManagementService {
  static async listInCurrentContract(): Promise<ContractUser[]> {
    const response = await axios.get(buildUrl("/users/GetByCurrentContract"), {
      headers: getHeaders(),
    })
    return unwrap<ContractUser[]>(response) ?? []
  }

  static async createInCurrentContract(payload: CreateUserInContractPayload): Promise<ContractUser> {
    const response = await axios.post(
      buildUrl("/users/CreateInCurrentContract"),
      payload,
      { headers: getHeaders() }
    )
    return unwrap<ContractUser>(response)
  }

  static async updateRoleInCurrentContract(userId: number, roleId: number): Promise<ContractUser> {
    const response = await axios.put(
      buildUrl(`/users/${userId}/role-in-current-contract`),
      { roleId },
      { headers: getHeaders() }
    )
    return unwrap<ContractUser>(response)
  }

  static async setActive(userId: number, isActive: boolean): Promise<void> {
    await axios.put(
      buildUrl(`/users/${userId}/active`),
      { isActive },
      { headers: getHeaders() }
    )
  }

  static async listRolesByContract(contractId: number): Promise<ContractRole[]> {
    const response = await axios.get(buildUrl(`/roles/${contractId}`), {
      headers: getHeaders(),
    })
    return unwrap<ContractRole[]>(response) ?? []
  }
}
