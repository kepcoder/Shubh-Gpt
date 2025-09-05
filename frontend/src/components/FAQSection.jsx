import { useState } from "react";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What AI models are included in ShubhGPT?",
    answer:
      "ShubhGPT provides access to all major AI models including GPT-4, Claude 3, Gemini Pro, LLaMA 2, and more. We continuously add new models as they become available, ensuring you always have access to the latest AI technology.",
  },
  {
    question: "Can I really use ShubhGPT for free forever?",
    answer:
      "Yes! Our Free Forever plan gives you access to GPT-3.5 with 10 messages per day, basic prompt templates, and community support. It's perfect for casual users or those wanting to try out our platform before upgrading.",
  },
  // ...baaki FAQs same
];

const AccordionItem = ({ faq, index, openIndex, setOpenIndex }) => {
  const isOpen = openIndex === index;
  return (
    <div
      className={`border border-neutral-800 bg-black/60 rounded-xl mb-4 transition-all ${
        isOpen ? "border-indigo-500 shadow-lg shadow-indigo-500/20" : ""
      }`}
    >
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full text-left px-6 py-4 flex justify-between items-center font-medium text-neutral-200"
      >
        {faq.question}
        <span className="text-indigo-400 text-xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-neutral-400">{faq.answer}</div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-20 relative bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 mb-4 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQs
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto">
            Everything you need to know about ShubhGPT
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              faq={faq}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-neutral-400 mb-4">Still have questions?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-black/60 backdrop-blur rounded-lg border border-neutral-800 hover:border-indigo-500 transition-colors text-white">
              Contact Support
            </button>
            <button className="px-6 py-3 bg-black/60 backdrop-blur rounded-lg border border-neutral-800 hover:border-indigo-500 transition-colors text-white">
              Join Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
