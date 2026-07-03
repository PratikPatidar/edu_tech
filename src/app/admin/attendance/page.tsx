'use client';

import { CreditCard, CheckCircle, AlertCircle, Calendar, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const attendanceData = [
  { day: 'Mon', target: 98, nurture: 95, achiever: 76 },
  { day: 'Tue', target: 99, nurture: 96, achiever: 78 },
  { day: 'Wed', target: 97, nurture: 94, achiever: 82 },
  { day: 'Thu', target: 98, nurture: 97, achiever: 80 },
  { day: 'Fri', target: 96, nurture: 95, achiever: 85 },
  { day: 'Sat', target: 98, nurture: 96, achiever: 88 },
];

export default function AttendanceFees() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a]">Attendance & Fees</h1>
        <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Track daily attendance via biometric sync and manage fee installments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Fee Collection Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#0f172a] flex items-center gap-2">
              <CreditCard className="text-orange-500" /> Fee Status (2025-26)
            </h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-slate-600 dark:text-slate-400 dark:text-slate-500">Total Collected</span>
                <span className="text-[#0f172a]">₹4.2 Cr / ₹5.5 Cr</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '76%' }}></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-900/30 rounded-2xl border border-orange-100 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold mb-1">
                  <AlertCircle size={16} /> Pending Dues
                </div>
                <div className="text-2xl font-bold text-[#0f172a]">₹1.3 Cr</div>
                <button className="mt-3 w-full py-2 bg-white dark:bg-slate-900 rounded-lg text-sm font-semibold text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:bg-orange-900/50 transition-colors shadow-sm">Send Reminders</button>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-2xl border border-green-100 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold mb-1">
                  <CheckCircle size={16} /> Paid in Full
                </div>
                <div className="text-2xl font-bold text-[#0f172a]">842 Students</div>
                <button className="mt-3 w-full py-2 bg-white dark:bg-slate-900 rounded-lg text-sm font-semibold text-green-600 dark:text-green-400 hover:bg-green-100 transition-colors shadow-sm">View List</button>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Attendance Card */}
        <div className="bg-[#0f172a] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-10 blur-3xl rounded-full"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="text-orange-400" /> Today's Attendance
              </h2>
              <span className="px-3 py-1 bg-white dark:bg-slate-900/10 rounded-full text-xs font-semibold">21 Jun 2026</span>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <div className="text-6xl font-bold text-orange-400">94%</div>
              <div className="text-slate-400 dark:text-slate-500 font-medium mb-2">overall presence across <br/>all active batches</div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-900/5 rounded-xl border border-white/10">
                <span className="font-semibold flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-400"></span> Target Batch</span>
                <span className="text-green-400 font-semibold">98% (Present)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-900/5 rounded-xl border border-white/10">
                <span className="font-semibold flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-400"></span> Nurture Batch</span>
                <span className="text-orange-400 font-semibold">96% (Present)</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-900/5 rounded-xl border border-red-500/50">
                <span className="font-semibold flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-400"></span> Achiever Batch</span>
                <span className="text-red-400 font-semibold">88% (Low)</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Advanced Chart Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-bold text-[#0f172a] flex items-center gap-2">
              <TrendingUp className="text-orange-500" /> Weekly Attendance Trends
            </h2>
            <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm">Biometric punch-in data over the last 6 days.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500"><span className="w-3 h-3 rounded-full bg-green-500"></span> Target</div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500"><span className="w-3 h-3 rounded-full bg-orange-500"></span> Nurture</div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500"><span className="w-3 h-3 rounded-full bg-red-500"></span> Achiever</div>
          </div>
        </div>
        
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis domain={[60, 100]} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                labelStyle={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}
              />
              <Line type="monotone" dataKey="target" stroke="#22c55e" strokeWidth={4} dot={{ r: 6, fill: '#22c55e', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="nurture" stroke="#f97316" strokeWidth={4} dot={{ r: 6, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="achiever" stroke="#ef4444" strokeWidth={4} dot={{ r: 6, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
