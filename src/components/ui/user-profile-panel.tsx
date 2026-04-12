import * as React from "react"
import { Globe, KeyRound, MonitorSmartphone, Shield, UserRound } from "lucide-react"
import { useOptionalI18n } from "../../i18n"
import { cn, getInitials } from "../../lib/utils"
import { getApiBaseURL } from "../../services/http/client"
import { Badge } from "./badge"
import { Button } from "./button"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./sheet"

export interface UserProfilePanelProps {
  user: {
    name: string
    email: string
    username?: string
    role?: string
    avatarUrl?: string
    preferredLanguage?: string
    lastLoginAt?: string
  }
  onEditProfile?: () => void
  onChangePassword?: () => void
  onManageSessions?: () => void
  className?: string
}

const languageLabels: Record<string, string> = {
  "pt-BR": "Português (Brasil)",
  "en-US": "English (United States)",
  "es-AR": "Español (Argentina)",
}

export function UserProfilePanel({
  user,
  onEditProfile,
  onChangePassword,
  onManageSessions,
  className,
}: UserProfilePanelProps) {
  const i18n = useOptionalI18n()
  const t = React.useCallback((key: string) => i18n?.t(key) ?? key, [i18n])

  const avatar = React.useMemo(() => {
    if (!user.avatarUrl) {
      return getInitials(user.name)
    }

    const baseUrl = getApiBaseURL().replace("/api", "")
    const src = user.avatarUrl.startsWith("http")
      ? user.avatarUrl
      : `${baseUrl}${user.avatarUrl}`

    return <img src={src} alt={user.name} className="h-full w-full object-cover" />
  }, [user.avatarUrl, user.name])

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

  const preferredLanguage = user.preferredLanguage
    ? (languageLabels[user.preferredLanguage] ?? user.preferredLanguage)
    : t("profile.value.notDefined")

  return (
    <SheetContent side="right" className={cn("w-full overflow-y-auto sm:max-w-2xl", className)}>
      <SheetHeader className="space-y-2 border-b border-border pb-4">
        <SheetTitle>{t("profile.title")}</SheetTitle>
        <SheetDescription>{t("profile.description")}</SheetDescription>
      </SheetHeader>

      <div className="space-y-6 py-6">
        <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-2 border-background bg-secondary text-lg font-semibold text-secondary-foreground shadow-sm">
                {avatar}
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold text-foreground">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                {user.role ? <Badge variant="outline">{user.role}</Badge> : null}
              </div>
            </div>

            {onEditProfile ? (
              <Button variant="outline-primary" onClick={onEditProfile}>
                {t("profile.action.editProfile")}
              </Button>
            ) : null}
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
              <Field label={t("profile.field.name")} value={user.name} />
              <Field label={t("profile.field.email")} value={user.email} />
              <Field label={t("profile.field.username")} value={user.username || t("profile.value.notAvailable")} />
              <Field label={t("profile.field.role")} value={user.role || t("profile.value.notAvailable")} />
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
              <Field label={t("profile.field.preferredLanguage")} value={preferredLanguage} />
              <Field label={t("profile.field.lastLogin")} value={formatDateTime(user.lastLoginAt)} />
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
              onClick={onChangePassword}
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
    </SheetContent>
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
