import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CalendarClock, CalendarIcon, ChevronDownIcon, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { addMonths, addWeeks, differenceInMonths, differenceInWeeks, format, isAfter } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';

const SavingsProjections = ({goal}) => {
    const [calculationMode, setCalculationMode] = useState('calculateEndDate');   
    const [contribution, setContribution] = useState(100); 
    const [frequency, setFrequency] = useState('bi-weekly');
    const [projections, setProjections] = useState([]);
    const [projectionTargetDate, setProjectionTargetDate] = useState<Date | undefined>(undefined);
    const [requiredContribution, setRequiredContribution] = useState(0);
    const [open, setOpen] = useState(false);
    const targetProjection = projections.find(p => p.amount >= goal?.target_amount);

    useEffect(() => {
        if(calculationMode !== 'calculateEndDate' || !contribution || contribution <= 0){
            setProjections([]);
            return;
        }

        const newProjections = [];
        const targetAmount = goal?.target_amount;
        const maxProjections = 104;
        let currentDate = new Date();
        let currentAmount = goal?.current_amount;

        while(currentAmount < targetAmount && newProjections.length < maxProjections){
            if(frequency === 'weekly') currentDate = addWeeks(currentDate, 1);
            else if(frequency === 'bi-weekly') currentDate = addWeeks(currentDate, 2);
            else if(frequency === 'monthly') currentDate = addMonths(currentDate, 1);

            currentAmount += contribution;

            newProjections.push({date: currentDate, amount: currentAmount});
        }

        setProjections(newProjections);
    }, [calculationMode, contribution, frequency, goal?.currentAmount, goal?.target_amount]);

    useEffect(() => {
        if(calculationMode !== 'calculateContribution' || !projectionTargetDate || isAfter(new Date(), projectionTargetDate)){
            setRequiredContribution(0);
            return;
        }

        const remainingAmount = goal?.target_amount - goal?.current_amount;

        if(remainingAmount <= 0){
            setRequiredContribution(0);
            return;
        }

        const today = new Date();
        let periods;

        if(frequency === 'weekly') periods = differenceInWeeks(projectionTargetDate, today);
        else if(frequency === 'bi-weekly') periods = Math.floor(differenceInWeeks(projectionTargetDate, today) / 2);
        else periods = differenceInMonths(projectionTargetDate, today);

        if(periods> 0) setRequiredContribution(remainingAmount /periods);
        else setRequiredContribution(0);
    }, [calculationMode, projectionTargetDate, frequency, goal?.current_amount, goal?.target_amount])

    return (
        <Card className='border-0 shadow-lg bg-white/80 backdrop-blur-sm'>
            <CardHeader>
                <CardTitle className='flex items-center gap-2'>
                    <CalendarClock className='w-5 h-5 text-blue-600'/>
                    Savings Projection
                </CardTitle>

                <p className='text-sm text-slate-500 pt-1'>Plan your savings strategy and visualize the path to your goal!</p>
            </CardHeader>

            <CardContent>
                <Tabs value={calculationMode} onValueChange={setCalculationMode} className='w-full'>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='calculateEndDate'>Calculate End Date</TabsTrigger>
                        <TabsTrigger value='calculateContribution'>Calculate Contribution</TabsTrigger>
                    </TabsList>

                    <TabsContent value='calculateEndDate' className='mt-6'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
                            <div className="">
                                <Label htmlFor='contribution'>Contribution Amount</Label>
                                <Input id='contribution' type='number' value={contribution} onChange={(e) => setContribution(parseFloat(e.target.value) || 0)} className='mt-1' placeholder='e.g., 100'/>
                            </div>

                            <div className="">
                                <Label htmlFor='frequency-end-date'>Frequency</Label>

                                <Select value={frequency} onValueChange={setFrequency}>
                                    <SelectTrigger id='frequency-end-date' className='mt-1'>
                                        <SelectValue placeholder='Select Frequency'/>
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value='weekly'>Weekly</SelectItem>
                                        <SelectItem value='bi-weekly'>Bi-Weekly</SelectItem>
                                        <SelectItem value='monthly'>Monthly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {targetProjection ? (
                            <div className="p-4 mb-6 bg-green-50 text-green-800 border border-green-200 rounded-lg text-center">
                                <p className='font-semibold'>You'll reach your goal on approximately</p>
                                <p className='text-2xl font-bold'>{format(targetProjection.date, 'MMMM d, yyyy')}</p>
                                <p className='text-sm'>with {projections.findIndex(p => p.amount >= goal?.target_amount) + 1} more contributions.</p>
                            </div>
                        ) : (
                            contribution > 0 && <p className='text-center text-slate-600 mb-6'>Keep contributing to see your projection</p>
                        )}

                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                            <h4 className='font-semibold text-slate-800'>Projected Timeline</h4>

                            {projections.slice(0, 12).map((proj, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-md shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <TrendingUp className='w-5 h-5 text-green-500'/>

                                        <div className="">
                                            <p className='font-semibold'>{format(proj.date, 'MMM d, yyyy')}</p>
                                            <p className='text-xs text-slate-500'>Contribution #{index + 1}</p>
                                        </div>
                                    </div>

                                    <p className='font-bold text-slate-900'>${Math.min(proj.amount, goal?.target_amount).toLocaleString()}</p>
                                </div>
                            ))}

                            {projections.length === 0 && contribution > 0 && (
                                <p className='text-center text-slate-500 py-4'>No Projections to show. Increase contribution amount.</p>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value='calculateContribution' className='mt-6'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-slate-50 rounded-lg">
                            <div className="">
                                <Label htmlFor='target-date'>Desired Goal Date</Label>

                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button variant={'outline'} className='w-full justify-start text-left font-normal mt-1' id='target-date'>
                                            <CalendarIcon className='mr-2 h-4 w-4'/>
                                            {projectionTargetDate ? format(projectionTargetDate, "PPP") : <span>Pick a date</span>}
                                            <ChevronDownIcon/>
                                        </Button>
                                    </PopoverTrigger>

                                    <PopoverContent className='w-auto z-50' align='start'>
                                        <Calendar 
                                            mode='single' 
                                            selected={projectionTargetDate} 
                                            captionLayout='dropdown' 
                                            onSelect={(date) => {
                                                if(date){
                                                    setProjectionTargetDate(date) 
                                                    setOpen(false)
                                                }
                                            }} 
                                            disabled={(date) => date < new Date()}
                                            autoFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="">
                                <Label htmlFor='frequency-contrubution'>Frequency</Label>

                                <Select value={frequency} onValueChange={setFrequency}>
                                    <SelectTrigger id='frequency-contribution' className='mt-1'>
                                        <SelectValue/>
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {requiredContribution > 0 ? (
                            <div className="p-4 mb-6 bg-blue-50 text-blue-800 border border-blue-200 rounded-lg text-center">
                                <p className='font-semibold'>You need to save</p>
                                <p className='text-2xl font-bold'>${requiredContribution.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                                <p className='text-sm capitalize'>{frequency.replace('-', '')} to teach your goal by {format(projectionTargetDate, 'MMMM d, yyyy')}</p>
                            </div>
                        ) : (
                            <div className="text-center text-slate-600 mb-6 py-8">
                                <p>Select a future date to calculate your required contribution</p>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

export default SavingsProjections;