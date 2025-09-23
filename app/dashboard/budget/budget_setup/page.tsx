"use client"

import CategoryManager from '@/components/budget/CategoryManager';
import IncomeSetup from '@/components/budget/IncomeSetup';
import { Button } from '@/components/ui/button';
import createClerkSupabaseClient from '@/lib/supabaseClient';
import { useUser } from '@clerk/nextjs';
import { ArrowLeft } from 'lucide-react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const BudgetSetup = () => {
  const [userData, setUserData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const {user} = useUser();
  const supabase = createClerkSupabaseClient();

  const loadData = async() => {
    const {data: userData, error: userError} = await supabase.from('users').select('*').eq('clerk_user_id', user?.id)

    const {data: categoryData, error: categoryError} = await supabase
      .from('budget_categories')
      .select('*')
      .eq('clerk_user_id', user?.id)

    if((userData && userData.length > 0) && !userError){
      setUserData(userData[0]);
    }

    if((categoryData && categoryData.length > 0) && !categoryError){
      setCategoryData(categoryData);
    }
  }

  const refreshData = () => loadData();

  useEffect(() => {
    loadData();
  }, [user]);

  return (
    <div className='p-6 md:p-8 min-h-screen' style={{backgroundColor: 'var(--bg-luxury)'}}>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant={'outline'} 
            size={'icon'} 
            onClick={() => redirect('/dashboard/budget')} 
            className='hover:bg-gray-50 cursor-pointer'
          >
            <ArrowLeft className='w-4 h-4'/>
          </Button>
          
          <div className="">
            <h1 className='text-3xl font-bold tracking-tight' style={{color: 'var(--primary-navy)'}}>Budget Setup</h1>
            <p className='mt-1' style={{color: 'var(--text-secondary)'}}>
              Configure your income and spending categories
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <IncomeSetup userData={userData} refreshData={refreshData}/>
          <CategoryManager categoryData={categoryData} onUpdate={refreshData}/>
        </div>
      </div>
    </div>
  )
}

export default BudgetSetup;