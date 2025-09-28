import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CheckCircle, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "Forever",
    description: "Perfect for getting started with basic savings tracking",
    features: [
      "Up to 3 savings goals",
      "Basic progress tracking",
      "Mobile responsive design",
      "Secure data storage",
      "Goal categories"
    ],
    buttonText: "Get Started Free",
    popular: false,
    gradient: "from-slate-600 to-slate-700"
  },
  {
    name: "Pro",
    price: "$4.99",
    period: "per month",
    description: "Everything you need for serious savings goals",
    features: [
      "Unlimited savings goals",
      "Advanced analytics & insights",
      "Goal sharing & collaboration",
      "Custom categories",
      "Priority support",
      "Export data to Excel/CSV",
      "Goal achievement celebrations"
    ],
    buttonText: "Start Pro Trial",
    popular: true,
    gradient: "from-blue-500 to-teal-500"
  },
  {
    name: "Premium",
    price: "$9.99",
    period: "per month",
    description: "For power users and financial enthusiasts",
    features: [
      "Everything in Pro",
      "Investment goal tracking",
      "Multi-currency support",
      "Advanced reporting dashboard",
      "API access",
      "White-label customization",
      "Dedicated account manager"
    ],
    buttonText: "Go Premium",
    popular: false,
    gradient: "from-purple-500 to-pink-500"
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
            Simple, Transparent
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent"> Pricing</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Start free and upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${plan.popular ? 'transform scale-105 ring-2 ring-blue-500/50' : ''}`}>
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white text-center py-2 text-sm font-semibold">
                    <Star className="w-4 h-4 inline mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-8'} pb-4`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.gradient} p-4`}>
                  <Zap className="w-8 h-8 text-white" />
                </div>
                
                <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                  {plan.name}
                </CardTitle>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  {plan.period && (
                    <span className="text-slate-600 ml-2">/{plan.period}</span>
                  )}
                </div>
                
                <p className="text-slate-600 text-sm">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="px-6 pb-8">
                <Link href={'/dashboard'}>
                  <Button className={`w-full mb-6 ${plan.popular ? 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg cursor-pointer' : 'bg-white border-2 border-slate-200 text-slate-900 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'}`}>
                    {plan.buttonText}
                  </Button>
                </Link>
                
                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h3>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Can I change plans anytime?</h4>
              <p className="text-slate-600 text-sm">Yes! You can upgrade, downgrade, or cancel your subscription at any time without penalties.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Is my financial data secure?</h4>
              <p className="text-slate-600 text-sm">Absolutely. We use bank-level encryption to protect your data and never share it with third parties.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Do you offer refunds?</h4>
              <p className="text-slate-600 text-sm">We offer a 30-day money-back guarantee on all paid plans. No questions asked.</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Can I export my data?</h4>
              <p className="text-slate-600 text-sm">Yes! Pro and Premium users can export their data to Excel/CSV format at any time.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pricing;