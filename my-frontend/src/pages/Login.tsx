import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get("type"); // "family" or "student"
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const getTitle = () => {
    if (userType === "family") {
      return "Welcome Back to Sahaay 💛";
    } else if (userType === "student") {
      return "Welcome Back Helper 🤝";
    }
    return "Welcome Back to Sahaay 💛";
  };

  const getDescription = () => {
    if (userType === "family") {
      return "Sign in to find trusted care for your loved ones";
    } else if (userType === "student") {
      return "Sign in to start helping families in your community";
    }
    return "Sign in to your account to continue";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login success - navigate to dashboard
    // In real app, this would validate credentials
    navigate("/dashboard");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        <Card className="card-feature">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {getTitle()}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {getDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full btn-hero rounded-2xl h-12">
                Login
              </Button>
            </form>

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => navigate("/forgot-password")}
                className="text-primary hover:text-primary/80"
              >
                Forgot Password?
              </Button>
            </div>

            <Separator />

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full rounded-2xl h-12"
                onClick={() => {/* Google auth would go here */}}
              >
                Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-2xl h-12"
                onClick={() => {/* Apple auth would go here */}}
              >
                Continue with Apple
              </Button>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  onClick={() => navigate(`/signup${userType ? `?type=${userType}` : ""}`)}
                  className="text-primary hover:text-primary/80 p-0 font-medium"
                >
                  Create an Account
                </Button>
              </p>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground italic">
                "Your trusted space for care and support."
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;