import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { DollarSign, Target, TrendingDown, TrendingUp } from 'lucide-react';
import { Progress } from '../ui/progress';

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

            <Card className='border-0' style={{boxShadow: 'var(--shadow-premium)'}}>
                <CardHeader className='pb-3'>
                    <CardTitle 
                        className='flex items-center justify-between text-sm font-medium' 
                        style={{color: 'var(--text-secondary('}}
                    >
                        Total Budget
                        <Target className='w-4 h-4'/> 
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="text-2xl font-bold" style={{color: 'var(--primary-navy)'}}>
                        ${totalBudget.toLocaleString()}
                    </div>

                    <p className='text-xs mt-1' style={{color: 'var(--text-secondary)'}}>Planned Spending</p>
                </CardContent>
            </Card>

            <Card className='border-0' style={{boxShadow: 'var(--shadow-premium)'}}>
                <CardHeader className='pb-3'>
                    <CardTitle 
                        className='flex items-center justify-between text-sm font-medium ' 
                        style={{color: 'var(--text-secondary'}}
                    >
                        Total Spent
                        <TrendingDown className='w-4 h-4'/>
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div 
                        className="text-2xl font-bold" 
                        style={{color: spentPercentage > 100 ? 'var(--primary-coral)' : 'var(--primary-navy)'}}
                    >
                        ${totalSpent.toLocaleString()}
                    </div>

                    <div className="mt-2">
                        <Progress value={Math.min(spentPercentage, 100)} className='h-1'/>
                        <p>{spentPercentage.toFixed(1)}% of budget used</p>
                    </div>
                </CardContent>
            </Card>

            <Card className='border-0' style={{boxShadow: 'var(--shadow-premium)'}}>
                <CardHeader className='pb-3'>
                    <CardTitle 
                        className='flex items-center justify-between text-sm font-medium' 
                        style={{color: 'var(--text-secondary'}}
                    >
                        Remaining
                        <TrendingUp className='w-4 h-4'/>
                    </CardTitle> 
                </CardHeader>

                <CardContent>
                    <div 
                        className={`text-2xl font-bold ${remainingBudget < 0 ? 'text-red-600' : ''}`}
                        style={{color: remainingBudget < 0 ? 'var(--primary-coral)' : 'var(--primary-emerald'}}
                    >
                        ${remainingBudget.toLocaleString()}
                    </div>

                    <p className='text-xs mt-1' style={{color: 'var(--text-secondary'}}>
                        {remainingBudget < 0 ? 'Over Budget' : 'Left to Spend'}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default BudgetOverview;