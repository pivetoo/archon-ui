import * as React from "react"
import { cn } from "../../lib/utils"

export interface GlobalLoaderProps {
  isVisible: boolean
  className?: string
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
        @keyframes globalLoaderSpin {
          to { transform: rotate(1turn); }
        }
        .global-loader-ring {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, hsl(var(--secondary) / 0) 0deg, hsl(var(--primary)) 250deg, hsl(var(--secondary)) 360deg);
          -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 4px), #000 calc(100% - 4px));
                  mask: radial-gradient(farthest-side, #0000 calc(100% - 4px), #000 calc(100% - 4px));
          animation: globalLoaderSpin 0.9s cubic-bezier(0.76, 0.05, 0.24, 0.95) infinite;
        }
        .global-loader-ring::after {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: hsl(var(--secondary));
          transform: translateX(-50%);
        }
      `}</style>
      <div className="global-loader-ring" />
    </div>
  )
}

GlobalLoader.displayName = "GlobalLoader"

export { GlobalLoader }
