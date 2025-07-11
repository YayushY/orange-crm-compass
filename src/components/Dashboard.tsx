
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FollowUpTable } from "./FollowUpTable";
import { MetricCard } from "./MetricCard";
import { 
  Users, 
  FileText, 
  Receipt, 
  UserX, 
  Target, 
  Phone,
  TrendingUp,
  TrendingDown
} from "lucide-react";

// Sample data for agents
const agentsData = {
  "sarah-johnson": {
    name: "Sarah Johnson",
    monthlyData: {
      leadsAssigned: 45,
      proposalsSent: 32,
      invoicesSent: { count: 18, totalAmount: 125000 },
      unusedLeads: 13,
      target: { achieved: 135000, target: 120000 }
    },
    todaysFollowUps: 8
  },
  "mike-chen": {
    name: "Mike Chen",
    monthlyData: {
      leadsAssigned: 38,
      proposalsSent: 28,
      invoicesSent: { count: 15, totalAmount: 95000 },
      unusedLeads: 10,
      target: { achieved: 95000, target: 110000 }
    },
    todaysFollowUps: 12
  },
  "emily-davis": {
    name: "Emily Davis",
    monthlyData: {
      leadsAssigned: 52,
      proposalsSent: 41,
      invoicesSent: { count: 25, totalAmount: 180000 },
      unusedLeads: 11,
      target: { achieved: 180000, target: 150000 }
    },
    todaysFollowUps: 6
  },
  "alex-rodriguez": {
    name: "Alex Rodriguez",
    monthlyData: {
      leadsAssigned: 29,
      proposalsSent: 19,
      invoicesSent: { count: 8, totalAmount: 65000 },
      unusedLeads: 10,
      target: { achieved: 65000, target: 100000 }
    },
    todaysFollowUps: 15
  }
};

export function Dashboard() {
  const [selectedAgent, setSelectedAgent] = useState("sarah-johnson");
  const currentAgentData = agentsData[selectedAgent as keyof typeof agentsData];
  
  const targetAchieved = currentAgentData.monthlyData.target.achieved >= currentAgentData.monthlyData.target.target;
  const achievementPercentage = (currentAgentData.monthlyData.target.achieved / currentAgentData.monthlyData.target.target) * 100;

  return (
    <div className="flex-1 bg-orange-50 min-h-screen">
      <header className="bg-white border-b border-orange-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-orange-700" />
            <h1 className="text-2xl font-bold text-orange-900">Sales Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger className="w-64 border-orange-200">
                <SelectValue placeholder="Select Agent" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(agentsData).map(([key, agent]) => (
                  <SelectItem key={key} value={key}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="outline" className="text-orange-700 border-orange-300">
              {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-8">
        {/* Monthly Metrics Section */}
        <div>
          <h2 className="text-xl font-semibold text-orange-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Monthly Performance - {currentAgentData.name}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricCard
              title="Leads Assigned"
              value={currentAgentData.monthlyData.leadsAssigned}
              icon={Users}
              color="blue"
            />
            
            <MetricCard
              title="Proposals Sent"
              value={currentAgentData.monthlyData.proposalsSent}
              icon={FileText}
              color="green"
            />
            
            <Card className="bg-white border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-900">Invoices Sent</CardTitle>
                <Receipt className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">
                  {currentAgentData.monthlyData.invoicesSent.count}
                </div>
                <p className="text-xs text-orange-600 mt-1">
                  Total: ${currentAgentData.monthlyData.invoicesSent.totalAmount.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            
            <MetricCard
              title="Unused Leads"
              value={currentAgentData.monthlyData.unusedLeads}
              icon={UserX}
              color="red"
            />
            
            <Card className="bg-white border-orange-200 lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-900">Monthly Target</CardTitle>
                <Target className={`h-4 w-4 ${targetAchieved ? 'text-green-600' : 'text-red-600'}`} />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-orange-900">
                    ${currentAgentData.monthlyData.target.achieved.toLocaleString()}
                  </div>
                  <Badge 
                    variant={targetAchieved ? "default" : "destructive"}
                    className={targetAchieved ? "bg-green-500" : ""}
                  >
                    {targetAchieved ? "Target Achieved" : "Below Target"}
                  </Badge>
                </div>
                <div className="text-xs text-orange-600 mb-2">
                  Target: ${currentAgentData.monthlyData.target.target.toLocaleString()}
                </div>
                <Progress 
                  value={Math.min(achievementPercentage, 100)} 
                  className="h-2"
                />
                <p className="text-xs text-orange-600 mt-1">
                  {achievementPercentage.toFixed(1)}% of target achieved
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Today's Section */}
        <div>
          <h2 className="text-xl font-semibold text-orange-900 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Today's Activities
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="bg-white border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-900">Follow-ups Today</CardTitle>
                <Phone className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">
                  {currentAgentData.todaysFollowUps}
                </div>
                <p className="text-xs text-orange-600">
                  Pending customer calls
                </p>
              </CardContent>
            </Card>
            
            <div className="lg:col-span-3">
              <FollowUpTable agentName={currentAgentData.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
