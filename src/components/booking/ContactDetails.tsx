import { Phone } from "lucide-react";
import { Card } from "@/components/ui/card";

export const ContactDetails = () => {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-2 mb-4">
        <div className="flex items-center gap-2 text-foreground">
          <div className="p-2 rounded-full bg-primary/10">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Contact Details</h2>
        </div>
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-1">Primary Contact</p>
        <p className="text-foreground font-semibold mb-0.5">Tanvi Sharma</p>
        <p className="text-foreground">+91 98765 43210</p>
      </div>
    </Card>
  );
};
