import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card';
import { AlertCircle, TrendingUp } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

const categoryIcons = {
  housing: "🏠",
  transportation: "🚗", 
  food: "🍽️",
  utilities: "⚡",
  entertainment: "🎯",
  healthcare: "🏥",
  shopping: "🛍️",
  savings: "💰",
  debt: "💳",
  other: "📝"
};

const CategoryProgress = ({budgetCategory, calculateCategorySpending}) => {
  return (
    <Card className='border-0' style={{boxShadow: 'var(--shadow-premium)'}}>
        <CardHeader>
            <TrendingUp className='w-5 h-5'/>
            Category Progress
        </CardHeader>

        <CardContent className='space-y-4'>
            {budgetCategory.length === 0 ? (
                <div className="text-center py-8" style={{color: 'var(--text-secondary)'}}>
                    <p>No Budget Categories set up yet</p>
                    <p className='text-sm mt-1'>Go to the Budget Setup tab to add categories</p>
                </div>
            ) : (
                budgetCategory.map((category) => {
                    const spent = calculateCategorySpending(category.name);
                    const percentage = (spent / category.budgeted_amount) * 100;
                    const remaining = category.budgeted_amount - spent;

                    return(
                        <div key={category.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className='text-lg'>{categoryIcons[category.category_type] || "📝"}</span>

                                    <span className='font-medium' style={{color: 'var(--primary-navy)'}}>
                                        {category.name}
                                    </span>

                                    {percentage > 100 && (
                                        <AlertCircle className='w-4 h-4 text-red-500'/>
                                    )}
                                </div>

                                <div className="text-right">
                                    <div className="font-medium" style={{color: 'var(--primary-navy)'}}>
                                        ${spent.toFixed(0)} / ${category.budgeted_amount.toFixed(0)}
                                    </div>

                                    <div 
                                        className="text-xs" 
                                        style={{color: percentage > 100 ? 'var(--primary-coral)' : 'var(--primary-emerald)'}}
                                    >
                                        ${Math.abs(remaining).toFixed(0)} {remaining < 0 ? 'over' : 'left'}
                                    </div>
                                </div>
                            </div>

                            <Progress className='h-2' value={Math.min(percentage, 100)}/>

                            <div className="flex justify-between items-center">
                                <div className="flex justify-between items-center">
                                    <Badge 
                                        className='text-xs' 
                                        variant={percentage > 100 ? 'destructive' : percentage > 80 ? 'secondary' : 'default'}
                                    >
                                        {percentage.toFixed(0)}% used
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    )
                }
            ))}
        </CardContent>
    </Card>
  )
}

export default CategoryProgress