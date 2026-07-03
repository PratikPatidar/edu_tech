'use client';

import { Folder, FileText, Search, Plus, MoreVertical } from 'lucide-react';

export default function StudyMaterials() {
  const folders = [
    { name: 'Physics Class 11 Modules', count: 12 },
    { name: 'Chemistry DPPs (Dropper)', count: 45 },
    { name: 'Biology NCERT Highlights', count: 8 },
    { name: 'Previous Year Papers', count: 24 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Study Materials Vault</h1>
          <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">Manage and distribute PDFs, DPPs, and video lectures to student apps.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative hidden md:block w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search files..." 
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:border-orange-500"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-500/20">
            <Plus size={18} /> Upload New
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-[#0f172a] mb-4">Folders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {folders.map((folder, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-orange-300 hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group">
              <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-orange-50 dark:bg-orange-900/30 group-hover:text-orange-500 transition-colors">
                <Folder size={24} fill="currentColor" className="opacity-20" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[#0f172a] text-sm leading-tight mb-1">{folder.name}</div>
                <div className="text-xs font-semibold text-slate-400 dark:text-slate-500">{folder.count} files</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-[#0f172a] mb-4">Recent Uploads</h2>
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 dark:text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  <th className="p-4 font-semibold">File Name</th>
                  <th className="p-4 font-semibold">Size</th>
                  <th className="p-4 font-semibold">Uploaded By</th>
                  <th className="p-4 font-semibold">Assigned Batch</th>
                  <th className="p-4 font-semibold text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 transition-colors cursor-pointer group">
                    <td className="p-4 flex items-center gap-3">
                      <FileText size={20} className="text-red-500 dark:text-red-400" />
                      <span className="font-semibold text-[#0f172a] group-hover:text-orange-600 dark:text-orange-400 transition-colors">Thermodynamics_DPP_0{i}.pdf</span>
                    </td>
                    <td className="p-4 text-slate-500 dark:text-slate-400 dark:text-slate-500 font-medium">2.4 MB</td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">Ravi Sir (Physics)</td>
                    <td className="p-4"><span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-semibold text-slate-600 dark:text-slate-400 dark:text-slate-500">Target Batch</span></td>
                    <td className="p-4 text-right">
                      <button className="text-slate-400 dark:text-slate-500 hover:text-orange-600 dark:text-orange-400"><MoreVertical size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
