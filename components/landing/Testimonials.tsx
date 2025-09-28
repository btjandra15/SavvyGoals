import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Manager",
    content: "SavvyGoals helped me save $8,000 for my dream vacation to Europe. The visual progress tracking kept me motivated every step of the way!",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Michael Rodriguez",
    role: "Software Engineer",
    content: "Finally, a savings app that doesn't overcomplicate things. I've hit 3 major goals in 8 months using SavvyGoals's simple but powerful tools.",
    rating: 5,
    avatar: "MR"
  },
  {
    name: "Emily Johnson",
    role: "Teacher",
    content: "The multiple goal feature is a game-changer. I'm saving for a house down payment, emergency fund, and my kids' education all at once!",
    rating: 5,
    avatar: "EJ"
  },
  {
    name: "David Kim",
    role: "Freelancer",
    content: "As someone with irregular income, SavvyGoals's flexible tracking helps me stay on top of my savings goals despite the ups and downs.",
    rating: 5,
    avatar: "DK"
  },
  {
    name: "Jessica Wright",
    role: "Nurse",
    content: "The mobile experience is flawless. I can quickly add money to my goals during breaks at work. Already saved $5,000 in 6 months!",
    rating: 5,
    avatar: "JW"
  },
  {
    name: "Alex Thompson",
    role: "Student",
    content: "Even on a student budget, SavvyGoals made it possible to save for my study abroad program. The goal categories keep me organized!",
    rating: 5,
    avatar: "AT"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            Loved by
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"> Thousands </span>
            of Savers
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            See what our users have to say about their savings success stories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
              <CardContent className="p-6">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Testimonial */}
                <p className="text-slate-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonial.name}</div>
                    <div className="text-slate-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl p-8 md:p-12 text-white text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">$2.5M+</div>
              <div className="text-blue-100">Total Saved</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">5,000+</div>
              <div className="text-blue-100">Goals Achieved</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;