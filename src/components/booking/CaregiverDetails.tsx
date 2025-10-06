import { Phone, MessageSquare, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const CaregiverDetails = () => {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-2 mb-4">
        <div className="flex items-center gap-2 text-foreground">
          <div className="p-2 rounded-full bg-primary/10">
            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">Caregiver Details</h2>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-xl font-semibold">
            PS
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[hsl(var(--success))] border-2 border-card flex items-center justify-center">
            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">Priya Sharma</h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium text-foreground">4.9</span>
              <span className="text-sm text-muted-foreground">(127 reviews)</span>
            </div>
            <Badge variant="destructive" className="text-xs">
              Verified
            </Badge>
          </div>

          <div className="flex gap-3">
            <Button size="sm" className="gap-2">
              <Phone className="h-4 w-4" />
              Call
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Message
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
