import { BarChart3, Calendar, CheckCircle, DollarSign, PiggyBank, Shield, Smartphone, Target } from 'lucide-react';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const features = [
  {
    icon: Target,
    title: "Multiple Savings Goals",
    description: "Create unlimited goals for vacations, emergencies, gadgets, and more. Organize your dreams and make them achievable.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50"
  },
  {
    icon: BarChart3,
    title: "Visual Progress Tracking",
    description: "Beautiful progress bars and charts show exactly how close you are to reaching each goal. Stay motivated with clear visuals.",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50"
  },
  {
    icon: PiggyBank,
    title: "Quick Transactions",
    description: "Add or withdraw money instantly with our quick-action buttons. Every contribution gets you closer to your dreams.",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50"
  },
  {
    icon: Calendar,
    title: "Smart Deadlines",
    description: "Set target dates for your goals and get insights on how much you need to save monthly to stay on track.",
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Access your savings goals anywhere, anytime. Fully responsive design works perfectly on all devices.",
    gradient: "from-teal-500 to-blue-500",
    bgGradient: "from-teal-50 to-blue-50"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your financial data is encrypted and secure. Only you can access your savings information and progress.",
    gradient: "from-indigo-500 to-purple-500",
    bgGradient: "from-indigo-50 to-purple-50"
  }
];

const Features = () => {
  return (
    <section id='features' className='py-24 bg-white'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
                <h2 className='text-3xl md:text-5xl font-bold text-slate-900'>
                    Everything You Need to Know About
                    <span className='bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent'> SavvyGoals</span>
                </h2>

                <p className='text-xl text-slate-600 max-w-3xl mx-auto'>
                    Powerful features designed to make saving money simple, engaging, and rewarding
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <Card key={feature.title} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r ${feature.bgGradient} overflow-hidden group cursor-pointer transform hover:-translate-y-2`}>
                        <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-8 -translate-y-8">
                            <div className={`w-full h-full rounded-full bg-gradient-to-r ${feature.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}/>
                        </div>

                        <CardHeader className='relative z-10'>
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className='w-6 h-6 text-white'/>
                            </div>

                            <CardTitle className='text-xl font-bold text-teal-900 group-hover:text-slate-700 transition-colors'>
                                {feature.title}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className='relative z-10'>
                            <p className='text-slate-600 leading-relaxed'>
                                {feature.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-20 bg-gradient-to-r from-slate-50 to-blue-50 rounded-3xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                            Why Choose SavvyGoals?
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                                <span className="text-slate-700 font-medium">No hidden fees or subscriptions</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                                <span className="text-slate-700 font-medium">Unlimited savings goals</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                                <span className="text-slate-700 font-medium">Real-time progress tracking</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                                <span className="text-slate-700 font-medium">Export data anytime</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <DollarSign className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                            <div className="text-4xl font-bold text-slate-900 mb-2">Free</div>
                            <div className="text-slate-600 mb-4">Forever</div>
                            <div className="text-sm text-slate-500">
                            Start saving today with no commitment required
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features;