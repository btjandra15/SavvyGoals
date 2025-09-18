"use client"

import { useSession, useUser } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const MyGoals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} = useUser();
  const {session} = useSession();

  const createClerkSupabaseClient = () => {
    return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!, {
      async accessToken(){
        return session?.getToken() ?? null;
      }
    })
  }

  const client = createClerkSupabaseClient();

  useEffect(() => {
    if(!user) redirect('/');

    const loadGoals =async() => {
      setLoading(true)
      
      const { data, error } = await client
        .from('goals')
        .select('*')
        .eq('clerk_user_id', user.id)
        .order('created_at', { ascending: false })

      if(!error){
        setGoals(data);
      }
      
      setLoading(false);
    }

    loadGoals();
  }, [user])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Goals</h1>

      {loading && <p>Loading...</p>}

      {!loading && goals.length > 0 && goals.map((goal) => (
        <div key={goal.id} className="border p-4 rounded mb-3">
          <h3 className="text-lg font-semibold">{goal.title}</h3>
          <p>{goal.description}</p>
          <p>
            Progress: {goal.current_amount} / {goal.target_amount}
          </p>
          <p>Target Date: {goal.target_date}</p>
          <p>Status: {goal.is_completed ? '✅ Completed' : '⏳ In Progress'}</p>
        </div>
      ))}

      {!loading && goals.length === 0 && <p>No goals found</p>}
    </div>
  )
}

export default MyGoals;