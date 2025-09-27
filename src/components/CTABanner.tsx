import { Button } from '@/components/ui/button';
const CTABanner = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section className="section-padding from-primary via-accent-coral to-accent-mint bg-[Daily_credits_reset_at_midnight_UTC] bg-[#696969]">
      <div className="container-width">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-white mb-6">
            Ready to get help—or start earning?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Join thousands of families and helpers who trust Sahaay for their care needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button onClick={() => scrollToSection('#services')} className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:scale-105 shadow-[var(--shadow-soft)]">
              Find Help
            </Button>
            <Button onClick={() => scrollToSection('#signup')} className="bg-white/10 text-white border border-white/30 hover:bg-white/20 text-lg px-8 py-4 rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:scale-105">
              Offer Help
            </Button>
          </div>

          {/* Mini trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-white/80 text-sm mt-12">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Background Verified
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Secure Payments
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full"></span>
              24/7 Support
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default CTABanner;