import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-accent-mint rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✓</span>
          </div>
          <h3 className="text-2xl font-poppins font-bold text-foreground mb-4">
            Thank you for reaching out!
          </h3>
          <p className="text-muted-foreground mb-6">
            We've received your message and will get back to you within 24 hours.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)} 
            variant="outline"
            className="rounded-2xl"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-4">
          Get in Touch
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have a question or want to learn more about Sahaay? We'd love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Full Name *
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
                className="rounded-xl"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
                className="rounded-xl"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message *
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us how we can help you..."
                required
                className="rounded-xl min-h-[120px]"
                rows={5}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full btn-hero rounded-2xl"
              size="lg"
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-poppins font-bold text-foreground mb-6">
              Other ways to reach us
            </h3>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-poppins font-semibold text-foreground mb-1">
                  Email Us
                </h4>
                <p className="text-muted-foreground mb-2">
                  For general inquiries and support
                </p>
                <a 
                  href="mailto:support@sahaay.com" 
                  className="text-primary hover:underline font-medium"
                >
                  support@sahaay.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent-coral/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-accent-coral" />
              </div>
              <div>
                <h4 className="font-poppins font-semibold text-foreground mb-1">
                  Call Us
                </h4>
                <p className="text-muted-foreground mb-2">
                  Available 24/7 for urgent support
                </p>
                <a 
                  href="tel:+911234567890" 
                  className="text-primary hover:underline font-medium"
                >
                  +91 123 456 7890
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-accent-mint/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-accent-mint" />
              </div>
              <div>
                <h4 className="font-poppins font-semibold text-foreground mb-1">
                  WhatsApp
                </h4>
                <p className="text-muted-foreground mb-2">
                  Quick responses for your queries
                </p>
                <a 
                  href="https://wa.me/911234567890" 
                  className="text-primary hover:underline font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +91 123 456 7890
                </a>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="bg-muted/50 rounded-2xl p-6">
            <h4 className="font-poppins font-semibold text-foreground mb-3">
              Office Hours
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Emergency support only</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;