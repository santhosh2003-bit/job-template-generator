
import React from 'react';

const testimonials = [
  {
    quote: "ResumeCraft helped me land interviews at three Fortune 500 companies within a week!",
    author: "Sarah J.",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
  },
  {
    quote: "The AI-powered resume analysis gave me insights I never would have considered. Game changer!",
    author: "Michael T.",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop"
  },
  {
    quote: "I was struggling to format my resume properly. ResumeCraft made it look professional in minutes.",
    author: "Alexis R.",
    role: "Recent Graduate",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop"
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real testimonials from professionals who've transformed their job search with our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl border border-white/20 flex flex-col relative"
            >
              <div className="absolute -top-6 left-6">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-white">
                  <img 
                    src={item.image} 
                    alt={item.author} 
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              
              <div className="pt-8">
                <p className="italic text-muted-foreground mb-6">"{item.quote}"</p>
                <div className="mt-auto">
                  <p className="font-medium">{item.author}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
