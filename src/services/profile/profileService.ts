import axios from "axios"
import { getIdentityManagementURL, getRequestLanguage } from "../http/client"
import type { User } from "../../types/auth"

export interface UpdateProfileRequest {
  id: number
  username: string
  email: string
  name: string
  avatarUrl?: string
  isActive?: boolean
}

export interface ChangePasswordPayload {
  userId: number
  currentPassword: string
  newPassword: string
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
        username: request.username,
        email: request.email,
        name: request.name,
        isActive: request.isActive ?? true,
      },
      { headers: getHeaders() }
    )

    const updatedUser = unwrapResponse<User>(updateResponse)
    const currentAvatarUrl = updatedUser.avatarUrl ?? null
    const nextAvatarUrl = request.avatarUrl?.trim() ? request.avatarUrl.trim() : null

    if (currentAvatarUrl === nextAvatarUrl) {
      return updatedUser
    }

    if (nextAvatarUrl) {
      await axios.put(
        `${baseUrl}/users/${request.id}/avatar`,
        nextAvatarUrl,
        { headers: getHeaders() }
      )

      return {
        ...updatedUser,
        avatarUrl: nextAvatarUrl,
      }
    }

    await axios.delete(`${baseUrl}/users/${request.id}/avatar`, {
      headers: getHeaders(),
    })

    return {
      ...updatedUser,
      avatarUrl: undefined,
    }
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
