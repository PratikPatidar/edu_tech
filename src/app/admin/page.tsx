'use client';

import { Clock, Calendar, Palmtree, Users, FileText, Cake, CheckCircle, Flame, AlertCircle, UserX, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-[28px] font-semibold text-slate-900 dark:text-white dark:text-white tracking-tight">Good Afternoon, Admin!</h1>
        <p className="text-[15px] text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">Here is your overview this month.</p>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white dark:bg-slate-900 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-fuchsia-50 dark:bg-fuchsia-900/30 dark:bg-fuchsia-900/30 flex items-center justify-center text-fuchsia-700 dark:text-fuchsia-400 dark:text-fuchsia-400">
              <Users size={24} />
            </div>
            <div>
              <div className="text-2xl font-semibold text-slate-900 dark:text-white dark:text-white">1,402</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Active Students</div>
            </div>
          </div>
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800 dark:bg-slate-800 mb-4"></div>
          <div className="text-sm text-fuchsia-700 dark:text-fuchsia-400 dark:text-fuchsia-400 font-medium">124 new admissions this month</div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-slate-900 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-fuchsia-50 dark:bg-fuchsia-900/30 dark:bg-fuchsia-900/30 flex items-center justify-center text-fuchsia-700 dark:text-fuchsia-400 dark:text-fuchsia-400">
              <Calendar size={24} />
            </div>
            <div>
              <div className="text-2xl font-semibold text-slate-900 dark:text-white dark:text-white">12 Active</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Mock Tests Running</div>
            </div>
          </div>
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800 dark:bg-slate-800 mb-4"></div>
          <div className="text-sm text-fuchsia-700 dark:text-fuchsia-400 dark:text-fuchsia-400 font-medium">Next test scheduled in 2 days</div>
        </div>

        {/* Card 3: Revenue & Fees */}
        <div className="bg-white dark:bg-slate-900 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 dark:text-green-400">
              <TrendingUp size={24} />
            </div>
            <div>
              <div className="text-2xl font-semibold text-slate-900 dark:text-white dark:text-white">₹ 18.5L</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Revenue (This Month)</div>
            </div>
          </div>
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800 dark:bg-slate-800 mb-4"></div>
          <div className="text-sm text-green-600 dark:text-green-400 dark:text-green-400 font-semibold flex items-center gap-1">
            +12.4% <span className="text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium ml-1">from last month</span>
          </div>
        </div>

      </div>

      {/* Bottom Grid Rows: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Upcoming Tests & Exams */}
        <div className="bg-white dark:bg-slate-900 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 dark:border-slate-800 p-6 shadow-sm min-h-[300px]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-fuchsia-50 dark:bg-fuchsia-900/30 dark:bg-fuchsia-900/30 flex items-center justify-center text-fuchsia-700 dark:text-fuchsia-400 dark:text-fuchsia-400">
              <FileText size={20} />
            </div>
            <h2 className="text-[17px] font-semibold text-slate-900 dark:text-white dark:text-white">Tests & Exams</h2>
          </div>

          <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-4">
            Upcoming Schedule
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-fuchsia-100 dark:bg-fuchsia-900/50 dark:bg-fuchsia-900/50 flex items-center justify-center text-fuchsia-700 dark:text-fuchsia-400 dark:text-fuchsia-400 text-sm font-semibold">
                  NT
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-slate-900 dark:text-white dark:text-white">NEET Mock Test 04</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Target Batch</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-semibold text-slate-900 dark:text-white dark:text-white">Jul 2</div>
                <div className="text-[11px] text-fuchsia-600 dark:text-fuchsia-400 dark:text-fuchsia-400 font-semibold bg-fuchsia-50 dark:bg-fuchsia-900/30 dark:bg-fuchsia-900/30 px-2 py-0.5 rounded">In 11d</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 dark:bg-blue-900/50 flex items-center justify-center text-blue-700 dark:text-blue-400 dark:text-blue-400 text-sm font-semibold">
                  JM
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-slate-900 dark:text-white dark:text-white">JEE Mains Part Test</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Nurture Batch</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-semibold text-slate-900 dark:text-white dark:text-white">Jul 5</div>
                <div className="text-[11px] text-blue-600 dark:text-blue-400 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/30 dark:bg-blue-900/30 px-2 py-0.5 rounded">In 14d</div>
              </div>
            </div>
          </div>
        </div>

        {/* Public Holidays */}
        <div className="bg-white dark:bg-slate-900 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 dark:border-slate-800 p-6 shadow-sm min-h-[300px]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/30 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 dark:text-orange-400">
              <Palmtree size={20} />
            </div>
            <h2 className="text-[17px] font-semibold text-slate-900 dark:text-white dark:text-white">Public Holidays</h2>
          </div>

          <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-4">
            Institute Closures
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/50 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400 dark:text-orange-400">
                  <Flame size={18} />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-slate-900 dark:text-white dark:text-white">Diwali Break</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">All Centers Closed</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-semibold text-slate-900 dark:text-white dark:text-white">Oct 24</div>
                <div className="text-[12px] text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">4 Days</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600 dark:text-green-400 dark:text-green-400">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-slate-900 dark:text-white dark:text-white">Independence Day</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Flag Hoisting @ 8AM</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-semibold text-slate-900 dark:text-white dark:text-white">Aug 15</div>
                <div className="text-[12px] text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">1 Day</div>
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Absent Today */}
        <div className="bg-white dark:bg-slate-900 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 dark:border-slate-800 p-6 shadow-sm min-h-[300px]">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/30 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 dark:text-red-400">
                <UserX size={20} />
              </div>
              <h2 className="text-[17px] font-semibold text-slate-900 dark:text-white dark:text-white">Faculty Absent Today</h2>
            </div>
            <div className="px-3 py-1 bg-red-50 dark:bg-red-900/30 dark:bg-red-900/30 text-red-600 dark:text-red-400 dark:text-red-400 text-xs font-semibold rounded-full">
              3 Absent
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm font-semibold">
                  RS
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-slate-900 dark:text-white dark:text-white">Ravi Sir</div>
                  <div className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Physics Dept</div>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-1 bg-red-50 dark:bg-red-900/30 dark:bg-red-900/30 text-red-600 dark:text-red-400 dark:text-red-400 text-[10px] uppercase font-semibold rounded">Sick Leave</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm font-semibold">
                  AM
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-slate-900 dark:text-white dark:text-white">Anjali Ma'am</div>
                  <div className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Chemistry Dept</div>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-1 bg-blue-50 dark:bg-blue-900/30 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 dark:text-blue-400 text-[10px] uppercase font-semibold rounded">Casual Leave</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white dark:bg-slate-900 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 dark:border-slate-800 p-6 shadow-sm min-h-[300px]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/30 dark:bg-red-900/30 flex items-center justify-center text-red-500 dark:text-red-400 dark:text-red-400">
              <AlertCircle size={20} />
            </div>
            <h2 className="text-[17px] font-semibold text-slate-900 dark:text-white dark:text-white">System Alerts</h2>
          </div>

          <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-4">
            Requires Action
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/30 dark:bg-red-900/30/50 border border-red-100 dark:border-red-900/50 dark:border-red-900/50">
              <div className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0"></div>
              <div>
                <div className="text-[14px] font-semibold text-slate-900 dark:text-white dark:text-white mb-1">Fee Collection Due</div>
                <div className="text-[12px] text-slate-600 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Automated SMS reminders will be triggered for 120 pending accounts.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Birthdays */}
        <div className="bg-white dark:bg-slate-900 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 dark:border-slate-800 p-6 shadow-sm min-h-[300px]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-fuchsia-50 dark:bg-fuchsia-900/30 dark:bg-fuchsia-900/30 flex items-center justify-center text-fuchsia-700 dark:text-fuchsia-400 dark:text-fuchsia-400">
              <Cake size={20} />
            </div>
            <h2 className="text-[17px] font-semibold text-slate-900 dark:text-white dark:text-white">Faculty Birthdays</h2>
          </div>

          <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-4">
            Upcoming
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 text-sm font-semibold">
                  VS
                </div>
                <div>
                  <div className="text-[15px] font-semibold text-slate-900 dark:text-white dark:text-white">Vikas Sir</div>
                  <div className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Maths Dept</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-semibold text-slate-900 dark:text-white dark:text-white">Jul 12</div>
                <div className="text-[11px] text-fuchsia-600 dark:text-fuchsia-400 dark:text-fuchsia-400 font-semibold bg-fuchsia-50 dark:bg-fuchsia-900/30 dark:bg-fuchsia-900/30 px-2 py-0.5 rounded">In 21d</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Fee Collections */}
        <div className="bg-white dark:bg-slate-900 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 dark:border-slate-800 p-6 shadow-sm min-h-[300px]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 dark:text-green-400">
              <CheckCircle size={20} />
            </div>
            <h2 className="text-[17px] font-semibold text-slate-900 dark:text-white dark:text-white">Recent Fee Collections</h2>
          </div>

          <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-4">
            Today's Transactions
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 transition-colors">
              <div>
                <div className="text-[15px] font-semibold text-slate-900 dark:text-white dark:text-white">Rahul Sharma</div>
                <div className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Target Batch (Installment 2)</div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-semibold text-green-600 dark:text-green-400 dark:text-green-400">+ ₹45,000</div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">10 mins ago</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 transition-colors">
              <div>
                <div className="text-[15px] font-semibold text-slate-900 dark:text-white dark:text-white">Priya Singh</div>
                <div className="text-[12px] text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Nurture Batch (Full Fee)</div>
              </div>
              <div className="text-right">
                <div className="text-[15px] font-semibold text-green-600 dark:text-green-400 dark:text-green-400">+ ₹1,10,000</div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">1 hour ago</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
