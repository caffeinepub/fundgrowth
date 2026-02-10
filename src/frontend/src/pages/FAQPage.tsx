import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function FAQPage() {
  const faqs = [
    {
      question: 'What is a bond?',
      answer: 'A bond is a fixed-income investment where you lend money to a company or government for a set period. In return, you receive regular interest payments (coupons) and get your principal back at maturity.',
    },
    {
      question: 'What is the minimum investment amount?',
      answer: 'The minimum investment varies by bond but typically starts from ₹10,000. Each bond listing shows its specific minimum investment requirement.',
    },
    {
      question: 'How do I receive returns?',
      answer: 'Returns are paid as coupon payments at regular intervals (monthly, quarterly, or annually) depending on the bond terms. The principal amount is returned at maturity.',
    },
    {
      question: 'Are bonds safe investments?',
      answer: 'Bonds are generally considered safer than stocks, especially those with high credit ratings. However, all investments carry some risk. We provide detailed ratings and risk profiles for each bond to help you make informed decisions.',
    },
    {
      question: 'Can I sell my bonds before maturity?',
      answer: 'This platform currently focuses on holding bonds to maturity. Secondary market trading features may be added in future updates.',
    },
    {
      question: 'What do the credit ratings mean?',
      answer: 'Credit ratings (like A, B, C) indicate the creditworthiness of the bond issuer. Higher ratings (A) suggest lower risk of default, while lower ratings may offer higher returns but come with increased risk.',
    },
    {
      question: 'How is FUNDGROWTH different from other platforms?',
      answer: 'FUNDGROWTH leverages blockchain technology for transparent, secure transactions. We use Internet Identity for passwordless authentication and provide a curated selection of high-quality bonds.',
    },
    {
      question: 'What happens if the issuer defaults?',
      answer: 'While we carefully vet all bonds, default risk exists. Secured bonds have collateral backing, which provides additional protection. Always review the risk profile before investing.',
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
            Find answers to common questions about bond investing on FUNDGROWTH
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
