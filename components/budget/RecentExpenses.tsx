import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Clock, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '../ui/badge';

const paymentMethodColors = {
  card: "bg-blue-100 text-blue-800",
  cash: "bg-green-100 text-green-800",
  bank_transfer: "bg-purple-100 text-purple-800",
  other: "bg-gray-100 text-gray-800"
};

const RecentExpenses = ({expenses}) => {
  return (
    <Card className='border-0' style={{boxShadow: 'var(--shadow-premium)'}}>
        <CardHeader>
            <CardTitle className='flex items-center gap-2' style={{color: 'var(--primary-navy)'}}>
                <Clock className='w-5 h-5'/>
                Recent Expenses
            </CardTitle>
        </CardHeader>

        <CardContent>
            {expenses.length === 0 ? (
                <div className="text-center py-8" style={{color: 'var(--text-secondary'}}>
                    <DollarSign className='w-12 h-12 mx-auto mb-3 opacity-50'/>
                    <p>No expenses recorded yet</p>
                    <p className='text-sm mt-1'>Start tracking your spending!</p>
                </div>
            ): (
                <div className="space-y-3">
                    {expenses.map((expense) => (
                        <div 
                            key={expense.id} 
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex-1">
                                <div className="font-medium" style={{color: 'var(--primary-navy)'}}>
                                    {expense.description}
                                </div>

                                <div className="flex items-center gap-2 mt-1">
                                    <span className='text-sm' style={{color: 'var(--text-secondary)'}}>{expense.category}</span>
                                    <span className="text-xs opacity-50">•</span> 

                                    <span className='text-sm' style={{color: 'var(--text-secondary)'}}>
                                        {format(new Date(expense.date), 'MMM d')}
                                    </span>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="font-bold text-lg" style={{color: 'var(--primary-navy)'}}>
                                    ${expense.amount.toFixed(2)}
                                </div>

                                <Badge className={`text-xs ${paymentMethodColors[expense.payment_method]}`}>
                                    {expense.payment_method.replace('_', '')}
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

export default RecentExpenses;