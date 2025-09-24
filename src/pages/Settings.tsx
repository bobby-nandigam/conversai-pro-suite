import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  CreditCard,
  Building,
  Mail,
  Phone,
  Save,
  Upload,
  Download,
  Trash2,
  Key,
  Lock,
  Eye,
  EyeOff
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const mockUserProfile = {
  name: "John Smith",
  email: "john.smith@company.com",
  phone: "+1 (555) 123-4567",
  avatar: "https://avatar.vercel.sh/john",
  role: "Admin",
  company: "Acme Corporation",
  timezone: "America/New_York",
  language: "English"
}

const mockCompanySettings = {
  name: "Acme Corporation",
  website: "https://acme.com",
  industry: "Technology",
  size: "51-200 employees",
  address: "123 Business St, New York, NY 10001",
  phone: "+1 (555) 987-6543",
  logo: "https://logo.clearbit.com/acme.com"
}

const mockNotificationSettings = {
  emailNotifications: true,
  browserNotifications: true,
  mobileNotifications: false,
  conversationAlerts: true,
  botUpdates: true,
  systemMaintenance: true,
  weeklyReports: true,
  monthlyReports: false
}

const mockSecuritySettings = {
  twoFactorEnabled: true,
  sessionTimeout: 30,
  passwordLastChanged: "2024-01-01",
  activeSessions: 3,
  loginHistory: [
    { date: "2024-01-15 10:30 AM", location: "New York, NY", device: "Chrome on Windows", status: "success" },
    { date: "2024-01-14 02:15 PM", location: "New York, NY", device: "Safari on iPhone", status: "success" },
    { date: "2024-01-14 09:45 AM", location: "Boston, MA", device: "Firefox on Mac", status: "failed" }
  ]
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile")
  const [userProfile, setUserProfile] = useState(mockUserProfile)
  const [companySettings, setCompanySettings] = useState(mockCompanySettings)
  const [notifications, setNotifications] = useState(mockNotificationSettings)
  const [security, setSecurity] = useState(mockSecuritySettings)
  const [showPassword, setShowPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { toast } = useToast()

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully."
    })
  }

  const handleSaveCompany = () => {
    toast({
      title: "Company Settings Updated",
      description: "Company information has been saved successfully."
    })
  }

  const handleToggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved."
    })
  }

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive"
      })
      return
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error", 
        description: "New passwords do not match.",
        variant: "destructive"
      })
      return
    }
    
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully."
    })
  }

  const handleToggle2FA = () => {
    setSecurity(prev => ({
      ...prev,
      twoFactorEnabled: !prev.twoFactorEnabled
    }))
    toast({
      title: security.twoFactorEnabled ? "2FA Disabled" : "2FA Enabled",
      description: security.twoFactorEnabled 
        ? "Two-factor authentication has been disabled." 
        : "Two-factor authentication has been enabled."
    })
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account, company, and platform preferences</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Picture */}
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Picture
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={userProfile.avatar} />
                    <AvatarFallback className="text-xl">{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="lg:col-span-2 card-ai">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input 
                      id="company"
                      value={userProfile.company}
                      onChange={(e) => setUserProfile({...userProfile, company: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={userProfile.timezone} onValueChange={(value) => setUserProfile({...userProfile, timezone: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="Europe/London">GMT</SelectItem>
                        <SelectItem value="Europe/Paris">CET</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={userProfile.language} onValueChange={(value) => setUserProfile({...userProfile, language: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Italian">Italian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button onClick={handleSaveProfile} className="bg-gradient-primary">
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="company" className="space-y-6">
          <Card className="card-ai">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName"
                    value={companySettings.name}
                    onChange={(e) => setCompanySettings({...companySettings, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website"
                    value={companySettings.website}
                    onChange={(e) => setCompanySettings({...companySettings, website: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={companySettings.industry} onValueChange={(value) => setCompanySettings({...companySettings, industry: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Retail">Retail</SelectItem>
                      <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Company Size</Label>
                  <Select value={companySettings.size} onValueChange={(value) => setCompanySettings({...companySettings, size: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10 employees">1-10 employees</SelectItem>
                      <SelectItem value="11-50 employees">11-50 employees</SelectItem>
                      <SelectItem value="51-200 employees">51-200 employees</SelectItem>
                      <SelectItem value="201-500 employees">201-500 employees</SelectItem>
                      <SelectItem value="500+ employees">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address"
                  value={companySettings.address}
                  onChange={(e) => setCompanySettings({...companySettings, address: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="companyPhone">Phone Number</Label>
                <Input 
                  id="companyPhone"
                  value={companySettings.phone}
                  onChange={(e) => setCompanySettings({...companySettings, phone: e.target.value})}
                />
              </div>
              
              <Button onClick={handleSaveCompany} className="bg-gradient-primary">
                <Save className="w-4 h-4 mr-2" />
                Save Company Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={notifications.emailNotifications}
                    onCheckedChange={() => handleToggleNotification('emailNotifications')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Browser Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show notifications in your browser</p>
                  </div>
                  <Switch 
                    checked={notifications.browserNotifications}
                    onCheckedChange={() => handleToggleNotification('browserNotifications')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mobile Notifications</Label>
                    <p className="text-sm text-muted-foreground">Push notifications to mobile app</p>
                  </div>
                  <Switch 
                    checked={notifications.mobileNotifications}
                    onCheckedChange={() => handleToggleNotification('mobileNotifications')}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="card-ai">
              <CardHeader>
                <CardTitle>Notification Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Conversation Alerts</Label>
                    <p className="text-sm text-muted-foreground">New messages and handoff requests</p>
                  </div>
                  <Switch 
                    checked={notifications.conversationAlerts}
                    onCheckedChange={() => handleToggleNotification('conversationAlerts')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Bot Updates</Label>
                    <p className="text-sm text-muted-foreground">Bot deployment and configuration changes</p>
                  </div>
                  <Switch 
                    checked={notifications.botUpdates}
                    onCheckedChange={() => handleToggleNotification('botUpdates')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Maintenance</Label>
                    <p className="text-sm text-muted-foreground">Scheduled maintenance and downtime</p>
                  </div>
                  <Switch 
                    checked={notifications.systemMaintenance}
                    onCheckedChange={() => handleToggleNotification('systemMaintenance')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Weekly performance summaries</p>
                  </div>
                  <Switch 
                    checked={notifications.weeklyReports}
                    onCheckedChange={() => handleToggleNotification('weeklyReports')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Monthly Reports</Label>
                    <p className="text-sm text-muted-foreground">Detailed monthly analytics</p>
                  </div>
                  <Switch 
                    checked={notifications.monthlyReports}
                    onCheckedChange={() => handleToggleNotification('monthlyReports')}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Password & Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Extra security for your account</p>
                  </div>
                  <Switch 
                    checked={security.twoFactorEnabled}
                    onCheckedChange={handleToggle2FA}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input 
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                
                <Button onClick={handlePasswordChange} variant="outline" className="w-full">
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </CardContent>
            </Card>

            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Password last changed:</span>
                    <span className="text-sm font-medium">{security.passwordLastChanged}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Active sessions:</span>
                    <span className="text-sm font-medium">{security.activeSessions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Two-factor auth:</span>
                    <Badge variant={security.twoFactorEnabled ? "secondary" : "destructive"}>
                      {security.twoFactorEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h4 className="font-medium mb-2">Recent Login Activity</h4>
                  <div className="space-y-2">
                    {security.loginHistory.map((login, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 bg-muted/20 rounded">
                        <div>
                          <p className="font-medium">{login.location}</p>
                          <p className="text-muted-foreground">{login.device}</p>
                        </div>
                        <div className="text-right">
                          <p>{login.date}</p>
                          <Badge variant={login.status === 'success' ? 'secondary' : 'destructive'} className="text-xs">
                            {login.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="card-ai">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Current Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">Pro Plan</h3>
                    <p className="text-muted-foreground">$49/month</p>
                  </div>
                  <Badge variant="secondary" className="bg-gradient-primary text-white">Active</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Conversations used:</span>
                    <span>8,247 / 10,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Team members:</span>
                    <span>4 / 10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Storage used:</span>
                    <span>2.4 GB / 5 GB</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Change Plan
                  </Button>
                  <Button variant="glass" className="flex-1">
                    View Usage
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-ai">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg">
                  <div className="w-12 h-8 bg-gradient-primary rounded flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/26</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Next billing date:</span>
                    <span>February 15, 2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Amount:</span>
                    <span>$49.00</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Invoice
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}