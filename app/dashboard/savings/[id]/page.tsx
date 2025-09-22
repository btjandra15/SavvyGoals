"use client"

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {  
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Button variant='outline' size='icon' onClick={() => redirect('/dashboard/my_goals')} className='hover:bg-white shadow-md'>
                        <ArrowLeft className='w-4 h-4'/>
                    </Button>

                    <div className="">
                        <h1 className='text-3xl font-bold text-slate-900'>Edit Savings Goal</h1>
                        <p className='text-slate-600 mt-1'>Update the details for your goal</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page