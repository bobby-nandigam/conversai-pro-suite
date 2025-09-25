import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  Key,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Activity,
  FileText,
  Globe,
  Database,
  Settings,
  Download,
  Upload,
  Search,
  Filter,
  Bell,
  Zap,
  UserCheck,
  UserX,
  Calendar,
  MapPin,
  Smartphone,
  Monitor,
  Wifi
} from 'lucide-react';

// Mock data
const securityMetrics = {
  securityScore: 94,
  threatsBlocked: 1247,
  activeUsers: 156,
  lastScan: '2 hours ago',
  vulnerabilities: {
    critical: 0,
    high: 1,
    medium: 3,
    low: 8
  }
};

const auditLogs = [
  {
    id: 1,
    action: 'User Login',
    user: 'john.doe@company.com',
    timestamp: '2024-01-15 14:30:25',
    ip: '192.168.1.100',
    location: 'New York, US',
    device: 'Chrome on Windows',
    status: 'success',
    risk: 'low'
  },
  {
    id: 2,
    action: 'API Key Generated',
    user: 'admin@company.com',
    timestamp: '2024-01-15 13:45:12',
    ip: '10.0.0.15',
    location: 'San Francisco, US',
    device: 'API Client',
    status: 'success',
    risk: 'medium'
  },
  {
    id: 3,
    action: 'Failed Login Attempt',
    user: 'unknown@suspicious.com',
    timestamp: '2024-01-15 12:15:33',
    ip: '203.0.113.45',
    location: 'Unknown Location',
    device: 'Chrome on Linux',
    status: 'failed',
    risk: 'high'
  },
  {
    id: 4,
    action: 'Data Export',
    user: 'sarah.wilson@company.com',
    timestamp: '2024-01-15 11:20:18',
    ip: '192.168.1.105',
    location: 'London, UK',
    device: 'Firefox on macOS',
    status: 'success',
    risk: 'medium'
  },
  {
    id: 5,
    action: 'Permission Modified',
    user: 'admin@company.com',
    timestamp: '2024-01-15 10:30:45',
    ip: '10.0.0.15',
    location: 'San Francisco, US',
    device: 'Safari on macOS',
    status: 'success',
    risk: 'high'
  }
];

const accessControls = [
  {
    id: 1,
    name: 'Administrator',
    users: 3,
    permissions: ['Full Access', 'User Management', 'System Config'],
    lastModified: '2 days ago'
  },
  {
    id: 2,
    name: 'Bot Manager',
    users: 12,
    permissions: ['Bot Creation', 'Analytics View', 'Knowledge Base'],
    lastModified: '1 week ago'
  },
  {
    id: 3,
    name: 'Analyst',
    users: 24,
    permissions: ['Analytics View', 'Report Generation'],
    lastModified: '3 days ago'
  },
  {
    id: 4,
    name: 'Viewer',
    users: 67,
    permissions: ['Dashboard View', 'Basic Analytics'],
    lastModified: '5 days ago'
  }
];

const complianceStandards = [
  { name: 'GDPR', status: 'compliant', score: 98, lastAudit: '2024-01-10' },
  { name: 'SOC 2 Type II', status: 'compliant', score: 95, lastAudit: '2024-01-08' },
  { name: 'ISO 27001', status: 'in-progress', score: 87, lastAudit: '2024-01-05' },
  { name: 'PCI DSS', status: 'compliant', score: 92, lastAudit: '2024-01-12' },
  { name: 'HIPAA', status: 'not-applicable', score: 0, lastAudit: 'N/A' }
];

const Security: React.FC = () => {
  const { toast } = useToast();
  const [selectedLog, setSelectedLog] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRisk, setFilterRisk] = useState('all');
  
  // Security settings
  const [enableMFA, setEnableMFA] = useState(true);
  const [enableSSO, setEnableSSO] = useState(true);
  const [enableAuditLogs, setEnableAuditLogs] = useState(true);
  const [enableThreatDetection, setEnableThreatDetection] = useState(true);
  const [enableDataEncryption, setEnableDataEncryption] = useState(true);
  const [enableSessionTimeout, setEnableSessionTimeout] = useState(true);
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState(30);

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ip.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
    const matchesRisk = filterRisk === 'all' || log.risk === filterRisk;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getRiskBadge = (risk: string) => {
    const variants: { [key: string]: any } = {
      low: 'secondary',
      medium: 'default',
      high: 'destructive'
    };
    return <Badge variant={variants[risk] || 'secondary'}>{risk.toUpperCase()}</Badge>;
  };

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <ShieldCheck className="w-5 h-5 text-green-500" />;
      case 'in-progress': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'not-applicable': return <Eye className="w-5 h-5 text-gray-400" />;
      default: return <ShieldAlert className="w-5 h-5 text-red-500" />;
    }
  };

  const handleRunSecurityScan = () => {
    toast({
      title: "Security Scan Started",
      description: "Comprehensive security analysis is now running...",
    });
  };

  const handleExportLogs = () => {
    toast({
      title: "Audit Logs Exported",
      description: "Security logs have been exported successfully",
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Security & Compliance</h2>
          <p className="text-muted-foreground">
            Monitor security threats, manage access controls, and ensure compliance standards
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handleExportLogs}>
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
          <Button onClick={handleRunSecurityScan}>
            <Shield className="w-4 h-4 mr-2" />
            Run Security Scan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Security Overview</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="settings">Security Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{securityMetrics.securityScore}/100</div>
                <Progress value={securityMetrics.securityScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
                <ShieldAlert className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{securityMetrics.threatsBlocked}</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{securityMetrics.activeUsers}</div>
                <p className="text-xs text-muted-foreground">Currently online</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Scan</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{securityMetrics.lastScan}</div>
                <p className="text-xs text-muted-foreground">Auto-scan enabled</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Vulnerability Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      Critical
                    </span>
                    <Badge variant="destructive">{securityMetrics.vulnerabilities.critical}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                      High
                    </span>
                    <Badge variant="destructive">{securityMetrics.vulnerabilities.high}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      Medium
                    </span>
                    <Badge variant="default">{securityMetrics.vulnerabilities.medium}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      Low
                    </span>
                    <Badge variant="secondary">{securityMetrics.vulnerabilities.low}</Badge>
                  </div>
                </div>
                {securityMetrics.vulnerabilities.high > 0 && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                      <span className="font-medium text-red-800">Action Required</span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">
                      You have high-severity vulnerabilities that need immediate attention.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Security Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {auditLogs.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex items-center space-x-3 p-2 border rounded">
                    {getStatusIcon(log.status)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{log.action}</p>
                      <p className="text-sm text-muted-foreground truncate">{log.user}</p>
                    </div>
                    <div className="text-right">
                      {getRiskBadge(log.risk)}
                      <p className="text-xs text-muted-foreground mt-1">{log.timestamp.split(' ')[1]}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Security Audit Logs
              </CardTitle>
              <div className="flex space-x-2 mt-4">
                <div className="flex items-center space-x-2 flex-1">
                  <Search className="w-4 h-4" />
                  <Input
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-xs"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterRisk} onValueChange={setFilterRisk}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Risk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Risk</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredLogs.map((log) => (
                <div 
                  key={log.id} 
                  className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent"
                  onClick={() => setSelectedLog(selectedLog === log.id ? null : log.id)}
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(log.status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{log.action}</h3>
                        {getRiskBadge(log.risk)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {log.user}
                        </span>
                        <span className="flex items-center">
                          <Globe className="w-3 h-3 mr-1" />
                          {log.ip}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {log.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {log.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-muted-foreground">
                      {log.device.includes('Chrome') ? <Monitor className="w-4 h-4 mr-1" /> : 
                       log.device.includes('API') ? <Zap className="w-4 h-4 mr-1" /> : 
                       <Smartphone className="w-4 h-4 mr-1" />}
                      {log.device}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Role-Based Access Control
                </span>
                <Button>
                  <UserCheck className="w-4 h-4 mr-2" />
                  Add Role
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {accessControls.map((role) => (
                <div key={role.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold">{role.name}</h3>
                      <Badge variant="secondary">{role.users} users</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Last modified: {role.lastModified}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <UserX className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2" />
                Compliance Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {complianceStandards.map((standard, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {getComplianceIcon(standard.status)}
                    <div>
                      <h3 className="font-semibold">{standard.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Status: {standard.status.replace('-', ' ')}</span>
                        {standard.score > 0 && <span>Score: {standard.score}%</span>}
                        <span>Last audit: {standard.lastAudit}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {standard.score > 0 && (
                      <div className="w-24">
                        <Progress value={standard.score} className="h-2" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Authentication Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Multi-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require MFA for all users</p>
                  </div>
                  <Switch checked={enableMFA} onCheckedChange={setEnableMFA} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Single Sign-On (SSO)</Label>
                    <p className="text-sm text-muted-foreground">Enable SSO integration</p>
                  </div>
                  <Switch checked={enableSSO} onCheckedChange={setEnableSSO} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Auto-logout inactive users</p>
                  </div>
                  <Switch checked={enableSessionTimeout} onCheckedChange={setEnableSessionTimeout} />
                </div>

                {enableSessionTimeout && (
                  <div className="space-y-2">
                    <Label>Timeout Duration (minutes)</Label>
                    <Input
                      type="number"
                      value={sessionTimeoutMinutes}
                      onChange={(e) => setSessionTimeoutMinutes(Number(e.target.value))}
                      min="5"
                      max="480"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Security Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Log all security events</p>
                  </div>
                  <Switch checked={enableAuditLogs} onCheckedChange={setEnableAuditLogs} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Threat Detection</Label>
                    <p className="text-sm text-muted-foreground">Real-time threat monitoring</p>
                  </div>
                  <Switch checked={enableThreatDetection} onCheckedChange={setEnableThreatDetection} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Data Encryption</Label>
                    <p className="text-sm text-muted-foreground">Encrypt all data at rest</p>
                  </div>
                  <Switch checked={enableDataEncryption} onCheckedChange={setEnableDataEncryption} />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Security Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Failed login attempts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Suspicious activity</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data exports</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Security;