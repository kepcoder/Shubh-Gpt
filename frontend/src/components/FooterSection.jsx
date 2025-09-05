import { Badge } from "@/components/ui/badge";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-neutral-800 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
                ShubhGPT
              </span>
            </div>
            <p className="text-sm text-neutral-400 max-w-xs">
              Access all premium AI models in one unified platform. Save time and money.
            </p>
            <div className="flex space-x-3 mt-4">
              {[
                { icon: Twitter, href: "#" },
                { icon: Github, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Mail, href: "#" },
              ].map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="w-9 h-9 bg-black/60 backdrop-blur rounded-lg border border-neutral-800 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2">
              {["Features", "Pricing", "API", "Integrations", "Changelog"].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              {["About", "Blog", "Careers", "Press Kit", "Contact"].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              {["Help Center", "Documentation", "Community", "Status", "Terms & Privacy"].map((item, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <p className="text-sm text-neutral-500">
              © 2024 ShubhGPT. All rights reserved.
            </p>
            <Badge variant="secondary" className="text-xs bg-black/60 border border-neutral-800 text-neutral-400">
              Built with ❤️ by AI Enthusiasts
            </Badge>
          </div>
          
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, idx) => (
              <a
                key={idx}
                href="#"
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
