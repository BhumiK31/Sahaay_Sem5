import { Clock, MapPin, GraduationCap, Globe } from 'lucide-react';

const WhySahaay = () => {
  const usps = [
    {
      icon: Clock,
      title: 'Quick Matching',
      description: 'Find help in minutes, not days. Our smart matching connects you with available helpers instantly.',
      color: 'accent-coral'
    },
    {
      icon: MapPin,
      title: 'Local & Verified',
      description: 'All helpers are background-checked locals in your community who understand your needs.',
      color: 'primary'
    },
    {
      icon: GraduationCap,
      title: 'Student-Friendly',
      description: 'Flexible opportunities perfect for students and young adults looking to earn while helping.',
      color: 'accent-mint'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Helpers who speak your language and understand your cultural preferences.',
      color: 'highlight-yellow'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'accent-coral':
        return 'bg-accent-coral/10 text-accent-coral';
      case 'primary':
        return 'bg-primary/10 text-primary';
      case 'accent-mint':
        return 'bg-accent-mint/10 text-accent-mint';
      case 'highlight-yellow':
        return 'bg-highlight-yellow/10 text-highlight-yellow';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-foreground mb-6">
            Why Choose Sahaay?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're more than just a platform - we're building a community of care and support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {usps.map((usp, index) => (
            <div 
              key={index} 
              className="why-sahaay-card text-center space-y-4 p-6 bg-card rounded-[var(--radius-lg)] border border-border/50 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:scale-105 hover:border-primary/20 hover:bg-card/80"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getColorClasses(usp.color)}`}>
                <usp.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-poppins font-semibold text-foreground">
                {usp.title}
              </h3>
              <p className="text-muted-foreground">
                {usp.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <p className="text-3xl font-poppins font-bold text-primary">2,000+</p>
            <p className="text-muted-foreground">Verified Helpers</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-poppins font-bold text-accent-coral">10,000+</p>
            <p className="text-muted-foreground">Hours Supported</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-poppins font-bold text-accent-mint">50+</p>
            <p className="text-muted-foreground">Cities Served</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySahaay;