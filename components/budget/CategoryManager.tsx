import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Check, Edit3, Plus, Target, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useUser } from '@clerk/nextjs';
import createClerkSupabaseClient from '@/lib/supabaseClient';

const categoryTypes = [
  { value: "housing", label: "Housing", icon: "🏠" },
  { value: "transportation", label: "Transportation", icon: "🚗" },
  { value: "food", label: "Food & Dining", icon: "🍽️" },
  { value: "utilities", label: "Utilities", icon: "⚡" },
  { value: "entertainment", label: "Entertainment", icon: "🎯" },
  { value: "healthcare", label: "Healthcare", icon: "🏥" },
  { value: "shopping", label: "Shopping", icon: "🛍️" },
  { value: "savings", label: "Savings", icon: "💰" },
  { value: "debt", label: "Debt Payment", icon: "💳" },
  { value: "other", label: "Other", icon: "📝" }
];

const categoryColors = [
  "#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", 
  "#ef4444", "#06b6d4", "#84cc16", "#f97316",
  "#ec4899", "#6b7280"
];

const CategoryManager = ({categoryData, onUpdate}) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingID] = useState(null);
    const [editingData, setEditingData] = useState({});
    const {user} = useUser();
    const supabase = createClerkSupabaseClient();

    const [newCategory, setNewCategory] = useState({
        name: '',
        budgeted_amount: '',
        category_type: '',
        color: categoryColors[0]
    })

    const totalBudget = categoryData.reduce((sum, cat) => sum + cat.budgeted_amount, 0);

    const handleAddCategory = async() => {
        if (!newCategory.name || !newCategory.budgeted_amount || !newCategory.category_type) return;

        try {
            const {data, error} = await supabase
                .from('budget_categories')
                .insert([
                    {
                        clerk_user_id: user?.id,
                        name: newCategory.name,
                        budgeted_amount: parseFloat(newCategory.budgeted_amount) || 0,
                        category_type: newCategory.category_type,
                        color: newCategory.color
                    }
                ]).select().single()

            if(error) throw error;

            onUpdate([...categoryData, data]);

            setNewCategory({
                name: "",
                budgeted_amount: "",
                category_type: "",
                color: categoryColors[0],
            })

            setShowAddForm(false)
        } catch (error) {
            console.error("Error adding category:", error.message);
        } 
    }

    const handleDeleteCategory = async(id) => {

    }

    const handleEditClick = (category) => {
        setEditingID(category.id);
    }

    const handleSaveEdit = () => {

    }

    const handleCancelEdit = () => {
        setEditingID(null);
        setEditingData({});
    }

    return (
        <Card className='border-0' style={{boxShadow: 'var(--shadow-premium)'}}>
            <CardHeader>
                <CardTitle className='flex items-center justify-between' style={{color: 'var(--primary-navy)'}}>
                    <div className="flex items-center gap-2">
                        <Target className='w-5 h-5'/>
                        Budget Categories
                    </div>

                    <Button onClick={() => setShowAddForm(true)} className='bg-emerald-600 hover:bg-emerald-700 text-white'>
                        <Plus className='w-4 h-4 mr-2'/>
                        Add Category
                    </Button>
                </CardTitle>
            </CardHeader>

            <CardContent className='space-y-6'>
                {showAddForm && (
                    <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg space-y-4">
                        <h3 className='font-semibold' style={{color: 'var(--primary-navy)'}}>Add New Category</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Category Name</Label>

                                <Input 
                                    value={newCategory.name} 
                                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                                    placeholder='e.g., Groceries'
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Monthly Budget ($)</Label>

                                <Input
                                    type='number'
                                    step={0.01}
                                    min={0}
                                    value={newCategory.budgeted_amount}
                                    onChange={(e) => setNewCategory({...newCategory, budgeted_amount: e.target.value})}
                                />
                            </div>

                            <div className="space-y2">
                                <Label>Category Type</Label>

                                <Select 
                                    value={newCategory.category_type} 
                                    onValueChange={(value) => setNewCategory({...newCategory, category_type: value})}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Type"/>
                                    </SelectTrigger>

                                    <SelectContent>
                                        {categoryTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.icon} {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button onClick={handleAddCategory} className='bg-emerald-600 hover:bg-emerald-700 text-white'>
                                Add Category
                            </Button>

                            <Button  variant={'outline'} onClick={() => setShowAddForm(false)}>Cancel</Button>
                        </div>
                    </div>
                )}

                {categoryData.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b">
                            <span className='font-medium' style={{color: 'var(--primary-navy)'}}>Total Monthly Budget</span>

                            <span className='text-2xl font-bold' style={{color: 'var(--primary-emerald)'}}>
                                ${totalBudget.toLocaleString()}
                            </span>
                        </div>

                        <div className="grid gap-3">
                            {categoryData.map((category) => {
                                const categoryType = categoryTypes.find(t => t.value === category.category_type);
                                const isEditing = editingId === category.id;

                                return(
                                    <div 
                                        key={category.id} 
                                        className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        {isEditing ? (
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Category Name</Label>

                                                        <Input 
                                                            value={editingData.name} 
                                                            onChange={(e) => setEditingData({...editingData, name: e.target.value})}
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Monthly Budget ($)</Label>

                                                        <Input 
                                                            type='number'
                                                            step={0.01}
                                                            min={0}
                                                            value={editingData.budgeted_amount}
                                                            onChange={(e) => setEditingData({...editingData, budgeted_amount: e.target.value})}
                                                            placeholder='0.00'
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>Category Type</Label>

                                                        <Select 
                                                            value={editingData.category_type} 
                                                            onValueChange={(value) => setEditingData({...editingData, category_type: value})}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select Type"/>
                                                            </SelectTrigger>

                                                            <SelectContent>
                                                                {categoryTypes.map((type) => (
                                                                    <SelectItem key={type.value} value={type.value}>
                                                                        {type.icon} {type.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>

                                                <div className="flex gap-3">
                                                    <Button 
                                                        onClick={() => handleSaveEdit(category.id)}
                                                        className='bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer'
                                                    >
                                                        <Check className='w-4 h-4 mr-2'/>
                                                        Save
                                                    </Button>

                                                    <Button 
                                                        variant={'outline'} 
                                                        onClick={handleCancelEdit} 
                                                        className='cursor-pointer'
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className='text-2xl'>{categoryType?.icon || "📝"}</span>

                                                    <div className="">
                                                        <div className="font-medium" style={{color: 'var(--primary-navy)'}}>
                                                            {category.name}
                                                        </div>

                                                        <div className="text-sm" style={{color: 'var(--text-secondary)'}}>
                                                            {categoryType?.label || category.category_type}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <span className='font-bold text-lg' style={{color: 'var(--primary-navy'}}>
                                                        ${category.budgeted_amount.toLocaleString()}
                                                    </span>

                                                    <div className="flex-gap-2">
                                                        <Button
                                                            variant={'ghost'}
                                                            size={'icon'}
                                                            onClick={() => handleEditClick(category)}
                                                            className='text-blue-500 hover:text-blue-700 hover:bg-blue-50 cursor-pointer'
                                                        >
                                                            <Edit3 className='w-4 h-4'/>
                                                        </Button>

                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDeleteCategory(category.id)}
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {categoryData.length === 0 && !showAddForm && (
                    <div className="text-center py-8" style={{color: 'var(--text-secondary'}}>
                        <Target className='w-16 h-16 mx-auto mb-4 opacity-50'/>
                        <p className='text-lg'>No budget categories</p>
                        <p className='text-sm mt-1'>Create categories to start budgeting!</p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default CategoryManager;