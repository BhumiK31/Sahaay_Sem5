import { Shield, Star, MessageSquare, CreditCard, FileCheck, Headphones } from 'lucide-react';

const TrustSafety = () => {
  const features = [
    {
      icon: Shield,
      title: 'ID & Background Verification',
      description: 'All helpers undergo thorough identity and background verification before joining our platform.'
    },
    {
      icon: Star,
      title: 'Ratings & Reviews',
      description: 'Real reviews from families help you choose the right helper with confidence.'
    },
    {
      icon: MessageSquare,
      title: 'In-App Chat',
      description: 'Communicate safely through our platform without sharing personal contact details initially.'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'All payments are processed securely through our platform with protection for both parties.'
    },
    {
      icon: FileCheck,
      title: 'Digital Agreements',
      description: 'Clear service agreements are established before any booking to ensure mutual understanding.'
    },
    {
      icon: Headphones,
      title: 'Support & Reporting',
      description: '24/7 customer support and easy reporting system for any issues or concerns.'
    }
  ];

  return (
    <section id="trust-safety" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-4">
            Trust & Safety First
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your safety and peace of mind are our top priorities. We've built multiple layers of protection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="card-feature text-center group hover:shadow-card transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              
              <h3 className="text-xl font-poppins font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-accent-mint/10 text-accent-mint px-6 py-3 rounded-2xl">
            <span className="font-medium">🔒 Your safety is guaranteed with our comprehensive protection system</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSafety;