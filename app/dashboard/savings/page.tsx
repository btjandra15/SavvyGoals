"use client"

import GoalCard from '@/components/savings/GoalCard';
import RecentActivity from '@/components/savings/RecentActivity';
import StatsOverview from '@/components/savings/StatsOverview';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import createClerkSupabaseClient from '@/lib/supabaseClient';
import { useUser } from '@clerk/nextjs';
import { PiggyBank, Plus, Trophy } from 'lucide-react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [goals, setGoals] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const {user} = useUser();
    const client = createClerkSupabaseClient();
    const activeGoals = goals.filter(goal => !goal.is_completed);
    const completedGoals = goals.filter(goal => goal.is_completed).length;

    const loadGoals = async() => {
        setIsLoading(true)
    
        try {
          const { data, error } = await client
            .from('goals')
            .select('*')
            .eq('clerk_user_id', user?.id)
            .order('created_at', { ascending: false })
    
          if(error) throw error;
          
          setGoals(data);
        } catch (error) {
          console.error("Error loading goals: ", error)
        }
          
        setIsLoading(false);
    }

    const loadTransactions = async() => {
        setIsLoading(true)
    
        try {
          const { data, error } = await client
            .from('savings_transactions')
            .select('*')
            .eq('clerk_user_id', user?.id)
            .order('created_at', { ascending: false })
    
          if(error) throw error;

          console.log(data);
          setTransactions(data);
        } catch (error) {
          console.error("Error loading goals: ", error)
        }
          
        setIsLoading(false);
    }
    
    useEffect(() => {
        if(!user) redirect('/');
    
        loadGoals();
        loadTransactions();
    }, [user]);
        
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Dashboard</h1>
                        <p className="text-slate-600 mt-2">Track your savings progress and achieve your goals</p>
                    </div>

                    <Link href="/dashboard/add_goal">
                        <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                            <Plus className="w-4 h-4 mr-2" />
                            New Goal
                        </Button>
                    </Link>
                </div>
            </div>

            <StatsOverview/>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-8 mt-5">
                {/* Active Goals */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-slate-900">Active Goals</h2>

                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            5 Active
                        </Badge>
                    </div>

                    {isloading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => {
                                return(
                                    <div key={i} className="animate-pulse">
                                        <div className="bg-white rounded-2xl h-32"></div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : activeGoals.length === 0 ? (
                        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                <PiggyBank className="w-16 h-16 text-slate-300 mb-4" />
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">No Active Goals</h3>
                                <p className="text-slate-600 mb-6">Start your savings journey by creating your first goal!</p>

                                <Link href="/dashboard/savings/add_goal">
                                    <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Your First Goal
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {activeGoals.map((goal, idx) => (
                                <GoalCard key={goal.id} goal={goal} onUpdate={loadGoals}/> 
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <RecentActivity transactions={transactions} goals={goals} isLoading={isloading}/>

                    {completedGoals > 0 && (
                        <Card className='border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50'>
                            <CardHeader className='pb-3'>
                                <CardTitle className='flex items-center gap-2 text-green-800'>
                                    <Trophy className='w-5 h-5'/>
                                    Completed Goals
                                </CardTitle>
                            </CardHeader>

                            <CardContent>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-700 mb-2">{completedGoals}</div>
                                    <p className='text-green-600 text-sm'>{completedGoals === 1 ? 'Goal achieved!' : 'Goals achieved'}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;