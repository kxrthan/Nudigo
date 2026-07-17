"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CMO at TechFlow",
    text: "Nudigo completely changed our funnel. We saw a 34% increase in conversions in just the first week of adding the exit-intent popup.",
    avatar: "S"
  },
  {
    name: "Michael Chen",
    role: "Founder, GrowthLabs",
    text: "The setup was literally 2 minutes. I've tried other popup tools but they were bloated and slow. Nudigo is lightning fast and gets the job done.",
    avatar: "M"
  },
  {
    name: "Jessica Alba",
    role: "Head of Marketing",
    text: "Our bounce rate was killing us. Since implementing Nudigo, we've recovered thousands of dollars in lost revenue. It pays for itself 100x over.",
    avatar: "J"
  },
  {
    name: "David Smith",
    role: "E-commerce Owner",
    text: "I love the analytics and A/B testing. We tested 3 different offers and found a winner in 48 hours. The ROI is incredible.",
    avatar: "D"
  },
  {
    name: "Alex Rivera",
    role: "Growth Lead",
    text: "Finally, a popup tool that doesn't look like spam. The modern, clean aesthetic fits perfectly with our luxury brand.",
    avatar: "A"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-white overflow-hidden border-t border-black/5">
      <div className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">
          Loved by modern teams.
        </h2>
        <p className="text-black/60 text-lg max-w-xl mx-auto">
          See why over 1,000+ businesses use Nudigo to capture lost revenue.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden w-full group">
         {/* Left Fade */}
         <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
         {/* Right Fade */}
         <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

         <motion.div 
            className="flex gap-6 py-4 whitespace-nowrap pl-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
         >
            {/* Double the array to create a seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, i) => (
               <div 
                  key={i} 
                  className="w-[350px] md:w-[400px] flex-shrink-0 bg-white border border-black/5 rounded-[24px] p-8 shadow-sm hover:shadow-md transition-shadow whitespace-normal flex flex-col justify-between"
               >
                  <div className="flex gap-1 mb-6 text-black">
                     {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-black" />
                     ))}
                  </div>
                  <p className="text-black/80 text-base leading-relaxed mb-8">
                     "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-black/5 border border-black/10 flex items-center justify-center font-bold text-black/60">
                        {testimonial.avatar}
                     </div>
                     <div>
                        <h4 className="font-bold text-sm tracking-tight text-black">{testimonial.name}</h4>
                        <p className="text-xs text-black/50 font-medium">{testimonial.role}</p>
                     </div>
                  </div>
               </div>
            ))}
         </motion.div>
      </div>
    </section>
  );
}
