import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How much does it cost to use Sahaay?',
      answer: 'Sahaay is free for families to find helpers. We charge a small service fee on successful bookings. Helpers keep the majority of their earnings with transparent, low platform fees.'
    },
    {
      question: 'How do you ensure the safety of your helpers?',
      answer: 'All our helpers undergo thorough background checks, ID verification, and skill assessment. We also have a rating system, in-app messaging, and 24/7 support to ensure everyone\'s safety.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'You can cancel bookings up to 24 hours in advance without penalty. For cancellations within 24 hours, a small fee may apply to compensate the helper for their reserved time.'
    },
    {
      question: 'How does the verification process work for helpers?',
      answer: 'Helpers must provide valid ID proof, undergo background verification, complete skill assessments, and provide references. Our team reviews each application thoroughly before approval.'
    },
    {
      question: 'What support is available if I have issues?',
      answer: 'We offer 24/7 customer support through chat, email, and phone. Our support team can help with bookings, payments, disputes, and any other concerns you may have.'
    },
    {
      question: 'Can I request the same helper for recurring services?',
      answer: 'Absolutely! Once you find a helper you trust, you can book them directly for recurring services. Many families build long-term relationships with their preferred helpers.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Got questions? We've got answers. Here are some of the most common questions about Sahaay.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-border last:border-b-0">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full py-6 px-0 text-left focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-poppins font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>
            </button>
            
            {openIndex === index && (
              <div className="pb-6 -mt-2">
                <div className="text-muted-foreground leading-relaxed animate-fade-in-up">
                  {faq.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional Help */}
      <div className="text-center mt-16">
        <div className="bg-muted/50 rounded-2xl p-8">
          <h3 className="text-xl font-poppins font-semibold text-foreground mb-2">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-4">
            Our support team is here to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@sahaay.com" 
              className="text-primary hover:underline font-medium"
            >
              support@sahaay.com
            </a>
            <span className="hidden sm:block text-muted-foreground">•</span>
            <a 
              href="tel:+911234567890" 
              className="text-primary hover:underline font-medium"
            >
              +91 123 456 7890
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;