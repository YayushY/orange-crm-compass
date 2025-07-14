import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Phone } from "lucide-react";

interface OfficeVisitTableProps {
  agentName: string;
}

// Sample office visit data for today
const officeVisitData = [
  {
    id: 1,
    customerName: "Robert Johnson",
    company: "Enterprise Solutions",
    lastContact: "2024-01-08",
    note: "Product Demo",
    phone: "+1 (555) 789-0123"
  },
  {
    id: 2,
    customerName: "Lisa Anderson",
    company: "Global Tech Corp",
    lastContact: "2024-01-07",
    note: "Contract Signing",
    phone: "+1 (555) 890-1234"
  },
  {
    id: 3,
    customerName: "Michael Chen",
    company: "Startup Hub",
    lastContact: "2024-01-06",
    note: "Consultation",
    phone: "+1 (555) 901-2345"
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
                <TableHead className="text-orange-900">Last Contact Date</TableHead>
                <TableHead className="text-orange-900">Note</TableHead>
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
                  <TableCell className="text-orange-600">
                    {new Date(visit.lastContact).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-orange-700">
                    {visit.note}
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