import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User, ArrowLeft, Heart, GraduationCap } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlUserType = searchParams.get("type") as "family" | "student" | null;
  
  const [userType, setUserType] = useState<"family" | "student">(urlUserType || "family");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Navigate to OTP verification
    navigate("/verify-otp", { state: { email: formData.email, userType } });
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
              Join the Sahaay Community 🤝
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Create your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* User Type Selection */}
            <Tabs value={userType} onValueChange={(value) => setUserType(value as "family" | "student")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-2xl">
                <TabsTrigger value="family" className="rounded-xl flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  I need help
                </TabsTrigger>
                <TabsTrigger value="student" className="rounded-xl flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  I want to help
                </TabsTrigger>
              </TabsList>

              <TabsContent value="family" className="mt-4">
                <p className="text-sm text-muted-foreground text-center">
                  Connect with trusted students who can help with caregiving and support
                </p>
              </TabsContent>

              <TabsContent value="student" className="mt-4">
                <p className="text-sm text-muted-foreground text-center">
                  Offer your skills to help families in your community
                </p>
              </TabsContent>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full btn-hero rounded-2xl h-12">
                Sign Up
              </Button>
            </form>

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
                Already have an account?{" "}
                <Button
                  variant="link"
                  onClick={() => navigate(`/login${userType ? `?type=${userType}` : ""}`)}
                  className="text-primary hover:text-primary/80 p-0 font-medium"
                >
                  Login
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;