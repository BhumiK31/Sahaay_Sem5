import { Clock, MapPin, GraduationCap, Globe } from 'lucide-react';

const WhySahaay = () => {
  return (
    <section
      id="why-choose"
      className="py-14 bg-gradient-to-br from-[#f9fafb] to-[#eef2f7] backdrop-blur-lg"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Why Choose Sahaay?
          </h2>
          <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            We’re more than just a platform — we’re building a community of care and support.
          </p>
          <div className="mt-4 w-20 h-[3px] bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Cards in one line */}
        <div className="flex justify-center items-stretch gap-6 overflow-x-auto lg:overflow-visible px-2">
          {[
            {
              icon: <Clock className="w-7 h-7 text-blue-500" />,
              title: 'Quick Matching',
              desc: 'Find help in minutes — our smart system connects you instantly.',
            },
            {
              icon: <MapPin className="w-7 h-7 text-blue-500" />,
              title: 'Local & Verified',
              desc: 'Background-checked helpers from your own community.',
            },
            {
              icon: <GraduationCap className="w-7 h-7 text-blue-500" />,
              title: 'Student-Friendly',
              desc: 'Flexible, short-term opportunities ideal for students.',
            },
            {
              icon: <Globe className="w-7 h-7 text-blue-500" />,
              title: 'Multilingual Support',
              desc: 'Find helpers who speak your language and understand your needs.',
            },
          ].map((card, index) => (
            <div
              key={index}
              className="w-[240px] bg-white/60 backdrop-blur-md border border-white/40 
                         p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.08)]
                         hover:shadow-[0_4px_15px_rgba(59,130,246,0.3)]
                         hover:scale-[1.04] hover:border-blue-300
                         transition-all duration-300 ease-out text-center flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-blue-100/60 rounded-full shadow-inner">
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySahaay;
