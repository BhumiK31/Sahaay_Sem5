import { Calendar, Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ServiceInformation = () => {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-2 mb-4">
        <div className="flex items-center gap-2 text-foreground">
          <div className="p-2 rounded-full bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Service Information</h2>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Date</span>
            </div>
            <p className="text-foreground font-medium">Today, Dec 25, 2024</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Time & Duration</span>
            </div>
            <p className="text-foreground font-medium">2:00 PM - 8:00 PM</p>
            <p className="text-sm text-muted-foreground">6 hours</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">Location</span>
            </div>
            <p className="text-foreground font-medium">1234 MG Road, Koramangala,</p>
            <p className="text-foreground font-medium">Bangalore - 560034</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <span className="text-sm font-medium">Service Type</span>
            </div>
            <Badge className="bg-[hsl(var(--destructive))] text-white border-0">
              Elderly Care
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="font-semibold text-foreground mb-2">Requirements</h3>
        <p className="text-muted-foreground text-sm">
          Elderly care, medication assistance, companionship
        </p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-foreground mb-2">Special Instructions</h3>
        <p className="text-muted-foreground text-sm">
          Grandmother needs medication at 4 PM and 6 PM. Prefers light conversation and gentle assistance with mobility.
        </p>
      </div>
    </Card>
  );
};
