import { Menu, PiggyBank, X } from 'lucide-react';
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

                    {/* DESKTOP NAVIGATION */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button onClick={() => scrollToSection('features')} className='text-slate-600 hover:text-blue-600 font-medium transition-colors cursor-pointer'>Features</button>
                        <button onClick={() => scrollToSection('pricing')} className='text-slate-600 hover:text-blue-600 font-medium transition-colors cursor-pointer'>Pricing</button>
                        <button onClick={() => scrollToSection('testimonials')} className='text-slate-600 hover:text-blue-600 font-medium transition-colors cursor-pointer'>Testimonials</button>
                        
                        <Link href={'/dashboard'}>
                            <button onClick={() => scrollToSection('features')} className='text-slate-600 hover:text-blue-600 font-medium transition-colors cursor-pointer'>Get Started</button>
                        </Link>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <div className="md:hidden">
                        <Button variant={'ghost'} size={'icon'} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className='w-5 h-5'/> : <Menu className='w-5 h-5'/>}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-slate-200 py-4 spae-y-4">
                        <button onClick={() => scrollToSection('features')} className='block w-full text-left text-slate-600 hover:text-blue-600 font-medium py-2'>Features</button>
                        <button onClick={() => scrollToSection('pricing')} className='block w-full text-left text-slate-600 hover:text-blue-600 font-medium py-2'>Pricing</button>
                        <button onClick={() => scrollToSection('testimonials')} className='block w-full text-left text-slate-600 hover:text-blue-600 font-medium py-2'>Testimonials</button>
                        <button onClick={() => scrollToSection('Dashboard')} className='block w-full text-left text-slate-600 hover:text-blue-600 font-medium py-2'>Get Started</button>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;