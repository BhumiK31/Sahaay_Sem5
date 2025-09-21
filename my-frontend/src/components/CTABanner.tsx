import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTABanner = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent-mint rounded-3xl p-12 lg:p-16 text-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/50 rounded-full"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/30 rounded-full"></div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-white mb-6">
              Ready to get help—or start earning?
            </h2>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of families and helpers who trust Sahaay for their community care needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => scrollToSection('services')}
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 rounded-2xl font-semibold group"
              >
                Find Help
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                onClick={() => scrollToSection('signup')}
                variant="outline"
                size="lg" 
                className="border-white border-2 text-white hover:bg-white hover:text-primary text-lg px-8 py-4 rounded-2xl font-semibold group"
              >
                Offer Help
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Additional Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-white/80">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-white/80">Verified Helpers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Safe</div>
                <div className="text-sm text-white/80">Secure Payments</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;