import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Clock } from "lucide-react";

interface OfficeVisitTableProps {
  agentName: string;
}

// Sample office visit data for today
const officeVisitData = [
  {
    id: 1,
    customerName: "Robert Johnson",
    company: "Enterprise Solutions",
    visitTime: "9:00 AM",
    address: "123 Business Park, Suite 200",
    purpose: "Product Demo",
    status: "Confirmed"
  },
  {
    id: 2,
    customerName: "Lisa Anderson",
    company: "Global Tech Corp",
    visitTime: "1:30 PM",
    address: "456 Corporate Blvd, Floor 15",
    purpose: "Contract Signing",
    status: "Confirmed"
  },
  {
    id: 3,
    customerName: "Michael Chen",
    company: "Startup Hub",
    visitTime: "4:00 PM",
    address: "789 Innovation Center",
    purpose: "Consultation",
    status: "Pending"
  }
];

export function OfficeVisitTable({ agentName }: OfficeVisitTableProps) {
  return (
    <Card className="bg-white border-orange-200">
      <CardHeader>
        <CardTitle className="text-orange-900 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Today's Office Visits - {agentName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-orange-200">
          <Table>
            <TableHeader>
              <TableRow className="border-orange-200">
                <TableHead className="text-orange-900">Customer</TableHead>
                <TableHead className="text-orange-900">Company</TableHead>
                <TableHead className="text-orange-900">Visit Time</TableHead>
                <TableHead className="text-orange-900">Address</TableHead>
                <TableHead className="text-orange-900">Purpose</TableHead>
                <TableHead className="text-orange-900">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {officeVisitData.map((visit) => (
                <TableRow key={visit.id} className="border-orange-200 hover:bg-orange-50">
                  <TableCell className="font-medium text-orange-900">
                    {visit.customerName}
                  </TableCell>
                  <TableCell className="text-orange-700">
                    {visit.company}
                  </TableCell>
                  <TableCell className="text-orange-700 font-medium">
                    {visit.visitTime}
                  </TableCell>
                  <TableCell className="text-orange-600">
                    {visit.address}
                  </TableCell>
                  <TableCell className="text-orange-700">
                    {visit.purpose}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                      <MapPin className="w-4 h-4 mr-1" />
                      Navigate
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