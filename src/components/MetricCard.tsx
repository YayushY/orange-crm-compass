
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: "blue" | "green" | "red";
}

const colorClasses = {
  blue: "text-blue-600",
  green: "text-green-600",
  red: "text-red-600"
};

export function MetricCard({ title, value, icon: Icon, color }: MetricCardProps) {
  return (
    <Card className="bg-white border-orange-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-orange-900">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${colorClasses[color]}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-orange-900">{value}</div>
      </CardContent>
    </Card>
  );
}
