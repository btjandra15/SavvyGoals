import { ArrowRight, PiggyBank } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-teal-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px]"></div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <PiggyBank className="w-16 h-16 mx-auto mb-8 text-white/90" />
        
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Ready to Turn Your Dreams Into Reality?
        </h2>
        
        <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
          Join thousands of successful savers who've achieved their financial goals with SaveSmart. 
          Start your journey today - it's completely free!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href={'/dashboard'}>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-4 text-lg font-semibold cursor-pointer">
              Get Started for Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          
          <Button size="lg" variant="outline" className="border-2 border-white/30 text-black hover:bg-white/10 px-8 py-4 text-lg font-semibold cursor-pointer" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
            Learn More
          </Button>
        </div>
        
        <div className="mt-12 flex items-center justify-center gap-8 text-blue-100">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            No credit card required
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>

            Free forever plan
          </div>

          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>

            Cancel anytime
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA