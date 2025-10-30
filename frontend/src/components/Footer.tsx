import { Heart, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Services', href: '#services' },
    { name: 'Trust & Safety', href: '#trust-safety' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-foreground text-white mt-24"> 
      {/* ↑ Added margin-top (mt-24) to create clear space above footer */}
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-7xl">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div className="space-y-4">
            <p className="text-white/80 max-w-sm text-sm leading-relaxed">
              Connecting families with trusted local helpers for all your care needs. 
              Building a community of support, one connection at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-poppins font-semibold text-lg">Quick Links</h4>
            <nav className="space-y-2">
              {quickLinks.map(link => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-white/80 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-poppins font-semibold text-lg">Our Services</h4>
            <nav className="space-y-1 text-white/80 text-sm">
              <p>Child Care</p>
              <p>Senior Care</p>
              <p>Adult Support</p>
              <p>Pet Care</p>
              <p>Tutoring</p>
              <p>Errand Support</p>
            </nav>
          </div>

          {/* Legal & Social */}
          <div className="space-y-4">
            <h4 className="font-poppins font-semibold text-lg">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <div className="space-y-2 text-white/80 text-sm">
              <a href="#" className="block hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
          <p className="text-white/60">
            © 2025 Sahaay. All rights reserved.
          </p>
          <p className="text-white/60 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-accent-coral" /> for families and helpers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
