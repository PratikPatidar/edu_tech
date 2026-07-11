'use client';

import { TrendingUp, Award, Target, BarChart2, CheckCircle, Calendar, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';

function Sk({ cls = '' }: { cls?: string }) {
  return <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg ${cls}`} />;
}

export default function StudentPerformance() {
  const [tests, setTests] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    fetch('/api/student/tests')
      .then(r => r.json())
      .then(d => {
        if (d.success && d.completed) {
          setTests(d.completed);
          if (d.completed.length > 0) {
            setSelected(d.completed[0]);
            setHistory([...d.completed].reverse().map((t: any) => ({
              test: t.testName.replace('AITS ', '').replace('NEET ', ''),
              score: t.scored
            })));
          }
        }
      })
      .finally(() => setLoading(false));

    return () => observer.disconnect();
  }, []);

  const gridColor = isDark ? '#1e293b' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#1e293b' : '#ffffff';
  const tooltipBorder = isDark ? '#334155' : '#e2e8f0';

  const accuracy = (s: any) => Math.round((s.correct / s.total) * 100) || 0;

  const pctColor = (p: number) =>
    p >= 85 ? 'text-green-600 dark:text-green-400' :
    p >= 70 ? 'text-orange-500 dark:text-orange-400' :
              'text-red-500 dark:text-red-400';

  const barColor = (p: number) =>
    p >= 85 ? 'bg-green-500' : p >= 70 ? 'bg-orange-500' : 'bg-red-500';

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Performance Analytics</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Select a test below to see detailed analytics. Showing latest by default.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT — Test List */}
        <div className="xl:col-span-1 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800/60">
            <h2 className="text-[14px] font-semibold text-slate-900 dark:text-white flex items-center justify-between w-full">
              <span className="flex items-center gap-2">
                <CheckCircle size={16} className="text-orange-500" />
                Completed Tests
              </span>
              <span className="px-2.5 py-0.5 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 rounded-full text-xs font-semibold border border-orange-100 dark:border-orange-900/20">
                {tests.length} Tests
              </span>
            </h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50 min-h-[300px]">
            {loading ? (
              <div className="p-5 flex justify-center"><Loader2 className="animate-spin text-slate-400" /></div>
            ) : tests.length === 0 ? (
              <div className="p-5 text-center text-slate-400 text-sm">No tests completed yet.</div>
            ) : tests.map((t) => {
              const isActive = selected?._id === t._id;
              return (
                <button
                  key={t._id}
                  onClick={() => setSelected(t)}
                  className={`w-full text-left px-5 py-4 transition-colors flex items-center gap-4 ${
                    isActive
                      ? 'bg-orange-50/50 dark:bg-orange-950/20 border-l-2 border-orange-500'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border-l-2 border-transparent'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-semibold truncate ${isActive ? 'text-orange-600 dark:text-orange-400' : 'text-slate-900 dark:text-white'}`}>
                      {t.testName}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Calendar size={10} /> {t.date}
                      </span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded">
                        {t.testType}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`text-sm font-bold ${pctColor(Math.round((t.scored / t.totalMarks) * 100))}`}>
                      {t.scored}<span className="text-xs text-slate-400 font-normal">/{t.totalMarks}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      {Math.round((t.scored / t.totalMarks) * 100)}%
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Analytics for selected test */}
        <div className="xl:col-span-2 space-y-5">
          {!loading && !selected ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-10 shadow-sm flex items-center justify-center text-slate-400">
              No test selected or available for analytics.
            </div>
          ) : (
            <>
              {/* Selected Test Header */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="text-xs font-semibold text-orange-500 dark:text-orange-400 uppercase tracking-wider mb-1">
                      {loading ? <Sk cls="h-3 w-16" /> : selected?.testType}
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      {loading ? <Sk cls="h-6 w-48" /> : selected?.testName}
                    </h2>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      {loading ? <Sk cls="h-4 w-24" /> : <><Calendar size={12} /> {selected?.date}</>}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    {loading ? (
                      <><Sk cls="h-8 w-20 mb-1" /><Sk cls="h-3 w-16 ml-auto" /></>
                    ) : (
                      <>
                        <div className={`text-3xl font-bold ${pctColor(Math.round((selected.scored / selected.totalMarks) * 100))}`}>
                          {selected.scored}
                          <span className="text-lg text-slate-400 font-normal">/{selected.totalMarks}</span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Total Score</div>
                      </>
                    )}
                  </div>
                </div>

                {/* KPI strip */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {loading ? (
                    Array(4).fill(0).map((_, i) => <Sk key={i} cls="h-16" />)
                  ) : [
                    { icon: <BarChart2 size={14} />, label: 'Marks',       value: `${selected.scored}/${selected.totalMarks}` },
                    { icon: <TrendingUp size={14} />, label: 'All India Rank', value: selected.rank ? `#${selected.rank.toLocaleString()}` : 'N/A' },
                    { icon: <Award size={14} />,      label: 'Percentile',  value: selected.percentile ? `${selected.percentile}%` : 'N/A' },
                    { icon: <Target size={14} />,     label: 'Accuracy',
                      value: `${Math.round((selected.subjects.reduce((a: number, s: any) => a + (s.correct || 0), 0) /
                               (selected.subjects.reduce((a: number, s: any) => a + ((s.correct || 0) + (s.wrong || 0)), 0) || 1)) * 100)}%` },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-3 flex items-center gap-3">
                      <div className="text-slate-400 dark:text-slate-500 shrink-0">{icon}</div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{value}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock Test Performance History Card */}
              {history.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between hover:shadow hover:border-slate-300 transition-all">
                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2 text-[15px]">
                      <TrendingUp size={18} className="text-orange-500" /> Mock Test Performance History
                    </h2>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">Your scores and trends across all mock tests completed so far</p>
                  </div>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={history}>
                        <defs>
                          <linearGradient id="performanceGradArea" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                        <XAxis dataKey="test" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 11, fontWeight: 500 }} />
                        <YAxis domain={[0, 720]} axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 11 }} />
                        <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }} />
                        <Area type="monotone" dataKey="score" stroke="#ea580c" strokeWidth={3} fill="url(#performanceGradArea)" dot={{ r: 6, fill: '#ea580c', stroke: isDark ? '#0f172a' : '#fff', strokeWidth: 2 }} activeDot={{ r: 8 }} name="Score" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Subject-wise breakdown */}
              {selected && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
                    <BarChart2 size={16} className="text-slate-400 dark:text-slate-500" /> Subject-wise Analysis
                  </h3>
                  <div className="space-y-5">
                    {selected.subjects.map((s: any) => {
                      const pct = accuracy(s);
                      return (
                        <div key={s.name}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{s.name}</span>
                            <span className={`text-sm font-bold ${pctColor(pct)}`}>{pct}%</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-2">
                            <div
                              className={`${barColor(pct)} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {[
                              { label: 'Total Qs',   value: s.total || 0,             cls: 'text-slate-500 dark:text-slate-400' },
                              { label: 'Attempted',  value: (s.correct || 0) + (s.wrong || 0), cls: 'text-blue-600 dark:text-blue-400' },
                              { label: 'Correct',    value: s.correct || 0,           cls: 'text-green-600 dark:text-green-400' },
                              { label: 'Wrong',      value: s.wrong || 0,             cls: 'text-red-500 dark:text-red-400' },
                            ].map(({ label, value, cls }) => (
                              <div key={label} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg px-2 py-1.5 text-center">
                                <div className={`text-base font-bold ${cls}`}>{value}</div>
                                <div className="text-[10px] text-slate-400 dark:text-slate-500">{label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Overall totals row */}
              {selected && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <CheckCircle size={16} className="text-slate-400 dark:text-slate-500" /> Overall Question Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(() => {
                      const totalQ    = selected.subjects.reduce((a: number, s: any) => a + (s.total || 0), 0);
                      const attempted = selected.subjects.reduce((a: number, s: any) => a + ((s.correct || 0) + (s.wrong || 0)), 0);
                      const correct   = selected.subjects.reduce((a: number, s: any) => a + (s.correct || 0), 0);
                      const wrong     = selected.subjects.reduce((a: number, s: any) => a + (s.wrong || 0), 0);
                      const skipped   = totalQ - attempted;
                      return [
                        { label: 'Total Questions', value: totalQ,    cls: 'text-slate-900 dark:text-white' },
                        { label: 'Attempted',        value: attempted, cls: 'text-blue-600 dark:text-blue-400' },
                        { label: 'Correct',          value: correct,   cls: 'text-green-600 dark:text-green-400' },
                        { label: 'Wrong / Skipped',  value: `${wrong} / ${skipped}`, cls: 'text-red-500 dark:text-red-400' },
                      ].map(({ label, value, cls }) => (
                        <div key={label} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 text-center">
                          <div className={`text-2xl font-bold ${cls}`}>{value}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
