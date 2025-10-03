import { DollarSign, Target, TrendingUp, Trophy } from 'lucide-react';
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Skeleton } from '../ui/skeleton';

const StatsOverview = ({totalSaved, totalTarget, completedGoals, activeGoals, isloading}) => {
    const stats = [
        {
        title: "Total Saved",
        value: `$${totalSaved.toLocaleString()}`,
        icon: DollarSign,
        gradient: "from-green-500 to-emerald-500",
        bgGradient: "from-green-50 to-emerald-50"
        },
        {
        title: "Total Target",
        value: `$${totalTarget.toLocaleString()}`,
        icon: Target,
        gradient: "from-blue-500 to-cyan-500",
        bgGradient: "from-blue-50 to-cyan-50"
        },
        {
        title: "Active Goals",
        value: activeGoals,
        icon: TrendingUp,
        gradient: "from-purple-500 to-pink-500",
        bgGradient: "from-purple-50 to-pink-50"
        },
        {
        title: "Completed",
        value: completedGoals,
        icon: Trophy,
        gradient: "from-amber-500 to-orange-500",
        bgGradient: "from-amber-50 to-orange-50"
        }
    ];

    const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

    if (isloading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((_, i) => (
                    <Card key={i} className="border-0 shadow-lg">
                        <CardContent className="p-6">
                        <Skeleton className="h-4 w-20 mb-2" />
                        <Skeleton className="h-8 w-24 mb-4" />
                        <Skeleton className="h-2 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6 mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.title} className={`border-0 shadow-lg bg-gradient-to-r ${stat.bgGradient} overflow-hidden relative`}>
                        <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-6 -translate-y-6">
                            <div className={`w-full h-full rounded-full bg-gradient-to-r ${stat.gradient} opacity-20`} />
                        </div>

                        <CardContent className="p-6 relative z-10">
                            <div className="flex items-start justify-between">
                                <div>
                                <p className="text-sm font-medium text-slate-600 mb-2">{stat.title}</p>
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                                <stat.icon className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-slate-900">Overall Savings Progress</CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-slate-600">
                                ${totalSaved.toLocaleString()} of ${totalTarget.toLocaleString()}
                            </span>

                            <span className="text-sm font-bold text-slate-900">
                                {Math.round(overallProgress)}%
                            </span>
                        </div>

                        <Progress value={10} className="h-3" />
                    </div>
                </CardContent>
        </Card>
        </div>
    )
}

export default StatsOverview;