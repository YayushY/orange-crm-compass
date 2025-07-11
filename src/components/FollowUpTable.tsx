
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, Clock } from "lucide-react";

interface FollowUpTableProps {
  agentName: string;
}

// Sample follow-up data with follow-up times
const followUpData = [
  {
    id: 1,
    customerName: "John Smith",
    company: "Tech Solutions Inc",
    lastContact: "2024-01-08",
    followUpTime: "10:30 AM",
    reason: "Proposal Discussion",
    phone: "+1 (555) 123-4567",
    email: "john@techsolutions.com"
  },
  {
    id: 2,
    customerName: "Maria Garcia",
    company: "Digital Marketing Co",
    lastContact: "2024-01-07",
    followUpTime: "2:15 PM",
    reason: "Contract Terms",
    phone: "+1 (555) 234-5678",
    email: "maria@digitalmarketing.com"
  },
  {
    id: 3,
    customerName: "David Wilson",
    company: "Innovation Labs",
    lastContact: "2024-01-06",
    followUpTime: "11:00 AM",
    reason: "Budget Approval",
    phone: "+1 (555) 345-6789",
    email: "david@innovationlabs.com"
  },
  {
    id: 4,
    customerName: "Sarah Brown",
    company: "Growth Ventures",
    lastContact: "2024-01-05",
    followUpTime: "3:45 PM",
    reason: "Service Inquiry",
    phone: "+1 (555) 456-7890",
    email: "sarah@growthventures.com"
  }
];

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
                <TableHead className="text-orange-900">Follow-up Time</TableHead>
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
                  <TableCell className="text-orange-700 font-medium">
                    {customer.followUpTime}
                  </TableCell>
                  <TableCell className="text-orange-700">
                    {customer.reason}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
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
