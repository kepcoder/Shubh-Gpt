import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Saurav Kumar",
    role: "Studing Engineer",
    company: "VIT University",
    avatar: "SK",
    rating: 5,
    text: "ShubhGPT has completely transformed how I work with AI. It Improves my Productivity and helps me stay ahead of the curve.",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    name: "Nandani Kumari",
    role: "Frontend Developer",
    company: "Congnitive",
    avatar: "NK",
    rating: 4,
    text: "The Prompt Boost feature is incredible. I don't have to spend time crafting perfect prompts anymore. ShubhGPT does it for me and the results are amazing.",
    gradient: "from-green-500 to-teal-500"
  },
  {
    name: "Shubham Yadav",
    role: "Content Creator",
    company: "Creative Agency",
    avatar: "SY",
    rating: 5,
    text: "As someone who creates content daily who needs ideas and scripts, ShubhGPT is a lifesaver. It's like having a personal assistant for writing.",
    gradient: "from-pink-500 to-orange-500"
  },
  {
    name: "David Kumar",
    role: "Backend Developer",
    company: "DTS Inc",
    avatar: "DK",
    rating: 5,
    text: "The Intresting part is its free, in compare to chat gpt, both are same.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Anuvabh Rathee",
    role: "Marketing Director",
    company: "POS Agency",
    avatar: "AR",
    rating: 3,
    text: "It helped me a lots on marketing related Question and I can't say enough about it. Great Must try",
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    name: "Aditya Gupta",
    role: "Freelancer",
    company: "Fiverr",
    avatar: "AG",
    rating: 5,
    text: "Really thanks to ShubhGPT Developer for making my work easier via this Tool",
    gradient: "from-amber-500 to-red-500"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-950 text-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gray-800 text-gray-200 text-sm font-medium">
            <Quote className="w-4 h-4" />
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4">
            Loved by{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              500+ Users
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            See what our users are saying about their experience with ShubhGPT
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 rounded-xl p-6"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial */}
              <p className="text-gray-300 mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400">10K+</div>
            <p className="text-gray-400 mt-2">Active Users</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400">4.6/5</div>
            <p className="text-gray-400 mt-2">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400">500k+</div>
            <p className="text-gray-400 mt-2">Messages Sent</p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400">95.6%</div>
            <p className="text-gray-400 mt-2">Uptime</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
