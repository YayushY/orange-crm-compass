import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText, 
  Receipt, 
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  FolderOpen,
  Palette,
  Globe,
  UserCheck
} from "lucide-react";

// Sample data for verticals and their projects
const verticalData = {
  "sarah-johnson": {
    name: "Sarah Johnson",
    verticals: {
      "client-executive": {
        name: "Client Executive",
        metrics: {
          ongoingProjects: 12,
          completedProjects: 28,
          renewalPending: 5,
          completedRenewals: 15,
          activeComplaints: 3,
          resolvedComplaints: 22
        },
        projects: [
          { id: 1, name: "ABC Corp Digital Strategy", status: "ongoing", type: "Digital Marketing" },
          { id: 2, name: "XYZ Ltd Brand Identity", status: "completed", type: "Branding" },
          { id: 3, name: "Tech Solutions SEO", status: "renewal-pending", type: "SEO" },
          { id: 4, name: "StartupX Campaign", status: "ongoing", type: "Marketing" }
        ]
      }
    }
  },
  "mike-chen": {
    name: "Mike Chen",
    verticals: {
      "account-management": {
        name: "Account Management",
        metrics: {
          ongoingProjects: 8,
          completedProjects: 32,
          activeComplaints: 2,
          resolvedComplaints: 18,
          tasksPendingApproval: 6
        },
        projects: [
          { id: 5, name: "Corporate Solutions Management", status: "ongoing", type: "Account Management" },
          { id: 6, name: "Enterprise Client Support", status: "completed", type: "Support" },
          { id: 7, name: "Annual Review Process", status: "pending-approval", type: "Review" }
        ]
      }
    }
  },
  "emily-davis": {
    name: "Emily Davis",
    verticals: {
      "website": {
        name: "Website",
        metrics: {
          ongoingProjects: 15,
          completedProjects: 45,
          tasksPendingApproval: 8
        },
        projects: [
          { id: 8, name: "E-commerce Platform", status: "ongoing", type: "Website Development" },
          { id: 9, name: "Corporate Website Redesign", status: "completed", type: "Website" },
          { id: 10, name: "Mobile App Landing Page", status: "pending-approval", type: "Landing Page" },
          { id: 11, name: "Portfolio Website", status: "ongoing", type: "Portfolio" }
        ]
      }
    }
  },
  "alex-rodriguez": {
    name: "Alex Rodriguez",
    verticals: {
      "graphic": {
        name: "Graphic",
        metrics: {
          ongoingProjects: 18,
          completedProjects: 67,
          tasksPendingApproval: 12
        },
        projects: [
          { id: 12, name: "Brand Logo Design", status: "ongoing", type: "Logo Design" },
          { id: 13, name: "Marketing Collateral", status: "completed", type: "Print Design" },
          { id: 14, name: "Social Media Graphics", status: "pending-approval", type: "Social Media" },
          { id: 15, name: "Product Packaging", status: "ongoing", type: "Packaging" },
          { id: 16, name: "Brochure Design", status: "completed", type: "Print" }
        ]
      }
    }
  },
  "david-smith": {
    name: "David Smith",
    verticals: {
      "client-executive": {
        name: "Client Executive",
        metrics: {
          ongoingProjects: 9,
          completedProjects: 25,
          renewalPending: 3,
          completedRenewals: 12,
          activeComplaints: 1,
          resolvedComplaints: 19
        },
        projects: [
          { id: 17, name: "Healthcare Marketing", status: "ongoing", type: "Healthcare" },
          { id: 18, name: "Financial Services Branding", status: "renewal-pending", type: "Branding" },
          { id: 19, name: "Retail Campaign", status: "completed", type: "Retail" }
        ]
      }
    }
  }
};

const getVerticalIcon = (vertical: string) => {
  switch (vertical) {
    case "client-executive": return UserCheck;
    case "account-management": return Users;
    case "website": return Globe;
    case "graphic": return Palette;
    default: return FileText;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case "ongoing": return <Badge className="bg-blue-100 text-blue-800">Ongoing</Badge>;
    case "completed": return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    case "renewal-pending": return <Badge className="bg-yellow-100 text-yellow-800">Renewal Pending</Badge>;
    case "pending-approval": return <Badge className="bg-orange-100 text-orange-800">Pending Approval</Badge>;
    default: return <Badge>{status}</Badge>;
  }
};

export const VerticalDashboard = () => {
  const [selectedAgent, setSelectedAgent] = useState<string>("sarah-johnson");
  
  const currentAgentData = verticalData[selectedAgent as keyof typeof verticalData];
  const agentNames = Object.keys(verticalData);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-orange-900">Vertical Metrics Dashboard</h1>
          <p className="text-orange-700 mt-1">Track performance across different verticals and projects</p>
        </div>
        
        <Select value={selectedAgent} onValueChange={setSelectedAgent}>
          <SelectTrigger className="w-64 border-orange-200 focus:ring-orange-500">
            <SelectValue placeholder="Select Agent" />
          </SelectTrigger>
          <SelectContent>
            {agentNames.map((agentKey) => (
              <SelectItem key={agentKey} value={agentKey}>
                {verticalData[agentKey as keyof typeof verticalData].name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentAgentData && Object.entries(currentAgentData.verticals).map(([verticalKey, verticalData]) => {
        const VerticalIcon = getVerticalIcon(verticalKey);
        
        return (
          <div key={verticalKey} className="space-y-6">
            <div className="flex items-center gap-3">
              <VerticalIcon className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl font-semibold text-orange-900">{verticalData.name}</h2>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {/* Common metrics for all verticals */}
              <Card className="bg-white border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-900">Ongoing Projects</CardTitle>
                  <FolderOpen className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-900">{verticalData.metrics.ongoingProjects}</div>
                </CardContent>
              </Card>

              <Card className="bg-white border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-900">Completed Projects</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-900">{verticalData.metrics.completedProjects}</div>
                </CardContent>
              </Card>

              {/* Client Executive specific metrics */}
              {verticalKey === "client-executive" && (
                <>
                  <Card className="bg-white border-orange-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-orange-900">Renewal Pending</CardTitle>
                      <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-900">{verticalData.metrics.renewalPending}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-orange-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-orange-900">Completed Renewals</CardTitle>
                      <Target className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-900">{verticalData.metrics.completedRenewals}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-orange-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-orange-900">Active Complaints</CardTitle>
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-900">{verticalData.metrics.activeComplaints}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-orange-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-orange-900">Resolved Complaints</CardTitle>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-900">{verticalData.metrics.resolvedComplaints}</div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Account Management specific metrics */}
              {verticalKey === "account-management" && (
                <>
                  <Card className="bg-white border-orange-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-orange-900">Active Complaints</CardTitle>
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-900">{verticalData.metrics.activeComplaints}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-orange-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-orange-900">Resolved Complaints</CardTitle>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-900">{verticalData.metrics.resolvedComplaints}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-orange-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-orange-900">Pending Approval</CardTitle>
                      <Clock className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-900">{verticalData.metrics.tasksPendingApproval}</div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Website and Graphic specific metrics */}
              {(verticalKey === "website" || verticalKey === "graphic") && (
                <Card className="bg-white border-orange-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-orange-900">Pending Approval</CardTitle>
                    <Clock className="h-4 w-4 text-orange-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-900">{verticalData.metrics.tasksPendingApproval}</div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Projects List */}
            <Card className="bg-white border-orange-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-orange-900">
                  {verticalData.name} Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {verticalData.projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="flex-1">
                        <h4 className="font-medium text-orange-900">{project.name}</h4>
                        <p className="text-sm text-orange-600">{project.type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(project.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};