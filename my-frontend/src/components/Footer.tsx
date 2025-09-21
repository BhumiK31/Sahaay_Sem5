import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Services', href: '#services' },
    { name: 'Trust & Safety', href: '#trust-safety' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'Contact', href: '#contact' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refund' }
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Handle external links
      window.open(href, '_blank');
    }
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-accent-coral rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-2xl font-poppins font-bold text-accent-coral">
                SAHAAY
              </span>
            </div>
            
            <p className="text-background/80 mb-6 max-w-md">
              Connecting families with verified local helpers for trusted, community-based care services. 
              Help when you need it, work when you want it.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                className="w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center hover:bg-accent-coral transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5 text-background group-hover:text-white" />
              </a>
              <a 
                href="https://twitter.com" 
                className="w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center hover:bg-accent-coral transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5 text-background group-hover:text-white" />
              </a>
              <a 
                href="https://instagram.com" 
                className="w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center hover:bg-accent-coral transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 text-background group-hover:text-white" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="w-10 h-10 bg-background/10 rounded-xl flex items-center justify-center hover:bg-accent-coral transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 text-background group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-background mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-background/80 hover:text-accent-coral transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-poppins font-semibold text-background mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-background/80 hover:text-accent-coral transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/60 text-sm">
              © 2025 Sahaay. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-2 text-background/60 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-accent-coral fill-current" />
              <span>for community care</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;