'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronLeft, Trophy, Target, CheckCircle2, XCircle, MinusCircle,
  TrendingUp, BarChart2, Clock, Award, Zap, AlertTriangle, Flame,
  BookOpen, Brain, ArrowUp, ArrowDown
} from 'lucide-react';
import {
  ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Cell, Legend, LineChart, Line, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, AreaChart, Area
} from 'recharts';

// --- Mock Data ----------------------------------------------------------------

const testResult = {
  id: '1',
  name: 'AITS Minor Test #3 – Full Syllabus',
  date: '20 Jun 2026',
  duration: '180 min',
  totalQuestions: 200,
  totalMarks: 720,
  attempted: 184,
  score: 612,
  batchRank: 14,
  batchStrength: 120,
  percentile: 88.3,
  subjects: [
    {
      name: 'Physics', color: '#6366f1', icon: '⚡',
      totalQ: 50, correct: 38, incorrect: 8, skipped: 4,
      score: 136, maxScore: 180, accuracy: 82.6,
    },
    {
      name: 'Chemistry', color: '#0ea5e9', icon: '🧪',
      totalQ: 50, correct: 40, incorrect: 6, skipped: 4,
      score: 152, maxScore: 180, accuracy: 86.9,
    },
    {
      name: 'Biology', color: '#22c55e', icon: '🧬',
      totalQ: 100, correct: 80, incorrect: 12, skipped: 8,
      score: 324, maxScore: 360, accuracy: 86.9,
    },
  ],
};

// Performance trend across past tests
const trendData = [
  { test: 'Test #1', score: 495, rank: 35, percentile: 71 },
  { test: 'Test #2', score: 540, rank: 28, percentile: 77 },
  { test: 'Test #3', score: 612, rank: 14, percentile: 88 },
];

// Time spent per subject (mins)
const timeData = [
  { subject: 'Physics', spent: 62, allotted: 60 },
  { subject: 'Chemistry', spent: 48, allotted: 60 },
  { subject: 'Biology', spent: 70, allotted: 60 },
];

// Radar (subject-wise accuracy)
const radarData = [
  { subject: 'Physics', you: 82.6, topper: 94 },
  { subject: 'Chemistry', you: 86.9, topper: 91 },
  { subject: 'Botany', you: 84, topper: 88 },
  { subject: 'Zoology', you: 89, topper: 93 },
  { subject: 'Organic Chem', you: 78, topper: 85 },
  { subject: 'Mechanics', you: 80, topper: 96 },
];

// Weak chapters
const weakChapters = [
  { chapter: 'Electromagnetic Induction', subject: 'Physics', wrong: 4, icon: '⚡', color: '#6366f1' },
  { chapter: 'Rotational Motion', subject: 'Physics', wrong: 3, icon: '⚡', color: '#6366f1' },
  { chapter: 'Organic Reactions', subject: 'Chemistry', wrong: 3, icon: '🧪', color: '#0ea5e9' },
  { chapter: 'Genetics', subject: 'Biology', wrong: 5, icon: '🧬', color: '#22c55e' },
  { chapter: 'Ecology', subject: 'Biology', wrong: 4, icon: '🧬', color: '#22c55e' },
];

// Strong chapters
const strongChapters = [
  { chapter: 'Chemical Bonding', subject: 'Chemistry', correct: 10, icon: '🧪' },
  { chapter: 'Cell Biology', subject: 'Biology', correct: 18, icon: '🧬' },
  { chapter: 'Optics', subject: 'Physics', correct: 9, icon: '⚡' },
];
function ScoreGauge({ score, totalMarks, percent }: { score: number; totalMarks: number; percent: number }) {
  const r = 80;
  const circ = 2 * Math.PI * r;
  const filled = (percent / 100) * circ * 0.75;
  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-[135deg]">
        <circle cx="100" cy="100" r={r} fill="none" stroke="#e2e8f0" strokeWidth="16"
          strokeDasharray={`${circ * 0.75} ${circ}`} strokeLinecap="round" className="dark:stroke-slate-700" />
        <circle cx="100" cy="100" r={r} fill="none" stroke="url(#scoreGrad)" strokeWidth="16"
          strokeDasharray={`${filled} ${circ - filled + circ * 0.25}`} strokeLinecap="round" />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fb923c" /><stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-slate-900 dark:text-white">{score}</span>
        <span className="text-xs text-slate-400 font-medium">/ {totalMarks}</span>
        <span className="mt-1 text-sm font-bold text-orange-600 dark:text-orange-400">{percent}%</span>
      </div>
    </div>
  );
}

// --- Main Page ----------------------------------------------------------------

export default function TestResultPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'performance'>('overview');
  const [isDark, setIsDark] = useState(false);
  const [data, setData] = useState(testResult);
  const [history, setHistory] = useState(trendData);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const saved = localStorage.getItem('cbt_result_aits-3');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }

    const storedHistory = localStorage.getItem('cbt_test_history');
    if (storedHistory) {
      try {
        setHistory(JSON.parse(storedHistory));
      } catch (e) {
        console.error(e);
      }
    }

    return () => observer.disconnect();
  }, []);

  const overall = {
    correct: data.subjects.reduce((a, s) => a + s.correct, 0),
    incorrect: data.subjects.reduce((a, s) => a + s.incorrect, 0),
    skipped: data.subjects.reduce((a, s) => a + s.skipped, 0),
  };
  const scorePercent = Math.round((data.score / data.totalMarks) * 100);

  const tabs = [
    { key: 'overview', label: '📊 Subject Overview' },
    { key: 'breakdown', label: '📋 Detailed Breakdown' },
    { key: 'performance', label: '🚀 Performance' },
  ] as const;

  // Chart Theme variables
  const gridColor = isDark ? '#1e293b' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#1e293b' : '#ffffff';
  const tooltipBorder = isDark ? '#334155' : '#e2e8f0';

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">

      {/* Back */}
      <Link href="/dashboard/tests" className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium">
        <ChevronLeft size={16} /> Back to Tests
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{data.name}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-3">
            <Clock size={14} /> {data.date} &nbsp;•&nbsp; <BarChart2 size={14} /> {data.duration} &nbsp;•&nbsp; {data.totalQuestions} Questions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-4 py-1.5 bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 rounded-xl font-bold text-sm border border-amber-200 dark:border-amber-900/20 flex items-center gap-2">
            <Trophy size={14} /> Rank #{data.batchRank} / {data.batchStrength}
          </span>
          <span className="px-4 py-1.5 bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 rounded-xl font-bold text-sm border border-purple-200 dark:border-purple-900/20 flex items-center gap-2">
            <Zap size={14} /> {data.percentile}%ile
          </span>
        </div>
      </div>

      {/* Hero Score Card */}
      <div className="bg-gradient-to-br from-slate-950 via-orange-950 to-slate-950 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_#ea580c,_transparent_60%)]" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="shrink-0">
            <ScoreGauge score={data.score} totalMarks={data.totalMarks} percent={scorePercent} />
            <p className="text-center text-slate-300 text-sm mt-2 font-medium">Overall Score</p>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
            <div className="col-span-2 sm:col-span-3 text-2xl font-black text-white mb-2">
              {scorePercent >= 80 ? '🔥 Excellent Performance!' : scorePercent >= 60 ? '✅ Good Effort!' : '📈 Keep Improving!'}
            </div>
            {[
              { icon: <CheckCircle2 size={16} />, label: 'Correct', val: overall.correct, sub: `+${overall.correct * 4} marks`, col: 'text-green-400' },
              { icon: <XCircle size={16} />, label: 'Wrong', val: overall.incorrect, sub: `-${overall.incorrect} marks`, col: 'text-red-400' },
              { icon: <MinusCircle size={16} />, label: 'Skipped', val: overall.skipped, sub: '0 marks', col: 'text-yellow-400' },
              { icon: <Target size={16} />, label: 'Accuracy', val: `${Math.round((overall.correct / (overall.correct + overall.incorrect || 1)) * 100)}%`, sub: '', col: 'text-sky-400' },
              { icon: <Award size={16} />, label: 'Attempted', val: data.attempted, sub: `of ${data.totalQuestions}`, col: 'text-purple-400' },
              { icon: <TrendingUp size={16} />, label: 'Percentile', val: data.percentile, sub: '', col: 'text-amber-400' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className={`flex items-center gap-2 ${s.col} mb-1`}>{s.icon} <span className="text-xs font-semibold uppercase tracking-wide">{s.label}</span></div>
                <div className="text-3xl font-black">{s.val}</div>
                {s.sub && <div className="text-xs text-slate-400 mt-0.5">{s.sub}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl w-fit flex-wrap">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-white dark:bg-slate-900 text-orange-600 dark:text-orange-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* -- TAB: Overview -- */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {data.subjects.map(sub => {
              const pct = Math.round((sub.score / sub.maxScore) * 100);
              return (
                <div key={sub.name} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sub.icon}</span>
                      <h3 className="font-bold text-slate-900 dark:text-white">{sub.name}</h3>
                    </div>
                    <span className="text-2xl font-black" style={{ color: sub.color }}>{pct}%</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                      <span>{sub.score} marks</span><span>/ {sub.maxScore}</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: sub.color }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/10 rounded-xl p-2">
                      <div className="text-lg font-black text-green-600 dark:text-green-400">{sub.correct}</div>
                      <div className="text-[10px] text-green-600/70 dark:text-green-400/80 font-semibold">Correct</div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/10 rounded-xl p-2">
                      <div className="text-lg font-black text-red-500 dark:text-red-400">{sub.incorrect}</div>
                      <div className="text-[10px] text-red-500/70 dark:text-red-400/80 font-semibold">Wrong</div>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-100 dark:border-yellow-900/10 rounded-xl p-2">
                      <div className="text-lg font-black text-yellow-600 dark:text-yellow-400">{sub.skipped}</div>
                      <div className="text-[10px] text-yellow-600/70 dark:text-yellow-400/80 font-semibold">Skipped</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Enhanced Bar Chart Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                  <BarChart2 size={18} className="text-orange-500" /> Score vs Max — Subject Comparison
                </h2>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">Comparison of your score against maximum marks in each subject</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.subjects.map(s => ({ name: s.name, Score: s.score, Max: s.maxScore }))} barGap={8} barSize={16}>
                    <defs>
                      <linearGradient id="scoreGradBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#fb923c" />
                        <stop offset="100%" stopColor="#ea580c" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 13, fontWeight: 600 }} />
                    <YAxis domain={[0, Math.max(...data.subjects.map(s => s.maxScore)) * 1.1]} axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }} />
                    <Bar dataKey="Max" fill={isDark ? '#334155' : '#e2e8f0'} radius={[6, 6, 0, 0]} name="Max Marks" />
                    <Bar dataKey="Score" fill="url(#scoreGradBar)" radius={[6, 6, 0, 0]} name="Your Score" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Test Progress History Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                  <TrendingUp size={18} className="text-orange-500" /> Mock Test Performance History
                </h2>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">Your scores and trends across all mock tests completed so far</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={history}>
                    <defs>
                      <linearGradient id="historyGradArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                    <XAxis dataKey="test" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12, fontWeight: 600 }} />
                    <YAxis domain={[0, 720]} axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }} />
                    <Area type="monotone" dataKey="score" stroke="#ea580c" strokeWidth={3} fill="url(#historyGradArea)" dot={{ r: 6, fill: '#ea580c', stroke: isDark ? '#0f172a' : '#fff', strokeWidth: 2 }} activeDot={{ r: 8 }} name="Score" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -- TAB: Breakdown -- */}
      {activeTab === 'breakdown' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-left">
                {['Subject', 'Score', 'Correct', 'Incorrect', 'Skipped', 'Accuracy', 'Attempted'].map(h => (
                  <th key={h} className="px-5 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.subjects.map(sub => (
                <tr key={sub.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg" style={{ background: sub.color + '22' }}>{sub.icon}</div>
                      <span className="font-semibold text-slate-900 dark:text-white">{sub.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-black text-slate-900 dark:text-white">{sub.score}<span className="text-slate-400 dark:text-slate-500 text-xs font-normal">/{sub.maxScore}</span></td>
                  <td className="px-5 py-4"><span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 rounded-lg font-semibold text-xs border border-green-100/50 dark:border-green-900/10"><CheckCircle2 size={12} /> {sub.correct}</span></td>
                  <td className="px-5 py-4"><span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-lg font-semibold text-xs border border-red-100/50 dark:border-red-900/10"><XCircle size={12} /> {sub.incorrect}</span></td>
                  <td className="px-5 py-4"><span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-50 dark:bg-yellow-950/20 text-yellow-700 dark:text-yellow-400 rounded-lg font-semibold text-xs border border-yellow-100/50 dark:border-yellow-900/10"><MinusCircle size={12} /> {sub.skipped}</span></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${sub.accuracy}%`, backgroundColor: sub.color }} />
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{sub.accuracy}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-700 dark:text-slate-300">{sub.correct + sub.incorrect}/{sub.totalQ}</td>
                </tr>
              ))}
              <tr className="bg-orange-50 dark:bg-orange-950/20">
                <td className="px-5 py-4 font-black text-slate-900 dark:text-white">Total</td>
                <td className="px-5 py-4 font-black text-orange-700 dark:text-orange-400">{data.score}<span className="text-slate-400 dark:text-slate-500 text-xs font-normal">/{data.totalMarks}</span></td>
                <td className="px-5 py-4 font-black text-green-600 dark:text-green-400">{overall.correct}</td>
                <td className="px-5 py-4 font-black text-red-500 dark:text-red-400">{overall.incorrect}</td>
                <td className="px-5 py-4 font-black text-yellow-600 dark:text-yellow-400">{overall.skipped}</td>
                <td className="px-5 py-4 font-black text-slate-900 dark:text-white">{Math.round((overall.correct / (overall.correct + overall.incorrect || 1)) * 100)}%</td>
                <td className="px-5 py-4 font-black text-slate-700 dark:text-slate-300">{data.attempted}/{data.totalQuestions}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* -- TAB: Performance -- */}
      {activeTab === 'performance' && (
        <div className="space-y-6">

          {/* Score Trend */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h2 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <TrendingUp size={18} className="text-orange-500" /> Score Trend — Past Tests
            </h2>
            <p className="text-xs text-slate-400 mb-6">Your score is improving by ~58 pts per test 🎯</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="scoreGradArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fb923c" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis dataKey="test" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12, fontWeight: 600 }} />
                  <YAxis domain={[0, 720]} axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="score" stroke="#ea580c" strokeWidth={3} fill="url(#scoreGradArea)" dot={{ r: 6, fill: '#ea580c', stroke: isDark ? '#0f172a' : '#fff', strokeWidth: 2 }} activeDot={{ r: 8 }} name="Score" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rank + Percentile side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Rank trend */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h2 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                <Trophy size={16} className="text-amber-500" /> Batch Rank Trend
              </h2>
              <p className="text-xs text-slate-400 mb-4">Lower is better 🏅</p>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                    <XAxis dataKey="test" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
                    <YAxis reversed domain={[1, 50]} axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px' }} />
                    <Line type="monotone" dataKey="rank" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5, fill: '#f59e0b', stroke: isDark ? '#0f172a' : '#fff', strokeWidth: 2 }} name="Rank" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar — You vs Topper */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h2 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                <Brain size={16} className="text-indigo-500" /> You vs Topper
              </h2>
              <p className="text-xs text-slate-400 mb-2">Accuracy % by chapter group</p>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData} outerRadius="70%">
                    <PolarGrid stroke={gridColor} />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 10 }} />
                    <PolarRadiusAxis domain={[60, 100]} tick={false} axisLine={false} />
                    <Radar name="You" dataKey="you" stroke="#ea580c" fill="#ea580c" fillOpacity={0.25} strokeWidth={2} />
                    <Radar name="Topper" dataKey="topper" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} strokeWidth={2} strokeDasharray="4 2" />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, borderRadius: '12px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Time Analysis */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h2 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <Clock size={18} className="text-sky-500" /> Time Spent per Subject
            </h2>
            <p className="text-xs text-slate-400 mb-6">Ideal time per subject is 60 mins. Over/under spending affects accuracy.</p>
            <div className="space-y-4">
              {timeData.map(t => {
                const over = t.spent > t.allotted;
                const pct = Math.min((t.spent / 90) * 100, 100);
                const idealPct = (t.allotted / 90) * 100;
                return (
                  <div key={t.subject}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">{t.subject}</span>
                      <span className={`text-xs font-bold flex items-center gap-1 ${over ? 'text-red-500' : 'text-green-600'}`}>
                        {over ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                        {t.spent} min {over ? '(+over)' : '(under)'}
                      </span>
                    </div>
                    <div className="relative w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: over ? '#ef4444' : '#22c55e' }} />
                      {/* ideal marker */}
                      <div className="absolute top-0 bottom-0 w-0.5 bg-slate-400" style={{ left: `${idealPct}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>0 min</span>
                      <span className="text-slate-500">│ Ideal: {t.allotted}m</span>
                      <span>90 min</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weak + Strong chapters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Weak Chapters */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-red-100 dark:border-red-950/20 p-6 shadow-sm">
              <h2 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                <AlertTriangle size={16} className="text-red-500" /> Weak Chapters
              </h2>
              <p className="text-xs text-slate-400 mb-4">Focus on these to gain more marks next test</p>
              <div className="space-y-3">
                {weakChapters.map(ch => (
                  <div key={ch.chapter} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/30 rounded-xl border border-red-100 dark:border-red-900/10">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{ch.icon}</span>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">{ch.chapter}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">{ch.subject}</div>
                      </div>
                    </div>
                    <span className="text-xs font-black text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950/40 px-2.5 py-1 rounded-lg">
                      {ch.wrong} wrong
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strong Chapters */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-green-100 dark:border-green-950/20 p-6 shadow-sm">
              <h2 className="font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                <Flame size={16} className="text-green-500" /> Strong Chapters
              </h2>
              <p className="text-xs text-slate-400 mb-4">You nailed these — keep it up! 🔥</p>
              <div className="space-y-3">
                {strongChapters.map(ch => (
                  <div key={ch.chapter} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-100 dark:border-green-900/10">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{ch.icon}</span>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">{ch.chapter}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">{ch.subject}</div>
                      </div>
                    </div>
                    <span className="text-xs font-black text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-950/40 px-2.5 py-1 rounded-lg">
                      {ch.correct}/10 ✓
                    </span>
                  </div>
                ))}
              </div>

              {/* Study Tip */}
              <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-100 dark:border-purple-900/10">
                <div className="flex items-start gap-2">
                  <BookOpen size={14} className="text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-purple-800 dark:text-purple-300 font-medium">
                    <strong>Tip:</strong> Spending 20–30 mins extra on Electromagnetic Induction & Genetics can boost your score by ~30 marks in the next test.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
