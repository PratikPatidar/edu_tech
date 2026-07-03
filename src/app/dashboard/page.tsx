'use client';

import {
  PlayCircle, Award, Target, BookOpen, Clock, CheckCircle, FileText,
  Sparkles, Video, UserX, Wallet, CalendarDays, TrendingUp, AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// --- Skeleton -----------------------------------------------------------------
function Sk({ cls = '' }: { cls?: string }) {
  return <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg ${cls}`} />;
}

// --- Countdown to exam date ---------------------------------------------------
function useCountdown(examDateISO: string | null) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    if (!examDateISO) return;
    const target = new Date(examDateISO).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ days, hours, mins, secs });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [examDateISO]);

  return timeLeft;
}

// --- Dashboard data shape -----------------------------------------------------
interface DashboardData {
  student: { name: string; batch: string; rollNo: string; examTarget: string; examDate: string | null };
  kpis: { lastMockScore: number | null; lastMockMax: number; rank: number | null; attendancePct: number; feeDue: number; feeDueDate: string | null };
  syllabus: { subject: string; pct: number }[];
  todayClasses: { time: string; subject: string; teacher: string; room: string }[];
  facultyLeave: { name: string; role: string; initials: string; badge: string; backDate?: string }[];
  notices: { month: string; day: string; title: string; desc: string; urgent: boolean }[];
}

export default function StudentDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const timeLeft = useCountdown(data?.student.examDate ?? null);

  useEffect(() => {
    fetch('/api/student/dashboard')
      .then(r => r.json())
      .then(d => {
        if (d.success) setData(d);
        else setError(d.error ?? 'Failed to load dashboard');
      })
      .catch(() => setError('Network error. Please refresh.'))
      .finally(() => setLoading(false));
  }, []);

  if (error) return (
    <div className="p-8 text-center text-red-500 font-semibold">{error}</div>
  );

  const kpi = data?.kpis;
  const student = data?.student;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">

      {/* -- HEADER + COUNTDOWN -- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {loading ? (
            <><Sk cls="h-8 w-64 mb-2" /><Sk cls="h-4 w-48" /></>
          ) : (
            <>
              <h1 className="text-[28px] font-bold text-slate-900 dark:text-white tracking-tight">
                Welcome back, {student?.name?.split(' ')[0]}!
              </h1>
              <p className="text-[15px] text-slate-500 dark:text-slate-400 mt-1">
                {student?.batch} &bull; Roll No: {student?.rollNo}
              </p>
            </>
          )}
        </div>

        {/* Countdown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 px-6 flex items-center gap-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-fuchsia-600 dark:text-fuchsia-400" />
            <span className="font-bold tracking-wide text-sm text-slate-900 dark:text-white">
              {loading ? '...' : (student?.examTarget ?? 'NEET 2027')}
            </span>
          </div>
          <div className="w-px h-7 bg-slate-200 dark:bg-slate-700" />
          <div className="flex items-center gap-3 font-bold tabular-nums">
            {(['Days', 'Hrs', 'Mins', 'Secs'] as const).map((label, i, arr) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex flex-col items-center min-w-[30px]">
                  <span className={`text-xl leading-none text-slate-900 dark:text-white ${label === 'Secs' ? 'text-fuchsia-600 dark:text-fuchsia-400' : ''}`}>
                    {String(timeLeft[label === 'Days' ? 'days' : label === 'Hrs' ? 'hours' : label === 'Mins' ? 'mins' : 'secs']).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-medium tracking-wider uppercase mt-0.5">{label}</span>
                </div>
                {i < arr.length - 1 && <span className="text-slate-300 dark:text-slate-600 mb-2">:</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -- KPI ROW -- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {loading ? (
          Array(4).fill(0).map((_, i) => <Sk key={i} cls="h-24 rounded-2xl" />)
        ) : (
          [
            {
              icon: <Award size={18} />,
              value: kpi?.lastMockScore != null ? String(kpi.lastMockScore) : '—',
              sub: kpi?.lastMockScore != null ? `/${kpi.lastMockMax}` : '',
              label: 'Last Mock Score',
              link: '/dashboard/tests',
            },
            {
              icon: <TrendingUp size={18} />,
              value: kpi?.rank != null ? `#${kpi.rank.toLocaleString()}` : '—',
              label: 'All India Rank',
              link: '/dashboard/tests',
            },
            {
              icon: <CalendarDays size={18} />,
              value: `${kpi?.attendancePct ?? 0}%`,
              label: 'Attendance',
              link: '/dashboard/attendance',
            },
            {
              icon: <Wallet size={18} />,
              value: kpi?.feeDue ? `₹${(kpi.feeDue / 1000).toFixed(0)}k` : '₹0',
              label: 'Fee Due',
              link: '/dashboard/fees',
              danger: (kpi?.feeDue ?? 0) > 0,
            },
          ].map(({ icon, value, sub, label, link, danger }: any) => (
            <Link
              key={label}
              href={link}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex items-center gap-4 hover:border-fuchsia-300 dark:hover:border-fuchsia-700 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-fuchsia-50 dark:group-hover:bg-fuchsia-900/30 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors shrink-0">
                {icon}
              </div>
              <div>
                <div className={`text-xl font-bold ${danger ? 'text-red-500 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
                  {value}{sub && <span className="text-sm text-slate-400 font-normal">{sub}</span>}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* -- ROW 2: Up Next + Syllabus + Fee Summary -- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Up Next Video — static placeholder until Material model is added */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                <PlayCircle size={20} />
              </div>
              <span className="px-2.5 py-1 bg-fuchsia-100 dark:bg-fuchsia-900/50 text-fuchsia-700 dark:text-fuchsia-400 text-[11px] font-bold rounded-full uppercase tracking-wider">Up Next</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Study Materials</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Continue from where you left off</p>
          </div>
          <Link href="/dashboard/materials" className="mt-6 w-full py-2.5 bg-white dark:bg-transparent border border-fuchsia-600 dark:border-fuchsia-500 text-fuchsia-600 dark:text-fuchsia-400 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20 rounded-xl text-sm font-semibold transition-colors text-center block">
            Go to Materials
          </Link>
        </div>

        {/* Syllabus Progress */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
              <Target size={20} />
            </div>
            <div>
              <div className="text-base font-bold text-slate-900 dark:text-white">Syllabus Progress</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Overall completion</div>
            </div>
          </div>
          {loading ? (
            <div className="space-y-4">{Array(3).fill(0).map((_, i) => <Sk key={i} cls="h-8" />)}</div>
          ) : (
            <div className="space-y-4">
              {(data?.syllabus ?? []).length > 0
                ? data!.syllabus.map(({ subject, pct }) => (
                  <div key={subject}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{subject}</span>
                      <span className="font-bold text-slate-900 dark:text-white">{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                      <div className="bg-fuchsia-600 h-1.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))
                : <p className="text-sm text-slate-400">No syllabus data yet.</p>
              }
            </div>
          )}
        </div>

        {/* Fee Summary */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-50 dark:bg-fuchsia-900/10 rounded-full blur-2xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-1 text-sm">
              <Wallet size={15} /> Fee Summary
            </div>
            {loading ? (
              <><Sk cls="h-9 w-40 mb-2" /><Sk cls="h-4 w-32 mb-4" /><Sk cls="h-3 mb-2" /><Sk cls="h-3" /></>
            ) : (
              <>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  ₹ {(kpi?.feeDue != null ? (kpi.feeDue > 0 ? kpi.feeDue : 0) : 0).toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mb-5">
                  {student?.batch} &bull; Fee Due
                </div>
                {kpi?.feeDueDate && (
                  <div className="text-xs text-red-500 font-semibold flex items-center gap-1.5 mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Due by: {kpi.feeDueDate}
                  </div>
                )}
              </>
            )}
          </div>
          <Link href="/dashboard/fees" className="mt-5 block w-full text-center py-2.5 bg-white dark:bg-transparent border border-fuchsia-600 dark:border-fuchsia-500 text-fuchsia-600 dark:text-fuchsia-400 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20 rounded-xl text-sm font-semibold transition-colors relative z-10">
            View Details →
          </Link>
        </div>
      </div>

      {/* -- ROW 3: Today's Classes + Faculty Leave -- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Today's Classes */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2">
              <Video size={16} className="text-slate-400 dark:text-slate-500" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Today&apos;s Classes</h2>
            </div>
            {!loading && (
              <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-lg">
                {data?.todayClasses?.length ?? 0} Scheduled
              </span>
            )}
          </div>
          {loading ? (
            <div className="space-y-3">{Array(3).fill(0).map((_, i) => <Sk key={i} cls="h-14 rounded-xl" />)}</div>
          ) : data?.todayClasses?.length ? (
            <div className="space-y-1">
              {data.todayClasses.map(({ time, subject, teacher, room }) => (
                <div key={time} className="flex gap-4 items-center p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                  <div className="w-[90px] shrink-0">
                    <span className="text-xs font-bold text-fuchsia-600 dark:text-fuchsia-400">{time}</span>
                  </div>
                  <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">{subject}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{teacher} &bull; {room}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">No classes scheduled for today.</p>
          )}
        </div>

        {/* Faculty on Leave */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <div className="flex items-center gap-2">
              <UserX size={16} className="text-slate-400 dark:text-slate-500" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Faculty on Leave</h2>
            </div>
            {!loading && (data?.facultyLeave?.length ?? 0) > 0 && (
              <span className="px-2.5 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold rounded-lg border border-red-100 dark:border-red-900/30">
                {data!.facultyLeave.length} Today
              </span>
            )}
          </div>
          {loading ? (
            <div className="space-y-3">{Array(2).fill(0).map((_, i) => <Sk key={i} cls="h-16 rounded-xl" />)}</div>
          ) : data?.facultyLeave?.length ? (
            <div className="space-y-3">
              {data.facultyLeave.map(({ initials, name, role, badge, backDate }: any) => (
                <div key={name} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/50">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0 font-bold text-sm">{initials}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{role}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap ${backDate ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30'}`}>
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">All faculty present today.</p>
          )}
        </div>
      </div>

      {/* -- ROW 4: Notices + Quick Access -- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Notices */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <AlertCircle size={16} className="text-slate-400 dark:text-slate-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Notices &amp; Schedule</h2>
          </div>
          {loading ? (
            <div className="space-y-3">{Array(3).fill(0).map((_, i) => <Sk key={i} cls="h-16 rounded-xl" />)}</div>
          ) : data?.notices?.length ? (
            <div className="space-y-3">
              {data.notices.map(({ month, day, title, desc, urgent }) => (
                <div key={`${month}${day}`} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/50 hover:border-fuchsia-200 dark:hover:border-fuchsia-800/50 transition-colors">
                  <div className={`w-10 h-10 rounded-xl ${urgent ? 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/50' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'} border flex flex-col items-center justify-center shrink-0`}>
                    <span className={`text-[9px] font-bold uppercase ${urgent ? 'text-red-500' : 'text-slate-400'}`}>{month}</span>
                    <span className={`text-sm font-bold leading-none ${urgent ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-white'}`}>{day}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">No notices at the moment.</p>
          )}
        </div>

        {/* Quick Access */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen size={16} className="text-slate-400 dark:text-slate-500" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Quick Access</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: '/dashboard/tests',       icon: <FileText size={20} />,   label: 'Mock Tests',      sub: 'CBT Environment' },
              { href: '/dashboard/materials',    icon: <BookOpen size={20} />,   label: 'Study Materials', sub: 'PDFs & Notes' },
              { href: '/dashboard/attendance',   icon: <CheckCircle size={20} />, label: 'Attendance',     sub: 'View Calendar' },
              { href: '/dashboard/doubts',       icon: <Sparkles size={20} />,   label: 'AI Doubts',       sub: 'Gemini Powered' },
            ].map(({ href, icon, label, sub }) => (
              <Link key={href} href={href} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-fuchsia-300 dark:hover:border-fuchsia-700 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20 transition-all group">
                <div className="text-slate-400 dark:text-slate-500 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 mb-3 transition-colors">{icon}</div>
                <div className="font-semibold text-slate-900 dark:text-white text-sm">{label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{sub}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
