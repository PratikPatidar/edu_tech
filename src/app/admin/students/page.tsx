'use client';

import { Search, Filter, MoreVertical, Download, UserPlus, CheckCircle, XCircle } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function StudentsManager() {
  const students = [
    { id: 'STU2025001', name: 'Rahul Sharma', batch: 'Target Batch (NEET)', status: 'Active', attendance: '92%', fee: 'Paid' },
    { id: 'STU2025089', name: 'Priya Singh', batch: 'Nurture Batch', status: 'Active', attendance: '88%', fee: 'Pending' },
    { id: 'STU2025102', name: 'Amit Kumar', batch: 'Achiever Batch', status: 'Inactive', attendance: '45%', fee: 'Overdue' },
    { id: 'STU2025044', name: 'Neha Gupta', batch: 'Target Batch (JEE)', status: 'Active', attendance: '96%', fee: 'Paid' },
    { id: 'STU2025055', name: 'Vikram Singh', batch: 'Nurture Batch', status: 'Active', attendance: '91%', fee: 'Paid' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Toaster position="top-right" />
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-[#0f172a]">Student Manager</h1>
          <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Manage enrollments, batches, and student data.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => toast.success('Feature coming soon')} className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-200 dark:bg-slate-700 transition-colors">
            <Download size={18} /> Export
          </button>
          <button onClick={() => toast.success('Feature coming soon')} className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20">
            <UserPlus size={18} /> Add Student
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-slate-50 dark:bg-slate-800/50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Search by name, ID, or phone..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 font-medium"
            />
          </div>
          <button onClick={() => toast.success('Feature coming soon')} className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 transition-colors w-full md:w-auto">
            <Filter size={18} /> Filters
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white dark:bg-slate-900 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <th className="p-4 font-semibold">Student Info</th>
                <th className="p-4 font-semibold">Batch</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Attendance</th>
                <th className="p-4 font-semibold">Fee Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {students.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-[#0f172a]">{row.name}</div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500">{row.id}</div>
                  </td>
                  <td className="p-4 font-medium text-slate-700 dark:text-slate-300">{row.batch}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${
                      row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {row.status === 'Active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-slate-700 dark:text-slate-300">{row.attendance}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      row.fee === 'Paid' ? 'bg-green-100 text-green-700' : 
                      row.fee === 'Pending' ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {row.fee}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => toast.success('Feature coming soon')} className="p-2 text-slate-400 dark:text-slate-500 hover:text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:bg-orange-900/30 rounded-lg transition-colors"><MoreVertical size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm font-medium text-slate-500 dark:text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900">
          <div>Showing 1 to 5 of 1,402 students</div>
          <div className="flex gap-2">
            <button onClick={() => toast.success('Feature coming soon')} className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 disabled:opacity-50">Previous</button>
            <button onClick={() => toast.success('Feature coming soon')} className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
