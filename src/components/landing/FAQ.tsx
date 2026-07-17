"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export function FAQ() {
  const faqs = [
    {
      question: "How is Nudigo different from other popup tools?",
      answer: "We focus on one thing: exit-intent wake-up calls. Our technology is ultra-lightweight, triggers instantaneously, and is designed purely to convert bouncing traffic into customers. No bloated features, just results."
    },
    {
      question: "Is it compatible with my website?",
      answer: "Yes. If you can add a script tag to your <head>, you can use Nudigo. It works perfectly with Next.js, WordPress, Webflow, Shopify, Framer, and custom sites."
    },
    {
      question: "Will it slow down my site?",
      answer: "Not at all. Our script is less than 5kb and loads asynchronously, meaning it has zero impact on your core web vitals and page load speed."
    },
    {
      question: "Can I customize the design?",
      answer: "Absolutely. While Nudigo looks great out of the box, you can customize colors, typography, borders, and animations to perfectly match your brand's design system."
    }
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#FAFAFA] border-t border-black/5">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-black/60 text-lg">
            Everything you need to know about the product.
          </p>
        </div>

        <div className="bg-white rounded-[32px] p-8 md:p-12 border border-black/5 shadow-sm">
          <Accordion className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b-black/5 py-3">
                <AccordionTrigger className="text-lg font-medium text-left hover:text-black text-black/80 transition-colors py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-black/60 text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}
