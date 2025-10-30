import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="section-padding bg-secondary/30 pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-poppins font-bold text-foreground mb-2">
            Get in Touch
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Have questions or need support? We'd love to hear from you.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Contact Info */}
          <div className="flex flex-col justify-between space-y-6 bg-card rounded-xl p-5 sm:p-6 border border-blue-100 shadow-[0_0_10px_rgba(59,130,246,0.08)] hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-shadow duration-300 h-full">
            <div>
              <h3 className="text-lg font-poppins font-semibold text-foreground mb-2">
                Let’s Connect
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Whether you're a family looking for help or someone who wants to join our helper community, 
                we're here to support you every step of the way.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Email Support</p>
                  <p className="text-muted-foreground text-sm">support@sahaay.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-accent-coral/10 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-accent-coral" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">WhatsApp Support</p>
                  <p className="text-muted-foreground text-sm">+91 98765 43210</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="pt-3 border-t border-border/50">
              <h4 className="font-semibold text-foreground mb-2 text-sm">Quick Contact</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={() => window.open('mailto:support@sahaay.com', '_blank')}
                  className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 transition text-sm py-2"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </Button>
                <Button
                  onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                  className="flex-1 bg-accent-coral/10 text-accent-coral hover:bg-accent-coral/20 transition text-sm py-2"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-card rounded-xl p-5 sm:p-6 border border-blue-100 shadow-[0_0_10px_rgba(59,130,246,0.08)] hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-shadow duration-300 h-full flex flex-col justify-between">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 flex flex-col flex-grow">
                <h3 className="text-base font-poppins font-semibold text-foreground mb-1">
                  Send us a message
                </h3>

                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Your full name"
                    required
                    className="w-full text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="w-full text-sm"
                  />
                </div>

                <div className="flex-grow">
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="How can we help you?"
                    rows={3}
                    required
                    className="w-full text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm shadow-md hover:shadow-lg transition-all py-2"
                >
                  Send Message
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4 py-6 flex-grow flex flex-col justify-center">
                <div className="text-4xl mb-2">✅</div>
                <h3 className="text-lg font-poppins font-semibold text-foreground">Thank you!</h3>
                <p className="text-sm text-muted-foreground">
                  We've received your message and will get back to you within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
