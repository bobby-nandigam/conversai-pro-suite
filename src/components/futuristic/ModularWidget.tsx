import { ReactNode } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreVertical, Maximize2, X } from "lucide-react"

interface ModularWidgetProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  variant?: "default" | "holographic" | "neon" | "glass"
  onExpand?: () => void
  onClose?: () => void
}

export function ModularWidget({
  title,
  icon,
  children,
  variant = "holographic",
  onExpand,
  onClose,
}: ModularWidgetProps) {
  const variantClasses = {
    default: "card-holographic",
    holographic: "card-holographic hover-float",
    neon: "card-neon",
    glass: "card-glass",
  }

  return (
    <Card className={`${variantClasses[variant]} overflow-hidden`}>
      <div className="flex items-center justify-between p-4 border-b border-primary/20">
        <div className="flex items-center gap-2">
          {icon && <div className="text-primary">{icon}</div>}
          <h3 className="font-semibold">{title}</h3>
        </div>
        <div className="flex items-center gap-1">
          {onExpand && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onExpand}>
              <Maximize2 className="w-4 h-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="w-4 h-4" />
          </Button>
          {onClose && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </Card>
  )
}
