import { Zap, GitCompare, Wand2, Image, Mic2, Shield, Check } from "lucide-react";

const features = [
  {
    icon: /* ImageIcon */ Image,
    title: "Text → Image (Implementing Soon)",
    description:
      "AI-powered text-to-image generation coming soon. Just describe what you imagine and get production-ready visuals in seconds.",
    benefits: [
      "Prompt-driven image creation for any purpose",
      "High-quality, editable outputs",
      "Seamless integration into your chats",
    ],
    gradient: "from-green-500 to-teal-500",
  },
  {
    icon: /* MultiChatIcon */ GitCompare,
    title: "Multi-Chats & Memory — Stay Organized",
    description:
      "Create multiple chats for different projects with persistent memory support. Switch contexts instantly and never lose your progress.",
    benefits: [
      "Separate chats for code, design, and planning",
      "Saved context for faster, personalized replies",
      "Pin & resume conversations without repetition",
    ],
    gradient: "from-rose-500 to-red-500",
  },
  {
    icon: /* CodeIcon */ Wand2,
    title: "Best for Coders — Solve Problems in Seconds",
    description:
      "A coder-first experience: fix bugs, generate snippets, refactor, or explain code instantly. Built for developers who want speed and accuracy.",
    benefits: [
      "Instant debugging & code optimization",
      "Generate tests, docs & boilerplate on demand",
      "Clean, ready-to-run code in seconds",
    ],
    gradient: "from-sky-500 to-indigo-600",
  },
];



const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 relative bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-sm font-medium shadow-lg">
            <Zap className="w-4 h-4 mr-2" />
            Powerful Features
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
           One Smart AI. Endless Possibilities.{" "}
           <span className="bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
             Built for Coders & Creators.
           </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Every feature is designed to amplify your AI-powered productivity
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="relative bg-gray-900 border border-gray-800 rounded-lg shadow-md hover:shadow-lg hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="relative p-6">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 shadow-md`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>

                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <Check className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Extra Small Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3 p-4 bg-gray-900 border border-gray-800 rounded-lg shadow-sm">
            <Shield className="w-10 h-10 text-indigo-400" />
            <div>
              <h4 className="font-semibold text-white">Secure</h4>
              <p className="text-sm text-gray-400">End-to-end encryption</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-900 border border-gray-800 rounded-lg shadow-sm">
            <Zap className="w-10 h-10 text-indigo-400" />
            <div>
              <h4 className="font-semibold text-white">Lightning Fast</h4>
              <p className="text-sm text-gray-400">Real-time responses</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-gray-900 border border-gray-800 rounded-lg shadow-sm">
            <Mic2 className="w-10 h-10 text-indigo-400" />
            <div>
              <h4 className="font-semibold text-white">Have Memory</h4>
              <p className="text-sm text-gray-400">Smart Chat Memory</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
