import axios from "axios"
import { getIdentityManagementURL, getRequestLanguage } from "../http/client"
import type { User } from "../../types/auth"
import { ACCESS_TOKEN_KEY } from "../storage/keys"

export interface UpdateProfileRequest {
  id: number
  name: string
  avatarUrl?: string
  isActive?: boolean
}

export interface ChangePasswordPayload {
  userId: number
  currentPassword: string
  newPassword: string
}

const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)

const getHeaders = () => {
  const accessToken = getAccessToken()

  return {
    "Content-Type": "application/json",
    "Accept-Language": getRequestLanguage(),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  }
}

const unwrapResponse = <T,>(response: { data: T | { data?: T } }) => {
  if (response.data && typeof response.data === "object" && "data" in response.data) {
    return response.data.data as T
  }

  return response.data as T
}

export class ProfileService {
  static async updateProfile(request: UpdateProfileRequest): Promise<User> {
    const baseUrl = getIdentityManagementURL()
    const updateResponse = await axios.put(
      `${baseUrl}/users/${request.id}`,
      {
        id: request.id,
        name: request.name,
        isActive: request.isActive ?? true,
      },
      { headers: getHeaders() }
    )

    return unwrapResponse<User>(updateResponse)
  }

  static async changePassword(payload: ChangePasswordPayload): Promise<void> {
    const baseUrl = getIdentityManagementURL()

    await axios.post(
      `${baseUrl}/auth/ChangePassword`,
      payload,
      { headers: getHeaders() }
    )
  }
}
