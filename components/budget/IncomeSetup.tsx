import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Check, DollarSign, Edit3 } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useUser } from '@clerk/nextjs';
import createClerkSupabaseClient from '@/lib/supabaseClient';

const IncomeSetup = ({userData, refreshData}) => {
    const [editing, setEditing] = useState(false);
    const [income, setIncome] = useState(userData?.monthly_income || '');
    const [loading, setloading] = useState(false);
    const {user} = useUser();
    const supabase = createClerkSupabaseClient();

    const handleSave = async() => {
        try {
            setloading(true);

            const {error} = await supabase
                .from('users')
                .update({monthly_income: parseFloat(income)})
                .eq('clerk_user_id', user?.id)

            if(error) throw error;

            await refreshData();

            setEditing(false);
        } catch (error) {
            
        }
    }

    const handleCancel = () => {}

    return (
        <Card className='border-0' style={{boxShadow: 'var(--shadow-premium)'}}>
            <CardHeader>
                <CardTitle className='flex items-center justify-between' style={{color: 'var(--primary-navy)'}}>
                    <div className="flex items-center gap-2">
                        <DollarSign className='w-5 h-5'/>
                        Monthly Income
                    </div>

                    {!editing && (
                        <Button 
                            variant={'outline'} 
                            size={'sm'} 
                            onClick={() => setEditing(true)} 
                            className='hover:bg-gray-50 cursor-pointer'
                        >
                            <Edit3 className='w-4 h-4 mr-2'/>
                            Edit
                        </Button>
                    )}
                </CardTitle>
            </CardHeader>

            <CardContent>
                {editing ? (
                    <div className='space-y-4'>
                        <div className="space-y-2">
                            <Label htmlFor='monthly_income'>Monthly Income ($)</Label>
                            <Input 
                                id='monthly_income' 
                                type='number' 
                                step={'0.01'} 
                                min={0} 
                                value={income} 
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder='Enter your monthly income...'
                                className='h-12 text-lg'
                            />
                        </div>

                        <div className="flex gap-3">
                            <Button 
                                onClick={handleSave} 
                                disabled={loading} 
                                className='bg-emerald-600 hover:bg-emerald-700 text-white'
                            >
                                <Check className='w-4 h-4 mr-2'/>
                                Save
                            </Button>

                            <Button variant={'outline'} onClick={handleCancel} disabled={loading}>Cancel</Button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6">
                        {userData?.monthly_income ? (
                            <div className="">
                                <div className="text-4xl font-bold mb-2" style={{color: 'var(--primary-emerald)'}}>
                                    ${userData?.monthly_income.toLocaleString()}
                                </div>

                                <p style={{color: 'var(--text-secondary)'}}>per month</p>
                            </div>
                        ) : (
                            <div className="">
                                <div className="text-2xl font-semibold mb-2" style={{color: 'var(--text-secondary'}}>
                                    No income set
                                </div>

                                <p className='text-sm' style={{color: 'var(--text-secondary)'}}>
                                    Click Edit to add your monthly income
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default IncomeSetup;