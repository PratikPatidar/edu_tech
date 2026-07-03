'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const items = [
  { src: "/images/digital_exam_center.jpg", tag: "CBT Center", title: "Digital Exam Center", desc: "Our 200+ capacity CBT environment simulated for JEE/NEET computer-based assessments." },
  { src: "/images/exam_ai.jpg", tag: "Academics", title: "Monthly Mock Tests", desc: "Rigorous diagnostic exams evaluating thousands of classroom students nationwide." },
  { src: "/images/faculty_ai.jpg", tag: "Seminars", title: "Faculty Seminars", desc: "Expert panel discussions planning daily practice schedules and rank improvement tactics." },
  { src: "/images/login_bg_ai.jpg", tag: "Campus", title: "Indore HQ Library", desc: "Silent studying zones equipped with comprehensive physical books and computer setups." },
  { src: "/images/digital_exam_center.jpg", tag: "CBT Center", title: "Real-time CBT Mock Testing", desc: "Simultaneous testing across multiple centers to prepare students for actual exam pressures." },
  { src: "/images/faculty_ai.jpg", tag: "Seminars", title: "Student Counseling Session", desc: "Experienced HODs conducting stress management and time allocation mentorship." },
];

const TABS = ['All', 'CBT Center', 'Academics', 'Seminars', 'Campus'];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeTab === 'All' ? items : items.filter(i => i.tag === activeTab);
  const prev = () => setLightbox(l => l !== null ? (l - 1 + filtered.length) % filtered.length : null);
  const next = () => setLightbox(l => l !== null ? (l + 1) % filtered.length : null);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16 space-y-12">
      {lightbox !== null && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors" onClick={() => setLightbox(null)}><X size={32} /></button>
          <button className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors" onClick={e => { e.stopPropagation(); prev(); }}><ChevronLeft size={48} /></button>
          <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
            <img src={filtered[lightbox].src} alt={filtered[lightbox].title} className="w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl" />
            <div className="mt-6 text-center">
              <h3 className="text-white text-xl font-bold">{filtered[lightbox].title}</h3>
              <p className="text-slate-400 text-sm mt-1">{filtered[lightbox].desc}</p>
              <div className="mt-3 text-slate-500 text-xs">{lightbox + 1} / {filtered.length}</div>
            </div>
          </div>
          <button className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors" onClick={e => { e.stopPropagation(); next(); }}><ChevronRight size={48} /></button>
        </div>
      )}
      <div className="text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mb-4">Our Campus</span>
        <h1 className="text-5xl font-black text-gray-900 mb-4">Event <span className="text-orange-600">Gallery</span></h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Snapshots of student life, learning milestones, and celebrations at EduMiracle campuses.</p>
      </div>
      <div className="flex justify-center gap-3 flex-wrap">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${activeTab === tab ? 'bg-orange-600 text-white shadow-md shadow-orange-200' : 'bg-white border border-slate-200 text-slate-600 hover:text-orange-600 hover:border-orange-300'}`}>{tab}</button>
        ))}
      </div>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {filtered.map((item, i) => (
          <div key={i} onClick={() => setLightbox(i)} className="break-inside-avoid bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer relative">
            <div className="relative overflow-hidden">
              <img src={item.src} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.title} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100" />
              </div>
              <span className="absolute top-4 left-4 bg-orange-600 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">{item.tag}</span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-[#0f172a] mb-1">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
        <div className="break-inside-avoid bg-slate-50 rounded-3xl border-2 border-dashed border-slate-300 p-10 flex flex-col justify-center items-center text-center min-h-[200px]">
          <div className="text-5xl mb-4">📸</div>
          <h3 className="text-lg font-bold text-[#0f172a] mb-1">More to come</h3>
          <p className="text-slate-500 text-xs max-w-[200px] leading-relaxed">We capture and upload batch events weekly. Stay tuned!</p>
        </div>
      </div>
    </div>
  );
}
