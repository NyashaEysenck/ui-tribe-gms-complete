import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart2, Download, FileText, Filter, Plus, PieChart } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { BarChart } from "@/components/charts/BarChart";
import { PieChart as PieChartComponent } from "@/components/charts/PieChart";
import { LineChart } from "@/components/charts/LineChart";
import { StackedBarChart } from "@/components/charts/StackedBarChart";

const ReportingPage: React.FC = () => {
  // Sample data for charts
  const activeGrantsData = [
    { month: 'Jan', grants: 42 },
    { month: 'Feb', grants: 38 },
    { month: 'Mar', grants: 45 },
    { month: 'Apr', grants: 40 },
    { month: 'May', grants: 35 },
    { month: 'Jun', grants: 48 },
    { month: 'Jul', grants: 52 },
    { month: 'Aug', grants: 49 },
    { month: 'Sep', grants: 54 },
    { month: 'Oct', grants: 52 },
    { month: 'Nov', grants: 48 },
    { month: 'Dec', grants: 50 },
  ];

  const fundingData = [
    { month: 'Jan', amount: 150000 },
    { month: 'Feb', amount: 180000 },
    { month: 'Mar', amount: 220000 },
    { month: 'Apr', amount: 240000 },
    { month: 'May', amount: 200000 },
    { month: 'Jun', amount: 180000 },
    { month: 'Jul', amount: 260000 },
    { month: 'Aug', amount: 280000 },
    { month: 'Sep', amount: 300000 },
    { month: 'Oct', amount: 240000 },
    { month: 'Nov', amount: 220000 },
    { month: 'Dec', amount: 250000 },
  ];

  const successRateData = [
    { name: 'Approved', value: 42 },
    { name: 'Rejected', value: 58 }
  ];

  const departmentFundingData = [
    { department: 'Sciences', funding: 520000 },
    { department: 'Engineering', funding: 420000 },
    { department: 'Humanities', funding: 280000 },
    { department: 'Other', funding: 180000 },
  ];

  const monthlyExpenditure = [
    { month: 'Jan', expenditure: 32000 },
    { month: 'Feb', expenditure: 48000 },
    { month: 'Mar', expenditure: 51000 },
    { month: 'Apr', expenditure: 62000 },
    { month: 'May', expenditure: 55000 },
    { month: 'Jun', expenditure: 72000 },
    { month: 'Jul', expenditure: 80000 },
    { month: 'Aug', expenditure: 96200 },
    { month: 'Sep', expenditure: 84000 },
    { month: 'Oct', expenditure: 68000 },
    { month: 'Nov', expenditure: 72000 },
    { month: 'Dec', expenditure: 70000 },
  ];

  const grantsByStatusData = [
    { name: 'Active', value: 128 },
    { name: 'Completed', value: 95 },
    { name: 'Pending', value: 42 },
    { name: 'Rejected', value: 78 },
  ];

  const grantsByDepartmentData = [
    { department: 'Sciences', active: 45, completed: 32, pending: 12 },
    { department: 'Engineering', active: 38, completed: 28, pending: 10 },
    { department: 'Humanities', active: 25, completed: 18, pending: 8 },
    { department: 'Medicine', active: 20, completed: 17, pending: 12 },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BarChart2 className="h-6 w-6 mr-2 text-[#cf2e2e]" />
          <h1 className="text-2xl font-bold">Grant Reporting</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden md:inline">Export</span>
          </Button>
          <Button variant="red" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden md:inline">Generate Report</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="researchers">Researchers</TabsTrigger>
          <TabsTrigger value="grants">Grants</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Grants
                </CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">54</div>
                <p className="text-xs text-muted-foreground">
                  +12% from previous quarter
                </p>
                <div className="mt-4 h-[80px] w-full">
                  <BarChart data={activeGrantsData.slice(-6)} xAxisKey="month" barKey="grants" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Funding
                </CardTitle>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2.4M</div>
                <p className="text-xs text-muted-foreground">
                  $720K awarded this quarter
                </p>
                <div className="mt-4 h-[80px] w-full">
                  <LineChart data={fundingData.slice(-6)} xAxisKey="month" lineKey="amount" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Grant Success Rate
                </CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42%</div>
                <p className="text-xs text-muted-foreground">
                  +5% from previous quarter
                </p>
                <div className="mt-4 h-[80px] w-full">
                  <PieChartComponent 
                    data={successRateData} 
                    colors={["#cf2e2e", "#8E9196"]} 
                    innerRadius={25} 
                    outerRadius={35}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
                <CardDescription>
                  Latest reports submitted by researchers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 bg-[#cf2e2e]/10 rounded-full p-2">
                        <FileText className="h-4 w-4 text-[#cf2e2e]" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">
                          {["Progress Report", "Financial Report", "Final Report"][Math.floor(Math.random() * 3)]} - {["Climate Research", "Agriculture Innovation", "Public Health Study"][Math.floor(Math.random() * 3)]}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>{["John Doe", "Jane Smith", "Robert Johnson"][Math.floor(Math.random() * 3)]}</span>
                          <span className="mx-2">•</span>
                          <span>{Math.floor(Math.random() * 5) + 1} days ago</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Funding by Department</CardTitle>
                <CardDescription>
                  Distribution of grants across departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] mb-4">
                  <BarChart 
                    data={departmentFundingData} 
                    xAxisKey="department" 
                    barKey="funding" 
                    barColor="#cf2e2e"
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-[#cf2e2e] mr-2"></div>
                    <span>Sciences</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                    <span>Engineering</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    <span>Humanities</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span>Other</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="researchers">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Researcher Activity</CardTitle>
                  <CardDescription>
                    Grant activity by researcher
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Researcher</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Active Grants</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Total Funding</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        {["John Doe", "Jane Smith", "Robert Johnson", "Emma Wilson", "David Lee", "Sarah Thompson", "Michael Brown"][i]}
                      </TableCell>
                      <TableCell>
                        {["Computer Science", "Engineering", "Medicine", "Agriculture", "Physics", "Economics", "Chemistry"][i]}
                      </TableCell>
                      <TableCell>
                        {Math.floor(Math.random() * 5) + 1}
                      </TableCell>
                      <TableCell>
                        {Math.floor(Math.random() * 50) + 20}%
                      </TableCell>
                      <TableCell>
                        ${(Math.floor(Math.random() * 500) + 50) * 1000}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grants">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Grant Analysis</CardTitle>
                  <CardDescription>
                    Performance metrics for all grants
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] mb-6">
                <StackedBarChart 
                  data={grantsByDepartmentData} 
                  xAxisKey="department" 
                  bars={[
                    { key: "active", color: "#22c55e" },
                    { key: "completed", color: "#3b82f6" },
                    { key: "pending", color: "#f59e0b" }
                  ]} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Internal Grants</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">24</div>
                    <p className="text-xs text-muted-foreground">$650K Total</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">External Grants</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">30</div>
                    <p className="text-xs text-muted-foreground">$1.75M Total</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Completion Rate</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">76%</div>
                    <p className="text-xs text-muted-foreground">+4% from last year</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm">Avg. Duration</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-2xl font-bold">18 mo</div>
                    <p className="text-xs text-muted-foreground">-2 months from last year</p>
                  </CardContent>
                </Card>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Grant Title</TableHead>
                    <TableHead>Researcher</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {["Climate Change Adaptation", "Agricultural Technology", "Renewable Energy Solutions", "Public Health Interventions", "Educational Innovation"][i]} Research
                      </TableCell>
                      <TableCell>
                        {["John Doe", "Jane Smith", "Robert Johnson", "Emma Wilson", "David Lee"][i]}
                      </TableCell>
                      <TableCell>
                        ${(Math.floor(Math.random() * 200) + 50) * 1000}
                      </TableCell>
                      <TableCell>
                        {["2023-01-15", "2023-03-22", "2023-05-10", "2023-07-05", "2023-09-18"][i]}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          ["Active", "Completed", "Active", "Pending", "Active"][i] === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : ["Active", "Completed", "Active", "Pending", "Active"][i] === "Completed"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {["Active", "Completed", "Active", "Pending", "Active"][i]}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Report Submissions</CardTitle>
                  <CardDescription>
                    Track and manage report submissions
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Title</TableHead>
                    <TableHead>Researcher</TableHead>
                    <TableHead>Grant ID</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-[#cf2e2e]" />
                          {["Q1 Progress Report", "Financial Update", "Mid-Year Report", "Project Milestone", "Annual Review", "Final Report"][i]}
                        </div>
                      </TableCell>
                      <TableCell>
                        {["John Doe", "Jane Smith", "Robert Johnson", "Emma Wilson", "David Lee", "Sarah Thompson"][i]}
                      </TableCell>
                      <TableCell>
                        AU-2023-{(Math.floor(Math.random() * 900) + 100).toString().padStart(3, '0')}
                      </TableCell>
                      <TableCell>
                        {Math.floor(Math.random() * 28) + 1} days ago
                      </TableCell>
                      <TableCell>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          ["Pending Review", "Approved", "Needs Revision", "Pending Review", "Approved", "Pending Review"][i] === "Approved" 
                            ? "bg-green-100 text-green-800" 
                            : ["Pending Review", "Approved", "Needs Revision", "Pending Review", "Approved", "Pending Review"][i] === "Pending Review"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}>
                          {["Pending Review", "Approved", "Needs Revision", "Pending Review", "Approved", "Pending Review"][i]}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportingPage;
