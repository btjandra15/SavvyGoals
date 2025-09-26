"use client"

import GoalSummary from '@/components/savings/GoalSummary'
import SavingsProjections from '@/components/savings/SavingsProjections'
import { Button } from '@/components/ui/button'
import createClerkSupabaseClient from '@/lib/supabaseClient'
import { ArrowLeft } from 'lucide-react'
import { redirect, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [goal, setGoal] = useState<any>(null);
    const client = createClerkSupabaseClient();
    const {id} = useParams();
    
    const fetchGoal = async(id: string) => {
        try {
            const {data, error} = await client.from('goals').select('*').eq('id', id).single()

            return data;
        } catch (error) {
            console.log("Error fetching goal: ", error);
        }
    }

    useEffect(() => {
        if(id) fetchGoal(id as string).then(setGoal);
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* HEADER */}
                <div className="flex items-center gap-4">
                    <Button variant='outline' size='icon' onClick={() => redirect('/dashboard/savings/my_goals')} className='hover:bg-white shadow-md'>
                        <ArrowLeft className='w-4 h-4'/>
                    </Button>

                    <div className="">
                        <h1 className='text-2xl md:text-3xl font-bold text-slate-900 truncate'>{goal?.title}</h1>
                        <p className='text-slate-600 mt-1'>Detailed View & Projections</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-3 space-y-8">
                        <GoalSummary goal={goal}/>
                        <SavingsProjections goal={goal}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page