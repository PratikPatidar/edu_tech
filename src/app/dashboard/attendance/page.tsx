'use client';

import { useState, useEffect } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
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
  present: { bg: 'bg-white dark:bg-slate-900 border-green-500/80 dark:border-green-600 shadow-sm', pill: 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200/50 dark:border-green-900/20', label: 'Present' },
  half:    { bg: 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-400 dark:border-amber-700 shadow-sm', pill: 'bg-amber-100/60 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-250/50 dark:border-amber-800/20', label: 'Early Left' },
  absent:  { bg: 'bg-red-50/80 dark:bg-red-950/40 border-red-400 dark:border-red-700 shadow-sm', pill: 'bg-red-100/60 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-250/50 dark:border-red-800/20', label: 'Absent' },
  holiday: { bg: 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-400 dark:border-blue-800 shadow-sm', pill: 'bg-blue-100/60 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/20', label: 'Holiday' },
  weekend: { bg: 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm', pill: 'bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-800/20', label: 'Sunday' },
  future:  { bg: 'bg-transparent border border-dashed border-slate-200 dark:border-slate-800', pill: '', label: '' },
};

function Sk({ cls = '' }: { cls?: string }) {
  return <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg ${cls}`} />;
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
      .then(r => r.json())
      .then((d: AttendanceResponse) => {
        setData(d);
        // Default select today if current month
        if (d.days.length > 0 && year === now.getFullYear() && month === now.getMonth() + 1) {
          const todayDay = d.days.find(x => x.day === now.getDate());
          if (todayDay) setSelectedDay(todayDay);
        }
      })
      .catch(() => toast.error('Failed to load attendance data'))
      .finally(() => setLoading(false));
  }, [year, month]);

  const navigate = (dir: 'prev' | 'next') => {
    if (dir === 'prev') {
      if (month === 1) { setMonth(12); setYear(y => y - 1); }
      else setMonth(m => m - 1);
    } else {
      if (month === 12) { setMonth(1); setYear(y => y + 1); }
      else setMonth(m => m + 1);
    }
  };

  const days = data?.days ?? [];
  const offset = data?.offset ?? 0;
  const stats = data?.stats;
  const monthLabel = data?.monthLabel ?? '';
  const pct = stats?.pct ?? 0;

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">

      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <CalendarDays size={20} className="text-orange-500" />
            Attendance Ledger
          </h1>
          {!loading && stats && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span className="flex items-center gap-1 font-semibold">
                Presence: <span className={pct >= 75 ? 'text-green-600' : 'text-red-500'}>{pct}%</span>
                {' '}({pct >= 75 ? 'Satisfactory' : 'Low — needs attention'})
              </span>
              <span>•</span>
              <span>Min Required: 75%</span>
            </div>
          )}
        </div>
      </div>

      {/* Calendar Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">

        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('prev')}
            className="px-4 py-2 text-xs border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors font-medium flex items-center gap-1"
          >
            <ChevronLeft size={14} className="text-slate-600 dark:text-slate-400" />
            Previous
          </button>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            {loading ? <Sk cls="h-6 w-32 inline-block" /> : monthLabel}
          </h2>
          <button
            onClick={() => navigate('next')}
            className="px-4 py-2 text-xs border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors font-medium flex items-center gap-1"
          >
            Next
            <ChevronRight size={14} className="text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Stats Row */}
        {loading ? (
          <div className="grid grid-cols-5 gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800/60">
            {Array(5).fill(0).map((_, i) => <Sk key={i} cls="h-10" />)}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-5 gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-800/60 text-center">
            {[
              { label: 'Working Days', val: stats.working,  cls: 'text-blue-600 dark:text-blue-400' },
              { label: 'Present',      val: stats.present,  cls: 'text-green-600 dark:text-green-400' },
              { label: 'Absent',       val: stats.absent,   cls: 'text-red-500 dark:text-red-400' },
              { label: 'Holidays',     val: stats.holidays, cls: 'text-orange-600 dark:text-orange-400' },
              { label: 'Sundays',      val: stats.weekends, cls: 'text-slate-500 dark:text-slate-400' },
            ].map(s => (
              <div key={s.label} className="flex flex-col items-center">
                <span className={`text-xl font-bold ${s.cls}`}>{s.val}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider font-semibold">{s.label}</span>
              </div>
            ))}
          </div>
        ) : null}

        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <Loader2 size={32} className="animate-spin" />
          </div>
        ) : days.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-2">
            <CalendarDays size={40} className="text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-medium">No attendance data for {monthLabel}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-2.5 mb-2.5">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d} className="text-center text-xs font-semibold text-slate-400 dark:text-slate-500 pb-2.5 border-b border-slate-100 dark:border-slate-800">{d}</div>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-7 gap-2.5">
                {Array.from({ length: offset }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-[64px]" />
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
                      className={`text-left border ${
                        isSelected
                          ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-md bg-orange-50/20'
                          : isToday
                            ? 'border-blue-500 ring-2 ring-blue-500/10 shadow-md bg-white dark:bg-slate-900'
                            : test
                              ? 'border-orange-300 dark:border-orange-700 shadow-sm bg-orange-50/10'
                              : cfg.bg
                      } rounded-xl p-2.5 h-[64px] flex flex-col justify-between transition-all hover:shadow hover:border-slate-400 dark:hover:border-slate-600 active:scale-[0.98] ${
                        (status !== 'future' || test) ? 'cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className={`text-xs font-bold ${
                          isSelected
                            ? 'text-orange-600 dark:text-orange-400'
                            : isToday
                              ? 'text-blue-600 dark:text-blue-400'
                              : (status === 'weekend' || status === 'future' ? 'text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white')
                        }`}>
                          {day} {isToday && <span className="text-[9px] font-extrabold text-blue-600 dark:text-blue-400 ml-1 uppercase">Today</span>}
                        </span>
                        {test ? (
                          <span className="px-1.5 py-0.5 bg-orange-500 text-white rounded text-[8px] font-bold uppercase tracking-wider">Test</span>
                        ) : (
                          status !== 'future' && cfg.label && (
                            <span className={`px-1.5 py-0.5 ${cfg.pill} rounded text-[8px] font-bold uppercase tracking-wider`}>{cfg.label}</span>
                          )
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/80">
          {[
            { label: 'Present',       cls: 'bg-green-100/60 dark:bg-green-900/30' },
            { label: 'Early Left',    cls: 'bg-amber-100/60 dark:bg-amber-900/30' },
            { label: 'Absent',        cls: 'bg-red-100/60 dark:bg-red-900/30' },
            { label: 'Holiday',       cls: 'bg-blue-100/60 dark:bg-blue-900/30' },
            { label: 'Sunday / Test', cls: 'bg-orange-100 text-orange-700 dark:bg-orange-950/20' },
          ].map(({ label, cls }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${cls}`} />
              <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
            </div>
          ))}
        </div>

        {/* Selected Day Details Panel */}
        {selectedDay && (
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 animate-in slide-in-from-bottom-2 duration-300">
            <h3 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Day Log Details</h3>

            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-950/40 rounded-xl p-4 border border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-base">
                    {selectedDay.day}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-white">{monthLabel.split(' ')[0]} {selectedDay.day}, {year}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">RFID Campus Access Log</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs">
                  <div>
                    <div className="text-slate-400 dark:text-slate-500 mb-0.5">Status</div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      selectedDay.status === 'present' ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400' :
                      selectedDay.status === 'half'    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' :
                      selectedDay.status === 'absent'  ? 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400' :
                      selectedDay.status === 'holiday' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400' :
                      'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {selectedDay.status === 'half' ? 'Early Left' : selectedDay.status === 'weekend' ? 'Sunday' : selectedDay.status}
                    </span>
                  </div>

                  {(selectedDay.status === 'present' || selectedDay.status === 'half') && (
                    <>
                      <div>
                        <div className="text-slate-400 dark:text-slate-500 mb-0.5">Punch In</div>
                        <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{selectedDay.checkIn || '08:50 AM'}</span>
                      </div>
                      <div>
                        <div className="text-slate-400 dark:text-slate-500 mb-0.5">Punch Out</div>
                        <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{selectedDay.checkOut || '04:30 PM'}</span>
                      </div>
                      {selectedDay.late && (
                        <div>
                          <div className="text-slate-400 dark:text-slate-500 mb-0.5">Arrival Log</div>
                          <span className="text-red-500 font-semibold">{selectedDay.late}</span>
                        </div>
                      )}
                    </>
                  )}

                  {selectedDay.status === 'absent' && (
                    <div>
                      <div className="text-slate-400 dark:text-slate-500 mb-0.5">Log Status</div>
                      <span className="text-red-500 font-semibold">No punch-in recorded</span>
                    </div>
                  )}

                  {selectedDay.status === 'holiday' && (
                    <div>
                      <div className="text-slate-400 dark:text-slate-500 mb-0.5">Holiday Description</div>
                      <span className="text-blue-500 dark:text-blue-400 font-medium">Gazetted Holiday</span>
                    </div>
                  )}

                  {selectedDay.status === 'weekend' && !selectedDay.test && (
                    <div>
                      <div className="text-slate-400 dark:text-slate-500 mb-0.5">Log Status</div>
                      <span className="text-slate-500 font-medium">Weekly Academic Off</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sunday Test Details */}
              {selectedDay.test && (
                <div className="bg-orange-50/30 dark:bg-orange-950/10 rounded-xl p-4 border border-orange-200/50 dark:border-orange-900/30">
                  <div className="flex items-center justify-between border-b border-orange-100/50 dark:border-orange-900/20 pb-2.5 mb-2.5">
                    <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
                      Sunday Test Schedule
                    </span>
                    {selectedDay.test.score ? (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400 rounded text-[10px] font-bold">Score: {selectedDay.test.score}</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 rounded text-[10px] font-bold">Upcoming Test</span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <div className="text-slate-400 dark:text-slate-500 mb-0.5">Test Paper</div>
                      <span className="font-semibold text-slate-800 dark:text-white">{selectedDay.test.name}</span>
                    </div>
                    <div>
                      <div className="text-slate-400 dark:text-slate-500 mb-0.5">Test Duration</div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedDay.test.time}</span>
                    </div>
                    <div>
                      <div className="text-slate-400 dark:text-slate-500 mb-0.5">Syllabus</div>
                      <span className="font-medium text-slate-600 dark:text-slate-400 leading-relaxed block">{selectedDay.test.syllabus}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
