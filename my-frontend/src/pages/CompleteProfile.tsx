import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Camera, MapPin, Upload, User, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const userType = location.state?.userType || "family";
  const email = location.state?.email || "";
  
  const [formData, setFormData] = useState({
    profilePhoto: "",
    address: "",
    idProof: "",
    bio: "",
    availability: "",
  });

  const [progress, setProgress] = useState(0);

  const calculateProgress = () => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => field.trim() !== "").length;
    const newProgress = (filledFields / fields.length) * 100;
    setProgress(newProgress);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
    
    // Calculate progress
    const fields = Object.values(newFormData);
    const filledFields = fields.filter(field => field.trim() !== "").length;
    const newProgress = (filledFields / fields.length) * 100;
    setProgress(newProgress);
  };

  const handleFileUpload = (fieldName: string) => {
    // Simulate file upload
    const newFormData = {
      ...formData,
      [fieldName]: "uploaded-file.jpg",
    };
    setFormData(newFormData);
    
    // Calculate progress
    const fields = Object.values(newFormData);
    const filledFields = fields.filter(field => field.trim() !== "").length;
    const newProgress = (filledFields / fields.length) * 100;
    setProgress(newProgress);
    
    toast({
      title: "File uploaded",
      description: `Your ${fieldName === 'profilePhoto' ? 'profile photo' : 'ID proof'} has been uploaded successfully.`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Profile completed!",
      description: "Welcome to Sahaay! Redirecting to your dashboard...",
    });

    // Navigate to appropriate dashboard based on user type
    setTimeout(() => {
      if (userType === "family") {
        navigate("/dashboard/family");
      } else {
        navigate("/dashboard/student");
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/verify-otp")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Verification
        </Button>

        <Card className="card-feature">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Complete Your Profile ✨
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {userType === "family" 
                ? "Help us connect you with the right caregivers"
                : "Let families know more about you"
              }
            </CardDescription>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Profile completion</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Photo */}
              <div className="space-y-3">
                <Label>Profile Photo</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={formData.profilePhoto} />
                    <AvatarFallback>
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleFileUpload('profilePhoto')}
                    className="rounded-2xl"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">Address/City</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Your city or address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* ID Proof */}
              <div className="space-y-3">
                <Label>
                  {userType === "family" ? "ID Proof" : "Student ID Card"}
                </Label>
                <div className="border-2 border-dashed border-border rounded-2xl p-6 text-center">
                  {formData.idProof ? (
                    <div className="text-green-600">
                      ✓ {userType === "family" ? "ID proof" : "Student ID"} uploaded
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Upload your {userType === "family" ? "government ID" : "student ID card"}
                      </p>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleFileUpload('idProof')}
                    className="mt-3 rounded-2xl"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {formData.idProof ? "Change File" : "Upload File"}
                  </Button>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder={
                    userType === "family" 
                      ? "Tell us about your family and what kind of help you need..."
                      : "Tell us about yourself, your skills, and why you want to help..."
                  }
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="min-h-[100px] resize-none"
                />
              </div>

              {/* Availability (for students only) */}
              {userType === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="availability"
                      name="availability"
                      type="text"
                      placeholder="e.g., Weekdays 3-6 PM, Weekends flexible"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full btn-hero rounded-2xl h-12"
                disabled={progress < 80}
              >
                Go to My Dashboard
              </Button>
            </form>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                By completing your profile, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompleteProfile;