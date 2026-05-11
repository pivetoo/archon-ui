import * as React from "react"
import { Camera, Trash2, Eye, EyeOff, User, Lock } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { ProfileService } from "../../services/profile/profileService"
import { getInitials } from "../../lib/utils"
import { getApiBaseURL } from "../../services/http/client"
import { toast } from "./use-toast"
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "./modal"
import { Button } from "./button"
import { Input } from "./input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"

interface UserProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAvatarUpload?: (file: File) => Promise<string>
}

export function UserProfileModal({ open, onOpenChange, onAvatarUpload }: UserProfileModalProps) {
  const { user, updateUser } = useAuth()
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = React.useState("profile")

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null)
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null)
  const [isSaving, setIsSaving] = React.useState(false)

  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [showCurrentPwd, setShowCurrentPwd] = React.useState(false)
  const [showNewPwd, setShowNewPwd] = React.useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = React.useState(false)
  const [isChangingPassword, setIsChangingPassword] = React.useState(false)

  React.useEffect(() => {
    if (open && user) {
      setName(user.name ?? "")
      setEmail(user.email ?? "")
      setUsername(user.username ?? "")
      setAvatarPreview(user.avatarUrl ?? null)
      setAvatarFile(null)
      setActiveTab("profile")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }
  }, [open, user])

  const resolveAvatarUrl = (url: string | null): string | null => {
    if (!url) return null
    if (url.startsWith("http") || url.startsWith("blob:")) return url
    const baseUrl = getApiBaseURL().replace("/api", "")
    return `${baseUrl}${url}`
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleRemoveAvatar = () => {
    setAvatarFile(null)
    setAvatarPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSaveProfile = async () => {
    if (!user) return
    setIsSaving(true)
    try {
      let finalAvatarUrl: string | undefined = avatarPreview ?? undefined

      if (avatarFile && onAvatarUpload) {
        finalAvatarUrl = await onAvatarUpload(avatarFile)
      }

      const updated = await ProfileService.updateProfile({
        id: user.id,
        username,
        email: user.email,
        name,
        avatarUrl: finalAvatarUrl,
        isActive: user.isActive ?? true,
      })

      updateUser({
        name: updated.name,
        username: updated.username,
        avatarUrl: updated.avatarUrl,
      })

      toast({ variant: "success", title: "Perfil atualizado", description: "Suas informações foram salvas com sucesso." })
      onOpenChange(false)
    } catch (err: any) {
      const message = err?.response?.data?.message ?? err?.message ?? "Erro ao salvar perfil."
      toast({ variant: "destructive", title: "Erro", description: message })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (!user) return
    if (newPassword !== confirmPassword) {
      toast({ variant: "destructive", title: "Senhas não conferem", description: "A nova senha e a confirmação devem ser iguais." })
      return
    }
    if (newPassword.length < 6) {
      toast({ variant: "destructive", title: "Senha muito curta", description: "A senha deve ter no mínimo 6 caracteres." })
      return
    }
    setIsChangingPassword(true)
    try {
      await ProfileService.changePassword({ userId: user.id, currentPassword, newPassword })
      toast({ variant: "success", title: "Senha alterada", description: "Sua senha foi alterada com sucesso." })
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      const message = err?.response?.data?.message ?? err?.message ?? "Erro ao alterar senha."
      toast({ variant: "destructive", title: "Erro", description: message })
    } finally {
      setIsChangingPassword(false)
    }
  }

  const avatarSrc = resolveAvatarUrl(avatarPreview)
  const initials = getInitials(name || user?.name || "")
  const canSavePassword = !!currentPassword && !!newPassword && !!confirmPassword && !isChangingPassword

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="md">
        <ModalHeader>
          <ModalTitle>Meu perfil</ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-auto w-full justify-center gap-6 rounded-none border-b border-border bg-transparent p-0">
              <TabsTrigger
                value="profile"
                className="gap-2 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-0 text-sm font-medium text-muted-foreground shadow-none hover:text-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <User className="h-4 w-4" />
                Dados pessoais
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="gap-2 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 pt-0 text-sm font-medium text-muted-foreground shadow-none hover:text-foreground data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <Lock className="h-4 w-4" />
                Segurança
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-5 space-y-5">
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-secondary text-secondary-foreground text-xl font-semibold border-2 border-background shadow-sm">
                    {avatarSrc ? (
                      <img src={avatarSrc} alt={name} className="h-full w-full object-cover" />
                    ) : (
                      <span>{initials || <User className="h-8 w-8" />}</span>
                    )}
                  </div>
                  {onAvatarUpload && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-opacity hover:opacity-85"
                    >
                      <Camera className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                    Remover foto
                  </button>
                )}
              </div>

              <div className="grid gap-3">
                <div className="grid gap-1.5">
                  <label className="text-sm font-medium">Nome</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome completo" />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-sm font-medium text-muted-foreground">E-mail</label>
                  <Input type="email" value={email} readOnly disabled className="cursor-not-allowed opacity-60" />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-sm font-medium">Usuário</label>
                  <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="nome de usuário" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-5 space-y-0">
              <div className="grid gap-3">
                <div className="grid gap-1.5">
                  <label className="text-sm font-medium">Senha atual</label>
                  <div className="relative">
                    <Input
                      type={showCurrentPwd ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPwd((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showCurrentPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <label className="text-sm font-medium">Nova senha</label>
                  <div className="relative">
                    <Input
                      type={showNewPwd ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPwd((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showNewPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <label className="text-sm font-medium">Confirmar nova senha</label>
                  <div className="relative">
                    <Input
                      type={showConfirmPwd ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPwd((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showConfirmPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          {activeTab === "profile" ? (
            <Button onClick={() => void handleSaveProfile()} disabled={isSaving}>
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          ) : (
            <Button onClick={() => void handleChangePassword()} disabled={!canSavePassword}>
              {isChangingPassword ? "Alterando..." : "Alterar senha"}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
