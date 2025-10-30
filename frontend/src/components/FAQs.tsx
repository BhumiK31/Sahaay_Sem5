import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQs = () => {
  const faqs = [
    {
      question: 'How does pricing work?',
      answer:
        'Pricing is set by individual helpers based on the service and duration. You can see rates upfront and negotiate if needed. We charge a small platform fee for secure payments and support.',
    },
    {
      question: 'How do you ensure helper safety and quality?',
      answer:
        'All helpers undergo background checks, identity verification, and skills assessment. We also maintain a rating system where both families and helpers can provide feedback after each service.',
    },
    {
      question: 'What is your cancellation policy?',
      answer:
        'You can cancel up to 2 hours before the scheduled service for a full refund. Last-minute cancellations may incur a small fee to compensate the helper for their time.',
    },
    {
      question: 'How does the verification process work?',
      answer:
        'Helpers must provide government-issued ID, undergo background checks, provide references, and complete our safety training. The verification process typically takes 2-3 business days.',
    },
    {
      question: 'What support is available if something goes wrong?',
      answer:
        'We offer 24/7 customer support through chat, phone, and email. We also have a dispute resolution process and insurance coverage for certain incidents. Your safety is our priority.',
    },
    {
      question: 'Can I request the same helper for regular services?',
      answer:
        'Absolutely! Once you find a helper you like, you can book them for regular or recurring services. Many families build long-term relationships with their preferred helpers.',
    },
  ];

  return (
    <section id="faqs" className="section-padding bg-secondary/30 mt-32">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get answers to common questions about using Sahaay for your family's needs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-[var(--radius-lg)] border border-border/50 px-6 shadow-[var(--shadow-soft)]"
              >
                <AccordionTrigger className="text-left font-poppins font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
