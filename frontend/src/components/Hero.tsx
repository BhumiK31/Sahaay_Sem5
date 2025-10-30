import { Button } from '@/components/ui/button';

// ✨ New, realistic image suggestion below
import heroImage from '@/assets/hero-illustration.jpg'; // Replace this with your new image

const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="section-padding bg-gradient-to-br from-background to-secondary/30 pt-28 pb-20"
    >
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 pl-4 md:pl-10 lg:pl-16">
  <div className="space-y-6">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold text-primary leading-tight">
      Bridging Needs with Deeds.
    </h1>
    <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
      Sahaay connects families with verified local helpers for child care, 
      senior support, tutoring, pet care, and more — making care simple and trustworthy.
    </p>
  </div>


            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => scrollToSection('#services')}
                className="btn-hero text-base md:text-lg px-8 py-4"
              >
                Find Help
              </Button>
              <Button
                onClick={() => scrollToSection('#services')}
                className="btn-secondary text-base md:text-lg px-8 py-4"
              >
                Offer Help
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-mint rounded-full"></span>
                <span className="text-muted-foreground">
                  <span className="font-semibold text-primary">2,000+</span> trusted helpers
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-highlight-yellow rounded-full"></span>
                <span className="text-muted-foreground">
                  <span className="font-semibold text-primary">10,000+</span> families helped
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent-coral rounded-full"></span>
                <span className="text-muted-foreground">
                  <span className="font-semibold text-primary">24/7</span> support available
                </span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-[var(--radius-lg)] overflow-hidden shadow-[0_0_25px_rgba(59,130,246,0.15)]">
              <img
                src={heroImage}
                alt="A family receiving care and assistance from a trusted helper — representing compassion, trust, and community support"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Subtle floating accents */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent-coral rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-accent-mint rounded-full opacity-30 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
