'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EmSatPage() {
  const [testScore, setTestScore] = useState<string>('');
  const [scholarshipResult, setScholarshipResult] = useState<string | null>(null);

  const calculateScholarship = (e: React.FormEvent) => {
    e.preventDefault();
    const score = parseFloat(testScore);
    if (isNaN(score) || score < 0 || score > 100) {
      setScholarshipResult("Please enter a valid percentage between 0 and 100.");
      return;
    }

    if (score >= 95) {
      setScholarshipResult("Congratulations! You qualify for a 90% Tuition Fee Waiver (Super Elite Slab).");
    } else if (score >= 85) {
      setScholarshipResult("Excellent! You qualify for a 75% Tuition Fee Waiver (Elite Slab).");
    } else if (score >= 70) {
      setScholarshipResult("Great job! You qualify for a 50% Tuition Fee Waiver (Star Slab).");
    } else if (score >= 50) {
      setScholarshipResult("Well done! You qualify for a 25% Tuition Fee Waiver (Achiever Slab).");
    } else {
      setScholarshipResult("You qualify for a 10% Tuition Fee Waiver. Keep practicing!");
    }
  };

  const slabs = [
    { score: "≥ 95% Marks", waiver: "90% Scholarship", desc: "For extreme academic outliers. Subject to HOD interview." },
    { score: "85% - 94.9% Marks", waiver: "75% Scholarship", desc: "Top performers exhibiting excellent logical abilities." },
    { score: "70% - 84.9% Marks", waiver: "50% Scholarship", desc: "Consistent students with strong foundation knowledge." },
    { score: "50% - 69.9% Marks", waiver: "25% Scholarship", desc: "Deserving students with high potential to improve." },
    { score: "< 50% Marks", waiver: "10% Scholarship", desc: "Encouraging startup waiver for all test attendees." }
  ];

  const syllabus = [
    { targetClass: "Moving to Class 11", subjects: "Class 10 Science (Physics, Chemistry, Biology) & Mathematics + Mental Aptitude" },
    { targetClass: "Moving to Class 12", subjects: "Class 11 Syllabus (Physics, Chemistry, Botany, Zoology) or Mathematics" },
    { targetClass: "Class 12 Passed (Droppers)", subjects: "Complete NEET Syllabus (Physics, Chemistry, Biology) or JEE Syllabus (Physics, Chemistry, Math)" }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16 space-y-20">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-orange-950 text-white rounded-[3rem] p-12 shadow-xl border border-slate-750 flex flex-col lg:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <span className="bg-orange-600 text-white font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full">
            EduMiracle SAT (EM-SAT)
          </span>
          <h1 className="text-5xl font-black leading-tight">
            Unlock Up to <span className="text-orange-500">90% Scholarship</span>
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            EM-SAT is a national level scholarship admission test designed to identify academic talent, evaluate logical aptitude, and reward high achievers with direct fee waivers for our premium NEET and IIT-JEE classroom programs.
          </p>
          <div className="flex gap-4 pt-2">
            <Link href="/contact" className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3.5 rounded-xl shadow transition-all">
              Register for Test
            </Link>
            <a href="#calculator" className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all">
              Calculate Scholarship
            </a>
          </div>
        </div>
        <div className="flex-1 w-full grid grid-cols-2 gap-4">
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
            <div className="text-3xl font-black text-orange-500 mb-1">Weekly</div>
            <div className="text-xs text-slate-350">Conducted every Sunday online & offline</div>
          </div>
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
            <div className="text-3xl font-black text-white mb-1">2 Hours</div>
            <div className="text-xs text-slate-350">Duration with multiple choice logic</div>
          </div>
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
            <div className="text-3xl font-black text-white mb-1">MCQ</div>
            <div className="text-xs text-slate-350">+4 for correct, -1 for negative</div>
          </div>
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
            <div className="text-3xl font-black text-orange-500 mb-1">₹ 0</div>
            <div className="text-xs text-slate-350">Zero registration charges for all students</div>
          </div>
        </div>
      </div>

      {/* Brackets / Slabs */}
      <div className="space-y-10">
        <div className="text-center">
          <h2 className="text-4xl font-black text-[#0f172a]">Scholarship <span className="text-orange-600">Slabs</span></h2>
          <p className="text-slate-600 mt-2 max-w-xl mx-auto">Tuition fee waivers calculated strictly based on your EM-SAT performance score.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {slabs.map((slab, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col justify-between hover:border-orange-300 transition-colors">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase">{slab.score}</span>
                <h3 className="text-xl font-black text-orange-600 mt-2 mb-4">{slab.waiver}</h3>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed mt-auto border-t border-slate-100 pt-3">
                {slab.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Calculator Section */}
      <div id="calculator" className="bg-slate-50 rounded-[3rem] p-12 border border-slate-200 max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-4">
          <h3 className="text-3xl font-black text-[#0f172a]">Scholarship <span className="text-orange-600">Calculator</span></h3>
          <p className="text-slate-650 text-sm leading-relaxed">
            Enter your expected or target score percentage in the field to see which scholarship bracket you would fall under.
          </p>
        </div>
        <div className="flex-1 w-full bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <form onSubmit={calculateScholarship} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Expected Score (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                placeholder="e.g. 88.5"
                value={testScore}
                onChange={(e) => setTestScore(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 text-sm font-bold"
                required
              />
            </div>
            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-md">
              Calculate Waiver
            </button>
          </form>
          {scholarshipResult && (
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl text-orange-700 text-sm font-bold text-center animate-in fade-in duration-200">
              {scholarshipResult}
            </div>
          )}
        </div>
      </div>

      {/* Syllabus Grid */}
      <div className="space-y-10">
        <div className="text-center">
          <h2 className="text-4xl font-black text-[#0f172a]">Exam <span className="text-orange-600">Syllabus</span></h2>
          <p className="text-slate-650 mt-2 max-w-xl mx-auto">Topics and chapters covered in the scholarship test, grouped by targeted academic batches.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {syllabus.map((syl, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <span className="bg-orange-50 text-orange-700 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full border border-orange-100">
                {syl.targetClass}
              </span>
              <h3 className="text-xl font-bold text-[#0f172a]">Subjects Covered</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {syl.subjects}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
