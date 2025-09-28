import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { X, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Service {
  title: string;
  description: string;
  tasks: string[];
  lucideIcon: LucideIcon;
}

interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal = ({ service, isOpen, onClose }: ServiceModalProps) => {
  const navigate = useNavigate();
  const [modalView, setModalView] = useState<'details' | 'need' | 'work' | 'success'>('details');

  const handleINeedCare = () => {
    navigate('/login?role=family');
  };

  const handleIWantToWork = () => {
    navigate('/signup?role=student');
  };
  const [formData, setFormData] = useState({
    location: '',
    datetime: '',
    duration: '',
    notes: '',
    name: '',
    phone: '',
    email: '',
    city: '',
    services: '',
    availability: '',
    agreed: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalView('success');
  };

  const resetModal = () => {
    setModalView('details');
    setFormData({
      location: '',
      datetime: '',
      duration: '',
      notes: '',
      name: '',
      phone: '',
      email: '',
      city: '',
      services: '',
      availability: '',
      agreed: false
    });
    onClose();
  };

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-poppins flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[hsl(var(--service-category-bg))] border border-[hsl(var(--service-category))]/20">
                <service.lucideIcon className="w-6 h-6 text-[hsl(var(--service-category))]" />
              </div>
              {service.title}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetModal}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {modalView === 'details' && (
          <div className="space-y-6">
            <p className="text-muted-foreground text-lg">{service.description}</p>
            
            <div>
              <h4 className="font-semibold mb-3">Common tasks include:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {service.tasks.map((task, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {task}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={handleINeedCare}
                className="btn-hero flex-1"
              >
                I need care
              </Button>
              <Button
                onClick={handleIWantToWork}
                className="btn-coral flex-1"
              >
                I want to work
              </Button>
            </div>
          </div>
        )}

        {modalView === 'need' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-poppins">Tell us about your needs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Location (Pincode)</label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter pincode"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date & Time</label>
                <Input
                  type="datetime-local"
                  value={formData.datetime}
                  onChange={(e) => handleInputChange('datetime', e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <Input
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="e.g., 2 hours, 3 days, ongoing"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Notes</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any specific requirements or details..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Contact Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Your phone number"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms-need"
                checked={formData.agreed}
                onCheckedChange={(checked) => handleInputChange('agreed', checked as boolean)}
              />
              <label htmlFor="terms-need" className="text-sm">
                I agree to the terms and conditions
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                onClick={() => setModalView('details')}
                className="btn-secondary flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={!formData.agreed}
                className="btn-hero flex-1"
              >
                Submit Request
              </Button>
            </div>
          </form>
        )}

        {modalView === 'work' && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-xl font-poppins">Join as a Helper</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Your phone number"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">City/Pincode</label>
              <Input
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="City or pincode where you can provide services"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Services you can provide</label>
              <Input
                value={formData.services}
                onChange={(e) => handleInputChange('services', e.target.value)}
                placeholder="e.g., Child care, Pet walking, Tutoring"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Availability</label>
              <Textarea
                value={formData.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                placeholder="When are you available? (days, times, etc.)"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Upload ID (placeholder)</label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center text-muted-foreground">
                Click to upload or drag and drop your ID proof
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms-work"
                checked={formData.agreed}
                onCheckedChange={(checked) => handleInputChange('agreed', checked as boolean)}
              />
              <label htmlFor="terms-work" className="text-sm">
                I agree to verification and terms of service
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                onClick={() => setModalView('details')}
                className="btn-secondary flex-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={!formData.agreed}
                className="btn-coral flex-1"
              >
                Apply to be a Helper
              </Button>
            </div>
          </form>
        )}

        {modalView === 'success' && (
          <div className="text-center space-y-6 py-8">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-poppins">Thank you!</h3>
            <p className="text-muted-foreground">
              We've received your request and will reach out to you soon.
            </p>
            <Button onClick={resetModal} className="btn-hero">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ServiceModal;