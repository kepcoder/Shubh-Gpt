import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {

  const navigate = useNavigate()


  return (
    <section className="relative pt-25 pb-2 min-h-screen flex items-center justify-center overflow-hidden bg-[#0b192c]">
      {/* Background Gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[160px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white">
            World's Most Powerful{" "}
            <span className="text-cyan-400">AIs.</span>
            <br />
            ShubhGpt 
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Stop juggling tabs and subscriptions – ShubhGPT gives you access to
            the best-in-class AI models for FREE 
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button onClick={() => navigate('/ai/login')} className="px-8 py-4 text-lg rounded-xl bg-cyan-500 text-black font-semibold shadow-lg hover:bg-cyan-400 transition flex items-center justify-center">
              Get Started Now
              <ArrowRight className="ml-2 inline w-5 h-5" />
            </button>
            <button className="px-8 py-4 text-lg rounded-xl border border-gray-700 bg-white/5 text-gray-200 backdrop-blur hover:bg-white/10 transition">
              View Pricing
            </button>
          </div>

          {/* Subtext */}
          <p className="text-sm text-gray-500 animate-pulse">
            Experience smarter & more accurate answers
          </p>
        </div>

        {/* AI Chat Preview */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 opacity-20 blur-2xl"></div>
            <div className="relative bg-[#101e32]/90 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 shadow-xl">
              {/* Window header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs text-gray-400">ShubhGPT Chat</span>
              </div>
              
              {/* Chat messages */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-xs text-black font-bold">
                    U
                  </div>
                  <div className="flex-1 bg-[#16263d] rounded-lg p-3">
                    <p className="text-sm text-gray-200">What's the best way to brew coffee at home?</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-xs text-black font-bold">
                    AI
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="bg-[#16263d] border border-gray-700 rounded-lg p-3 shadow-sm">
                      <p className="text-xs text-cyan-400 mb-1">ShubhGpt</p>
                      <p className="text-sm text-gray-200">
                        For the best coffee at home, I recommend the pour-over method...
                      </p>
                    </div>
                    <div className="bg-[#16263d] border border-gray-700 rounded-lg p-3 shadow-sm">
                      <p className="text-xs text-cyan-400 mb-1">ShubhGpt</p>
                      <p className="text-sm text-gray-200">
                        The French press method offers excellent extraction...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
