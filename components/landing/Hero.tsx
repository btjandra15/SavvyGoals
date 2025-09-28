import React from 'react'
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight, PiggyBank, Target, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50'>
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg, white, rgba(255, 255, 255, 0.6))] bg-[size:20px_20px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center space-y-8">
          <Badge className='bg-blue-100 text-blue-800 border-blue-200 px-4 py-2'>🎉 Your Financial Journey Starts Here</Badge>

          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight'>
            Turn Your
            <span className='bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent'> Dreams </span>
            Into Savings Goals
          </h1>

          <p className='text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed'>
            Track, manage, and achieve your financial goals with our intuitive savings tracker. 
            From emergency funds to dream vacations, make every dollar count.

            
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={'/dashboard'}>
              <Button size={'lg'} className='bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg font-semibold cursor-pointer'>
                Start Saving Today
                <ArrowRight className='w-5 h-5 ml-2'/>
              </Button>
            </Link>

            <Button variant={'outline'} size={'lg'} className='border-2 border-slate-300 hover:border-blue-300 px-8 py-4 text-lg font-semibold cursor-pointer' onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})}>
              See how it works
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
              <PiggyBank className='w-12 h-12 text-blue-500 mx-auto mb-4'/>
              <div className="text-3xl font-bold text-slate-900 mb-2">$250k+</div>
              <div className="text-slate-600">Total Saved by Users</div>
            </div>

            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
              <Target className='w-12 h-12 text-green-500 mx-auto mb-4'/>
              <div className="text-3xl font-bold text-slate-900 mb-2">1,500+</div>
              <div className="text-slate-600">Goals Achieved</div>
            </div>

            <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
              <TrendingUp className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <div className="text-3xl font-bold text-slate-900 mb-2">95%</div>
              <div className="text-slate-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;