import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Users, 
  Plus, 
  Search, 
  UserPlus,
  Settings,
  Mail,
  Phone,
  Calendar,
  Activity,
  Shield,
  Crown,
  User,
  Edit,
  Trash2,
  MoreVertical,
  Clock,
  MessageSquare,
  BarChart3,
  CheckCircle,
  XCircle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockTeamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "Admin",
    department: "Customer Success",
    avatar: "https://avatar.vercel.sh/sarah",
    status: "online",
    joinDate: "2023-06-15",
    lastActive: "2 minutes ago",
    permissions: ["manage_bots", "view_analytics", "manage_team", "manage_integrations"],
    stats: {
      conversationsHandled: 245,
      avgResponseTime: "2.3min",
      satisfaction: 4.8,
      activeToday: true
    }
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@company.com", 
    role: "Agent",
    department: "Support",
    avatar: "https://avatar.vercel.sh/mike",
    status: "busy",
    joinDate: "2023-08-22",
    lastActive: "5 minutes ago",
    permissions: ["view_conversations", "handle_chats"],
    stats: {
      conversationsHandled: 189,
      avgResponseTime: "1.8min",
      satisfaction: 4.9,
      activeToday: true
    }
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "Manager",
    department: "Customer Success",
    avatar: "https://avatar.vercel.sh/emily",
    status: "away",
    joinDate: "2023-05-10",
    lastActive: "30 minutes ago",
    permissions: ["manage_bots", "view_analytics", "manage_agents"],
    stats: {
      conversationsHandled: 156,
      avgResponseTime: "2.1min",
      satisfaction: 4.7,
      activeToday: true
    }
  },
  {
    id: 4,
    name: "Alex Thompson",
    email: "alex.thompson@company.com",
    role: "Agent",
    department: "Technical Support",
    avatar: "https://avatar.vercel.sh/alex",
    status: "offline",
    joinDate: "2023-09-05",
    lastActive: "2 hours ago",
    permissions: ["view_conversations", "handle_chats", "technical_support"],
    stats: {
      conversationsHandled: 98,
      avgResponseTime: "3.2min",
      satisfaction: 4.6,
      activeToday: false
    }
  }
]

const roleHierarchy = [
  {
    name: "Admin",
    description: "Full access to all features and settings",
    permissions: ["manage_bots", "view_analytics", "manage_team", "manage_integrations", "system_settings"],
    color: "text-red-500",
    icon: Crown
  },
  {
    name: "Manager", 
    description: "Manage team members and bot configurations",
    permissions: ["manage_bots", "view_analytics", "manage_agents", "view_reports"],
    color: "text-blue-500",
    icon: Shield
  },
  {
    name: "Agent",
    description: "Handle customer conversations and support",
    permissions: ["view_conversations", "handle_chats", "update_profile"],
    color: "text-green-500",
    icon: User
  },
  {
    name: "Viewer",
    description: "Read-only access to conversations and reports",
    permissions: ["view_conversations", "view_reports"],
    color: "text-gray-500",
    icon: User
  }
]

const departments = [
  "Customer Success",
  "Support", 
  "Technical Support",
  "Sales",
  "Marketing",
  "Product"
]

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState(mockTeamMembers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
    department: ""
  })
  const { toast } = useToast()

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || member.role === selectedRole
    const matchesDept = selectedDepartment === "all" || member.department === selectedDepartment
    return matchesSearch && matchesRole && matchesDept
  })

  const handleInviteMember = () => {
    if (!newMember.name || !newMember.email || !newMember.role) return
    
    const member = {
      id: teamMembers.length + 1,
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      department: newMember.department || "General",
      avatar: `https://avatar.vercel.sh/${newMember.name.toLowerCase().replace(' ', '')}`,
      status: "invited" as const,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: "Never",
      permissions: roleHierarchy.find(r => r.name === newMember.role)?.permissions || [],
      stats: {
        conversationsHandled: 0,
        avgResponseTime: "0min",
        satisfaction: 0,
        activeToday: false
      }
    }
    
    setTeamMembers([...teamMembers, member])
    setNewMember({ name: "", email: "", role: "", department: "" })
    toast({
      title: "Invitation Sent",
      description: `Invitation has been sent to ${member.email}.`
    })
  }

  const handleRemoveMember = (id: number) => {
    setTeamMembers(members => members.filter(m => m.id !== id))
    toast({
      title: "Member Removed",
      description: "Team member has been removed from your organization."
    })
  }

  const handleUpdateRole = (id: number, newRole: string) => {
    setTeamMembers(members => members.map(member =>
      member.id === id 
        ? { 
            ...member, 
            role: newRole,
            permissions: roleHierarchy.find(r => r.name === newRole)?.permissions || []
          }
        : member
    ))
    toast({
      title: "Role Updated",
      description: "Team member role has been updated successfully."
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-success"
      case "busy": return "bg-warning"
      case "away": return "bg-orange-500"
      case "offline": return "bg-muted-foreground"
      case "invited": return "bg-blue-500"
      default: return "bg-muted-foreground"
    }
  }

  const getRoleIcon = (role: string) => {
    const roleInfo = roleHierarchy.find(r => r.name === role)
    return roleInfo ? roleInfo.icon : User
  }

  const getRoleColor = (role: string) => {
    const roleInfo = roleHierarchy.find(r => r.name === role)
    return roleInfo ? roleInfo.color : "text-muted-foreground"
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">Invite team members, manage roles and permissions, and organize your workspace</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ai">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Full Name"
                value={newMember.name}
                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
              />
              <Input
                placeholder="Email Address"
                type="email"
                value={newMember.email}
                onChange={(e) => setNewMember({...newMember, email: e.target.value})}
              />
              <Select value={newMember.role} onValueChange={(value) => setNewMember({...newMember, role: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  {roleHierarchy.map(role => (
                    <SelectItem key={role.name} value={role.name}>
                      <div className="flex items-center gap-2">
                        <role.icon className={`w-4 h-4 ${role.color}`} />
                        {role.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={newMember.department} onValueChange={(value) => setNewMember({...newMember, department: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Department (Optional)" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleInviteMember} className="w-full bg-gradient-primary">
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{teamMembers.length}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Online Now</p>
                <p className="text-2xl font-bold">{teamMembers.filter(m => m.status === "online" || m.status === "busy").length}</p>
              </div>
              <Activity className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Today</p>
                <p className="text-2xl font-bold">{teamMembers.filter(m => m.stats.activeToday).length}</p>
              </div>
              <Clock className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-ai">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Departments</p>
                <p className="text-2xl font-bold">{new Set(teamMembers.map(m => m.department)).size}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          {/* Search and Filter */}
          <Card className="card-ai">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roleHierarchy.map(role => (
                      <SelectItem key={role.name} value={role.name}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map(dept => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Team Members List */}
          <div className="grid gap-4">
            {filteredMembers.map((member) => {
              const RoleIcon = getRoleIcon(member.role)
              return (
                <Card key={member.id} className="card-ai">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${getStatusColor(member.status)}`} />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{member.name}</h3>
                            <Badge variant="outline" className={getRoleColor(member.role)}>
                              <RoleIcon className="w-3 h-3 mr-1" />
                              {member.role}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{member.email}</p>
                          <p className="text-xs text-muted-foreground">{member.department} • Joined {member.joinDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right text-sm">
                          <div className="flex items-center gap-4 mb-2">
                            <div className="text-center">
                              <p className="font-medium">{member.stats.conversationsHandled}</p>
                              <p className="text-xs text-muted-foreground">Conversations</p>
                            </div>
                            <div className="text-center">
                              <p className="font-medium">{member.stats.avgResponseTime}</p>
                              <p className="text-xs text-muted-foreground">Avg Response</p>
                            </div>
                            <div className="text-center">
                              <p className="font-medium">{member.stats.satisfaction}/5</p>
                              <p className="text-xs text-muted-foreground">Satisfaction</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">Last active: {member.lastActive}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Select value={member.role} onValueChange={(value) => handleUpdateRole(member.id, value)}>
                            <SelectTrigger className="w-[120px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {roleHierarchy.map(role => (
                                <SelectItem key={role.name} value={role.name}>
                                  <div className="flex items-center gap-2">
                                    <role.icon className={`w-4 h-4 ${role.color}`} />
                                    {role.name}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Button variant="ghost" size="icon">
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid gap-6">
            {roleHierarchy.map((role) => {
              const RoleIcon = role.icon
              return (
                <Card key={role.name} className="card-ai">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${role.color.includes('red') ? 'bg-red-500/10' : role.color.includes('blue') ? 'bg-blue-500/10' : role.color.includes('green') ? 'bg-green-500/10' : 'bg-gray-500/10'}`}>
                        <RoleIcon className={`w-6 h-6 ${role.color}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold">{role.name}</h3>
                          <Badge variant="secondary">
                            {teamMembers.filter(m => m.role === role.name).length} members
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{role.description}</p>
                        
                        <div>
                          <h4 className="font-medium mb-2">Permissions:</h4>
                          <div className="flex flex-wrap gap-2">
                            {role.permissions.map(permission => (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Role
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => {
              const deptMembers = teamMembers.filter(m => m.department === dept)
              return (
                <Card key={dept} className="card-ai">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{dept}</h3>
                      <Badge variant="secondary">{deptMembers.length} members</Badge>
                    </div>
                    
                    <div className="space-y-3">
                      {deptMembers.slice(0, 3).map(member => (
                        <div key={member.id} className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="text-xs">{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.role}</p>
                          </div>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`} />
                        </div>
                      ))}
                      
                      {deptMembers.length > 3 && (
                        <p className="text-xs text-muted-foreground text-center">
                          +{deptMembers.length - 3} more members
                        </p>
                      )}
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4">
                      View All Members
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}