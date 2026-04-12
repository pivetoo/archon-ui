import * as React from "react"
import { Globe, KeyRound, MonitorSmartphone, Shield, UserRound } from "lucide-react"
import { useOptionalI18n } from "../../i18n"
import { useOptionalAuth } from "../../contexts"
import { getInitials } from "../../lib/utils"
import { getApiBaseURL } from "../../services/http/client"
import { ProfileService } from "../../services/profile"
import { Badge } from "./badge"
import { Button } from "./button"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Input } from "./input"
import { Modal, ModalBody, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle } from "./modal"
import { PageLayout } from "./page-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { useToast } from "./use-toast"

export interface UserProfileUser {
  name: string
  email: string
  username?: string
  role?: string
  avatarUrl?: string
  preferredLanguage?: string
  lastLoginAt?: string
}

export interface UserProfilePageProps {
  user: UserProfileUser
  onEditProfile?: () => void
  onSaveProfile?: (user: UserProfileUser) => void | Promise<void>
  onChangePassword?: () => void
  onManageSessions?: () => void
  className?: string
}

const languageLabels: Record<string, string> = {
  "pt-BR": "Português (Brasil)",
  "en-US": "English (United States)",
  "es-AR": "Español (Argentina)",
}

export function UserProfilePage({
  user,
  onEditProfile,
  onSaveProfile,
  onChangePassword,
  onManageSessions,
  className,
}: UserProfilePageProps) {
  const i18n = useOptionalI18n()
  const auth = useOptionalAuth()
  const { toast } = useToast()
  const t = React.useCallback((key: string) => i18n?.t(key) ?? key, [i18n])
  const [isEditing, setIsEditing] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = React.useState(false)
  const [isChangingPassword, setIsChangingPassword] = React.useState(false)
  const [profile, setProfile] = React.useState<UserProfileUser>(user)
  const [passwordForm, setPasswordForm] = React.useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  React.useEffect(() => {
    setProfile(user)
  }, [user])

  const avatar = React.useMemo(() => {
    if (!profile.avatarUrl) {
      return getInitials(profile.name)
    }

    const baseUrl = getApiBaseURL().replace("/api", "")
    const src = profile.avatarUrl.startsWith("http")
      ? profile.avatarUrl
      : `${baseUrl}${profile.avatarUrl}`

    return <img src={src} alt={profile.name} className="h-full w-full object-cover" />
  }, [profile.avatarUrl, profile.name])

  const formatDateTime = React.useCallback((value?: string) => {
    if (!value) {
      return t("profile.value.notAvailable")
    }

    return new Date(value).toLocaleString(i18n?.culture ?? "pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }, [i18n?.culture, t])

  const preferredLanguage = profile.preferredLanguage
    ? (languageLabels[profile.preferredLanguage] ?? profile.preferredLanguage)
    : t("profile.value.notDefined")

  const handleChange = React.useCallback((field: keyof UserProfileUser, value: string) => {
    setProfile((current) => ({ ...current, [field]: value || undefined }))
  }, [])

  const handleEdit = React.useCallback(() => {
    onEditProfile?.()
    setProfile(user)
    setIsEditing(true)
  }, [onEditProfile, user])

  const handleCancel = React.useCallback(() => {
    setProfile(user)
    setIsEditing(false)
  }, [user])

  const handleSave = React.useCallback(async () => {
    setIsSaving(true)

    try {
      if (onSaveProfile) {
        await onSaveProfile(profile)
      } else if (auth?.user) {
        const updatedUser = await ProfileService.updateProfile({
          id: auth.user.id,
          username: profile.username ?? auth.user.username,
          email: profile.email,
          name: profile.name,
          avatarUrl: profile.avatarUrl,
          isActive: auth.user.isActive ?? true,
        })

        auth.updateUser({
          name: updatedUser.name,
          email: updatedUser.email,
          username: updatedUser.username,
          avatarUrl: updatedUser.avatarUrl,
          isActive: updatedUser.isActive,
          lastLoginAt: updatedUser.lastLoginAt ? String(updatedUser.lastLoginAt) : auth.user.lastLoginAt,
        })
      }

      toast({
        title: t("profile.toast.saveSuccessTitle"),
        description: t("profile.toast.saveSuccessDescription"),
        variant: "success",
      })
      setIsEditing(false)
    } catch (error: any) {
      toast({
        title: t("profile.toast.errorTitle"),
        description: error?.message || t("profile.toast.saveErrorDescription"),
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }, [auth, onSaveProfile, profile, t, toast])

  const handleChangePassword = React.useCallback(async () => {
    if (onChangePassword) {
      onChangePassword()
      return
    }

    if (!auth?.user) {
      return
    }

    if (passwordForm.newPassword.length < 6) {
      toast({
        title: t("profile.toast.errorTitle"),
        description: t("profile.password.validation.minLength"),
        variant: "destructive",
      })
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: t("profile.toast.errorTitle"),
        description: t("profile.password.validation.confirmMismatch"),
        variant: "destructive",
      })
      return
    }

    setIsChangingPassword(true)

    try {
      await ProfileService.changePassword({
        userId: auth.user.id,
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      })

      toast({
        title: t("profile.toast.passwordSuccessTitle"),
        description: t("profile.toast.passwordSuccessDescription"),
        variant: "success",
      })
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setIsChangePasswordOpen(false)
    } catch (error: any) {
      toast({
        title: t("profile.toast.errorTitle"),
        description: error?.message || t("profile.toast.passwordErrorDescription"),
        variant: "destructive",
      })
    } finally {
      setIsChangingPassword(false)
    }
  }, [auth, onChangePassword, passwordForm, t, toast])

  return (
    <PageLayout
      title={t("profile.title")}
      subtitle={t("profile.description")}
      showDefaultActions={false}
      className={className}
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-2 border-background bg-secondary text-lg font-semibold text-secondary-foreground shadow-sm">
                {avatar}
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-foreground">{profile.name}</h2>
                <p className="text-sm text-muted-foreground">{profile.email}</p>
                {profile.role ? <Badge variant="outline">{profile.role}</Badge> : null}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                    {t("profile.action.cancelEdit")}
                  </Button>
                  <Button variant="outline-primary" onClick={() => void handleSave()} disabled={isSaving}>
                    {t("profile.action.saveProfile")}
                  </Button>
                </>
              ) : (
                <Button variant="outline-primary" onClick={handleEdit}>
                  {t("profile.action.editProfile")}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <UserRound className="h-4 w-4 text-primary" />
                {t("profile.section.identity")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <EditableField
                    label={t("profile.field.name")}
                    input={
                      <Input
                        value={profile.name}
                        onChange={(event) => handleChange("name", event.target.value)}
                        placeholder={t("profile.placeholder.name")}
                      />
                    }
                  />
                  <EditableField
                    label={t("profile.field.email")}
                    input={
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(event) => handleChange("email", event.target.value)}
                        placeholder={t("profile.placeholder.email")}
                      />
                    }
                  />
                  <EditableField
                    label={t("profile.field.username")}
                    input={
                      <Input
                        value={profile.username ?? ""}
                        onChange={(event) => handleChange("username", event.target.value)}
                        placeholder={t("profile.placeholder.username")}
                      />
                    }
                  />
                  <EditableField
                    label={t("profile.field.avatarUrl")}
                    input={
                      <Input
                        value={profile.avatarUrl ?? ""}
                        onChange={(event) => handleChange("avatarUrl", event.target.value)}
                        placeholder={t("profile.placeholder.avatarUrl")}
                      />
                    }
                  />
                  <Field label={t("profile.field.role")} value={profile.role || t("profile.value.notAvailable")} />
                </>
              ) : (
                <>
                  <Field label={t("profile.field.name")} value={profile.name} />
                  <Field label={t("profile.field.email")} value={profile.email} />
                  <Field label={t("profile.field.username")} value={profile.username || t("profile.value.notAvailable")} />
                  <Field label={t("profile.field.avatarUrl")} value={profile.avatarUrl || t("profile.value.notAvailable")} />
                  <Field label={t("profile.field.role")} value={profile.role || t("profile.value.notAvailable")} />
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Globe className="h-4 w-4 text-primary" />
                {t("profile.section.preferences")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <EditableField
                  label={t("profile.field.preferredLanguage")}
                  input={
                    <Select
                      value={profile.preferredLanguage ?? "pt-BR"}
                      onValueChange={(value) => handleChange("preferredLanguage", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t("profile.placeholder.preferredLanguage")} />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(languageLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  }
                />
              ) : (
                <Field label={t("profile.field.preferredLanguage")} value={preferredLanguage} />
              )}
              <Field label={t("profile.field.lastLogin")} value={formatDateTime(profile.lastLoginAt)} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-primary" />
              {t("profile.section.security")}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <ActionCard
              icon={<KeyRound className="h-4 w-4" />}
              title={t("profile.security.changePasswordTitle")}
              description={t("profile.security.changePasswordDescription")}
              actionLabel={t("profile.action.changePassword")}
              onClick={onChangePassword ? onChangePassword : () => setIsChangePasswordOpen(true)}
            />
            <ActionCard
              icon={<MonitorSmartphone className="h-4 w-4" />}
              title={t("profile.security.sessionsTitle")}
              description={t("profile.security.sessionsDescription")}
              actionLabel={t("profile.action.manageSessions")}
              onClick={onManageSessions}
            />
          </CardContent>
        </Card>

      </div>
      <Modal open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
        <ModalContent size="md">
          <ModalHeader>
            <ModalTitle>{t("profile.password.modalTitle")}</ModalTitle>
            <ModalDescription>{t("profile.password.modalDescription")}</ModalDescription>
          </ModalHeader>
          <ModalBody className="space-y-4">
            <EditableField
              label={t("profile.password.current")}
              input={
                <Input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(event) => setPasswordForm((current) => ({ ...current, currentPassword: event.target.value }))}
                  placeholder={t("profile.password.placeholder.current")}
                />
              }
            />
            <EditableField
              label={t("profile.password.new")}
              input={
                <Input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(event) => setPasswordForm((current) => ({ ...current, newPassword: event.target.value }))}
                  placeholder={t("profile.password.placeholder.new")}
                />
              }
            />
            <EditableField
              label={t("profile.password.confirm")}
              input={
                <Input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(event) => setPasswordForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                  placeholder={t("profile.password.placeholder.confirm")}
                />
              }
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)} disabled={isChangingPassword}>
              {t("profile.action.cancelEdit")}
            </Button>
            <Button variant="outline-primary" onClick={() => void handleChangePassword()} disabled={isChangingPassword}>
              {t("profile.action.changePassword")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </PageLayout>
  )
}

interface FieldProps {
  label: string
  value: React.ReactNode
}

function Field({ label, value }: FieldProps) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className="text-sm font-medium text-foreground">{value}</div>
    </div>
  )
}

interface EditableFieldProps {
  label: string
  input: React.ReactNode
}

function EditableField({ label, input }: EditableFieldProps) {
  return (
    <div className="space-y-2">
      <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
      {input}
    </div>
  )
}

interface ActionCardProps {
  icon: React.ReactNode
  title: string
  description: string
  actionLabel: string
  onClick?: () => void
}

function ActionCard({ icon, title, description, actionLabel, onClick }: ActionCardProps) {
  return (
    <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        {icon}
        {title}
      </div>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      <Button variant="outline" onClick={onClick} disabled={!onClick}>
        {actionLabel}
      </Button>
    </div>
  )
}
