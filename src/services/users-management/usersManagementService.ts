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
  accessResourceIds?: number[]
}

export interface AccessResource {
  id: number
  systemApplicationId: number
  name: string
  description: string
  controller: string
  action: string
  httpMethod: string
  route: string
}

export interface CreateRolePayload {
  name: string
  description: string
  isRoot: boolean
  isDefault: boolean
  accessResourceIds: number[]
}

export interface UpdateRolePayload {
  name: string
  description: string
  isRoot: boolean
  isDefault: boolean
  accessResourceIds: number[]
}

export interface CreateUserInContractPayload {
  username: string
  email: string
  password: string
  name: string
  roleId: number
}

export interface UpdateUserPayload {
  name: string
  password?: string
  isActive: boolean
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

  static async updateInCurrentContract(userId: number, payload: UpdateUserPayload): Promise<ContractUser> {
    const response = await httpClient.put<ContractUser>(`${RESOURCE}/Update/${userId}`, payload)
    if (!response.data) {
      throw new Error(response.message || "Falha ao atualizar usuário")
    }
    return response.data
  }

  static async getRoleById(roleId: number): Promise<ContractRole> {
    const response = await httpClient.get<ContractRole>(`${RESOURCE}/GetRoleById/${roleId}`)
    if (!response.data) {
      throw new Error(response.message || "Perfil não encontrado")
    }
    return response.data
  }

  static async createRole(payload: CreateRolePayload): Promise<ContractRole> {
    const response = await httpClient.post<ContractRole>(`${RESOURCE}/CreateRole`, payload)
    if (!response.data) {
      throw new Error(response.message || "Falha ao criar perfil")
    }
    return response.data
  }

  static async updateRole(roleId: number, payload: UpdateRolePayload): Promise<ContractRole> {
    const response = await httpClient.put<ContractRole>(`${RESOURCE}/UpdateRole/${roleId}`, payload)
    if (!response.data) {
      throw new Error(response.message || "Falha ao atualizar perfil")
    }
    return response.data
  }

  static async deleteRole(roleId: number): Promise<void> {
    await httpClient.delete(`${RESOURCE}/DeleteRole/${roleId}`)
  }

  static async listAccessResources(): Promise<AccessResource[]> {
    const response = await httpClient.get<AccessResource[]>(`${RESOURCE}/GetAccessResources`)
    return response.data ?? []
  }
}
