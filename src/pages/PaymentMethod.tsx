import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<string>("google-pay");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => navigate(-1)}
            className="text-primary font-medium hover:text-primary/80 transition-colors"
          >
            CANCEL
          </button>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-6">Select a payment method</h1>

        <div className="space-y-6">
          {/* UPI Section */}
          <Card className="p-6 border-border">
            <h2 className="text-xs font-semibold text-muted-foreground mb-4 tracking-wider">UPI</h2>
            <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="google-pay" id="google-pay" />
                  <Label htmlFor="google-pay" className="text-base font-normal cursor-pointer">
                    Google Pay
                  </Label>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="upi-apps" id="upi-apps" />
                  <div>
                    <Label htmlFor="upi-apps" className="text-base font-normal cursor-pointer">
                      Pay by any UPI App
                    </Label>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Google Pay, PhonePe, Paytm and more
                    </p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">UPI</span>
              </div>
            </RadioGroup>
          </Card>

          {/* Credit & Debit Cards */}
          <Card className="p-6 border-border">
            <h2 className="text-xs font-semibold text-muted-foreground mb-4 tracking-wider">
              CREDIT & DEBIT CARDS
            </h2>
            <button className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors">
              <Plus className="h-5 w-5" />
              <span className="font-medium">Add a new credit or debit card</span>
            </button>
          </Card>

          {/* More Ways to Pay */}
          <Card className="p-6 border-border">
            <h2 className="text-xs font-semibold text-muted-foreground mb-4 tracking-wider">
              MORE WAYS TO PAY
            </h2>
            <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="netbanking" id="netbanking" />
                <div className="flex-1">
                  <Label htmlFor="netbanking" className="text-base font-normal cursor-pointer">
                    Net Banking
                  </Label>
                  {selectedMethod === "netbanking" && (
                    <select className="w-full mt-2 p-2 border border-border rounded-md bg-card text-foreground">
                      <option>Choose an Option</option>
                      <option>State Bank of India</option>
                      <option>HDFC Bank</option>
                      <option>ICICI Bank</option>
                      <option>Axis Bank</option>
                    </select>
                  )}
                </div>
              </div>
            </RadioGroup>
          </Card>

        </div>

        {/* Continue Button */}
        <Button
          className="w-full mt-8 h-12 text-base font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
          onClick={() => navigate("/")}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;
