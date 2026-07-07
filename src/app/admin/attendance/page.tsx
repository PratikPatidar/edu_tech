'use client';

import { useState } from 'react';
import { CreditCard, CheckCircle, AlertCircle, Calendar, FileText, Check, X } from 'lucide-react';

const INITIAL_LEAVES = [
  { id: 'LR001', name: 'Rahul Sharma', type: 'Student', details: 'Target Batch (NEET)', reason: 'High fever & doctor checkup', dates: '08 Jul - 09 Jul', status: 'Pending' },
  { id: 'LR002', name: 'Anjali Ma\'am', type: 'Faculty', details: 'Chemistry Dept', reason: 'Family function out of station', dates: '10 Jul', status: 'Pending' },
  { id: 'LR003', name: 'Amit Kumar', type: 'Student', details: 'Achiever Batch', reason: 'Attending elder sister\'s marriage', dates: '12 Jul - 15 Jul', status: 'Pending' },
];

export default function AttendanceFees() {
  const [leaves, setLeaves] = useState(INITIAL_LEAVES);

  const handleAction = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setLeaves(prev => prev.map(leave => {
      if (leave.id === id) {
        return { ...leave, status: newStatus };
      }
      return leave;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a]">Attendance</h1>
        <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Track daily student presence and process leave applications.</p>
      </div>

      <div className="mb-8">
        {/* Today's Attendance Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-5 blur-3xl rounded-full"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-[#0f172a] dark:text-white flex items-center gap-2">
                <Calendar className="text-orange-500" /> Today's Attendance Overview
              </h2>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400">21 Jun 2026</span>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <div className="text-6xl font-bold text-orange-500 dark:text-orange-400">94%</div>
              <div className="text-slate-500 dark:text-slate-400 font-medium mb-2">overall presence across <br/>all active batches</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Target Batch</span>
                <span className="text-green-600 dark:text-green-400 font-semibold">98% (Present)</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span> Nurture Batch</span>
                <span className="text-orange-600 dark:text-orange-400 font-semibold">96% (Present)</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-red-200 dark:border-red-900/30">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Achiever Batch</span>
                <span className="text-red-600 dark:text-red-400 font-semibold">88% (Low)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Leave Approvals Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-bold text-[#0f172a] flex items-center gap-2">
              <FileText className="text-orange-500" /> Pending Leave Requests
            </h2>
            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm">Approve or reject leave applications submitted by students and faculty.</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="pb-4 font-semibold">Applicant</th>
                <th className="pb-4 font-semibold">Type / Role</th>
                <th className="pb-4 font-semibold">Leave Dates</th>
                <th className="pb-4 font-semibold">Reason</th>
                <th className="pb-4 font-semibold">Status</th>
                <th className="pb-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {leaves.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 font-semibold text-slate-800 dark:text-slate-200">{row.name}</td>
                  <td className="py-4 text-slate-600 dark:text-slate-400">
                    <div>{row.type}</div>
                    <div className="text-xs text-slate-400">{row.details}</div>
                  </td>
                  <td className="py-4 font-medium text-slate-700 dark:text-slate-300">{row.dates}</td>
                  <td className="py-4 text-slate-600 dark:text-slate-400 max-w-xs truncate" title={row.reason}>{row.reason}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      row.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      row.status === 'Rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    {row.status === 'Pending' ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleAction(row.id, 'Approved')}
                          className="p-1.5 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors border border-green-200"
                          title="Approve Leave"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => handleAction(row.id, 'Rejected')}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-200"
                          title="Reject Leave"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
