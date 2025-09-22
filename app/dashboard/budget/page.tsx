"use client"

import BudgetOverview from '@/components/budget/budgetoverview';
import createClerkSupabaseClient from '@/lib/supabaseClient';
import { useUser } from '@clerk/nextjs';
import { endOfMonth, format, isWithinInterval, startOfMonth } from 'date-fns';
import React, { useEffect, useState } from 'react'

const Budget = () => {
  const [userData, setUserData] = useState([]);
  const [budgetCategory, setBudgetCategory] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useUser();
  const client = createClerkSupabaseClient();

  const loadUser = async() => {
    const {data, error} = await client
      .from('users')
      .select("*")
      .eq('clerk_user_id', user.id);

    if (data && data.length > 0) {
      setUserData(data[0]); 
    }
  }

  const loadData = async() => {
    setIsLoading(true);

    try {
      const {data: budgetCategoryData, error: budgetCategoryError} = await client
        .from('budget_categories')
        .select('*')
        .eq('clerk_user_id', user.id)

      const {data: expenseData, error: expenseError} = await client
        .from('expenses')
        .select('*')
        .eq('clerk_user_id', user.id)

      if(budgetCategoryError) {
        console.log("Error pulling budget category data: ", budgetCategoryError);
        return;
      }else if(expenseError){
        console.log("Error pulling expenses data: ", budgetCategoryError);
        return;
      }
      
      // console.log("Expenses Data: ", expenseData);
      setBudgetCategory(budgetCategoryData);
      setExpenses(expenseData);
    } catch (error) {
      console.log("Error fetching data: ", error)
    }
  }

  const getCurrentMonthExpenses = () => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    return expenses.filter(expense => isWithinInterval(new Date(expense.date), {start: monthStart, end: monthEnd}))
  }

  const totalBudget = budgetCategory.reduce((sum, category) => sum + category.budget_amount, 0);
  const totalSpent = getCurrentMonthExpenses().reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBudget = totalBudget - totalSpent;

  useEffect(() => {
    loadUser();
    loadData();
  }, [user]);

  useEffect(() => {
    if (userData.length) {
      console.log('User data loaded:', userData);
    }
  }, [userData]);

  return (
    <div className='p-6 md:p-8 min-h-screen' style={{backgroundColor: 'var(--bg-luxury)'}}>
      {/* HEADER */}
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="">
            <h1 className='text-3xl md:text-4xl font-bold tracking-tight' style={{color: 'var(--primary-navy)'}}>Budget Dashboard</h1>
          </div>

          <p className='text-lg mt-2' style={{color: 'var(--text-secondary)'}}>{format(new Date(), 'MMMM yyyy')} • Welcome back</p>
        </div>
      </div>

      <BudgetOverview 
        totalBudget={totalBudget} 
        totalSpent={totalSpent} 
        remainingBudget={remainingBudget} 
        monthlyIncome={userData?.monthly_income || 0}
      />
    </div>
  )
}

export default Budget;