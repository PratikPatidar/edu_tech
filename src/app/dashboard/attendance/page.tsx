'use client';

import { useState, useEffect } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Loader2, Clock, MapPin, AlertCircle, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface TestDetail {
  name: string;
  syllabus: string;
  time: string;
  score?: string;
}

interface DayData {
  day: number;
  status: 'present' | 'absent' | 'half' | 'holiday' | 'weekend' | 'future';
  checkIn?: string;
  checkOut?: string;
  late?: string;
  test?: TestDetail;
}

interface AttendanceResponse {
  success: boolean;
  year: number;
  month: number;
  offset: number;
  monthLabel: string;
  stats?: { working: number; present: number; absent: number; half: number; holidays: number; weekends: number; pct: number };
  days: DayData[];
}

const statusConfig = {
  present: {
    bg: 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-400',
    dot: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    label: 'Present'
  },
  half: {
    bg: 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/30 text-amber-400',
    dot: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
    label: 'Early Left'
  },
  absent: {
    bg: 'bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/30 text-rose-400',
    dot: 'bg-rose-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]',
    label: 'Absent'
  },
  holiday: {
    bg: 'bg-sky-500/10 hover:bg-sky-500/20 border-sky-500/30 text-sky-400',
    dot: 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]',
    label: 'Holiday'
  },
  weekend: {
    bg: 'bg-zinc-900/40 hover:bg-zinc-900/60 border-zinc-800 text-zinc-500',
    dot: 'bg-zinc-600',
    label: 'Weekend'
  },
  future: {
    bg: 'bg-transparent border border-dashed border-zinc-800 text-zinc-700',
    dot: 'bg-transparent',
    label: ''
  },
};

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-zinc-900 rounded ${className}`} />;
}

export default function StudentAttendance() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [data, setData] = useState<AttendanceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);

  useEffect(() => {
    setLoading(true);
    setSelectedDay(null);
    fetch(`/api/student/attendance?year=${year}&month=${month}`)
      .then((r) => r.json())
      .then((d: AttendanceResponse) => {
        setData(d);
        if (d.days.length > 0 && year === now.getFullYear() && month === now.getMonth() + 1) {
          const todayDay = d.days.find((x) => x.day === now.getDate());
          if (todayDay) setSelectedDay(todayDay);
        }
      })
      .catch(() => toast.error('Failed to load attendance logs'))
      .finally(() => setLoading(false));
  }, [year, month]);

  const navigate = (dir: 'prev' | 'next') => {
    if (dir === 'prev') {
      if (month === 1) {
        setMonth(12);
        setYear((y) => y - 1);
      } else {
        setMonth((m) => m - 1);
      }
    } else {
      if (month === 12) {
        setMonth(1);
        setYear((y) => y + 1);
      } else {
        setMonth((m) => m + 1);
      }
    }
  };

  const days = data?.days ?? [];
  const offset = data?.offset ?? 0;
  const stats = data?.stats;
  const monthLabel = data?.monthLabel ?? '';
  const pct = stats?.pct ?? 0;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 text-zinc-100 font-sans">
      
      {/* Background radial highlights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-widest">
            <span>Academic Portal</span>
            <span>/</span>
            <span className="text-orange-500 font-semibold">Attendance logs</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2.5">
            <CalendarDays size={22} className="text-orange-500" />
            Biometric Access & Attendance Ledger
          </h1>
          <p className="text-zinc-500 text-xs">
            Official system of record for RFID gate entries, compliance checks, and campus activity logs.
          </p>
        </div>

        {/* Compliance Meter Card with gradient glow */}
        {!loading && stats && (
          <div className="flex items-center gap-5 bg-zinc-900 border border-zinc-800 rounded px-4 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-transparent opacity-50 pointer-events-none" />
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Sparkles size={10} className="text-orange-500 animate-pulse" />
                Compliance ratio
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-2xl font-mono font-bold tracking-tight ${pct >= 75 ? 'text-emerald-400' : 'text-rose-500'}`}>
                  {pct}%
                </span>
                <span className="text-xs text-zinc-400">
                  ({pct >= 75 ? 'Compliant' : 'Below Threshold'})
                </span>
              </div>
            </div>
            <div className="h-8 w-[1px] bg-zinc-800" />
            <div className="text-right">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">Min required</div>
              <div className="text-xs font-bold text-zinc-300 mt-1">75.00%</div>
            </div>
          </div>
        )}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Calendar Core Ledger */}
        <div className="lg:col-span-8 bg-zinc-900/60 border border-zinc-800 rounded shadow-sm p-5 flex flex-col justify-between space-y-6">
          <div>
            {/* Header controls */}
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                {loading ? <Skeleton className="h-5 w-32" /> : monthLabel}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('prev')}
                  className="p-1.5 border border-zinc-800 rounded bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => navigate('next')}
                  className="p-1.5 border border-zinc-800 rounded bg-zinc-900 hover:bg-zinc-800 hover:text-white transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Grid stats */}
            {loading ? (
              <div className="grid grid-cols-5 gap-2 my-4">
                {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-10" />)}
              </div>
            ) : stats ? (
              <div className="grid grid-cols-5 gap-2 my-4 bg-zinc-950/40 p-2.5 border border-zinc-850 rounded">
                {[
                  { label: 'Working', val: stats.working, color: 'text-zinc-300' },
                  { label: 'Present', val: stats.present, color: 'text-emerald-400' },
                  { label: 'Absent', val: stats.absent, color: 'text-rose-400' },
                  { label: 'Holiday', val: stats.holidays, color: 'text-blue-400' },
                  { label: 'Sundays', val: stats.weekends, color: 'text-zinc-500' },
                ].map(s => (
                  <div key={s.label} className="text-center py-1.5 border border-zinc-850/50 bg-zinc-900 rounded-sm">
                    <div className={`text-sm font-mono font-bold ${s.color}`}>{s.val}</div>
                    <div className="text-[8px] font-mono text-zinc-500 uppercase mt-0.5 tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Main Calendar View */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-2">
                <Loader2 size={24} className="animate-spin text-zinc-500" />
                <span className="text-xs text-zinc-500 font-mono">Accessing biometric ledger...</span>
              </div>
            ) : (
              <div>
                {/* Days of week */}
                <div className="grid grid-cols-7 gap-1.5 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} className="text-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest py-1">{d}</div>
                  ))}
                </div>

                {/* Day Blocks */}
                <div className="grid grid-cols-7 gap-1.5">
                  {Array.from({ length: offset }).map((_, i) => (
                    <div key={`empty-${i}`} className="border border-transparent aspect-square" />
                  ))}
                  {days.map((dayData) => {
                    const { day, status, test } = dayData;
                    const isToday = year === now.getFullYear() && month === now.getMonth() + 1 && day === now.getDate();
                    const isSelected = selectedDay?.day === day;
                    const cfg = statusConfig[status];

                    return (
                      <button
                        key={day}
                        disabled={status === 'future' && !test}
                        onClick={() => setSelectedDay(dayData)}
                        className={`aspect-square border flex flex-col justify-between p-2 transition-all ${
                          isSelected
                            ? 'border-orange-500 bg-orange-950/20 text-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.15)]'
                            : isToday
                              ? 'border-zinc-300 bg-zinc-800 text-white'
                              : test
                                ? 'border-amber-500/40 bg-amber-950/10 text-amber-400'
                                : cfg.bg
                        } ${ (status !== 'future' || test) ? 'cursor-pointer hover:border-zinc-500' : 'opacity-20 cursor-default' }`}
                      >
                        <div className="flex justify-between items-start w-full">
                          <span className="text-xs font-mono font-semibold">{day}</span>
                          {status !== 'future' && !test && (
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                          )}
                        </div>

                        {test ? (
                          <span className="w-full text-center text-[8px] py-0.5 bg-amber-500 text-zinc-950 font-bold uppercase tracking-wider rounded-sm leading-none shadow-[0_0_8px_rgba(245,158,11,0.3)]">TEST</span>
                        ) : isToday ? (
                          <span className="w-full text-center text-[8px] py-0.5 bg-zinc-100 text-zinc-950 font-bold uppercase tracking-wider rounded-sm leading-none">TODAY</span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Simple Clean Legend */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-zinc-800 text-[10px] text-zinc-500 font-mono">
            {[
              { label: 'Present', color: 'bg-emerald-450 shadow-[0_0_6px_rgba(52,211,153,0.4)]' },
              { label: 'Early Left', color: 'bg-amber-450 shadow-[0_0_6px_rgba(251,191,36,0.4)]' },
              { label: 'Absent', color: 'bg-rose-450 shadow-[0_0_6px_rgba(248,113,113,0.4)]' },
              { label: 'Holiday', color: 'bg-sky-450 shadow-[0_0_6px_rgba(56,189,248,0.4)]' },
              { label: 'Sundays', color: 'bg-zinc-600' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${l.color}`} />
                <span>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Day Details Panel */}
        <div className="lg:col-span-4 bg-zinc-900/60 border border-zinc-800 rounded p-5 shadow-sm space-y-5">
          <div className="border-b border-zinc-800 pb-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Activity Overview</h3>
            <p className="text-[10px] text-zinc-500 mt-1">Detailed logs for the selected day</p>
          </div>

          {selectedDay ? (
            <div className="space-y-5 animate-in fade-in duration-300">
              {/* Header Info */}
              <div className="flex items-center gap-3 bg-zinc-950/40 p-3 border border-zinc-850 rounded">
                <div className="h-10 w-10 bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center justify-center font-mono font-bold text-sm rounded">
                  {selectedDay.day}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-200">{monthLabel.split(' ')[0]} {selectedDay.day}, {year}</h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                      selectedDay.status === 'present' ? 'bg-emerald-950/30 text-emerald-400 border-emerald-500/20' :
                      selectedDay.status === 'half'    ? 'bg-amber-950/30 text-amber-400 border-amber-500/20' :
                      selectedDay.status === 'absent'  ? 'bg-rose-950/30 text-rose-400 border-rose-500/20' :
                      selectedDay.status === 'holiday' ? 'bg-blue-950/30 text-blue-400 border-blue-500/20' :
                      'bg-zinc-900 text-zinc-400 border-zinc-800'
                    }`}>
                      {selectedDay.status === 'half' ? 'Early Left' : selectedDay.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* RFID Timeline */}
              {(selectedDay.status === 'present' || selectedDay.status === 'half') ? (
                <div className="relative pl-5 border-l border-zinc-800 space-y-5 py-1">
                  {/* Punch In */}
                  <div className="relative">
                    <span className="absolute -left-[24px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-zinc-900 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                    <div className="space-y-1">
                      <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                        <Clock size={11} />
                        PUNCH-IN (MAIN GATE RFID)
                      </div>
                      <div className="text-xs font-mono font-bold text-zinc-200">{selectedDay.checkIn || '08:50 AM'}</div>
                    </div>
                  </div>

                  {/* Delay Tag */}
                  {selectedDay.late && (
                    <div className="relative">
                      <span className="absolute -left-[24px] top-1.5 w-2.5 h-2.5 rounded-full bg-rose-400 border border-zinc-900 shadow-[0_0_6px_rgba(248,113,113,0.6)]" />
                      <div className="p-2.5 bg-rose-950/20 border border-rose-500/20 rounded">
                        <div className="text-[9px] font-mono font-bold text-rose-400 flex items-center gap-1">
                          <AlertCircle size={10} />
                          LATE ARRIVAL DETECTED
                        </div>
                        <div className="text-[10px] text-rose-350 mt-1">{selectedDay.late}</div>
                      </div>
                    </div>
                  )}

                  {/* Punch Out */}
                  <div className="relative">
                    <span className="absolute -left-[24px] top-1 w-2.5 h-2.5 rounded-full bg-amber-400 border border-zinc-900 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
                    <div className="space-y-1">
                      <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                        <Clock size={11} />
                        PUNCH-OUT (MAIN GATE RFID)
                      </div>
                      <div className="text-xs font-mono font-bold text-zinc-200">{selectedDay.checkOut || '04:30 PM'}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-zinc-950/40 border border-zinc-850 rounded text-center space-y-1.5 py-6">
                  {selectedDay.status === 'absent' && (
                    <>
                      <XCircle className="mx-auto text-rose-400 shadow-[0_0_8px_rgba(248,113,113,0.3)]" size={24} />
                      <h5 className="text-[11px] font-bold text-zinc-300">Biometric Missing</h5>
                      <p className="text-[9px] text-zinc-500 leading-normal max-w-[180px] mx-auto">No entry/exit events logged for this date. Checked as absent.</p>
                    </>
                  )}
                  {selectedDay.status === 'holiday' && (
                    <>
                      <CheckCircle2 className="mx-auto text-blue-400 shadow-[0_0_8px_rgba(56,189,248,0.3)]" size={24} />
                      <h5 className="text-[11px] font-bold text-zinc-300">Gazetted Holiday</h5>
                      <p className="text-[9px] text-zinc-500 leading-normal max-w-[180px] mx-auto">Campus was closed. Attendance excluded from target compliance.</p>
                    </>
                  )}
                  {selectedDay.status === 'weekend' && (
                    <>
                      <CheckCircle2 className="mx-auto text-zinc-500" size={24} />
                      <h5 className="text-[11px] font-bold text-zinc-300">Sunday Off</h5>
                      <p className="text-[9px] text-zinc-500 leading-normal max-w-[180px] mx-auto">Weekly academic day off. No campus punch registers required.</p>
                    </>
                  )}
                </div>
              )}

              {/* Sunday Test Details */}
              {selectedDay.test && (
                <div className="bg-zinc-950/80 border border-amber-500/20 rounded p-3 space-y-2">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
                    <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      Assessment Schedule
                    </span>
                    {selectedDay.test.score ? (
                      <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[9px] font-mono font-bold">Score: {selectedDay.test.score}</span>
                    ) : (
                      <span className="px-1.5 py-0.5 bg-zinc-800 text-zinc-400 border border-zinc-700 rounded text-[9px] font-mono font-bold">Pending</span>
                    )}
                  </div>

                  <div className="space-y-2 text-[11px]">
                    <div>
                      <div className="text-[8px] font-mono text-zinc-500 uppercase">Test Title</div>
                      <span className="font-bold text-zinc-200 mt-0.5 block">{selectedDay.test.name}</span>
                    </div>
                    <div>
                      <div className="text-[8px] font-mono text-zinc-500 uppercase">Test Window</div>
                      <span className="font-medium text-zinc-350 mt-0.5 block">{selectedDay.test.time}</span>
                    </div>
                    <div>
                      <div className="text-[8px] font-mono text-zinc-500 uppercase">Syllabus Details</div>
                      <span className="text-zinc-400 block mt-0.5 leading-relaxed">{selectedDay.test.syllabus}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-20 text-center text-zinc-500 flex flex-col items-center justify-center gap-1.5">
              <CalendarDays size={28} className="text-zinc-700" />
              <p className="text-xs font-mono">Select a date to inspect RFID log streams.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
