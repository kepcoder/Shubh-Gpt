import { Check, X, Gift } from "lucide-react";

const freePlan = {
  name: "Free Forever",
  price: "$0",
  period: "/month",
  description: "Perfect for trying out ShubhGPT",
  icon: Gift,
  gradient: "from-gray-500 to-gray-600",
  features: [
    { text: "Access to ShubhGpt Pro", included: true },
    { text: "200 messages per day", included: true },
    { text: "Basic prompt templates", included: true },
    { text: "Community support", included: true },
    { text: "Access to all AI models", included: false },
    { text: "Unlimited messages", included: true },
    { text: "Prompt Boost feature", included: false },
    { text: "Image generation", included: false },
    { text: "Audio transcription", included: false },
    { text: "Priority support", included: false },
  ],
  cta: "Start Free",
};

const PricingSection = () => {
  const Icon = freePlan.icon;

  return (
    <section id="pricing" className="py-20 bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-sm font-medium shadow-lg">
            Pricing Plans
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Start with{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
              Free Forever
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Enjoy ShubhGPT at zero cost, no credit card required.
          </p>
        </div>

        {/* Single Pricing Card */}
        <div className="flex justify-center text-center">
          <div
            className={`relative bg-gray-900 border border-indigo-500 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 scale-105`}
          >
            {/* Icon + Header */}
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-lg bg-gradient-to-r ${freePlan.gradient} flex items-center justify-center`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="px-3 py-1 text-xs rounded-md bg-gray-800 text-gray-300">
                No Credit Card
              </span>
            </div>

            <h3 className="text-2xl font-bold mb-2">{freePlan.name}</h3>
            <p className="text-gray-400 text-sm mb-4">
              {freePlan.description}
            </p>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold">{freePlan.price}</span>
              <span className="text-gray-400">{freePlan.period}</span>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6" >
              {freePlan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <X className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  )}
                  <span
                    className={`text-sm ${
                      feature.included ? "text-gray-200" : "text-gray-500"
                    }`}
                  >
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              className={`w-full py-2 px-4 rounded-lg font-medium transition bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:opacity-90`}
            >
              {freePlan.cta}
            </button>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-full">
            <Check className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-300">
              ShubhGpt is For FREE | Make your Work Easy
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
