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

  const serviceOptions = [
    'Child Care',
    'Senior Care', 
    'Adult Support',
    'Pet Care',
    'Tutoring',
    'Errand Support'
  ];

  const handleInputChange = (field: string, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: string) => {
    const newServices = formData.services.includes(service)
      ? formData.services.filter(s => s !== service)
      : [...formData.services, service];
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
    <section id="signup" className="section-padding bg-background">
      <div className="container-width">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-foreground mb-6">
              Become a Helper
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our community of trusted helpers and start earning while making a difference in your neighborhood.
            </p>
          </div>

          <div className="service-card">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <UserPlus className="w-8 h-8 text-accent-coral" />
                  <h3 className="text-2xl font-poppins font-semibold text-foreground">
                    Helper Application
                  </h3>
                </div>

                {/* Personal Information */}
                <div className="space-y-6">
                  <h4 className="text-lg font-poppins font-semibold text-foreground">
                    Personal Information
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full legal name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City/Pincode *</label>
                      <Input
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="City or pincode where you can work"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-6">
                  <h4 className="text-lg font-poppins font-semibold text-foreground">
                    Services You Can Provide
                  </h4>
                  <p className="text-muted-foreground">
                    Select all services you're comfortable providing (select at least one)
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {serviceOptions.map((service) => (
                      <div
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-200 ${
                          formData.services.includes(service)
                            ? 'border-accent-coral bg-accent-coral/5'
                            : 'border-border hover:border-accent-coral/50'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.services.includes(service)}
                            onChange={() => toggleService(service)}
                          />
                          <span className="text-sm font-medium">{service}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability & Experience */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Availability *</label>
                    <Textarea
                      value={formData.availability}
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                      placeholder="When are you available? (e.g., Weekdays 9 AM - 5 PM, Weekends flexible, Evenings only, etc.)"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Experience & Skills</label>
                    <Textarea
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      placeholder="Tell us about your relevant experience, skills, or qualifications (optional but helpful)"
                      rows={4}
                    />
                  </div>
                </div>

                {/* ID Upload */}
                <div className="space-y-4">
                  <h4 className="text-lg font-poppins font-semibold text-foreground">
                    Verification Documents
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    We'll need to verify your identity for safety. You can upload documents now or later.
                  </p>
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent-coral/50 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Aadhaar, PAN, Driving License, or Passport (PDF, JPG, PNG)
                    </p>
                  </div>
                </div>

                {/* Agreement */}
                <div className="flex items-start space-x-3 p-4 bg-secondary/50 rounded-lg">
                  <Checkbox
                    id="helper-agreement"
                    checked={formData.agreed}
                    onCheckedChange={(checked) => handleInputChange('agreed', checked as boolean)}
                  />
                  <label htmlFor="helper-agreement" className="text-sm leading-relaxed">
                    I agree to Sahaay's <span className="text-primary">Terms of Service</span> and{' '}
                    <span className="text-primary">Privacy Policy</span>. I understand that I will undergo 
                    background verification and agree to provide quality services with honesty and integrity.
                  </label>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={!formData.agreed || formData.services.length === 0}
                    className="btn-coral w-full text-lg py-4"
                  >
                    Submit Application
                  </Button>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    We'll review your application and get back to you within 2-3 business days.
                  </p>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-8 py-12">
                <div className="text-8xl mb-6">🎉</div>
                <h3 className="text-3xl font-poppins">Application Submitted!</h3>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Thank you for joining the Sahaay community! We've received your application 
                  and our team will review it within 2-3 business days.
                </p>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>What happens next?</strong>
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="font-medium">1. Application Review</p>
                      <p className="text-muted-foreground">We review your application</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="font-medium">2. Verification</p>
                      <p className="text-muted-foreground">Background & document check</p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="font-medium">3. Get Started</p>
                      <p className="text-muted-foreground">Start receiving job requests</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelperSignup;