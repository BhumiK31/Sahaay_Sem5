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
  return;
};
export default HelperSignup;