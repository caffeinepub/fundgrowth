import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQPage() {
  const faqs = [
    {
      question: 'What types of investments does FUNDGROWTH offer?',
      answer: 'FUNDGROWTH provides access to carefully vetted fixed-income investment opportunities. Each offering is thoroughly evaluated and rated by leading agencies to ensure quality and transparency.',
    },
    {
      question: 'What is the minimum investment amount?',
      answer: 'The minimum investment varies by product but typically starts from ₹10,000. Each listing shows its specific minimum investment requirement.',
    },
    {
      question: 'How do I receive returns?',
      answer: 'Returns are paid at regular intervals (monthly, quarterly, or annually) depending on the investment terms. The principal amount is returned at maturity.',
    },
    {
      question: 'Are these investments safe?',
      answer: 'All investments carry some level of risk. We provide detailed ratings and risk profiles for each offering to help you make informed decisions. Higher-rated products generally suggest lower risk.',
    },
    {
      question: 'Can I withdraw my investment before maturity?',
      answer: 'This platform currently focuses on holding investments to maturity. Early withdrawal features may be added in future updates.',
    },
    {
      question: 'What do the credit ratings mean?',
      answer: 'Credit ratings (like A, B, C) indicate the creditworthiness of the issuer. Higher ratings (A) suggest lower risk of default, while lower ratings may offer higher returns but come with increased risk.',
    },
    {
      question: 'How is FUNDGROWTH different from other platforms?',
      answer: 'FUNDGROWTH leverages blockchain technology for transparent, secure transactions. We use Internet Identity for passwordless authentication and provide a curated selection of high-quality investment products.',
    },
    {
      question: 'What happens if the issuer defaults?',
      answer: 'While we carefully vet all offerings, default risk exists. Secured products have collateral backing, which provides additional protection. Always review the risk profile before investing.',
    },
  ];

  return (
    <div className="py-12">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about investing on FUNDGROWTH
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="text-primary hover:underline font-medium"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </div>
  );
}
