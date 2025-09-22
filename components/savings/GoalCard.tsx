import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Calendar, CheckCircle, Edit, Minus, Plus } from 'lucide-react';
import { Progress } from '../ui/progress';
import { differenceInDays, format, isPast } from 'date-fns';
import { Input } from '../ui/input';
import createClerkSupabaseClient from '@/lib/supabaseClient';
import { useSession } from '@clerk/nextjs';

const categoryIcons = {
  vacation: "🏖️",
  emergency: "🚨", 
  house: "🏠",
  car: "🚗",
  education: "📚",
  gadgets: "📱",
  wedding: "💒",
  other: "🎯"
};

const categoryColors = {
  vacation: "bg-cyan-100 text-cyan-800 border-cyan-200",
  emergency: "bg-red-100 text-red-800 border-red-200",
  house: "bg-green-100 text-green-800 border-green-200", 
  car: "bg-blue-100 text-blue-800 border-blue-200",
  education: "bg-purple-100 text-purple-800 border-purple-200",
  gadgets: "bg-orange-100 text-orange-800 border-orange-200",
  wedding: "bg-pink-100 text-pink-800 border-pink-200",
  other: "bg-slate-100 text-slate-800 border-slate-200"
};

const GoalCard = ({goal, onUpdate}) => {
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAmount, setQuickAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const progress = (goal.current_amount / goal.target_amount) * 100;
  const remaining = goal.target_amount - goal.current_amount;
  const isOverdue = goal.target_date && isPast(new Date(goal.target_date));
  const daysLeft = goal.target_date ? differenceInDays(new Date(goal.target_date), new Date()) : null;
  const supabase = createClerkSupabaseClient();

  const handleQuickTransaction = async(type) => {
    if(!quickAmount || isProcessing) return;

    setIsProcessing(true);

    try {
      const amount = parseFloat(quickAmount);
      const transactionAmount = type === 'deposit' ? amount : -amount;

      const {data: transactionData, error: transactionError} = await supabase
        .from('transactions')
        .insert(
          {
            goal_id: goal.id,
            amount: transactionAmount,
            type: type,
            description: `${type} via Quick Add`,
            transaction_date: format(new Date(), 'yyyy-MM-dd'),
          },
        ).select().single();

      if (transactionError) {
        console.error("Transaction insert failed:", transactionError);
        alert("❌ Failed to add transaction. Check console for details.");
      } else if (transactionData) {
        console.log("✅ Transaction added:", transactionData);
        alert(`✅ ${type} of $${amount} recorded successfully!`);
      }

      const newCurrentAmount = Math.max(0, goal.current_amount + transactionAmount);
      const isCompleted = newCurrentAmount >= goal.target_amount;

      const {data: goalData, error: goalError} = await supabase
        .from('goals')
        .update({
          current_amount: newCurrentAmount,
          is_completed: isCompleted,
          completed_date: isCompleted ? format(new Date(), 'yyyy-MM-dd') : null
        }).eq('id', goal.id).select().single();

      if (goalError) {
        console.error("⚠️ Failed to update goal:", goalError);
        alert("❌ Transaction added, but goal update failed!");
      } else {
        console.log("✅ Goal updated:", goalData);
      }

      setQuickAmount('');
      setShowQuickAdd(false);
      onUpdate();
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("⚠️ Something went wrong while adding the transaction.");
    }finally{
      setIsProcessing(false);
    }
  }

  return (
    <Card className='border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden group'>
      {/* HEADER */}
      <CardHeader className='pb-4'>
        <div className="flex items-start gap-3">
          <span className='text-2xl'>{categoryIcons[goal.category]}</span>

          <div className="">
            <CardTitle className='text-xl font-bold text-slate-900 group-hover:text-blue-800 transition-colors'>{goal.title}</CardTitle>

            {goal.description && (
              <p className='text-sm text-slate-600 mt-1'>{goal.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge className={`${categoryColors[goal.category]} border font-medium`}>{goal.category}</Badge>

          <Link href={`/dashboard/edit/${goal.id}`}>
            <Button variant="ghost" size="icon" className='hover:bg-blue-50'>
              <Edit className='w-4 h-4'/>
            </Button>
          </Link>
        </div>
      </CardHeader>

      <CardContent className='space-y-4'>
        {/* PROGRESS SECTION */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className='text-lg font-bold text-slate-900'>${goal.current_amount?.toLocaleString() || 0}</span>
            <span className='text-slate-600'>of ${goal.target_amount?.toLocaleString()}</span>
          </div>

          <Progress value={Math.min(progress, 100)} className='h-3'/>

          <div className="flex justify-between items-center text-sm">
            <span className='font-medium text-slate-700'>{Math.round(progress)}% Completed</span>

            {remaining > 0 && (
              <span className='text-slate-600'>
                ${remaining.toLocaleString()} to go
              </span>
            )}
          </div>
        </div>

        {/* GOAL STATUS & TIMELINE */}
        <div className="flex items-center justify-between pt-2">
          {goal.target_date && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar className='w-4 h-4 text-slate-400'/>
              <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-slate-600'}`}>
                {isOverdue ? 'Overdue' : daysLeft !== null && daysLeft <= 30 ? `${daysLeft} days left` : format(new Date(goal.target_date), 'MMM d, yyyy')}
              </span>
            </div>
          )}

          {progress >= 100 && (
            <Badge className='bg-green-100 text-gray-800 border-green-200'>
              <CheckCircle className='w-3 h-3 mr-1'/>
              Completed!
            </Badge>
          )}
        </div>

        {/* QUICK ACTIONS */}
        {!showQuickAdd && progress < 100 && (
          <Button onClick={() => setShowQuickAdd(true)} variant='outline' className='w-full hover:bg-blue-50 border-blue-200 text-blue-700 hover:text-blue-800'>
            <Plus className='w-4 h-4 mr-2'/>
            Quick Add Money
          </Button>
        )}

        {showQuickAdd && (
          <div className="space-y-3 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
            <Input type='number' placeholder='Enter amount' value={quickAmount} onChange={(e) => setQuickAmount(e.target.value)} className='text-center text-lg font-semibold'/>

            <div className="flex gap-2">
              <Button onClick={() => handleQuickTransaction('deposit')} disabled={!quickAmount || isProcessing} className='flex-1 bg-green-600 hover:bg-green-700 text-white'>
                <Plus className='w-4 h-4 mr-1'/>
                Add
              </Button>

              <Button onClick={() => handleQuickTransaction('withdrawal')} disabled={!quickAmount || isProcessing} variant='outline' className='flex-1 hover:bg-red-50 border-red-200 text-red-700'>
                <Minus className='w-4 h-4 mr-1'/>
                Remove
              </Button>

              <Button onClick={() => {setShowQuickAdd(false); setQuickAmount('');}} variant='ghost' className='px-3'>Cancel</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default GoalCard;