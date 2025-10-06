import { CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const PaymentSummary = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <div className="flex items-start gap-2 mb-4">
        <div className="flex items-center gap-2 text-foreground">
          <div className="p-2 rounded-full bg-primary/10">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-lg font-semibold">Payment Summary</h2>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-foreground">Service (₹350/hr × 6hrs)</p>
          </div>
          <p className="text-foreground font-medium">₹2100</p>
        </div>

        <div className="flex justify-between">
          <p className="text-foreground">Platform Fee</p>
          <p className="text-foreground font-medium">₹50</p>
        </div>

        <div className="pt-3 border-t border-border">
          <div className="flex justify-between items-center mb-1">
            <p className="text-lg font-bold text-foreground">Total</p>
            <p className="text-lg font-bold text-primary">₹2100</p>
          </div>
          <p className="text-xs text-muted-foreground">Booked on Dec 20, 2024</p>
        </div>
      </div>

      <Button 
        className="w-full mt-6 h-11 font-semibold"
        onClick={() => navigate("/payment")}
      >
        Proceed to Payment
      </Button>
    </Card>
  );
};
