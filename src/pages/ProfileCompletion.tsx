import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import sahaayLogo from '@/assets/sahaay-logo.png';
import { Upload, User, MapPin, FileText, Clock } from 'lucide-react';

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const [userRole] = useState<'family' | 'student'>('family'); // This would come from signup context
  const [formData, setFormData] = useState({
    profilePhoto: null as File | null,
    address: '',
    city: '',
    idProof: null as File | null,
    bio: '',
    availability: ''
  });

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const calculateProgress = () => {
    const fields = Object.values(formData);
    const filledFields = fields.filter(field => 
      field !== null && field !== ''
    ).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile completion
    console.log('Profile completion:', formData);
    
    // Redirect based on role
    if (userRole === 'family') {
      navigate('/family-dashboard');
    } else {
      navigate('/student-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center section-padding">
      <div className="w-full max-w-2xl space-y-8">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img src={sahaayLogo} alt="SAHAAY" className="h-10 w-auto" />
          </div>
        </div>

        <Card className="shadow-[var(--shadow-hover)]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-poppins">Complete Your Profile ✨</CardTitle>
            <CardDescription>
              Help us personalize your Sahaay experience
            </CardDescription>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Profile Completion</span>
                <span>{calculateProgress()}%</span>
              </div>
              <Progress value={calculateProgress()} className="w-full" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Photo */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile Photo
                </Label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                    {formData.profilePhoto ? (
                      <img 
                        src={URL.createObjectURL(formData.profilePhoto)} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      id="profilePhoto"
                      accept="image/*"
                      onChange={(e) => handleFileChange('profilePhoto', e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('profilePhoto')?.click()}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </Button>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Enter your address"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter your city"
                    required
                  />
                </div>
              </div>

              {/* ID Proof */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  ID Proof ({userRole === 'family' ? 'Government ID' : 'Student Card'})
                </Label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    id="idProof"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange('idProof', e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('idProof')?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload {userRole === 'family' ? 'Government ID' : 'Student Card'}
                  </Button>
                  {formData.idProof && (
                    <span className="text-sm text-muted-foreground">
                      {formData.idProof.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us a bit about yourself..."
                  rows={3}
                  required
                />
              </div>

              {/* Availability (for Students) */}
              {userRole === 'student' && (
                <div className="space-y-2">
                  <Label htmlFor="availability" className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Availability
                  </Label>
                  <Textarea
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    placeholder="Describe your availability (days, hours, etc.)"
                    rows={2}
                    required
                  />
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full btn-hero"
                disabled={calculateProgress() < 80}
              >
                Go to My Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileCompletion;