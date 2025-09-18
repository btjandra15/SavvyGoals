import React from 'react'
import { Card, CardHeader, CardTitle } from './ui/card';
import { Clock } from 'lucide-react';

const RecentActivity = () => {
  return (
    <Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm'>
        <CardHeader>
            <CardTitle className='flex items-center gap-2 text-slate-900'>
                <Clock className='w-5 h-5'/>
                Recent Activity
            </CardTitle>
        </CardHeader>
    </Card>
  )
}

export default RecentActivity;