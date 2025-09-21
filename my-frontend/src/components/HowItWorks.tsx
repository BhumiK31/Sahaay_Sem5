import { FileText, UserCheck, MessageCircle, CreditCard, UserPlus, Users, CheckCircle, Star } from 'lucide-react';

const HowItWorks = () => {
  const familySteps = [
    {
      icon: FileText,
      title: 'Post a need',
      description: 'Tell us what kind of help you need and when you need it.'
    },
    {
      icon: UserCheck,
      title: 'Match with verified helpers',
      description: 'We connect you with verified local helpers who meet your requirements.'
    },
    {
      icon: MessageCircle,
      title: 'Chat & schedule',
      description: 'Connect directly with helpers and schedule your service.'
    },
    {
      icon: CreditCard,
      title: 'Pay securely & rate',
      description: 'Pay through our secure platform and rate your experience.'
    }
  ];

  const helperSteps = [
    {
      icon: UserPlus,
      title: 'Sign up & verify',
      description: 'Create your profile and complete our verification process.'
    },
    {
      icon: Users,
      title: 'Get matched',
      description: 'Receive job opportunities that match your skills and availability.'
    },
    {
      icon: CheckCircle,
      title: 'Do the job',
      description: 'Provide excellent service and build relationships with families.'
    },
    {
      icon: Star,
      title: 'Get paid & build ratings',
      description: 'Receive secure payments and build your reputation on the platform.'
    }
  ];

  const StepCard = ({ icon: Icon, title, description, index }: { 
    icon: React.ElementType, 
    title: string, 
    description: string,
    index: number 
  }) => (
    <div className="relative">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center relative">
            <Icon className="w-6 h-6 text-primary-foreground" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-coral rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">{index + 1}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-poppins font-semibold text-foreground mb-2">
            {title}
          </h3>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      
      {/* Connector line for desktop */}
      {index < 3 && (
        <div className="hidden lg:block absolute top-6 left-6 w-0.5 h-16 bg-border mt-6"></div>
      )}
    </div>
  );

  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple steps to get help or start helping others in your community.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* For Families */}
          <div>
            <div className="text-center lg:text-left mb-8">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                For Families
              </div>
              <h3 className="text-2xl font-poppins font-bold text-foreground">
                Get the help you need
              </h3>
            </div>

            <div className="space-y-8">
              {familySteps.map((step, index) => (
                <StepCard
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* For Helpers */}
          <div>
            <div className="text-center lg:text-left mb-8">
              <div className="inline-block bg-accent-coral/10 text-accent-coral px-4 py-2 rounded-full text-sm font-medium mb-4">
                For Helpers
              </div>
              <h3 className="text-2xl font-poppins font-bold text-foreground">
                Start earning while helping
              </h3>
            </div>

            <div className="space-y-8">
              {helperSteps.map((step, index) => (
                <StepCard
                  key={index}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;