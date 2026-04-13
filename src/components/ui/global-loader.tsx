import * as React from "react"
import { cn } from "../../lib/utils"

export interface GlobalLoaderProps {
  isVisible: boolean
  className?: string
}

const triangleStyle: React.CSSProperties = {
  width: 0,
  height: 0,
  borderLeft: "8px solid transparent",
  borderRight: "8px solid transparent",
  borderBottom: "14px solid currentColor",
  animation: "globalLoaderPulse 1.4s ease-in-out infinite",
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({ isVisible, className }) => {
  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 backdrop-blur-sm flex items-center justify-center z-[9999]",
        className
      )}
    >
      <style>{`
        @keyframes globalLoaderPulse {
          0%, 80%, 100% { transform: scale(0.4); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div className="text-primary" style={{ position: "relative", width: 44, height: 38 }}>
        <div style={{ ...triangleStyle, position: "absolute", top: 0, left: 14, animationDelay: "0s" }} />
        <div style={{ ...triangleStyle, position: "absolute", bottom: 0, left: 0, animationDelay: "0.16s" }} />
        <div style={{ ...triangleStyle, position: "absolute", bottom: 0, right: 0, animationDelay: "0.32s" }} />
      </div>
    </div>
  )
}

GlobalLoader.displayName = "GlobalLoader"

export { GlobalLoader }
