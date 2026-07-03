'use client';

import { Search, Filter, MoreVertical, Download, Plus, CheckCircle, Clock } from 'lucide-react';

export default function PayrollManager() {
  const staff = [
    { id: 'FAC202401', name: 'Ravi Sir', role: 'Physics HOD', salary: '₹ 85,000', status: 'Paid', date: '01 Jul 2026' },
    { id: 'FAC202405', name: 'Anjali Ma\'am', role: 'Chemistry Dept', salary: '₹ 60,000', status: 'Pending', date: '-' },
    { id: 'ADM202411', name: 'Suresh Kumar', role: 'Accountant', salary: '₹ 45,000', status: 'Paid', date: '01 Jul 2026' },
    { id: 'FAC202409', name: 'Vikas Sir', role: 'Maths Dept', salary: '₹ 75,000', status: 'Pending', date: '-' },
    { id: 'ADM202402', name: 'Pooja Verma', role: 'Receptionist', salary: '₹ 25,000', status: 'Paid', date: '01 Jul 2026' },
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Payroll & Salary</h1>
          <p className="text-slate-500 font-medium">Manage faculty and staff salaries, bonuses, and payments.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors">
            <Download size={18} /> Export List
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-fuchsia-600 text-white font-semibold rounded-xl hover:bg-fuchsia-700 transition-colors shadow-lg shadow-fuchsia-500/20">
            <Plus size={18} /> Run Payroll
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 mb-1">Total Payroll (This Month)</div>
          <div className="text-2xl font-bold text-slate-900">₹ 8,45,000</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 mb-1">Disbursed Amount</div>
          <div className="text-2xl font-bold text-green-600">₹ 5,20,000</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-500 mb-1">Pending Salary</div>
          <div className="text-2xl font-bold text-orange-600">₹ 3,25,000</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by staff name or ID..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/10 font-medium"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors w-full md:w-auto">
            <Filter size={18} /> Filters
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="p-4 font-semibold">Staff Info</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Net Salary</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Payment Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {staff.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-[#0f172a]">{row.name}</div>
                    <div className="text-xs font-medium text-slate-500">{row.id}</div>
                  </td>
                  <td className="p-4 font-medium text-slate-700">{row.role}</td>
                  <td className="p-4 font-semibold text-slate-900">{row.salary}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                      row.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {row.status === 'Paid' ? <CheckCircle size={12} /> : <Clock size={12} />}
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-600">{row.date}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    {row.status === 'Pending' && (
                      <button className="px-3 py-1 bg-fuchsia-50 text-fuchsia-600 font-semibold rounded hover:bg-fuchsia-100 transition-colors text-xs">
                        Pay Now
                      </button>
                    )}
                    <button className="p-1 text-slate-400 hover:text-fuchsia-600 hover:bg-fuchsia-50 rounded transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm font-medium text-slate-500 bg-white">
          <div>Showing 1 to 5 of 48 staff members</div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50">Previous</button>
            <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
