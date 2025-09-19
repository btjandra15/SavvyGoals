import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Clock, TrendingDown, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { format } from 'date-fns';

const RecentActivity = ({transactions, goals, isLoading}) => {
  const getGoalTitle = (goalId) => {
    const goal = goals.find(g => g.id === goalId);
    return goal ? goal.title : 'Unknown Goal';
  }

  return (
    <Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm'>
        <CardHeader>
            <CardTitle className='flex items-center gap-2 text-slate-900'>
                <Clock className='w-5 h-5'/>
                Recent Activity
            </CardTitle>
        </CardHeader>

        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-6">
              <Clock className='w-12 h-12 text-slate-300 mx-auto mb-3'/>
              <p className='text-slate-600'>No Recent Transactions</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transactions.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className={`p-2 rounded-full ${transactions.type === 'deposit' ? 'bg-green=100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {transactions.type === 'deposit' ? <TrendingUp className='w-4 h-4'/> : <TrendingDown className='w-4 h-4'/>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className='font-medium text-slate-900 truncate'>{getGoalTitle(transaction.goal_id)}</p>
                    
                    <p className='text-xs text-slate-500'>
                      {format(new Date(transaction.created_at), 'MMM d, h:mm a')}
                    </p>
                  </div>

                  <div className="text-right">
                    <Badge variant='outline' className={`font-semibold ${transaction.type === 'deposit' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}> 
                      {transaction.type == 'deposit' ? '+' : '-'}
                      ${Math.abs(transaction.amount).toLocaleString()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
    </Card>
  )
}

export default RecentActivity;