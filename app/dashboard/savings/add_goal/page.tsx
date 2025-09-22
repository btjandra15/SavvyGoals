"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import createClerkSupabaseClient from '@/lib/supabaseClient';
import { useSession } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { format } from 'date-fns';
import { ArrowLeft, Save, Target } from 'lucide-react';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'

const categories = [
  { value: "vacation", label: "Vacation", emoji: "🏖️" },
  { value: "emergency", label: "Emergency Fund", emoji: "🚨" },
  { value: "house", label: "House/Property", emoji: "🏠" },
  { value: "car", label: "Car/Vehicle", emoji: "🚗" },
  { value: "education", label: "Education", emoji: "📚" },
  { value: "gadgets", label: "Electronics/Gadgets", emoji: "📱" },
  { value: "wedding", label: "Wedding", emoji: "💒" },
  { value: "other", label: "Other", emoji: "🎯" }
];

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {session} = useSession();
  const supabase = createClerkSupabaseClient();

  const [goalData, setGoalData] = useState({
    title: "",
    description: "",
    target_amount: "",
    target_date: "",
    category: "Other",
    current_amount: 0
  });

  const handleInputChange = (field, value) => {
    setGoalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(!goalData.title || !goalData.target_amount) return;

    setIsLoading(true);

    try {
      const {data, error} = await supabase.from('goals').insert({
        clerk_user_id: session?.user?.id,
        title: goalData.title,
        description: goalData.description,
        target_amount: goalData.target_amount,
        current_amount: 0,
        category: goalData.category,
        target_date: goalData.target_date ? format (new Date(goalData.target_date), 'yyyy-MM-dd') : null,
      }).select().single();

      if(error){
        console.error('Error creating goal: ', error);
         alert('❌ Failed to create goal');
         return
      }

      console.log('✅ Goal created:', data);
      alert(`✅ Goal "${data.title}" created successfully!`);
    } catch (error) {
      console.error('Unexpected error:', err);
      alert('⚠️ Something went wrong while creating the goal');
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8'>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex items-center gap-4">
          <Button variant='outline' size='icon' onClick={() => redirect('/dashboard')} className='hover:bg-white shadow-md'>
            <ArrowLeft className='w-4 h-4'/>
          </Button>

          <div className="">
            <h1 className='text-3xl font-bold text-slate-900'>Create New Savings Goal</h1>
            <p className='text-slate-600 mt-1'> Set up a new goal to start tracking your savings</p>
          </div>
        </div>

        <Card className='bg-white/80 backdrop-blur-sm border-0 shadow-xl'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-2xl text-slate-900'>
              <Target className='w-6 h-6 text-blue-600'/>
              Goal Details
            </CardTitle>
          </CardHeader>

          {/* GOAL FORM */}
          <CardContent>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* GOAL TITLE */}
              <div className="space-y-2">
                <Label htmlFor='title' className='text-sm font-semibold text-slate-700'>Goal Title *</Label>

                <Input id='title' placeholder='e.g., Dream Vacation to Japan' value={goalData.title} onChange={(e) => handleInputChange('title', e.target.value)} className='text-lg' required/>
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <Label htmlFor='description' className='text-sm font-semibold text-slate-700'>Description (Optional)</Label>
                <Textarea id='description' placeholder='What are you saving for?' value={goalData.description} onChange={(e) => handleInputChange('description', e.target.value)} className='h-24'/>
              </div>

              {/* TARGET AMOUNT & CATEGORY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* TARGET AMOUNT */}
                <div className="space-y-2">
                  <Label htmlFor='target_amount' className='text-sm font-semibold text-slate-700'>Target Amount *</Label>

                  <div className="relative">
                    <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium'>$</span>

                    <Input id='target_amount' type='number' min='1' step='0.01' placeholder='5000' value={goalData.target_amount} onChange={(e) => handleInputChange('target_amount', e.target.value)} className='pl-8 text-lg font-semibold' required/>
                  </div>
                </div>
                
                {/* CATEGORY */}
                <div className="space-y-2">
                  <Label className='text-sm font-semibold text-slate-700'>Category</Label>

                  <Select value={goalData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue/>
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center gap-2">
                            <span>{category.emoji}</span>
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* TARGET DATE */}
              <div className="space-y-2">
                <Label htmlFor='target_date' className='text-sm font-semibold text-slate-700'>Target Date (Optional)</Label>
                <Input id='target_date' type='date' value={goalData.target_date} onChange={(e) => handleInputChange('target_date', e.target.value)} min={format(new Date(), 'yyy-MM-dd')}/>
              </div>

              {/* GOAL CARD PREVIEW */}
              {goalData.title && goalData.target_amount && (
                <Card className='bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200'>
                  <CardContent className='p-6'>
                    <h3 className='font-semibold text-slate-900 mb-2'>Goal Preview</h3>

                    <div className="space-y-2 text-sm">
                      <p>
                        <span className='font-medium'>Title:</span> {goalData.title}
                      </p>

                      <p>
                        <span className='font-medium'>Target:</span> ${parseFloat(goalData.target_amount || 0).toLocaleString()}
                      </p>

                      <p>
                        <span className='font-medium'>Category:</span> {categories.find(c => c.value === goalData.category)?.emoji} {categories.find(c => c.value === goalData.category)?.label}
                      </p>

                      {goalData.target_date && (
                        <p>
                          <span className='font-medium'>Target Date:</span> {format(new Date(goalData.target_date), 'MMMM d, yyyy')}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* SUBMIT */}
              <div className="flex gap-4 pt-2">
                <Button type='button' variant='outline' onClick={() => redirect('/dashboard')}>Cancel</Button>
                <Button type='submit' disabled={!goalData.title || !goalData.target_amount || isLoading} className='flex-1 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white shadow-lg'>
                  {isLoading ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Save className='w-4 h-4 mr-2'/>
                      Create Goal
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default page;