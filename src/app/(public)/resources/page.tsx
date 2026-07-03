'use client';

import { useState } from 'react';

interface Resource {
  title: string;
  category: 'Physics' | 'Chemistry' | 'Biology' | 'Mathematics' | 'Mock Test';
  type: 'Formula Sheet' | 'Revision Notes' | 'Sample Paper' | 'CBT Mock';
  size: string;
  downloads: string;
}

export default function FreeResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const categories = ['All', 'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Mock Test'];

  const resourcesList: Resource[] = [
    { title: "Kinematics & Mechanics Formula Cheat Sheet", category: "Physics", type: "Formula Sheet", size: "2.4 MB", downloads: "12.4k+" },
    { title: "Electrodynamics Quick Revision Notes", category: "Physics", type: "Revision Notes", size: "4.8 MB", downloads: "8.1k+" },
    { year: 2025, title: "Class 11 Physics Mock Question Bank", category: "Physics", type: "Sample Paper", size: "3.2 MB", downloads: "5.3k+" },
    
    { title: "Organic Chemistry Reaction Mechanism Map", category: "Chemistry", type: "Formula Sheet", size: "3.1 MB", downloads: "15.2k+" },
    { title: "Chemical Bonding Core Concept revision", category: "Chemistry", type: "Revision Notes", size: "5.2 MB", downloads: "9.4k+" },
    { title: "Periodic Table Trend Chart (High-Res)", category: "Chemistry", type: "Formula Sheet", size: "8.7 MB", downloads: "22.1k+" },
    
    { title: "Human Physiology Diagram-based Guide", category: "Biology", type: "Revision Notes", size: "12.4 MB", downloads: "18.6k+" },
    { title: "Genetics & Inheritance Summary Notes", category: "Biology", type: "Revision Notes", size: "6.1 MB", downloads: "11.2k+" },
    { title: "NEET Botany Sample Mock Test Paper", category: "Biology", type: "Sample Paper", size: "2.8 MB", downloads: "7.9k+" },
    
    { title: "Calculus Limits & Derivatives Shortcuts", category: "Mathematics", type: "Formula Sheet", size: "1.9 MB", downloads: "6.8k+" },
    { title: "Coordinate Geometry Formula Quick Book", category: "Mathematics", type: "Formula Sheet", size: "3.5 MB", downloads: "4.7k+" },
    
    { title: "Full Syllabus NEET Mock Test (2025 Pattern)", category: "Mock Test", type: "CBT Mock", size: "1.4 MB", downloads: "32.5k+" },
    { title: "JEE Mains Shift-wise Practice Paper Set", category: "Mock Test", type: "CBT Mock", size: "2.9 MB", downloads: "24.1k+" }
  ] as any[];

  const filteredResources = selectedCategory === 'All' 
    ? resourcesList 
    : resourcesList.filter(res => res.category === selectedCategory);

  const handleDownload = (title: string) => {
    // Generate a dummy PDF content block
    const content = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << >> >>\nendobj\n4 0 obj\n<< /Length 75 >>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(EduMiracle Study Material: ${title}) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000009 00000 n\n0000000056 00000 n\n0000000111 00000 n\n0000000212 00000 n\ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n336\n%%EOF`;
    
    const blob = new Blob([content], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(`"${title}" downloaded successfully!`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16 space-y-16">
      
      {/* Title */}
      <div className="text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-4">Free Study <span className="text-orange-600">Resources</span></h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">Get access to premium chapter-wise notes, formula sheets, and past mock tests prepared by our senior HODs.</p>
      </div>

      {/* Download Alert Notification */}
      {downloadSuccess && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 z-50 border border-slate-800 animate-bounce">
          <span className="text-orange-500 text-lg">⬇️</span>
          <span className="text-sm font-bold">{downloadSuccess}</span>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 border-b border-slate-200 pb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-200 ${selectedCategory === cat ? 'bg-orange-600 text-white shadow-md' : 'text-slate-655 hover:text-orange-600 hover:bg-orange-50/50'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.map((res, i) => (
          <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all hover:border-orange-200 group">
            <div>
              <div className="flex justify-between items-start mb-6">
                <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border ${
                  res.category === 'Physics' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                  res.category === 'Chemistry' ? 'bg-purple-50 border-purple-200 text-purple-700' :
                  res.category === 'Biology' ? 'bg-green-50 border-green-200 text-green-700' :
                  res.category === 'Mathematics' ? 'bg-rose-50 border-rose-200 text-rose-700' :
                  'bg-orange-50 border-orange-200 text-orange-700'
                }`}>
                  {res.category}
                </span>
                <span className="text-slate-400 text-xs font-bold">{res.type}</span>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-4 group-hover:text-orange-600 transition-colors leading-snug">
                {res.title}
              </h3>
            </div>
            
            <div className="border-t border-slate-100 pt-6 mt-6 flex justify-between items-center">
              <div className="text-xs text-slate-500 font-semibold">
                <span>{res.size}</span> &bull; <span className="text-orange-655 font-bold">{res.downloads} downloads</span>
              </div>
              <button
                onClick={() => handleDownload(res.title)}
                className="bg-slate-50 hover:bg-orange-600 border border-slate-200 hover:border-orange-600 hover:text-white rounded-xl p-2.5 font-bold transition-all text-slate-800 text-xs flex items-center gap-1.5"
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
