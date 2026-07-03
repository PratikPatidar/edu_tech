'use client';

import { BookOpen, Video, Download, Search, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

function Sk({ cls = '' }: { cls?: string }) {
  return <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-lg ${cls}`} />;
}

const COLOR_MAP: Record<string, { icon: string; badge: string; hover: string }> = {
  fuchsia: { icon: 'text-fuchsia-500 group-hover:text-fuchsia-600 dark:text-fuchsia-400', badge: 'bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-700 dark:text-fuchsia-400', hover: 'group-hover:bg-fuchsia-50 dark:group-hover:bg-fuchsia-900/20 group-hover:border-fuchsia-200 dark:group-hover:border-fuchsia-700' },
  blue:    { icon: 'text-blue-500 group-hover:text-blue-600 dark:text-blue-400',       badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400',       hover: 'group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-200 dark:group-hover:border-blue-700' },
  green:   { icon: 'text-green-500 group-hover:text-green-600 dark:text-green-400',    badge: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400',    hover: 'group-hover:bg-green-50 dark:group-hover:bg-green-900/20 group-hover:border-green-200 dark:group-hover:border-green-700' },
};

export default function StudentMaterials() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = ['All', 'Physics', 'Chemistry', 'Biology'];

  useEffect(() => {
    fetch('/api/student/materials')
      .then(r => r.json())
      .then(d => {
        if (d.success) setMaterials(d.materials);
      })
      .catch(() => toast.error('Failed to load materials'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = materials.filter(m => {
    if (filter !== 'All' && m.subject !== filter) return false;
    if (search.trim() && !m.title.toLowerCase().includes(search.toLowerCase()) && !m.desc.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-slate-900 dark:text-white tracking-tight">Study Materials</h1>
          <p className="text-[15px] text-slate-500 dark:text-slate-400 mt-1">Access all PDFs, notes, and recorded lectures by subject.</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
          <input 
            type="text" 
            placeholder="Search materials..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white outline-none focus:border-fuchsia-400 dark:focus:border-fuchsia-600 transition-colors w-full md:w-56 shadow-sm" 
          />
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:px-0 md:mx-0 hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors shrink-0 ${filter === tab ? 'bg-fuchsia-700 text-white shadow-sm' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <Sk cls="h-28 w-full mb-4" />
              <Sk cls="h-4 w-24 mb-2" />
              <Sk cls="h-5 w-3/4 mb-1" />
              <Sk cls="h-8 w-full mb-4" />
              <Sk cls="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-lg font-semibold">No materials found.</p>
          <p className="text-sm mt-1">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((m) => {
            const cfg = COLOR_MAP[m.color] || COLOR_MAP.fuchsia;
            return (
              <div key={m._id} className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm group transition-all ${cfg.hover}`}>
                <div className={`w-full h-28 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-4 flex items-center justify-center transition-colors`}>
                  {m.type === 'video'
                    ? <Video size={32} className={`${cfg.icon} transition-colors`} />
                    : <BookOpen size={32} className={`${cfg.icon} transition-colors`} />
                  }
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>{m.subject}</span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 capitalize">{m.type === 'video' ? '🎬 Video' : '📄 PDF'}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-[15px] leading-tight mb-1">{m.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 min-h-[32px]">{m.desc}</p>
                <button 
                  onClick={() => toast.success(m.type === 'video' ? 'Opening video player...' : 'Downloading PDF...')}
                  className="w-full flex justify-center items-center gap-2 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {m.type === 'video' ? <Video size={15} /> : <Download size={15} />}
                  {m.type === 'video' ? 'Watch Now' : 'Download PDF'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
