import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { DollarSign } from 'lucide-react';

const BudgetOverview = ({totalBudget, totalSpent, remainingBudget, monthlyIncome}) => {
    const spentPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
    const incomeUsed = monthlyIncome > 0 ? (totalSpent / monthlyIncome) * 100 : 0;

    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mt-5'>
            {/* MONTHLY INCOME CARD */}
            <Card 
                className='border-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white' 
                style={{boxShadow: 'var(--shadow-premium)'}}
            >
                <CardHeader className='pb-3'>
                    <CardTitle className='flex items-center justify-between text-sm font-medium opacity-90'>
                        Monthly Income
                        <DollarSign className='w-4 h-4'/> 
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="text-2xl font-bold">${monthlyIncome.toLocaleString()}</div>
                </CardContent>
            </Card>

            
        </div>
    )
}

export default BudgetOverview