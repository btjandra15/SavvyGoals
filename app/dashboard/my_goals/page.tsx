"use client"

import GoalCard from '@/components/GoalCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import createClerkSupabaseClient from '@/lib/supabaseClient';
import { useSession, useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { Calendar, CheckCircle, DollarSign, Plus, Search, Target } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const MyGoals = () => {
  const [goals, setGoals] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "completed">("all");
  const {user} = useUser();
  const client = createClerkSupabaseClient();
  const activeGoals = goals.filter(goal => !goal.is_completed);
  const completedGoals = goals.filter(goal => goal.is_completed);

  const loadGoals = async() => {
    setLoading(true)

    try {
      const { data, error } = await client
        .from('goals')
        .select('*')
        .eq('clerk_user_id', user.id)
        .order('created_at', { ascending: false })

      if(error) throw error;
      
      setGoals(data);
    } catch (error) {
      console.error("Error loading goals: ", error)
    }
      
    setLoading(false);
  }

  useEffect(() => {
    if(!user) redirect('/');

    loadGoals();
  }, [user]);

  useEffect(() => {
    let filtered = goals;

    if(filterStatus === 'active'){
      filtered = filtered.filter(goal => !goal.is_completed);
    }else if(filterStatus === 'completed'){
      filtered = filtered.filter(goal => goal.is_completed);
    }

    if(searchTerm){
      filtered = filtered.filter(goal => goal.title.toLowerCase().includes(searchTerm.toLowerCase()) || goal.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredGoals(filtered);
  }, [goals, searchTerm, filterStatus]);
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="">
            <h1 className='text-3xl md:text-4xl font-bold text-slate-900'>Savings Goals</h1>
            <p className='text-slate-600 mt-2'>Manage and track all your savings goals</p>
          </div>

          <Link href="/dashboard/add_goal">
            <Button className='bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all duration-300'>
              <Plus className='w-4 h-4 mr-2'/>
              Add New Goal
            </Button>
          </Link>
        </div>

        {/* STATS BAR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* TOTAL GOALS */}
          <Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg'>
            <CardContent className='p-4 text-center'>
              <Target className='w-6 h-6 text-blue-500 mx-auto mb-2'/>

              <div className="text-2xl font-bold text-slate-900">{goals.length}</div>
              <div className="text-sm text-slate-600">Total Goals</div>
            </CardContent>
          </Card>

          {/* ACTIVE GOALS */}
          <Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg'>
            <CardContent className='p-4 text-center'>
              <Calendar className='w-6 h-6 text-orange-500 mx-auto mb-2'/>
              <div className="text-2xl font-bold text-slate-900">{activeGoals.length}</div>
              <div className="text-sm text-slate-600">Active</div>
            </CardContent>
          </Card>

          {/* COMPLETED GOALS */}
          <Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg'>
            <CardContent className='p-4 text-center'>
              <CheckCircle className='w-6 h-6 text-green-500 mx-auto mb-2'/>
              <div className='text-2xl font-bold text-slate-900'>{completedGoals.length}</div>
              <div className="text-sm text-slate-600">Completed</div>
            </CardContent>
          </Card>

          {/* TOTAL SAVED */}
          <Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg'>
            <CardContent className='p-4 text-center'>
              <DollarSign className='w-6 h-6 text-purple-500 mx-auto mb-2'/>

              <div className="text-2xl font-bold text-slate-900">
                ${goals.reduce((sum, goal) => sum + (goal.current_amount || 0), 0).toLocaleString()}
              </div>

              <div className="text-sm tet-slate-600">Total Saved</div>
            </CardContent>
          </Card>
        </div>

        {/* FILTERS */}
        <Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg'>
          <CardContent className='p-6'>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4'/>

                <Input placeholder='Search goals...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='pl-10'/>
              </div>

              <div className="flex gap-2">
                <Button variant={filterStatus === 'all' ? 'default' : 'outline'} onClick={() => setFilterStatus('all')} className={filterStatus === 'all' ? 'bg-blue-600 cursor-pointer' : "cursor-pointer"}>All Goals</Button>
                <Button variant={filterStatus === 'active' ? 'default' : 'outline'} onClick={() => setFilterStatus('active')} className={filterStatus === 'active' ? 'bg-blue-600 cursor-pointer' : 'cursor-pointer'}>Active</Button>
                <Button variant={filterStatus === 'completed' ? 'default' : 'outline'} onClick={() => setFilterStatus('completed')} className={filterStatus === 'completed' ? 'bg-blue-600 cursor-pointer' : 'cursor-pointer'}>Completed</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* GOALS LIST */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg'>
                  <CardContent className='p-6 h-32'></CardContent>
                </Card>
              </div>
            ))}
          </div>
        ): filteredGoals.length === 0 ? (
          <Card className='bg-white/80 backdrop-blur-sm border-0 shadow-lg'>
            <CardContent className='flex flex-col items-center justify-center py-12 text-center'>
              <Target className='w-16 h-16 text-slate-300 mb-4'/>

              <h3 className='text-lg font-semibold text-slate-900 mb-2'>{searchTerm || filterStatus !== 'all' ? 'No goals match your filter' : 'No Goals Yet'}</h3>

              <p className='text-slate-600 mb-6'>
                {searchTerm || filterStatus !== 'all' ? "Tru adjusting your search or filter settings" : "Start your savings journey by creating your first goal!"}
              </p>

              {(!searchTerm && filterStatus === 'all') && (
                <Link href="/dashboard/add_goal">
                  <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Goal
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} onUpdate={loadGoals}/>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyGoals;