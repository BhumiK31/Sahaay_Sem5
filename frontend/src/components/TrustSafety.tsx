import { Shield, Star, MessageCircle, CreditCard, FileCheck, Headphones } from 'lucide-react';

const TrustSafety = () => {
  const trustFeatures = [
    {
      icon: Shield,
      title: 'ID & Background Verification',
      description:
        'All helpers undergo thorough identity and background checks before joining our platform.',
    },
    {
      icon: Star,
      title: 'Ratings & Reviews',
      description:
        'Transparent feedback system helps you choose the best helpers based on real experiences.',
    },
    {
      icon: MessageCircle,
      title: 'In-App Chat',
      description:
        'Secure messaging system keeps all communications safe and documented.',
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description:
        'Protected payment processing ensures safe transactions for both parties.',
    },
    {
      icon: FileCheck,
      title: 'Digital Agreements',
      description:
        'Clear terms and agreements before every booking protect everyone involved.',
    },
    {
      icon: Headphones,
      title: 'Support & Reporting',
      description:
        '24/7 customer support and easy reporting system for any concerns or issues.',
    },
  ];

  return (
    <section id="trust-safety" className="py-20 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-gray-900 mb-6">
            Trust & Safety First
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your safety and peace of mind are our top priorities. We've built multiple layers
            of protection to ensure secure, trustworthy connections.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {trustFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col justify-start text-center space-y-4 p-6 bg-white 
              rounded-2xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 
              hover:scale-[1.03] hover:border-blue-300 min-h-[260px]"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mx-auto mb-2">
                <feature.icon className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-base text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSafety;
