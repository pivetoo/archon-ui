import { httpClient } from "../http/client"

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

const RESOURCE = "/UsersManagement"

export class UsersManagementService {
  static async listInCurrentContract(): Promise<ContractUser[]> {
    const response = await httpClient.get<ContractUser[]>(`${RESOURCE}/GetByCurrentContract`)
    return response.data ?? []
  }

  static async listRoles(): Promise<ContractRole[]> {
    const response = await httpClient.get<ContractRole[]>(`${RESOURCE}/GetRoles`)
    return response.data ?? []
  }

  static async createInCurrentContract(payload: CreateUserInContractPayload): Promise<ContractUser> {
    const response = await httpClient.post<ContractUser>(`${RESOURCE}/Create`, payload)
    if (!response.data) {
      throw new Error(response.message || "Falha ao criar usuário")
    }
    return response.data
  }

  static async updateRoleInCurrentContract(userId: number, roleId: number): Promise<ContractUser> {
    const response = await httpClient.put<ContractUser>(`${RESOURCE}/UpdateRole/${userId}`, { roleId })
    if (!response.data) {
      throw new Error(response.message || "Falha ao atualizar perfil")
    }
    return response.data
  }

  static async setActive(userId: number, isActive: boolean): Promise<void> {
    await httpClient.put(`${RESOURCE}/SetActive/${userId}`, { isActive })
  }
}
