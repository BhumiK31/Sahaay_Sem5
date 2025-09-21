import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Mail, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const email = location.state?.email || "user@example.com";
  const userType = location.state?.userType || "family";

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit code",
        variant: "destructive",
      });
      return;
    }

    // Simulate OTP verification
    toast({
      title: "Email verified!",
      description: "Your email has been successfully verified.",
    });

    // Navigate to profile completion
    navigate("/complete-profile", { state: { userType, email } });
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setTimer(60);
      setCanResend(false);
      toast({
        title: "OTP Resent",
        description: "A new verification code has been sent to your email.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/signup")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sign Up
        </Button>

        <Card className="card-feature">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Verify Your Email 📩
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              We've sent a 6-digit verification code to
              <br />
              <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                onClick={handleVerify}
                className="w-full btn-hero rounded-2xl h-12"
                disabled={otp.length !== 6}
              >
                Verify & Continue
              </Button>
            </div>

            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?
              </p>
              <Button
                variant="outline"
                onClick={handleResendOTP}
                disabled={!canResend || isResending}
                className="rounded-2xl"
              >
                {isResending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Resending...
                  </>
                ) : canResend ? (
                  "Resend Code"
                ) : (
                  `Resend in ${timer}s`
                )}
              </Button>
            </div>

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => navigate("/signup")}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Change email address
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyOTP;