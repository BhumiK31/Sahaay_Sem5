import { MessageSquare, Edit, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const QuickActions = () => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>

      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start gap-3 h-11">
          <MessageSquare className="h-4 w-4" />
          Contact Caregiver
        </Button>

        <Button variant="outline" className="w-full justify-start gap-3 h-11">
          <Edit className="h-4 w-4" />
          Modify Booking
        </Button>

        <Button variant="outline" className="w-full justify-start gap-3 h-11">
          <Download className="h-4 w-4" />
          Download Receipt
        </Button>
      </div>
    </Card>
  );
};
