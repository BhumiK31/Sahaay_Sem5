import { Search, UserCheck, MessageSquare, CreditCard, UserPlus, Star } from 'lucide-react';
const HowItWorks = () => {
  const familySteps = [{
    icon: Search,
    number: '1',
    title: 'Post a need',
    description: 'Tell us what kind of help you need, when, and where.'
  }, {
    icon: UserCheck,
    number: '2',
    title: 'Match with verified helpers',
    description: 'We connect you with background-checked helpers in your area.'
  }, {
    icon: MessageSquare,
    number: '3',
    title: 'Chat & schedule',
    description: 'Connect directly with your helper to arrange details.'
  }, {
    icon: CreditCard,
    number: '4',
    title: 'Pay securely & rate',
    description: 'Safe payment processing and feedback system for quality.'
  }];
  const helperSteps = [{
    icon: UserPlus,
    number: '1',
    title: 'Sign up & verify',
    description: 'Create your profile and complete our verification process.'
  }, {
    icon: Search,
    number: '2',
    title: 'Get matched',
    description: 'Receive notifications for jobs that match your skills and location.'
  }, {
    icon: MessageSquare,
    number: '3',
    title: 'Do the job',
    description: 'Connect with families and provide your quality service.'
  }, {
    icon: Star,
    number: '4',
    title: 'Get paid & build ratings',
    description: 'Receive payment and build your reputation for more opportunities.'
  }];
  return <section id="how-it-works" className="section-padding bg-secondary/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple steps to get help or start earning - designed for both families and helpers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* For Families */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-poppins font-semibold text-primary mb-4 text-center">
                For Families
              </h3>
              <p className="text-muted-foreground text-center">
                Get the help you need in just a few simple steps
              </p>
            </div>

            <div className="space-y-6">
              {familySteps.map((step, index) => <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className="w-5 h-5 text-primary bg-slate-50" />
                      <h4 className="text-foreground font-bold text-center">{step.title}</h4>
                    </div>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>)}
            </div>
          </div>

          {/* For Helpers */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-poppins font-semibold text-accent-coral mb-4 text-center">
                For Helpers
              </h3>
              <p className="text-muted-foreground text-center">
                Start earning while helping your community
              </p>
            </div>

            <div className="space-y-6">
              {helperSteps.map((step, index) => <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <step.icon className="w-5 h-5 text-accent-coral" />
                      <h4 className="text-foreground font-bold text-center">{step.title}</h4>
                    </div>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HowItWorks;