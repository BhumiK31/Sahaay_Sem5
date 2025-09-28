import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Upload } from 'lucide-react';
const HelperSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    services: [] as string[],
    availability: '',
    experience: '',
    agreed: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const serviceOptions = ['Child Care', 'Senior Care', 'Adult Support', 'Pet Care', 'Tutoring', 'Errand Support'];
  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const toggleService = (service: string) => {
    const newServices = formData.services.includes(service) ? formData.services.filter(s => s !== service) : [...formData.services, service];
    handleInputChange('services', newServices);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form after a delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        services: [],
        availability: '',
        experience: '',
        agreed: false
      });
    }, 3000);
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center section-padding">
      <div className="w-full max-w-2xl">
        {isSubmitted ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-poppins font-bold text-foreground">Application Submitted!</h2>
            <p className="text-muted-foreground">Thank you for joining Sahaay. We'll review your application and get back to you soon.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-poppins font-bold text-foreground mb-2">Become a Helper</h1>
              <p className="text-muted-foreground">Join our community and start making a difference</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter your city"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Services Offered</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {serviceOptions.map((service) => (
                    <div
                      key={service}
                      onClick={() => toggleService(service)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        formData.services.includes(service)
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span className="text-sm font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Availability</label>
                <Textarea
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  placeholder="Describe your availability (days, hours, etc.)"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Experience & Background</label>
                <Textarea
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="Tell us about your relevant experience and background"
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreed}
                  onCheckedChange={(checked) => handleInputChange('agreed', checked)}
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions and privacy policy
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full btn-hero"
                disabled={!formData.agreed || formData.services.length === 0}
              >
                Submit Application
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default HelperSignup;