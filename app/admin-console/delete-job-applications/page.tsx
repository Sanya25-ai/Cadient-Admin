import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Settings, 
  Trash2, 
  AlertTriangle, 
  Shield, 
  Clock, 
  FileX, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Calendar,
  Users,
  Database,
  Activity,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  Archive,
  RefreshCw
} from "lucide-react"

export const metadata = {
  title: 'Delete Job Applications - Admin Console',
  description: 'Configure and manage job application deletion with safety controls and audit logging',
}

export default function DeleteJobApplicationsPage() {
  // Mock data for demonstration
  const stats = {
    totalApplications: 45672,
    pendingDeletion: 234,
    deletedToday: 89,
    retentionDays: 2555,
    complianceScore: 98.7,
    lastCleanup: "2024-01-15T10:30:00Z"
  }

  const deletionRules = [
    {
      id: "1",
      name: "Incomplete Applications",
      description: "Applications not completed within 30 days",
      criteria: "status = 'incomplete' AND created_date < NOW() - INTERVAL 30 DAY",
      enabled: true,
      lastRun: "2024-01-15T02:00:00Z",
      deletedCount: 156,
      schedule: "Daily at 2:00 AM"
    },
    {
      id: "2", 
      name: "Rejected Applications",
      description: "Applications rejected more than 1 year ago",
      criteria: "status = 'rejected' AND updated_date < NOW() - INTERVAL 1 YEAR",
      enabled: true,
      lastRun: "2024-01-14T03:00:00Z",
      deletedCount: 2341,
      schedule: "Weekly on Sunday"
    },
    {
      id: "3",
      name: "Duplicate Applications",
      description: "Duplicate applications from same candidate",
      criteria: "duplicate_flag = true AND created_date < primary_application_date",
      enabled: false,
      lastRun: "2024-01-10T01:00:00Z",
      deletedCount: 45,
      schedule: "Monthly on 1st"
    }
  ]

  const pendingDeletions = [
    {
      id: "1",
      applicantName: "John Smith",
      applicationId: "APP-2023-001234",
      position: "Software Engineer",
      reason: "Incomplete - 45 days old",
      scheduledDate: "2024-01-16T02:00:00Z",
      status: "pending"
    },
    {
      id: "2",
      applicantName: "Sarah Johnson", 
      applicationId: "APP-2023-001235",
      position: "Marketing Manager",
      reason: "Rejected - 13 months old",
      scheduledDate: "2024-01-16T03:00:00Z",
      status: "pending"
    },
    {
      id: "3",
      applicantName: "Mike Wilson",
      applicationId: "APP-2023-001236", 
      position: "Data Analyst",
      reason: "Duplicate application",
      scheduledDate: "2024-01-16T01:00:00Z",
      status: "approved"
    }
  ]

  const auditLog = [
    {
      id: "1",
      timestamp: "2024-01-15T10:30:00Z",
      action: "Bulk Delete",
      user: "admin@company.com",
      count: 89,
      reason: "Automated cleanup - incomplete applications",
      status: "completed"
    },
    {
      id: "2",
      timestamp: "2024-01-15T09:15:00Z", 
      action: "Manual Delete",
      user: "hr.manager@company.com",
      count: 1,
      reason: "Candidate request - GDPR compliance",
      status: "completed"
    },
    {
      id: "3",
      timestamp: "2024-01-15T08:45:00Z",
      action: "Rule Update",
      user: "admin@company.com", 
      count: 0,
      reason: "Updated retention period for rejected applications",
      status: "completed"
    }
  ]

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 bg-white">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#EE5A37]">Delete Job Applications</h1>
          <p className="text-sm text-muted-foreground">
            Configure automated deletion rules and manage application cleanup with safety controls
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Run Cleanup
          </Button>
        </div>
      </div>

      {/* Safety Alert */}
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important Safety Notice</AlertTitle>
        <AlertDescription>
          Application deletion is permanent and cannot be undone. All deletion activities are logged for compliance and audit purposes.
          Ensure proper backup procedures are in place before configuring automated deletion rules.
        </AlertDescription>
      </Alert>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Active in system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Deletion</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingDeletion}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled for removal
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deleted Today</CardTitle>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.deletedToday}</div>
            <p className="text-xs text-muted-foreground">
              Automated cleanup
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.complianceScore}%</div>
            <p className="text-xs text-muted-foreground">
              Data retention compliance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rules">Deletion Rules</TabsTrigger>
          <TabsTrigger value="pending">Pending Deletions</TabsTrigger>
          <TabsTrigger value="manual">Manual Delete</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Deletion Rules</CardTitle>
              <CardDescription>
                Configure rules for automatic application cleanup based on criteria and schedules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Add Rule
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Rules
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Search rules..." className="w-64" />
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {deletionRules.map((rule) => (
                  <Card key={rule.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{rule.name}</h4>
                            <Badge variant={rule.enabled ? "default" : "secondary"}>
                              {rule.enabled ? "Active" : "Disabled"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{rule.description}</p>
                          <div className="text-xs font-mono bg-muted p-2 rounded">
                            {rule.criteria}
                          </div>
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span>Schedule: {rule.schedule}</span>
                            <span>Last Run: {new Date(rule.lastRun).toLocaleDateString()}</span>
                            <span>Deleted: {rule.deletedCount} applications</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Switch checked={rule.enabled} />
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Deletions</CardTitle>
              <CardDescription>
                Review and approve applications scheduled for deletion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button size="sm" variant="destructive">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve All
                  </Button>
                  <Button variant="outline" size="sm">
                    <XCircle className="mr-2 h-4 w-4" />
                    Cancel All
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Search applications..." className="w-64" />
                </div>
              </div>

              <div className="space-y-2">
                {pendingDeletions.map((deletion) => (
                  <Card key={deletion.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Checkbox />
                          <div>
                            <div className="font-medium">{deletion.applicantName}</div>
                            <div className="text-sm text-muted-foreground">
                              {deletion.applicationId} • {deletion.position}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm">{deletion.reason}</div>
                            <div className="text-xs text-muted-foreground">
                              Scheduled: {new Date(deletion.scheduledDate).toLocaleDateString()}
                            </div>
                          </div>
                          <Badge variant={deletion.status === "approved" ? "default" : "secondary"}>
                            {deletion.status}
                          </Badge>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <XCircle className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual Application Deletion</CardTitle>
              <CardDescription>
                Manually delete specific applications with proper authorization and documentation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Authorization Required</AlertTitle>
                <AlertDescription>
                  Manual deletions require supervisor approval and must include a valid business reason.
                </AlertDescription>
              </Alert>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="applicationId">Application ID</Label>
                    <Input id="applicationId" placeholder="APP-2024-XXXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reason">Deletion Reason</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gdpr">GDPR/Privacy Request</SelectItem>
                        <SelectItem value="duplicate">Duplicate Application</SelectItem>
                        <SelectItem value="test">Test Data</SelectItem>
                        <SelectItem value="error">Data Entry Error</SelectItem>
                        <SelectItem value="legal">Legal Requirement</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Provide detailed justification..." />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="supervisor">Supervisor Approval</Label>
                    <Input id="supervisor" placeholder="supervisor@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requestor">Requested By</Label>
                    <Input id="requestor" placeholder="Current user" disabled />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="confirm" />
                    <Label htmlFor="confirm" className="text-sm">
                      I confirm this deletion is authorized and necessary
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Submit Deletion Request
                </Button>
                <Button variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Preview Application
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Retention Policies</CardTitle>
                <CardDescription>Configure data retention periods and compliance settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Retention Period</Label>
                  <Select defaultValue="7years">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1year">1 Year</SelectItem>
                      <SelectItem value="3years">3 Years</SelectItem>
                      <SelectItem value="5years">5 Years</SelectItem>
                      <SelectItem value="7years">7 Years</SelectItem>
                      <SelectItem value="indefinite">Indefinite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Incomplete Application Retention</Label>
                  <Select defaultValue="30days">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">7 Days</SelectItem>
                      <SelectItem value="30days">30 Days</SelectItem>
                      <SelectItem value="90days">90 Days</SelectItem>
                      <SelectItem value="1year">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="gdpr" defaultChecked />
                  <Label htmlFor="gdpr">GDPR Compliance Mode</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="backup" defaultChecked />
                  <Label htmlFor="backup">Require Backup Before Deletion</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Safety Controls</CardTitle>
                <CardDescription>Configure safety measures and approval workflows</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="approval" defaultChecked />
                  <Label htmlFor="approval">Require Supervisor Approval</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="delay" defaultChecked />
                  <Label htmlFor="delay">24-Hour Deletion Delay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notification" defaultChecked />
                  <Label htmlFor="notification">Email Notifications</Label>
                </div>
                <div className="space-y-2">
                  <Label>Maximum Daily Deletions</Label>
                  <Input type="number" defaultValue="1000" />
                </div>
                <div className="space-y-2">
                  <Label>Notification Recipients</Label>
                  <Textarea placeholder="admin@company.com, hr@company.com" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deletion Audit Log</CardTitle>
              <CardDescription>
                Complete audit trail of all deletion activities for compliance and review
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Log
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Input type="date" className="w-40" />
                  <span className="self-center text-sm">to</span>
                  <Input type="date" className="w-40" />
                </div>
              </div>

              <div className="space-y-2">
                {auditLog.map((entry) => (
                  <Card key={entry.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{entry.action}</div>
                            <div className="text-sm text-muted-foreground">
                              {entry.user} • {entry.count} applications
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">{entry.reason}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleString()}
                          </div>
                        </div>
                        <Badge variant={entry.status === "completed" ? "default" : "secondary"}>
                          {entry.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Deletion Statistics</CardTitle>
                <CardDescription>Overview of deletion activity and trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">This Month</span>
                    <span className="font-medium">2,456 deleted</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Automated</span>
                    <span className="font-medium">89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Manual</span>
                    <span className="font-medium">11%</span>
                  </div>
                  <Progress value={11} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Reports</CardTitle>
                <CardDescription>Generate compliance and audit reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Monthly Deletion Report
                </Button>
                <Button className="w-full" variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  GDPR Compliance Report
                </Button>
                <Button className="w-full" variant="outline">
                  <Archive className="mr-2 h-4 w-4" />
                  Data Retention Report
                </Button>
                <Button className="w-full" variant="outline">
                  <Activity className="mr-2 h-4 w-4" />
                  Audit Trail Export
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
