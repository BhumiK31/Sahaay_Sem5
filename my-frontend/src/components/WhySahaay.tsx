import { Zap, MapPin, Clock, Globe } from 'lucide-react';

const WhySahaay = () => {
  const benefits = [
    {
      icon: Zap,
      title: 'Quick Matching',
      description: 'Find the right helper in minutes, not days.',
      color: 'primary'
    },
    {
      icon: MapPin,
      title: 'Local & Verified',
      description: 'All helpers are locally based and thoroughly verified.',
      color: 'accent-coral'
    },
    {
      icon: Clock,
      title: 'Flexible for Students',
      description: 'Perfect opportunity for students to earn while helping.',
      color: 'accent-mint'
    },
    {
      icon: Globe,
      title: 'Multilingual Friendly',
      description: 'Helpers who speak your language and understand your culture.',
      color: 'highlight-yellow'
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      'primary': 'bg-primary/10 text-primary',
      'accent-coral': 'bg-accent-coral/10 text-accent-coral',
      'accent-mint': 'bg-accent-mint/10 text-accent-mint',
      'highlight-yellow': 'bg-highlight-yellow/10 text-highlight-yellow'
    };
    return colorMap[color as keyof typeof colorMap] || 'bg-primary/10 text-primary';
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-4">
            Why choose Sahaay?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're more than just a platform - we're your trusted community connection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="card-feature text-center group hover:shadow-card transition-all duration-300">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${getColorClasses(benefit.color)}`}>
                <benefit.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-poppins font-semibold text-foreground mb-3">
                {benefit.title}
              </h3>
              
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-card rounded-3xl p-8 shadow-soft">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2,000+</div>
              <div className="text-muted-foreground">Verified Helpers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-coral mb-2">10,000+</div>
              <div className="text-muted-foreground">Hours Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent-mint mb-2">500+</div>
              <div className="text-muted-foreground">Happy Families</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-highlight-yellow mb-2">50+</div>
              <div className="text-muted-foreground">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySahaay;