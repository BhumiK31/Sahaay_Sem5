import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Heart, Home, Handshake } from 'lucide-react';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };
  return <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/5dfe0aba-bd97-4cd3-80f8-8dea6a136f2a.png" 
              alt="SAHAAY Logo" 
              className="h-20 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-foreground hover:text-primary transition-colors">
              How it works
            </button>
            <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-primary transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('trust-safety')} className="text-foreground hover:text-primary transition-colors">
              Trust & Safety
            </button>
            <button onClick={() => scrollToSection('faqs')} className="text-foreground hover:text-primary transition-colors">
              FAQs
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors">
              Contact
            </button>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button onClick={() => navigate('/login')} className="rounded-2xl h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90">
              Login
            </Button>
            <Button onClick={() => navigate('/signup')} variant="outline" className="rounded-2xl h-10 px-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col space-y-4 mt-4">
              <button onClick={() => scrollToSection('home')} className="text-left text-foreground hover:text-primary transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-left text-foreground hover:text-primary transition-colors">
                How it works
              </button>
              <button onClick={() => scrollToSection('services')} className="text-left text-foreground hover:text-primary transition-colors">
                Services
              </button>
              <button onClick={() => scrollToSection('trust-safety')} className="text-left text-foreground hover:text-primary transition-colors">
                Trust & Safety
              </button>
              <button onClick={() => scrollToSection('faqs')} className="text-left text-foreground hover:text-primary transition-colors">
                FAQs
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-foreground hover:text-primary transition-colors">
                Contact
              </button>
              
              <div className="flex flex-col space-y-2 pt-4">
                <Button onClick={() => navigate('/login')} className="rounded-2xl w-full h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90">
                  Login
                </Button>
                <Button onClick={() => navigate('/signup')} variant="outline" className="rounded-2xl w-full h-10 px-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>}
      </div>
    </header>;
};
export default Header;