import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-illustration.jpg';
const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="home" className="pt-32 pb-20 bg-gradient-to-br from-background to-accent-mint/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-poppins font-bold mb-6 leading-tight text-[#4687e2]">
              Bridging Needs with Deeds.{' '}
              <span className="text-primary"></span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Sahaay connects families with verified local helpers for child care, 
              senior support, tutoring, pet care and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button onClick={() => scrollToSection('services')} size="lg" className="btn-hero text-lg px-8 py-4 rounded-2xl shadow-hover">
                Find Help
              </Button>
              <Button onClick={() => scrollToSection('signup')} variant="outline" size="lg" className="text-lg px-8 py-4 rounded-2xl border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Offer Help
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start mt-12 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2,000+</div>
                <div className="text-sm text-muted-foreground">Verified Helpers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground">Hours Supported</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Happy Families</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative animate-float">
              <img src={heroImage} alt="Helping hands connecting families with trusted local helpers" className="w-full max-w-lg rounded-3xl shadow-card" />
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-accent-coral text-white p-3 rounded-2xl shadow-lg animate-pulse">
                ❤️
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-white p-3 rounded-2xl shadow-lg animate-pulse delay-75">
                🤝
              </div>
              <div className="absolute top-1/2 -right-6 bg-highlight-yellow text-foreground p-3 rounded-2xl shadow-lg animate-pulse delay-150">
                🏠
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;