import {
  Search,
  UserCheck,
  MessageSquare,
  CreditCard,
  UserPlus,
  Star,
} from "lucide-react";

const HowItWorks = () => {
  const familySteps = [
    {
      icon: Search,
      title: "Post a need",
      description: "Tell us what kind of help you need, when, and where.",
    },
    {
      icon: UserCheck,
      title: "Match with verified helpers",
      description:
        "We connect you with background-checked helpers in your area.",
    },
    {
      icon: MessageSquare,
      title: "Chat & schedule",
      description: "Connect directly with your helper to arrange details.",
    },
    {
      icon: CreditCard,
      title: "Pay securely & rate",
      description:
        "Safe payment processing and feedback system for quality assurance.",
    },
  ];

  const helperSteps = [
    {
      icon: UserPlus,
      title: "Sign up & verify",
      description: "Create your profile and complete our verification process.",
    },
    {
      icon: Search,
      title: "Get matched",
      description:
        "Receive notifications for jobs that match your skills and location.",
    },
    {
      icon: MessageSquare,
      title: "Do the job",
      description:
        "Connect with families and provide your quality service seamlessly.",
    },
    {
      icon: Star,
      title: "Get paid & build ratings",
      description:
        "Receive payment and build your reputation for more opportunities.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 bg-gradient-to-br from-[#f9fafb] to-[#eef2f7] flex justify-center backdrop-blur-lg"
    >
      <div className="w-[90%] max-w-7xl bg-white/60 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-white/30 p-10">
        {/* Heading Section */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            How It Works
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Simple steps to get help or start earning — designed for both
            families and helpers.
          </p>
          <div className="mt-4 w-24 h-[3px] bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-2 gap-12 relative">
          {/* Divider */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-200"></div>

          {/* For Families */}
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-semibold mb-1">
                For Families
              </h3>
              <p className="text-sm text-gray-600">
                Get the help you need in a few simple steps
              </p>
            </div>

            {familySteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl 
                hover:shadow-[0_4px_15px_rgba(59,130,246,0.25)] hover:border-blue-300 
                transition-all duration-300 hover:scale-[1.03]"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100/60 text-blue-500 flex-shrink-0">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-snug">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* For Helpers */}
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-semibold mb-1">
                For Helpers
              </h3>
              <p className="text-sm text-gray-600">
                Start earning while helping your community
              </p>
            </div>

            {helperSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl  
                hover:shadow-[0_4px_15px_rgba(59,130,246,0.25)] hover:border-blue-300 
                transition-all duration-300 hover:scale-[1.03]"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100/60 text-blue-500 flex-shrink-0">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-snug">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
