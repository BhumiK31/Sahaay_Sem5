import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-illustration.jpg';
const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="hero" className="section-padding bg-gradient-to-br from-background to-secondary/30">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-primary leading-tight">
                Bridging Needs with Deeds.
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Sahaay connects families with verified local helpers for child care, 
                senior support, tutoring, pet care and more.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => scrollToSection('#services')} className="btn-hero text-lg px-8 py-4">
                Find Help
              </Button>
              <Button onClick={() => scrollToSection('#signup')} className="btn-secondary text-lg px-8 py-4">
                Offer Help
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex gap-6 text-sm overflow-x-auto">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 bg-accent-mint rounded-full"></span>
                <span className="text-muted-foreground">
                  <span className="text-xl font-bold text-primary">2,000+</span> trusted helpers
                </span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 bg-highlight-yellow rounded-full"></span>
                <span className="text-muted-foreground">
                  <span className="text-xl font-bold text-primary">10,000+</span> families helped
                </span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="w-2 h-2 bg-accent-coral rounded-full"></span>
                <span className="text-muted-foreground">
                  <span className="text-xl font-bold text-primary">24/7</span> support available
                </span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-soft)]">
              <img src={heroImage} alt="Community helpers illustration showing hands reaching out with hearts and house symbols" className="w-full h-auto" />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent-coral rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-accent-mint rounded-full opacity-30 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;