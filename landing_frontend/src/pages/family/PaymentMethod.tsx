import { useState } from "react";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [selectedMethod, setSelectedMethod] = useState<string>("google-pay");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Get booking details from URL params
  const bookingId = searchParams.get('bookingId') || 'DEMO_BOOKING_ID';
  const userId = searchParams.get('userId') || 'DEMO_USER_ID';
  const amount = Number(searchParams.get('amount')) || 5000;

  const handlePayment = async () => {
    // Validate payment method selection
    if (selectedMethod === 'netbanking' && !selectedBank) {
      toast({
        title: "Bank not selected",
        description: "Please select a bank for net banking payment",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Prepare payment details based on selected method
      const paymentDetails: any = {};
      
      if (selectedMethod === 'netbanking') {
        paymentDetails.bankName = selectedBank;
      } else if (selectedMethod === 'google-pay') {
        paymentDetails.upiId = 'user@googlepay';
      } else if (selectedMethod === 'upi-apps') {
        paymentDetails.upiId = 'user@upi';
      }

      // Call backend API
      const response = await fetch('http://localhost:5000/api/payments/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId,
          userId,
          amount,
          paymentMethod: selectedMethod,
          paymentDetails
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Show success message
        toast({
          title: "Payment Successful! 🎉",
          description: `Transaction ID: ${data.payment.transactionId}`,
          className: "bg-green-50 border-green-200",
        });

        // Navigate back to booking details after a short delay
        setTimeout(() => {
          navigate(`/?bookingId=${bookingId}&paymentSuccess=true`);
        }, 2000);
      } else {
        // Show error message
        toast({
          title: "Payment Failed",
          description: data.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Connection Error",
        description: "Unable to process payment. Please check your connection and make sure backend is running.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            disabled={isProcessing}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button 
            onClick={() => navigate(-1)} 
            className="text-primary font-medium hover:text-primary/80 transition-colors"
            disabled={isProcessing}
          >
            CANCEL
          </button>
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">Select a payment method</h1>
        <p className="text-muted-foreground mb-6">Amount to pay: ₹{amount.toLocaleString()}</p>

        <div className="space-y-6">
          {/* UPI Section */}
          <Card className="p-6 border-border">
            <h2 className="text-xs font-semibold text-muted-foreground mb-4 tracking-wider">UPI</h2>
            <RadioGroup 
              value={selectedMethod} 
              onValueChange={setSelectedMethod} 
              className="space-y-4"
              disabled={isProcessing}
            >
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
            <button 
              className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors"
              disabled={isProcessing}
            >
              <Plus className="h-5 w-5" />
              <span className="font-medium">Add a new credit or debit card</span>
            </button>
          </Card>

          {/* More Ways to Pay */}
          <Card className="p-6 border-border">
            <h2 className="text-xs font-semibold text-muted-foreground mb-4 tracking-wider">
              MORE WAYS TO PAY
            </h2>
            <RadioGroup 
              value={selectedMethod} 
              onValueChange={setSelectedMethod} 
              className="space-y-4"
              disabled={isProcessing}
            >
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="netbanking" id="netbanking" />
                <div className="flex-1">
                  <Label htmlFor="netbanking" className="text-base font-normal cursor-pointer">
                    Net Banking
                  </Label>
                  {selectedMethod === "netbanking" && (
                    <select 
                      className="w-full mt-2 p-2 border border-border rounded-md bg-card text-foreground"
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      disabled={isProcessing}
                    >
                      <option value="">Choose an Option</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                    </select>
                  )}
                </div>
              </div>
            </RadioGroup>
          </Card>
        </div>

        {/* Continue Button */}
        <Button 
          onClick={handlePayment}
          className="w-full mt-8 h-12 text-base font-semibold text-accent-foreground bg-[#4a96e3] hover:bg-[#3a86d3]"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing Payment...
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;