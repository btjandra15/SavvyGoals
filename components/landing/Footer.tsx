import { Github, Mail, PiggyBank, Twitter } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-2xl">SaveSmart</h3>
            </div>
            <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
              The smart way to save money and achieve your financial goals. 
              Track multiple savings goals, monitor progress, and celebrate your wins.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Product</h4>
            <div className="space-y-3">
              <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-slate-300 hover:text-white transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-slate-300 hover:text-white transition-colors"
              >
                Pricing
              </button>
              <Link href={'/dashboard'} className="block text-slate-300 hover:text-white transition-colors">
                Dashboard
              </Link>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                Mobile App
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <div className="space-y-3">
              <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                About Us
              </a>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                Blog
              </a>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                Careers
              </a>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                Contact
              </a>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-300 text-sm">
            © 2025 SavvyGoals. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
              Privacy
            </a>
            <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
              Terms
            </a>
            <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;