import { PiggyBank } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const scrollToSection = (sectionID: string) => {
        const element = document.getElementById(sectionID);

        if(element) element.scrollIntoView({behavior: 'smooth'});

        setIsMenuOpen(false);
    }

    return (
        <nav className='bg-white/90 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50'>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* LOGO */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                            <PiggyBank className='w-6 h-6 text-white'/>
                        </div>

                        <div className="">
                            <h1 className='font-bold text-slate-900 text-xl'>SavvyGoals</h1>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <button onClick={() => scrollToSection('features')} className='text-slate-600 hover:text-blue-600 font-medium transition-colors cursor-pointer'>Features</button>
                        <button onClick={() => scrollToSection('pricing')} className='text-slate-600 hover:text-blue-600 font-medium transition-colors cursor-pointer'>Pricing</button>
                        <button onClick={() => scrollToSection('testimonials')} className='text-slate-600 hover:text-blue-600 font-medium transition-colors cursor-pointer'>Testimonials</button>
                        
                        <Link href={'/dashboard'}>
                            <button onClick={() => scrollToSection('features')} className='text-slate-600 hover:text-blue-600 font-medium transition-colors cursor-pointer'>Get Started</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;