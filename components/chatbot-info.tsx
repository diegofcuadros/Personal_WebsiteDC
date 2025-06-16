import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, MessageCircle, Sparkles } from "lucide-react"

export default function ChatbotInfo() {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <CardTitle className="text-lg">AI Research Assistant</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Get instant answers about Dr. Cuadros' research, publications, and expertise. The AI assistant can help you:
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="w-fit">
              <MessageCircle className="h-3 w-3 mr-1" />
              Research
            </Badge>
            <span className="text-sm">Learn about ongoing projects and themes</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="w-fit">
              <MessageCircle className="h-3 w-3 mr-1" />
              Publications
            </Badge>
            <span className="text-sm">Browse 42+ research articles</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="w-fit">
              <MessageCircle className="h-3 w-3 mr-1" />
              Contact
            </Badge>
            <span className="text-sm">Get collaboration and contact info</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="w-fit">
              <MessageCircle className="h-3 w-3 mr-1" />
              Expertise
            </Badge>
            <span className="text-sm">Discover consulting services</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3" />
          <span>Look for the chatbot button in the bottom-right corner</span>
        </div>
      </CardContent>
    </Card>
  )
} 