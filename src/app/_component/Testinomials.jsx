import React from "react";
import Wrapper from "./Wrapper";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "We needed reliable equipment for a large-scale road project, and their machines exceeded expectations. The durability and performance have saved us time and costs",
      client: "Rahul Kumar",
      role: "Project Manager",
      avatar: "/api/placeholder/80/80",
    },
    {
      quote:
        "From the first use, I knew we made the right choice. The precision and ease of operation allow our team to work efficiently, even in tough conditions. Highly recommended!",
      client: "Nilesh Kapoor",
      role: "Construction Lead",
      avatar: "/api/placeholder/80/80",
    },
    {
      quote:
        "Investing in their machinery was a game-changer for our company. The technology, power, and customer service are simply outstanding! We are extremely satisfied.",
      client: "Hitesh Solanki",
      role: "Operations Director",
      avatar: "/api/placeholder/80/80",
    },
  ];

  return (
    <Wrapper>
      <div className="py-16 bg-white rounded-2xl">
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Client Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl text-center">
            Hear what our satisfied customers have to say about their experience
            with our machinery
          </p>
          <div className="bg-amber-500 w-24 h-1 rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="p-6">
               
                <p className="text-gray-700 italic mb-8 leading-relaxed">
                  &quot;{item.quote}&quot;
                </p>
                <div className="flex items-center">
                  
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">{item.client}</p>
                    <p className="text-gray-600 text-sm">{item.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </Wrapper>
  );
};

export default Testimonials;
