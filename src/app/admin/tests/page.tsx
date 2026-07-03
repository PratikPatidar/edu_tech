'use client';

import { FilePlus, Target, PlayCircle, Settings, Clock } from 'lucide-react';

export default function OnlineTestCreator() {
  const tests = [
    { name: 'NEET Full Syllabus Mock - 1', type: 'CBT', date: 'Upcoming: 24 Jun', duration: '200 Mins', status: 'Draft' },
    { name: 'JEE Main Half Syllabus Test', type: 'CBT', date: 'Upcoming: 26 Jun', duration: '180 Mins', status: 'Scheduled' },
    { name: 'Physics Chapter 1-4 Revision', type: 'Quiz', date: 'Completed', duration: '45 Mins', status: 'Live' },
    { name: 'Botany Major Test 02', type: 'CBT', date: 'Completed', duration: '90 Mins', status: 'Archived' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Online Test Engine</h1>
          <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Create NTA-replica CBTs, quizzes, and manage question banks.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
          <FilePlus size={20} /> Create New Test
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tests.map((test, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 hover:shadow-xl hover:border-orange-200 transition-all flex flex-col group relative overflow-hidden">
            {/* Decoration */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-slate-50 dark:bg-slate-800/50 rounded-full group-hover:bg-orange-50 dark:bg-orange-900/30 transition-colors"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                test.status === 'Live' ? 'bg-green-100 text-green-700 animate-pulse' :
                test.status === 'Scheduled' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-400' :
                test.status === 'Draft' ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-700' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}>
                {test.status}
              </div>
              <div className="text-slate-400 dark:text-slate-500 group-hover:text-orange-500 transition-colors">
                <Target size={24} />
              </div>
            </div>
            
            <h3 className="font-semibold text-[#0f172a] text-lg mb-2 relative z-10 leading-tight">{test.name}</h3>
            
            <div className="flex flex-col gap-2 mt-auto pt-6 relative z-10">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500">
                <span className="w-5 h-5 bg-slate-100 dark:bg-slate-800 rounded-md flex items-center justify-center">📝</span> {test.type} Format
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500">
                <Clock size={14} /> {test.duration}
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800/50 pt-3 mt-1">
                {test.date}
              </div>
            </div>
            
            {/* Actions overlay on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-slate-900/95 backdrop-blur-sm border-t border-slate-100 dark:border-slate-800/50 translate-y-full group-hover:translate-y-0 transition-transform flex gap-2">
              <button className="flex-1 py-2 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-semibold rounded-lg hover:bg-orange-100 dark:bg-orange-900/50 text-sm flex justify-center items-center gap-1">
                <Settings size={16} /> Edit
              </button>
              <button className="flex-1 py-2 bg-[#0f172a] text-white font-semibold rounded-lg hover:bg-slate-800 text-sm flex justify-center items-center gap-1">
                <PlayCircle size={16} /> Preview
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
