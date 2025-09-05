import { useState } from "react";
import { Menu, X, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  // Check if token exists
  const token = Cookies.get("token");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/ai/login");
    setIsProfileOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-black/80 border-b border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection("features")}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
              ShubhGPT
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("features")}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              FAQs
            </button>

            {/* If logged in -> Profile Menu, else Login button */}
            {!token ? (
              <button
                onClick={() => navigate("/ai/login")}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold hover:opacity-90"
              >
                Log In →
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white font-semibold"
                >
                  <User className="w-5 h-5" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-lg shadow-lg py-2 z-50">
                    <button
                      onClick={() => navigate("/ai/chats")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
                    >
                      Go to ShubhGpt
                    </button>
                    <button
                      onClick={() => navigate("/settings")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
                    >
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-neutral-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-neutral-800">
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left px-4 py-2 text-neutral-400 hover:text-white transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="block w-full text-left px-4 py-2 text-neutral-400 hover:text-white transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="block w-full text-left px-4 py-2 text-neutral-400 hover:text-white transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="block w-full text-left px-4 py-2 text-neutral-400 hover:text-white transition-colors"
            >
              FAQs
            </button>

            {/* Mobile version profile/login */}
            {!token ? (
              <button
                onClick={() => navigate("/ai/login")}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold hover:opacity-90"
              >
                Log In →
              </button>
            ) : (
              <div className="space-y-2 px-4">
                <button
                  onClick={() => navigate("/ai")}
                  className="block w-full text-left px-4 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700"
                >
                  Go to AI
                </button>
                <button
                  onClick={() => navigate("/settings")}
                  className="block w-full text-left px-4 py-2 rounded-lg bg-gray-800 text-gray-200 hover:bg-gray-700"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 rounded-lg bg-gray-800 text-red-400 hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
