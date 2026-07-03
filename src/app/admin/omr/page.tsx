'use client';

import { UploadCloud, CheckCircle, AlertCircle, FileScan } from 'lucide-react';
import { useState, useRef, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

export default function OMRScanner() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [jobs, setJobs] = useState([
    { id: 1, name: 'Target_Batch_Mock4_OMRs.pdf', pages: 45, status: 'done', pct: 100 },
    { id: 2, name: 'Nurture_Minor_Test_Sheets.zip', pages: 120, processed: 24, status: 'processing', pct: 20 },
  ]);

  const processFile = (file: File) => {
    const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'application/zip', 'application/x-zip-compressed'];
    if (!allowed.includes(file.type) && !file.name.endsWith('.zip') && !file.name.endsWith('.pdf')) {
      toast.error('Only PDF, JPG, PNG, or ZIP files are supported.');
      return;
    }
    const id = Date.now();
    setJobs(prev => [{ id, name: file.name, pages: 0, processed: 0, status: 'processing', pct: 0 }, ...prev]);
    toast.success(`Processing ${file.name}...`);
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.floor(Math.random() * 15) + 5;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        setJobs(prev => prev.map(j => j.id === id ? { ...j, pct: 100, status: 'done', pages: Math.floor(Math.random() * 80) + 20 } : j));
        toast.success(`${file.name} scanned successfully!`);
      } else {
        setJobs(prev => prev.map(j => j.id === id ? { ...j, pct } : j));
      }
    }, 600);
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(processFile);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      <Toaster position="top-right" />
      <div>
        <h1 className="text-2xl font-bold text-[#0f172a] dark:text-white">Offline OMR Scanner</h1>
        <p className="text-slate-500 font-medium mt-1">Upload batch OMR sheets (PDF/JPG/ZIP) for instant AI grading and analytics syncing.</p>
      </div>

      <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.zip" multiple className="hidden" onChange={e => handleFiles(e.target.files)} />

      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
        className={`rounded-3xl border-2 border-dashed p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all group ${
          dragging ? 'border-orange-400 bg-orange-50 scale-[1.02]' : 'border-orange-200 bg-orange-50/50 hover:border-orange-400 hover:bg-orange-50'
        }`}
      >
        <div className={`w-20 h-20 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-lg mb-6 transition-transform ${
          dragging ? 'scale-125' : 'group-hover:scale-110'
        }`}>
          <UploadCloud size={40} className={dragging ? 'text-orange-400' : 'text-orange-500'} />
        </div>
        <h2 className="text-xl font-bold text-[#0f172a] dark:text-white mb-2">{dragging ? 'Drop files here!' : 'Drag & Drop OMR Sheets'}</h2>
        <p className="text-slate-500 mb-6 max-w-md">Supported: PDF, JPG, PNG, ZIP. Make sure the 4 corner QR markers are clearly visible.</p>
        <button onClick={e => { e.stopPropagation(); fileRef.current?.click(); }} className="px-8 py-3 bg-[#0f172a] text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
          Browse Files
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
        <h3 className="text-lg font-bold text-[#0f172a] dark:text-white mb-6 flex items-center gap-2">
          <FileScan size={20} className="text-orange-500" /> Scan Jobs ({jobs.length})
        </h3>
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  job.status === 'done' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  {job.status === 'done' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-[#0f172a] dark:text-white truncate">{job.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {job.status === 'done' ? `${job.pages} pages scanned • 100% Accuracy` : `Processing... ${job.pct}%`}
                  </div>
                  {job.status !== 'done' && (
                    <div className="mt-2 w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full transition-all duration-500" style={{ width: `${job.pct}%` }} />
                    </div>
                  )}
                </div>
              </div>
              {job.status === 'done' && (
                <button onClick={() => toast.success('Opening scan results...')} className="ml-4 px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50 rounded-lg transition-colors shrink-0">
                  View Results
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
