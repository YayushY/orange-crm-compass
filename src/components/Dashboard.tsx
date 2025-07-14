
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { FollowUpTable } from "./FollowUpTable";
import { OfficeVisitTable } from "./OfficeVisitTable";
import { MetricCard } from "./MetricCard";
import { 
  Users, 
  FileText, 
  Receipt, 
  UserX, 
  Target, 
  Phone,
  TrendingUp,
  Calendar,
  MapPin
} from "lucide-react";

// Sample data for agents with monthly data
const agentsData = {
  "sarah-johnson": {
    name: "Sarah Johnson",
    role: "Team Lead",
    team: ["mike-chen", "alex-rodriguez"],
    monthlyData: {
      "2024-01": {
        leadsAssigned: 45,
        proposalsSent: 32,
        invoicesSent: { count: 18, totalAmount: 125000 },
        unusedLeads: 13,
        target: { achieved: 135000, target: 120000 }
      },
      "2024-02": {
        leadsAssigned: 52,
        proposalsSent: 38,
        invoicesSent: { count: 22, totalAmount: 145000 },
        unusedLeads: 14,
        target: { achieved: 145000, target: 130000 }
      },
      "2024-03": {
        leadsAssigned: 48,
        proposalsSent: 35,
        invoicesSent: { count: 20, totalAmount: 135000 },
        unusedLeads: 13,
        target: { achieved: 135000, target: 125000 }
      }
    },
    todaysFollowUps: 8,
    todaysOfficeVisits: 3
  },
  "mike-chen": {
    name: "Mike Chen",
    role: "Sales Agent",
    monthlyData: {
      "2024-01": {
        leadsAssigned: 38,
        proposalsSent: 28,
        invoicesSent: { count: 15, totalAmount: 95000 },
        unusedLeads: 10,
        target: { achieved: 95000, target: 110000 }
      },
      "2024-02": {
        leadsAssigned: 42,
        proposalsSent: 31,
        invoicesSent: { count: 18, totalAmount: 115000 },
        unusedLeads: 11,
        target: { achieved: 115000, target: 120000 }
      },
      "2024-03": {
        leadsAssigned: 40,
        proposalsSent: 29,
        invoicesSent: { count: 16, totalAmount: 105000 },
        unusedLeads: 11,
        target: { achieved: 105000, target: 115000 }
      }
    },
    todaysFollowUps: 12,
    todaysOfficeVisits: 2
  },
  "emily-davis": {
    name: "Emily Davis",
    role: "Team Lead",
    team: ["david-smith"],
    monthlyData: {
      "2024-01": {
        leadsAssigned: 52,
        proposalsSent: 41,
        invoicesSent: { count: 25, totalAmount: 180000 },
        unusedLeads: 11,
        target: { achieved: 180000, target: 150000 }
      },
      "2024-02": {
        leadsAssigned: 58,
        proposalsSent: 45,
        invoicesSent: { count: 28, totalAmount: 200000 },
        unusedLeads: 13,
        target: { achieved: 200000, target: 160000 }
      },
      "2024-03": {
        leadsAssigned: 55,
        proposalsSent: 43,
        invoicesSent: { count: 26, totalAmount: 190000 },
        unusedLeads: 12,
        target: { achieved: 190000, target: 155000 }
      }
    },
    todaysFollowUps: 6,
    todaysOfficeVisits: 4
  },
  "alex-rodriguez": {
    name: "Alex Rodriguez",
    role: "Sales Agent",
    monthlyData: {
      "2024-01": {
        leadsAssigned: 29,
        proposalsSent: 19,
        invoicesSent: { count: 8, totalAmount: 65000 },
        unusedLeads: 10,
        target: { achieved: 65000, target: 100000 }
      },
      "2024-02": {
        leadsAssigned: 33,
        proposalsSent: 22,
        invoicesSent: { count: 12, totalAmount: 85000 },
        unusedLeads: 11,
        target: { achieved: 85000, target: 105000 }
      },
      "2024-03": {
        leadsAssigned: 31,
        proposalsSent: 20,
        invoicesSent: { count: 10, totalAmount: 75000 },
        unusedLeads: 11,
        target: { achieved: 75000, target: 102000 }
      }
    },
    todaysFollowUps: 15,
    todaysOfficeVisits: 1
  },
  "david-smith": {
    name: "David Smith",
    role: "Sales Agent",
    monthlyData: {
      "2024-01": {
        leadsAssigned: 35,
        proposalsSent: 25,
        invoicesSent: { count: 12, totalAmount: 85000 },
        unusedLeads: 10,
        target: { achieved: 85000, target: 95000 }
      },
      "2024-02": {
        leadsAssigned: 38,
        proposalsSent: 28,
        invoicesSent: { count: 15, totalAmount: 105000 },
        unusedLeads: 10,
        target: { achieved: 105000, target: 100000 }
      },
      "2024-03": {
        leadsAssigned: 36,
        proposalsSent: 26,
        invoicesSent: { count: 13, totalAmount: 95000 },
        unusedLeads: 10,
        target: { achieved: 95000, target: 98000 }
      }
    },
    todaysFollowUps: 9,
    todaysOfficeVisits: 2
  }
};

const months = [
  { value: "2024-01", label: "January 2024" },
  { value: "2024-02", label: "February 2024" },
  { value: "2024-03", label: "March 2024" }
];

// Calculate days left in current month
const getDaysLeftInMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const currentDay = now.getDate();
  return lastDay - currentDay;
};

export function Dashboard() {
  const [selectedAgent, setSelectedAgent] = useState("sarah-johnson");
  const [selectedMonth, setSelectedMonth] = useState("2024-03");
  const currentAgentData = agentsData[selectedAgent as keyof typeof agentsData];
  const currentMonthData = currentAgentData.monthlyData[selectedMonth as keyof typeof currentAgentData.monthlyData];
  
  // Calculate team performance if agent is team lead
  const isTeamLead = currentAgentData.role === "Team Lead";
  const teamData = isTeamLead && 'team' in currentAgentData && currentAgentData.team ? 
    currentAgentData.team.map(memberId => {
      const member = agentsData[memberId as keyof typeof agentsData];
      return {
        name: member.name,
        data: member.monthlyData[selectedMonth as keyof typeof member.monthlyData]
      };
    }) : [];
  
  const teamTotals = teamData.reduce((acc, member) => ({
    achieved: acc.achieved + member.data.target.achieved,
    target: acc.target + member.data.target.target,
    leadsAssigned: acc.leadsAssigned + member.data.leadsAssigned,
    proposalsSent: acc.proposalsSent + member.data.proposalsSent,
    invoicesSent: acc.invoicesSent + member.data.invoicesSent.count,
    unusedLeads: acc.unusedLeads + member.data.unusedLeads
  }), { achieved: 0, target: 0, leadsAssigned: 0, proposalsSent: 0, invoicesSent: 0, unusedLeads: 0 });

  const targetAchieved = currentMonthData.target.achieved >= currentMonthData.target.target;
  const achievementPercentage = (currentMonthData.target.achieved / currentMonthData.target.target) * 100;
  const teamTargetAchieved = isTeamLead ? teamTotals.achieved >= teamTotals.target : false;
  const teamAchievementPercentage = isTeamLead ? (teamTotals.achieved / teamTotals.target) * 100 : 0;
  const daysLeft = getDaysLeftInMonth();

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
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-48 border-orange-200">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
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
            Monthly Performance - {currentAgentData.name} ({months.find(m => m.value === selectedMonth)?.label})
          </h2>
          
          {/* First row: Four main metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <MetricCard
              title="Leads Assigned"
              value={currentMonthData.leadsAssigned}
              icon={Users}
              color="blue"
            />
            
            <MetricCard
              title="Unused Leads"
              value={currentMonthData.unusedLeads}
              icon={UserX}
              color="red"
            />
            
            <MetricCard
              title="Proposals Sent"
              value={currentMonthData.proposalsSent}
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
                  {currentMonthData.invoicesSent.count}
                </div>
                <p className="text-xs text-orange-600 mt-1">
                  Total: ${currentMonthData.invoicesSent.totalAmount.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Second row: Monthly Target */}
          <div className={`grid ${isTeamLead ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
            <Card className="bg-white border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-900">Personal Monthly Target</CardTitle>
                <Target className={`h-4 w-4 ${targetAchieved ? 'text-green-600' : 'text-red-600'}`} />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-orange-900">
                    ${currentMonthData.target.achieved.toLocaleString()}
                  </div>
                  <Badge 
                    variant={targetAchieved ? "default" : "destructive"}
                    className={targetAchieved ? "bg-green-500" : ""}
                  >
                    {targetAchieved ? "Target Achieved" : "Below Target"}
                  </Badge>
                </div>
                <div className="text-xs text-orange-600 mb-2">
                  Target: ${currentMonthData.target.target.toLocaleString()}
                </div>
                <Progress 
                  value={Math.min(achievementPercentage, 100)} 
                  className="h-2 mb-2"
                />
                <div className="flex items-center justify-between text-xs text-orange-600">
                  <span>{achievementPercentage.toFixed(1)}% of target achieved</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{daysLeft} days left</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isTeamLead && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Card className="bg-white border-orange-200 cursor-pointer transition-transform duration-200 hover:scale-105">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-orange-900">Team Monthly Target</CardTitle>
                      <Target className={`h-4 w-4 ${teamTargetAchieved ? 'text-green-600' : 'text-red-600'}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl font-bold text-orange-900">
                          ${teamTotals.achieved.toLocaleString()}
                        </div>
                        <Badge 
                          variant={teamTargetAchieved ? "default" : "destructive"}
                          className={teamTargetAchieved ? "bg-green-500" : ""}
                        >
                          {teamTargetAchieved ? "Target Achieved" : "Below Target"}
                        </Badge>
                      </div>
                      <div className="text-xs text-orange-600 mb-2">
                        Target: ${teamTotals.target.toLocaleString()} • Team: {teamData.length} members
                      </div>
                      <Progress 
                        value={Math.min(teamAchievementPercentage, 100)} 
                        className="h-2 mb-2"
                      />
                      <div className="flex items-center justify-between text-xs text-orange-600">
                        <span>{teamAchievementPercentage.toFixed(1)}% of target achieved</span>
                        <div className="text-xs">
                          L: {teamTotals.leadsAssigned} • P: {teamTotals.proposalsSent} • I: {teamTotals.invoicesSent}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 animate-fade-in">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-orange-900 mb-3">Individual Team Performance</h4>
                    {teamData.map((member, index) => {
                      const memberAchievementPercentage = (member.data.target.achieved / member.data.target.target) * 100;
                      const memberTargetAchieved = member.data.target.achieved >= member.data.target.target;
                      
                      return (
                        <div key={index} className="space-y-2 p-3 bg-orange-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-orange-900">{member.name}</span>
                            <Badge 
                              variant={memberTargetAchieved ? "default" : "secondary"}
                              className={`text-xs ${memberTargetAchieved ? "bg-green-500" : "bg-orange-200 text-orange-800"}`}
                            >
                              {memberTargetAchieved ? "✓" : "Pending"}
                            </Badge>
                          </div>
                          <div className="text-xs text-orange-600">
                            ${member.data.target.achieved.toLocaleString()} / ${member.data.target.target.toLocaleString()}
                          </div>
                          <Progress 
                            value={Math.min(memberAchievementPercentage, 100)} 
                            className="h-1"
                          />
                          <div className="flex justify-between text-xs text-orange-600">
                            <span>{memberAchievementPercentage.toFixed(1)}%</span>
                            <span>L:{member.data.leadsAssigned} P:{member.data.proposalsSent} I:{member.data.invoicesSent.count}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        </div>

        {/* Today's Section */}
        <div>
          <h2 className="text-xl font-semibold text-orange-900 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Today's Activities
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
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
            
            <Card className="bg-white border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-900">Office Visits Today</CardTitle>
                <MapPin className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">
                  {currentAgentData.todaysOfficeVisits}
                </div>
                <p className="text-xs text-orange-600">
                  Scheduled client visits
                </p>
              </CardContent>
            </Card>
            
            <div className="lg:col-span-3 space-y-6">
              <FollowUpTable agentName={currentAgentData.name} />
              <OfficeVisitTable agentName={currentAgentData.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
