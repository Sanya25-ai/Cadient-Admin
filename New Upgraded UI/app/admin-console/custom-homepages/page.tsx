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
  Layout, 
  Users, 
  Eye, 
  Plus, 
  Copy, 
  Edit, 
  Trash2,
  Monitor,
  Smartphone,
  Tablet,
  Grid3X3,
  BarChart3,
  Calendar,
  MessageSquare,
  FileText,
  Clock,
  TrendingUp,
  Activity,
  Home,
  Palette,
  Move,
  Save,
  RefreshCw,
  Download,
  Upload
} from "lucide-react"

export const metadata = {
  title: 'Custom Homepages - Admin Console',
  description: 'Configure role-based custom homepages with widgets and layouts for different user types',
}

export default function CustomHomepagesPage() {
  // Mock data for demonstration
  const stats = {
    totalHomepages: 12,
    activeRoles: 8,
    totalWidgets: 24,
    usersAffected: 1247,
    lastUpdated: "2024-01-15T14:30:00Z"
  }

  const homepageConfigs = [
    {
      id: "1",
      name: "HR Manager Dashboard",
      role: "HR_MANAGER",
      description: "Comprehensive dashboard for HR managers with hiring metrics and candidate pipeline",
      users: 15,
      widgets: 8,
      layout: "3-column",
      status: "active",
      lastModified: "2024-01-15T10:30:00Z",
      isDefault: true
    },
    {
      id: "2",
      name: "Recruiter Workspace",
      role: "RECRUITER",
      description: "Focused interface for recruiters with candidate search and requisition management",
      users: 45,
      widgets: 6,
      layout: "2-column",
      status: "active",
      lastModified: "2024-01-14T16:45:00Z",
      isDefault: false
    },
    {
      id: "3",
      name: "Hiring Manager View",
      role: "HIRING_MANAGER",
      description: "Streamlined view for hiring managers to review candidates and approve requisitions",
      users: 78,
      widgets: 5,
      layout: "single-column",
      status: "active",
      lastModified: "2024-01-13T09:15:00Z",
      isDefault: false
    },
    {
      id: "4",
      name: "Admin Console",
      role: "ADMIN",
      description: "Administrative dashboard with system metrics and configuration tools",
      users: 5,
      widgets: 12,
      layout: "4-column",
      status: "active",
      lastModified: "2024-01-12T11:20:00Z",
      isDefault: true
    }
  ]

  const availableWidgets = [
    {
      id: "1",
      name: "Candidate Pipeline",
      category: "Analytics",
      description: "Visual representation of candidates in hiring pipeline",
      icon: TrendingUp,
      size: "large",
      configurable: true
    },
    {
      id: "2",
      name: "Recent Applications",
      category: "Data",
      description: "List of most recent job applications",
      icon: FileText,
      size: "medium",
      configurable: true
    },
    {
      id: "3",
      name: "Quick Actions",
      category: "Navigation",
      description: "Shortcuts to frequently used functions",
      icon: Grid3X3,
      size: "small",
      configurable: false
    },
    {
      id: "4",
      name: "Hiring Metrics",
      category: "Analytics",
      description: "Key performance indicators for hiring process",
      icon: BarChart3,
      size: "large",
      configurable: true
    },
    {
      id: "5",
      name: "Calendar Events",
      category: "Scheduling",
      description: "Upcoming interviews and meetings",
      icon: Calendar,
      size: "medium",
      configurable: true
    },
    {
      id: "6",
      name: "Messages",
      category: "Communication",
      description: "Recent messages and notifications",
      icon: MessageSquare,
      size: "medium",
      configurable: false
    }
  ]

  const layoutTemplates = [
    {
      id: "single",
      name: "Single Column",
      description: "Full-width layout for focused content",
      columns: 1,
      preview: "▓▓▓▓▓▓▓▓▓▓"
    },
    {
      id: "two-column",
      name: "Two Column",
      description: "Balanced layout with main and sidebar",
      columns: 2,
      preview: "▓▓▓▓▓▓ ▓▓▓"
    },
    {
      id: "three-column",
      name: "Three Column",
      description: "Traditional dashboard layout",
      columns: 3,
      preview: "▓▓▓ ▓▓▓ ▓▓▓"
    },
    {
      id: "four-column",
      name: "Four Column",
      description: "Dense layout for power users",
      columns: 4,
      preview: "▓▓ ▓▓ ▓▓ ▓▓"
    }
  ]

  const userRoles = [
    { id: "HR_MANAGER", name: "HR Manager", users: 15 },
    { id: "RECRUITER", name: "Recruiter", users: 45 },
    { id: "HIRING_MANAGER", name: "Hiring Manager", users: 78 },
    { id: "ADMIN", name: "Administrator", users: 5 },
    { id: "COORDINATOR", name: "Coordinator", users: 23 },
    { id: "VIEWER", name: "Viewer", users: 156 }
  ]

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 bg-white">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#EE5A37]">Custom Homepages</h1>
          <p className="text-sm text-muted-foreground">
            Configure role-based homepage layouts and widgets for different user types
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Config
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Homepage
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Homepages</CardTitle>
            <Layout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHomepages}</div>
            <p className="text-xs text-muted-foreground">
              Configured layouts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Roles</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRoles}</div>
            <p className="text-xs text-muted-foreground">
              With custom layouts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Widgets</CardTitle>
            <Grid3X3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWidgets}</div>
            <p className="text-xs text-muted-foreground">
              Widget components
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users Affected</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.usersAffected}</div>
            <p className="text-xs text-muted-foreground">
              Using custom layouts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">
              {new Date(stats.lastUpdated).toLocaleDateString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Configuration change
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="homepages" className="space-y-4">
        <TabsList>
          <TabsTrigger value="homepages">Homepage Configs</TabsTrigger>
          <TabsTrigger value="widgets">Widget Library</TabsTrigger>
          <TabsTrigger value="layouts">Layout Templates</TabsTrigger>
          <TabsTrigger value="roles">Role Mapping</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="homepages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Configurations</CardTitle>
              <CardDescription>
                Manage custom homepage layouts for different user roles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Homepage
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Config
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="active">Active Only</SelectItem>
                      <SelectItem value="default">Default Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Search homepages..." className="w-64" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {homepageConfigs.map((config) => (
                  <Card key={config.id} className={`border-l-4 ${config.isDefault ? 'border-l-green-500' : 'border-l-blue-500'}`}>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{config.name}</h4>
                              {config.isDefault && (
                                <Badge variant="default" className="text-xs">Default</Badge>
                              )}
                              <Badge variant="secondary" className="text-xs">{config.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Role:</span>
                            <span className="ml-2 font-medium">{config.role}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Users:</span>
                            <span className="ml-2 font-medium">{config.users}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Layout:</span>
                            <span className="ml-2 font-medium">{config.layout}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Widgets:</span>
                            <span className="ml-2 font-medium">{config.widgets}</span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          Last modified: {new Date(config.lastModified).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="widgets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Widget Library</CardTitle>
              <CardDescription>
                Available widgets that can be added to custom homepages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Widget
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Widget Settings
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="data">Data</SelectItem>
                      <SelectItem value="navigation">Navigation</SelectItem>
                      <SelectItem value="communication">Communication</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Search widgets..." className="w-64" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableWidgets.map((widget) => (
                  <Card key={widget.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-lg">
                              <widget.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{widget.name}</h4>
                              <Badge variant="outline" className="text-xs">{widget.category}</Badge>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">{widget.size}</Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{widget.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Switch checked={widget.configurable} disabled />
                            <span className="text-xs text-muted-foreground">Configurable</span>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
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

        <TabsContent value="layouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Layout Templates</CardTitle>
              <CardDescription>
                Pre-defined layout templates for organizing widgets on homepages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {layoutTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{template.name}</h4>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                          </div>
                          <Badge variant="outline">{template.columns} columns</Badge>
                        </div>
                        
                        <div className="bg-muted p-4 rounded-lg">
                          <div className="text-center font-mono text-lg text-muted-foreground">
                            {template.preview}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </Button>
                          <Button size="sm" className="flex-1">
                            <Plus className="mr-2 h-4 w-4" />
                            Use Template
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

        <TabsContent value="roles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Mapping</CardTitle>
              <CardDescription>
                Map user roles to specific homepage configurations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {userRoles.map((role) => (
                  <Card key={role.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{role.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {role.users} users
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Select defaultValue="default">
                            <SelectTrigger className="w-64">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="default">Default Homepage</SelectItem>
                              <SelectItem value="hr-manager">HR Manager Dashboard</SelectItem>
                              <SelectItem value="recruiter">Recruiter Workspace</SelectItem>
                              <SelectItem value="hiring-manager">Hiring Manager View</SelectItem>
                              <SelectItem value="admin">Admin Console</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
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

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Preview</CardTitle>
              <CardDescription>
                Preview how homepages will appear to users on different devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Select defaultValue="hr-manager">
                    <SelectTrigger className="w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hr-manager">HR Manager Dashboard</SelectItem>
                      <SelectItem value="recruiter">Recruiter Workspace</SelectItem>
                      <SelectItem value="hiring-manager">Hiring Manager View</SelectItem>
                      <SelectItem value="admin">Admin Console</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Monitor className="mr-2 h-4 w-4" />
                    Desktop
                  </Button>
                  <Button variant="outline" size="sm">
                    <Tablet className="mr-2 h-4 w-4" />
                    Tablet
                  </Button>
                  <Button variant="outline" size="sm">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Mobile
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-6 bg-muted/20 min-h-96">
                <div className="text-center text-muted-foreground">
                  <Monitor className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Homepage Preview</h3>
                  <p className="text-sm">
                    Select a homepage configuration above to see how it will appear to users
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Global Settings</CardTitle>
                <CardDescription>Configure global homepage behavior and defaults</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="enable-custom" defaultChecked />
                  <Label htmlFor="enable-custom">Enable Custom Homepages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="allow-user-override" />
                  <Label htmlFor="allow-user-override">Allow User Override</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="responsive-layout" defaultChecked />
                  <Label htmlFor="responsive-layout">Responsive Layout</Label>
                </div>
                <div className="space-y-2">
                  <Label>Default Theme</Label>
                  <Select defaultValue="light">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Cache Duration (minutes)</Label>
                  <Input type="number" defaultValue="30" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Widget Settings</CardTitle>
                <CardDescription>Configure widget behavior and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="widget-drag-drop" defaultChecked />
                  <Label htmlFor="widget-drag-drop">Enable Drag & Drop</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="widget-resize" defaultChecked />
                  <Label htmlFor="widget-resize">Allow Widget Resize</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="widget-refresh" defaultChecked />
                  <Label htmlFor="widget-refresh">Auto Refresh Widgets</Label>
                </div>
                <div className="space-y-2">
                  <Label>Refresh Interval (seconds)</Label>
                  <Input type="number" defaultValue="300" />
                </div>
                <div className="space-y-2">
                  <Label>Maximum Widgets per Page</Label>
                  <Input type="number" defaultValue="20" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
