import { Shield, Star, MessageCircle, CreditCard, FileCheck, Headphones } from 'lucide-react';
const TrustSafety = () => {
  const trustFeatures = [{
    icon: Shield,
    title: 'ID & Background Verification',
    description: 'All helpers undergo thorough identity and background checks before joining our platform.'
  }, {
    icon: Star,
    title: 'Ratings & Reviews',
    description: 'Transparent feedback system helps you choose the best helpers based on real experiences.'
  }, {
    icon: MessageCircle,
    title: 'In-App Chat',
    description: 'Secure messaging system keeps all communications safe and documented.'
  }, {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Protected payment processing ensures safe transactions for both parties.'
  }, {
    icon: FileCheck,
    title: 'Digital Agreements',
    description: 'Clear terms and agreements before every booking protect everyone involved.'
  }, {
    icon: Headphones,
    title: 'Support & Reporting',
    description: '24/7 customer support and easy reporting system for any concerns or issues.'
  }];
  return <section id="trust-safety" className="section-padding bg-background">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-foreground mb-6">
            Trust & Safety First
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your safety and peace of mind are our top priorities. We've built multiple layers 
            of protection to ensure secure, trustworthy connections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustFeatures.map((feature, index) => <div key={index} className="trust-safety-card text-center space-y-4 p-6 bg-card rounded-[var(--radius-lg)] border border-border/50 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-105 hover:border-accent-mint/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-mint/10 rounded-full">
                <feature.icon className="w-8 h-8 text-accent-mint" />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>)}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          
        </div>
      </div>
    </section>;
};
export default TrustSafety;