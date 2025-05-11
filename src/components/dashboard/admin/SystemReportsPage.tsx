import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { BarChart2, Calendar, Download, FileText, Filter, Printer, Save } from "lucide-react";
import { BarChart } from "@/components/charts/BarChart";
import { LineChart } from "@/components/charts/LineChart";
import { PieChart } from "@/components/charts/PieChart";
import { StackedBarChart } from "@/components/charts/StackedBarChart";

const SystemReportsPage: React.FC = () => {
  // Sample data for charts
  const uptimeData = [
    { day: '1', uptime: 100 },
    { day: '2', uptime: 100 },
    { day: '3', uptime: 99.8 },
    { day: '4', uptime: 100 },
    { day: '5', uptime: 100 },
    { day: '6', uptime: 99.9 },
    { day: '7', uptime: 100 },
  ];

  const usersData = [
    { month: 'Jan', users: 82 },
    { month: 'Feb', users: 90 },
    { month: 'Mar', users: 98 },
    { month: 'Apr', users: 105 },
    { month: 'May', users: 110 },
    { month: 'Jun', users: 115 },
    { month: 'Jul', users: 118 },
    { month: 'Aug', users: 120 },
    { month: 'Sep', users: 128 },
  ];

  const storageData = [
    { month: 'Jan', storage: 0.5 },
    { month: 'Feb', storage: 0.6 },
    { month: 'Mar', storage: 0.7 },
    { month: 'Apr', storage: 0.8 },
    { month: 'May', storage: 0.9 },
    { month: 'Jun', storage: 1.0 },
    { month: 'Jul', storage: 1.1 },
    { month: 'Aug', storage: 1.2 },
    { month: 'Sep', storage: 1.2 },
  ];

  const performanceData = [
    { time: '8am', response: 110, cpu: 30, memory: 45 },
    { time: '9am', response: 120, cpu: 35, memory: 48 },
    { time: '10am', response: 145, cpu: 42, memory: 55 },
    { time: '11am', response: 160, cpu: 48, memory: 60 },
    { time: '12pm', response: 170, cpu: 52, memory: 65 },
    { time: '1pm', response: 180, cpu: 60, memory: 70 },
    { time: '2pm', response: 175, cpu: 58, memory: 68 },
    { time: '3pm', response: 165, cpu: 55, memory: 64 },
    { time: '4pm', response: 150, cpu: 45, memory: 58 },
    { time: '5pm', response: 130, cpu: 38, memory: 50 },
  ];

  const apiUsageData = [
    { endpoint: '/users', requests: 2500, time: 120 },
    { endpoint: '/grants', requests: 1800, time: 150 },
    { endpoint: '/reports', requests: 1200, time: 130 },
    { endpoint: '/auth', requests: 3200, time: 90 },
  ];

  const grantsByStatusData = [
    { name: 'Active', value: 128 },
    { name: 'Pending', value: 42 },
    { name: 'Completed', value: 95 },
    { name: 'Rejected', value: 78 },
  ];

  const grantsByDepartmentData = [
    { department: 'Sciences', grants: 35 },
    { department: 'Engineering', grants: 30 },
    { department: 'Humanities', grants: 20 },
    { department: 'Medicine', grants: 25 },
    { department: 'Business', grants: 18 },
    { department: 'Education', grants: 15 },
  ];

  const usersByRoleData = [
    { name: 'Researchers', value: 120 },
    { name: 'Grant Officers', value: 48 },
    { name: 'Admins', value: 15 },
    { name: 'Reviewers', value: 65 },
  ];

  const usersByDepartmentData = [
    { department: 'Sciences', users: 45 },
    { department: 'Engineering', users: 38 },
    { department: 'Humanities', users: 25 },
    { department: 'Medicine', users: 32 },
    { department: 'Business', users: 22 },
    { department: 'Education', users: 18 },
  ];
  
  const activeUsersData = [
    { day: 'Mon', users: 42 },
    { day: 'Tue', users: 38 },
    { day: 'Wed', users: 45 },
    { day: 'Thu', users: 40 },
    { day: 'Fri', users: 52 },
    { day: 'Sat', users: 25 },
    { day: 'Sun', users: 30 },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart2 className="h-6 w-6 mr-2 text-[#cf2e2e]" />
          <h1 className="text-2xl font-bold">System Reports</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden md:inline-flex">Schedule</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden md:inline-flex">Export</span>
          </Button>
          <Button variant="red" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            <span className="hidden md:inline-flex">Print</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="grants">Grant Metrics</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  System Uptime
                </CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">99.9%</div>
                <p className="text-xs text-muted-foreground">
                  Last 30 days
                </p>
                <div className="mt-4 h-[80px] w-full">
                  <LineChart data={uptimeData} xAxisKey="day" lineKey="uptime" lineColor="#22c55e" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Users
                </CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
                <div className="mt-4 h-[80px] w-full">
                  <BarChart data={usersData.slice(-5)} xAxisKey="month" barKey="users" barColor="#3b82f6" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Database Size
                </CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2 GB</div>
                <p className="text-xs text-muted-foreground">
                  +0.3 GB from last month
                </p>
                <div className="mt-4 h-[80px] w-full">
                  <LineChart data={storageData} xAxisKey="month" lineKey="storage" lineColor="#8b5cf6" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>System Performance</CardTitle>
                    <CardDescription>
                      Overview of key system performance metrics
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] mb-4">
                  <LineChart 
                    data={performanceData} 
                    xAxisKey="time" 
                    lineKey="response" 
                    lineColor="#cf2e2e" 
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="border rounded-md p-2">
                    <p className="text-muted-foreground text-xs">Avg. Response</p>
                    <p className="font-medium">120ms</p>
                  </div>
                  <div className="border rounded-md p-2">
                    <p className="text-muted-foreground text-xs">CPU Usage</p>
                    <p className="font-medium">42%</p>
                  </div>
                  <div className="border rounded-md p-2">
                    <p className="text-muted-foreground text-xs">Memory</p>
                    <p className="font-medium">2.8 GB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>API Usage</CardTitle>
                    <CardDescription>
                      System API usage statistics
                    </CardDescription>
                  </div>
                  <div className="flex items-center text-sm">
                    <Button variant="ghost" size="sm">Daily</Button>
                    <Button variant="ghost" size="sm">Weekly</Button>
                    <Button variant="outline" size="sm">Monthly</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] mb-4">
                  <BarChart 
                    data={apiUsageData} 
                    xAxisKey="endpoint" 
                    barKey="requests" 
                    barColor="#3b82f6" 
                  />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Endpoint</TableHead>
                      <TableHead className="text-center">Requests</TableHead>
                      <TableHead className="text-center">Avg. Time</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4].map((i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">
                          /api/{['users', 'grants', 'reports', 'auth'][i-1]}/{['list', 'create', 'update', 'login'][i-1]}
                        </TableCell>
                        <TableCell className="text-center">
                          {(Math.floor(Math.random() * 900) + 100)}
                        </TableCell>
                        <TableCell className="text-center">
                          {(Math.floor(Math.random() * 900) + 100)}ms
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                            Healthy
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="grants">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Grant Analytics</CardTitle>
                  <CardDescription>
                    Comprehensive metrics about grants in the system
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="h-[300px]">
                  <PieChart 
                    data={grantsByStatusData} 
                    colors={["#22c55e", "#f59e0b", "#3b82f6", "#ef4444"]} 
                    innerRadius={50} 
                    outerRadius={120} 
                  />
                </div>
                <div className="h-[300px]">
                  <BarChart 
                    data={grantsByDepartmentData} 
                    xAxisKey="department" 
                    barKey="grants" 
                    barColor="#cf2e2e" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Total Grants</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">547</div>
                    <p className="text-xs text-muted-foreground">All time</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Active Grants</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">128</div>
                    <p className="text-xs text-muted-foreground">Currently ongoing</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Total Value</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">$12.4M</div>
                    <p className="text-xs text-muted-foreground">All time funding</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Avg. Duration</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">18 mo</div>
                    <p className="text-xs text-muted-foreground">Per grant project</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-6 bg-muted/50 p-3 text-sm font-medium">
                  <div className="col-span-2">Grant Type</div>
                  <div className="col-span-1">Count</div>
                  <div className="col-span-1">Success Rate</div>
                  <div className="col-span-1">Avg. Funding</div>
                  <div className="col-span-1">Trend</div>
                </div>
                {['Research', 'Innovation', 'Infrastructure', 'Development', 'Educational'].map((type, i) => (
                  <div 
                    key={i}
                    className="grid grid-cols-6 p-3 text-sm border-t hover:bg-muted/50 transition-colors"
                  >
                    <div className="col-span-2 font-medium">
                      {type} Grants
                    </div>
                    <div className="col-span-1">
                      {84 + (i * 12)}
                    </div>
                    <div className="col-span-1">
                      {42 + (i * 5)}%
                    </div>
                    <div className="col-span-1">
                      ${(150 + (i * 45)).toLocaleString()}K
                    </div>
                    <div className="col-span-1">
                      <div className="h-[20px] w-[80px] bg-[#cf2e2e]/5 rounded-md">
                        {/* Placeholder for mini trend line */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>User Analytics</CardTitle>
                  <CardDescription>
                    User activity and demographics
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date Range
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Users by Role</h3>
                  <div className="h-[200px]">
                    <PieChart 
                      data={usersByRoleData} 
                      colors={["#cf2e2e", "#3b82f6", "#22c55e", "#f59e0b"]} 
                      innerRadius={40} 
                      outerRadius={80} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Users by Department</h3>
                  <div className="h-[200px]">
                    <BarChart 
                      data={usersByDepartmentData} 
                      xAxisKey="department" 
                      barKey="users" 
                      barColor="#3b82f6" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Active Users Over Time</h3>
                  <div className="h-[200px]">
                    <LineChart 
                      data={usersData} 
                      xAxisKey="month" 
                      lineKey="users" 
                      lineColor="#22c55e" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">248</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">New Users</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">18</div>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Avg. Session</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">24 min</div>
                    <p className="text-xs text-muted-foreground">-2 min from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Active Rate</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">76%</div>
                    <p className="text-xs text-muted-foreground">Weekly activity</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-4">Login Activity (Last 7 Days)</h3>
                <div className="h-[200px] mb-2">
                  <BarChart 
                    data={activeUsersData} 
                    xAxisKey="day" 
                    barKey="users" 
                    barColor="#cf2e2e" 
                  />
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-xs">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={i} className="font-medium">{day}</div>
                  ))}
                  {[42, 38, 45, 40, 52, 25, 30].map((value, i) => (
                    <div key={i} className="text-muted-foreground">{value} logins</div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Audit Logs</CardTitle>
                  <CardDescription>
                    System audit trail for compliance and monitoring
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="red" size="sm" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="hidden md:inline-flex">Export Logs</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-muted-foreground">
                        {new Date(Date.now() - (i * 3600000)).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {['admin', 'john.doe', 'jane.smith', 'system'][Math.floor(Math.random() * 4)]}
                      </TableCell>
                      <TableCell className="font-mono">
                        192.168.{Math.floor(Math.random() * 255)}.{Math.floor(Math.random() * 255)}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          ['LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'EXPORT', 'IMPORT', 'ERROR'][i % 8] === 'ERROR' 
                            ? "bg-red-100 text-red-800" 
                            : ['LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'EXPORT', 'IMPORT', 'ERROR'][i % 8] === 'CREATE' || ['LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'EXPORT', 'IMPORT', 'ERROR'][i % 8] === 'UPDATE'
                            ? "bg-green-100 text-green-800"
                            : ['LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'EXPORT', 'IMPORT', 'ERROR'][i % 8] === 'DELETE'
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}>
                          {['LOGIN', 'LOGOUT', 'CREATE', 'UPDATE', 'DELETE', 'EXPORT', 'IMPORT', 'ERROR'][i % 8]}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {[
                          'User logged in successfully',
                          'User logged out',
                          'Created new grant record',
                          'Updated user profile',
                          'Deleted draft report',
                          'Exported financial report',
                          'Imported researcher data',
                          'Failed login attempt'
                        ][i % 8]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>1,248</strong> log entries
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemReportsPage;
