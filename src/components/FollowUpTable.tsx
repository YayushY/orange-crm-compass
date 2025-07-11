
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, Mail, Clock } from "lucide-react";

interface FollowUpTableProps {
  agentName: string;
}

// Sample follow-up data
const followUpData = [
  {
    id: 1,
    customerName: "John Smith",
    company: "Tech Solutions Inc",
    lastContact: "2024-01-08",
    priority: "High",
    reason: "Proposal Discussion",
    phone: "+1 (555) 123-4567",
    email: "john@techsolutions.com"
  },
  {
    id: 2,
    customerName: "Maria Garcia",
    company: "Digital Marketing Co",
    lastContact: "2024-01-07",
    priority: "Medium",
    reason: "Contract Terms",
    phone: "+1 (555) 234-5678",
    email: "maria@digitalmarketing.com"
  },
  {
    id: 3,
    customerName: "David Wilson",
    company: "Innovation Labs",
    lastContact: "2024-01-06",
    priority: "High",
    reason: "Budget Approval",
    phone: "+1 (555) 345-6789",
    email: "david@innovationlabs.com"
  },
  {
    id: 4,
    customerName: "Sarah Brown",
    company: "Growth Ventures",
    lastContact: "2024-01-05",
    priority: "Low",
    reason: "Service Inquiry",
    phone: "+1 (555) 456-7890",
    email: "sarah@growthventures.com"
  }
];

const priorityColors = {
  High: "bg-red-100 text-red-800 border-red-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Low: "bg-green-100 text-green-800 border-green-200"
};

export function FollowUpTable({ agentName }: FollowUpTableProps) {
  return (
    <Card className="bg-white border-orange-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-orange-900 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Follow-up Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-orange-200">
                <TableHead className="text-orange-900">Customer</TableHead>
                <TableHead className="text-orange-900">Company</TableHead>
                <TableHead className="text-orange-900">Last Contact</TableHead>
                <TableHead className="text-orange-900">Priority</TableHead>
                <TableHead className="text-orange-900">Reason</TableHead>
                <TableHead className="text-orange-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {followUpData.map((customer) => (
                <TableRow key={customer.id} className="border-orange-100">
                  <TableCell className="font-medium text-orange-900">
                    {customer.customerName}
                  </TableCell>
                  <TableCell className="text-orange-700">
                    {customer.company}
                  </TableCell>
                  <TableCell className="text-orange-600">
                    {new Date(customer.lastContact).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={priorityColors[customer.priority as keyof typeof priorityColors]}
                    >
                      {customer.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-orange-700">
                    {customer.reason}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-orange-200 text-orange-700 hover:bg-orange-50"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-orange-200 text-orange-700 hover:bg-orange-50"
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
