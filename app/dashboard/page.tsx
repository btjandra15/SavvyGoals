import React from 'react'

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Overview</h1>
      <p className="text-slate-600">Your financial summary at a glance.</p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Savings Snapshot */}
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
          <h2 className="font-semibold text-lg mb-4">Savings Goals</h2>
          <p className="text-slate-500 text-sm">You’ve saved $4,500 across 3 goals.</p>
          <a href="/dashboard/savings" className="text-blue-600 hover:underline text-sm">View Goals →</a>
        </div>

        {/* Budget Snapshot */}
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200">
          <h2 className="font-semibold text-lg mb-4">Budget</h2>
          <p className="text-slate-500 text-sm">This month: $2,300 spent / $3,000 budgeted.</p>
          <a href="/dashboard/budget" className="text-blue-600 hover:underline text-sm">View Budget →</a>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;