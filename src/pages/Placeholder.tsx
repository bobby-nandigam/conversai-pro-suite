import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Construction } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface PlaceholderProps {
  title: string
  description: string
  comingSoon?: boolean
}

export default function Placeholder({ title, description, comingSoon = true }: PlaceholderProps) {
  const navigate = useNavigate()

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="card-ai max-w-md w-full text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
              <Construction className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{description}</p>
            {comingSoon && (
              <div className="bg-gradient-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-sm font-medium text-primary">Coming Soon</p>
                <p className="text-xs text-muted-foreground mt-1">
                  This module is part of our comprehensive 224-feature platform currently in development.
                </p>
              </div>
            )}
            <Button variant="ai" onClick={() => navigate("/")}>
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}