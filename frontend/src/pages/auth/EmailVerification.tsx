import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import sahaayLogo from '@/assets/sahaay-logo.png';
import { Mail, ArrowLeft } from 'lucide-react';

const EmailVerification = () => {
  const [otp, setOtp] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const navigate = useNavigate();
  const location = useLocation();
  // Get email and userRole passed from SignUp form
  const email = location.state?.email || '';
  const userRole = location.state?.userRole || 'family';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("No email found. Please sign up again.");
      navigate("/signup");
      return;
    }
    if (otp.length === 6) {
      try {
        const response = await fetch('http://localhost:5000/api/users/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code: otp }),
        });
        const result = await response.json();
        if (response.ok) {
          alert('Email verified successfully!');
          // Pass userRole to ProfileCompletion
          navigate('/profile-completion', { 
            state: { 
              email, 
              userRole 
            } 
          });
        } else {
          alert(result.message || 'Verification failed');
        }
      } catch (error) {
        alert('An error occurred during verification. Please try again.');
      }
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const response = await fetch('http://localhost:5000/api/users/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        alert('Verification code resent to your email');
        setCountdown(30);
      } else {
        const result = await response.json();
        alert(result.message || 'Failed to resend code');
      }
    } catch (error) {
      alert('Error resending code. Please try again.');
    }
    setIsResending(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center section-padding">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img src={sahaayLogo} alt="SAHAAY" className="h-10 w-auto" />
          </div>
        </div>
        <Card className="shadow-[var(--shadow-hover)]">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-poppins">Verify Your Email 📩</CardTitle>
            <CardDescription>
              We've sent a 6-digit verification code to your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleVerify} className="space-y-6">
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
              </div>
              <Button 
                type="submit" 
                className="w-full btn-hero"
                disabled={otp.length !== 6}
              >
                Verify & Continue
              </Button>
            </form>
            <div className="text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                Didn't receive the code?
              </p>
              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={countdown > 0 || isResending}
                className="text-primary hover:text-primary/80"
              >
                {countdown > 0 
                  ? `Resend in ${countdown}s` 
                  : isResending 
                    ? 'Sending...' 
                    : 'Resend Code'
                }
              </Button>
            </div>
            <div className="text-center">
              <Link 
                to="/signup" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerification;
