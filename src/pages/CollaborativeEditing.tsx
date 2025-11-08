import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, MessageSquare, Lock, AtSign, Clock, Activity } from "lucide-react";
import { AgentCanvas } from "@/components/agent-builder/AgentCanvas";

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  color: string;
  status: "online" | "offline" | "away";
  currentNode?: string;
}

interface Comment {
  id: string;
  author: TeamMember;
  content: string;
  timestamp: Date;
  nodeId: string;
  mentions: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "",
    color: "#3b82f6",
    status: "online",
    currentNode: "node-3",
  },
  {
    id: "2",
    name: "Mike Johnson",
    avatar: "",
    color: "#8b5cf6",
    status: "online",
    currentNode: "node-5",
  },
  {
    id: "3",
    name: "Emma Davis",
    avatar: "",
    color: "#ec4899",
    status: "away",
  },
  {
    id: "4",
    name: "Alex Turner",
    avatar: "",
    color: "#f59e0b",
    status: "offline",
  },
];

const mockComments: Comment[] = [
  {
    id: "1",
    author: teamMembers[0],
    content: "Should we add a sentiment analysis step here before routing?",
    timestamp: new Date("2025-01-15T10:30:00"),
    nodeId: "node-3",
    mentions: ["Mike Johnson"],
  },
  {
    id: "2",
    author: teamMembers[1],
    content: "@Sarah Chen Good idea! Let me add that now.",
    timestamp: new Date("2025-01-15T10:32:00"),
    nodeId: "node-3",
    mentions: ["Sarah Chen"],
  },
];

export default function CollaborativeEditing() {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const getStatusColor = (status: TeamMember["status"]) => {
    switch (status) {
      case "online":
        return "bg-green-500 dark:bg-green-400";
      case "away":
        return "bg-yellow-500 dark:bg-yellow-400";
      case "offline":
        return "bg-muted-foreground";
    }
  };

  const addComment = () => {
    if (!newComment.trim() || !selectedNode) return;

    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: teamMembers[0],
      content: newComment,
      timestamp: new Date(),
      nodeId: selectedNode,
      mentions: [],
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <div className="flex-1 p-6 space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Real-Time Collaborative Editing
          </h1>
          <p className="text-muted-foreground mt-1">
            Build and refine agents together with your team in real-time
          </p>
        </div>
        <Button className="shadow-lg">
          <Users className="w-4 h-4 mr-2" />
          Invite Members
        </Button>
      </div>

      {/* Team Members Online */}
      <Card className="border-border bg-card shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground">Team Members</span>
              </div>
              <div className="flex -space-x-2">
                {teamMembers.map((member) => (
                  <div key={member.id} className="relative group cursor-pointer">
                    <Avatar className="border-2 border-card transition-transform group-hover:scale-110">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback style={{ backgroundColor: member.color }} className="text-white font-semibold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(
                        member.status
                      )}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 text-sm">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Users className="w-3 h-3 mr-1" />
                {teamMembers.filter((m) => m.status === "online").length} online
              </Badge>
              <Badge variant="secondary" className="bg-accent/10 text-accent-foreground border-accent/20">
                <Lock className="w-3 h-3 mr-1" />
                2 nodes locked
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Canvas */}
        <div className="lg:col-span-3">
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center justify-between text-foreground">
                <span>Agent Workflow</span>
                <div className="flex gap-2">
                  {teamMembers
                    .filter((m) => m.status === "online" && m.currentNode)
                    .map((member) => (
                      <Badge key={member.id} variant="outline" style={{ borderColor: member.color }}>
                        <div
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: member.color }}
                        />
                        {member.name} editing
                      </Badge>
                    ))}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-border rounded-lg h-[600px] relative overflow-hidden bg-muted/20">
                <AgentCanvas />
                
                {/* Live Cursors */}
                {teamMembers
                  .filter((m) => m.status === "online" && m.currentNode)
                  .map((member) => (
                    <div
                      key={member.id}
                      className="absolute pointer-events-none"
                      style={{
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`,
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill={member.color}
                        className="drop-shadow-lg"
                      >
                        <path d="M0 0 L0 16 L4 12 L6 18 L8 17 L6 11 L10 10 Z" />
                      </svg>
                      <Badge
                        className="ml-2 text-xs"
                        style={{ backgroundColor: member.color, color: "white" }}
                      >
                        {member.name}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comments & Activity Panel */}
        <div className="space-y-6">
          {/* Active Team Members */}
          <Card className="border-border bg-card shadow-sm">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-base text-foreground">Active Now</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teamMembers
                  .filter((m) => m.status === "online")
                  .map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback style={{ backgroundColor: member.color }}>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-background ${getStatusColor(
                            member.status
                          )}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{member.name}</p>
                        {member.currentNode && (
                          <p className="text-xs text-muted-foreground">Editing {member.currentNode}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card className="flex flex-col h-[480px] border-border bg-card shadow-sm">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-base flex items-center gap-2 text-foreground">
                <MessageSquare className="w-4 h-4 text-primary" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback style={{ backgroundColor: comment.author.color }}>
                            {comment.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium">{comment.author.name}</p>
                            <Badge variant="outline" className="text-xs">
                              {comment.nodeId}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.content}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">
                              {comment.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="space-y-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment... Use @name to mention"
                  className="min-h-[80px]"
                />
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <AtSign className="w-3 h-3 mr-1" />
                    Mention
                  </Button>
                  <Button size="sm" onClick={addComment} className="flex-1">
                    Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-base flex items-center gap-2 text-foreground">
            <Clock className="w-4 h-4 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Avatar className="w-6 h-6">
                <AvatarFallback style={{ backgroundColor: teamMembers[0].color }}>SC</AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">{teamMembers[0].name}</span> added a sentiment
                analysis node
              </span>
              <span className="text-xs text-muted-foreground ml-auto">2m ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Avatar className="w-6 h-6">
                <AvatarFallback style={{ backgroundColor: teamMembers[1].color }}>MJ</AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">{teamMembers[1].name}</span> updated trigger
                configuration
              </span>
              <span className="text-xs text-muted-foreground ml-auto">5m ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Avatar className="w-6 h-6">
                <AvatarFallback style={{ backgroundColor: teamMembers[0].color }}>SC</AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">{teamMembers[0].name}</span> commented on
                node-3
              </span>
              <span className="text-xs text-muted-foreground ml-auto">12m ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
