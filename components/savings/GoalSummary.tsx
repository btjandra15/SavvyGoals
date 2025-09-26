import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { differenceInDays, format } from 'date-fns';
import { Calendar, CheckCircle } from 'lucide-react';

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

const GoalSummary = ({goal}) => {
    const progress = (goal?.current_amount / goal?.target_amount) * 100;
    const remaining = goal?.target_amount - goal?.current_amount;
    const daysLeft = goal?.target_date ? differenceInDays(new Date(goal.target_date), new Date()) : null;
    const isOverdue = goal?.target_date && daysLeft < 0 && !goal?.is_completed

    return (
        <Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm'>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className='text-xl text-slate-900'>Goal Overview</CardTitle>
                    <Badge className={categoryColors[goal?.category]}>{goal?.category}</Badge>
                </div>

                {goal?.description && <p className='text-slate-600 pt-2'>{goal?.description}</p>}
            </CardHeader>

            <CardContent className='space-y-6'>
                <div className="space-y-3">
                    <Progress value={Math.min(progress, 100)} className='h-3'/>

                    <div className="flex justify-between items-center text-sm font-medium">
                        <span className='text-slate-700'>
                            {Math.round(progress)}% Complete
                        </span>

                        {remaining > 0 ? (
                            <span className='text-slate-600'>${remaining.toLocaleString()} to go</span>
                        ) : (
                            <span className='text-green-600 flex items-center gap-1'>
                                <CheckCircle className='w-4 h-4'/> Goal Reached!
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <p className='text-sm text-slate-500 mb-1'>Current Amount</p>
                        <p className='text-2xl font-bold text-slate-900'>${goal?.current_amount.toLocaleString()}</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                        <p className='text-sm text-slate-500 mb-1'>Target Amount</p>
                        <p className='text=2xl font-bold text-blue-700'>${goal?.target_amount.toLocaleString()}</p>
                    </div>
                </div>

                {goal?.target_date && (
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <Calendar className='w-4 h-4'/>
                        <span>Target Date: {format(new Date(goal?.target_date), 'MMM d, yyy')}</span>

                        <Badge variant={'outline'} className={isOverdue ? 'text-red-600 border-red-200 bg-red-50' : 'text-slate-600'}>
                            {isOverdue ? `${Math.abs(daysLeft)} days overdue` : (daysLeft !== null ? `${daysLeft} days left` : 'No Target Date')}
                        </Badge>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default GoalSummary;