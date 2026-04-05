import * as React from "react"
import { cn } from "../../lib/utils"
import type { ArchonCulture } from "../../i18n"

export interface LanguageFlagProps {
  culture: ArchonCulture
  className?: string
}

export const LanguageFlag: React.FC<LanguageFlagProps> = ({ culture, className }) => {
  if (culture === "en-US") {
    return (
      <svg viewBox="0 0 24 16" aria-hidden="true" className={cn("h-4 w-6 rounded-sm border border-border/60", className)}>
        <rect width="24" height="16" fill="#b22234" />
        <path d="M0 2h24M0 4h24M0 6h24M0 8h24M0 10h24M0 12h24M0 14h24" stroke="#fff" strokeWidth="1.2" />
        <rect width="10" height="7" fill="#3c3b6e" />
      </svg>
    )
  }

  if (culture === "es-AR") {
    return (
      <svg viewBox="0 0 24 16" aria-hidden="true" className={cn("h-4 w-6 rounded-sm border border-border/60", className)}>
        <rect width="24" height="16" fill="#74acdf" />
        <rect y="5.33" width="24" height="5.34" fill="#fff" />
        <circle cx="12" cy="8" r="1.4" fill="#f6b40e" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 16" aria-hidden="true" className={cn("h-4 w-6 rounded-sm border border-border/60", className)}>
      <rect width="24" height="16" fill="#009b3a" />
      <path d="M12 2 21 8 12 14 3 8 12 2Z" fill="#ffdf00" />
      <circle cx="12" cy="8" r="3.2" fill="#002776" />
      <path
        d="M8.8 8.5c1-.9 2.2-1.3 3.5-1.3 1.1 0 2.1.3 3 .9"
        fill="none"
        stroke="#fff"
        strokeWidth="0.6"
        strokeLinecap="round"
      />
    </svg>
  )
}
