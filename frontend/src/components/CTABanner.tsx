import { Button } from '@/components/ui/button';

const CTABanner = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="section-padding bg-[#4687e2]">
      <div className="container-width">
        <div className="text-center space-y-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-poppins font-bold text-white mb-4">
            Ready to get help—or start earning?
          </h2>

          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Join thousands of families and helpers who trust Sahaay for their care needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-6">
            <Button
              onClick={() => scrollToSection('#services')}
              className="bg-white text-primary hover:bg-white/90 text-base px-8 py-4 rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:scale-105 shadow-[var(--shadow-soft)]"
            >
              Find Help
            </Button>

            {/* Offer Help now goes to the same section */}
            <Button
              onClick={() => scrollToSection('#services')}
              className="bg-white/10 text-white border border-white/30 hover:bg-white/20 text-base px-8 py-4 rounded-[var(--radius-lg)] font-medium transition-all duration-300 hover:scale-105"
            >
              Offer Help
            </Button>
          </div>

          {/* Mini trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-white/80 text-xs mt-10">
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
    </section>
  );
};

export default CTABanner;
