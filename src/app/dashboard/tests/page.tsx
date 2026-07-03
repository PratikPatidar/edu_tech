'use client';

import { FileText, Play, Download, CheckCircle, Clock, Trophy, BarChart2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

function Sk({ cls = '' }: { cls?: string }) {
  return <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg ${cls}`} />;
}

interface TestData {
  stats: { testsTaken: number; bestScore: number | null; bestRank: number | null; avgScore: number | null };
  upcoming: any[];
  completed: any[];
}

export default function StudentTests() {
  const [data, setData] = useState<TestData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/student/tests')
      .then(r => r.json())
      .then(d => {
        if (d.success) setData(d);
        else toast.error('Failed to load tests');
      })
      .catch(() => toast.error('Network error'))
      .finally(() => setLoading(false));
  }, []);

  const stats = data?.stats;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-[28px] font-bold text-slate-900 dark:text-white tracking-tight">Mock Tests</h1>
        <p className="text-[15px] text-slate-500 dark:text-slate-400 mt-1">Take online CBTs or view your offline test results and analytics.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { label: 'Tests Taken', value: stats?.testsTaken ?? 0, icon: <FileText size={18} />, color: 'bg-fuchsia-50 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-400' },
          { label: 'Best Score', value: stats?.bestScore ?? '—', icon: <Trophy size={18} />, color: 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
          { label: 'Best Rank', value: stats?.bestRank ? `#${stats.bestRank}` : '—', icon: <BarChart2 size={18} />, color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
          { label: 'Avg Score', value: stats?.avgScore ?? '—', icon: <Clock size={18} />, color: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex items-center gap-4">
            <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center shrink-0`}>{icon}</div>
            <div>
              {loading ? <Sk cls="h-7 w-16 mb-1" /> : <div className="text-xl font-bold text-slate-900 dark:text-white">{value}</div>}
              <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Active Online Tests */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Active & Upcoming Tests
          </h2>
          {loading ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm"><Sk cls="h-32" /></div>
          ) : data?.upcoming?.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm text-center text-slate-400 py-10">
              No upcoming tests scheduled.
            </div>
          ) : (
            data?.upcoming?.map((t: any) => (
              <div key={t._id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:border-fuchsia-300 dark:hover:border-fuchsia-700 transition-colors mb-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-fuchsia-600 dark:text-fuchsia-400 uppercase tracking-wider">{t.testType}</span>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mt-1">{t.testName}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{t.totalMarks} Marks &bull; Date: {t.date}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-fuchsia-50 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-400 text-xs font-bold rounded-lg border border-fuchsia-100 dark:border-fuchsia-800/50">Online CBT</span>
                </div>
                <Link
                  href="/dashboard/tests/cbt"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-fuchsia-700 hover:bg-fuchsia-800 text-white rounded-xl font-semibold transition-colors shadow-sm"
                >
                  <Play size={16} fill="currentColor" /> Enter Test Portal
                </Link>
              </div>
            ))
          )}
        </div>

        {/* Past Results */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Past Results</h2>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-4 space-y-4"><Sk cls="h-12" /><Sk cls="h-12" /></div>
            ) : data?.completed?.length === 0 ? (
              <div className="p-6 text-center text-slate-400">No past results found.</div>
            ) : (
              data?.completed?.map((t: any) => (
                <div key={t._id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800/50 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center">
                      <CheckCircle size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{t.testName}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Score: {t.scored}/{t.totalMarks} &bull; Rank: #{t.rank} &bull; {t.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">{t.testType}</span>
                    <button onClick={() => toast.success('Downloading report...')} className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm transition-colors">
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
