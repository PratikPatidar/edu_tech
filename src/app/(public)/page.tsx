'use client';

import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import {
  Sprout, Rocket, Star, Target, Sparkles, FileText, BarChart,
  Users, GraduationCap, Trophy, Smartphone, PlaySquare,
  CheckCircle2, ArrowRight, ChevronRight, Zap, Shield, Clock,
  TrendingUp, BookOpen, Award
} from 'lucide-react';

// --- Animated counter hook ----------------------------------------------------
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

// --- Stat Card ----------------------------------------------------------------
function StatCard({ value, suffix, label, icon }: { value: number; suffix: string; label: string; icon: React.ReactNode }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 px-4">
      <div className="text-orange-400 mb-1">{icon}</div>
      <div className="text-4xl md:text-5xl font-black text-white tabular-nums">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-0.5">{label}</div>
    </div>
  );
}

// --- Feature Card -------------------------------------------------------------
function FeatureCard({ title, desc, icon, delay }: { title: string; desc: string; icon: React.ReactNode; delay: number }) {
  return (
    <div
      className="group relative p-7 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 text-white flex items-center justify-center mb-5 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// --- Batch Finder Widget ------------------------------------------------------
function BatchFinderWidget() {
  const [step, setStep] = useState(1);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const resetFinder = () => {
    setStep(1);
    setSelectedClass(null);
    setSelectedGoal(null);
  };

  const getRecommendedBatch = () => {
    if (selectedClass === '11') {
      return {
        name: "Nurture Batch",
        type: "Class 11 + " + selectedGoal,
        desc: "Build a strong base in NCERT and advanced problem-solving patterns. Includes full printed modules, daily DPP sheets, and mock tests.",
        features: ["2-Year Program Structure", "Boards + competitive syllabus alignment", "Personal HOD guidance sessions"],
        link: "/courses"
      };
    } else if (selectedClass === '12') {
      return {
        name: "Target Batch",
        type: "Class 12 + " + selectedGoal,
        desc: "Rigorous 1-year coaching aiming for a top rank. Integrates 12th board prep with fast-track 11th revisions and full syllabus CBT mocks.",
        features: ["1-Year High-Intensity program", "Complete CBT Mock Engine access", "Weekly doubt-clinics & error correction"],
        link: "/courses"
      };
    } else {
      return {
        name: "Achiever Batch",
        type: "Dropper / Passout + " + selectedGoal,
        desc: "Engineered specifically for repeaters looking to boost speed, avoid negative marks, and target government college seats.",
        features: ["Kota level practice modules", "Individual target scorecard maps", "24/7 AI-Backed academic doubt solver"],
        link: "/courses"
      };
    }
  };

  const recommendation = selectedClass && selectedGoal ? getRecommendedBatch() : null;

  return (
    <div className="relative z-10 space-y-6">
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-black text-[#0f172a]">
          Find Your Perfect <span className="text-orange-600">Batch</span>
        </h3>
        <p className="text-slate-500 text-sm mt-1">Get custom course recommendations based on your current academic stage.</p>
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="text-sm font-bold text-slate-700 uppercase tracking-wider text-center">Step 1: Select Your Current Class</div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { id: '11', title: 'Class 11', desc: 'Moving from Class 10' },
              { id: '12', title: 'Class 12', desc: 'Moving from Class 11' },
              { id: 'dropper', title: '12th Pass', desc: 'Targeting next year' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => { setSelectedClass(item.id); setStep(2); }}
                className="bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-500 rounded-2xl p-6 text-center transition-all group cursor-pointer"
              >
                <div className="font-bold text-lg text-[#0f172a] mb-1 group-hover:text-orange-600 transition-colors">{item.title}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="text-sm font-bold text-slate-700 uppercase tracking-wider text-center">Step 2: Select Your Target Exam</div>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {[
              { id: 'NEET', title: 'NEET (Medical)', desc: 'Aiming for Government Medical Colleges' },
              { id: 'JEE', title: 'JEE (Engineering)', desc: 'Aiming for IITs, NITs, and IIITs' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => { setSelectedGoal(item.id); setStep(3); }}
                className="bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-500 rounded-2xl p-6 text-center transition-all group cursor-pointer"
              >
                <div className="font-bold text-lg text-[#0f172a] mb-1 group-hover:text-orange-600 transition-colors">{item.title}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </button>
            ))}
          </div>
          <div className="text-center">
            <button onClick={() => setStep(1)} className="text-xs text-slate-500 hover:text-orange-600 underline font-semibold cursor-pointer">
              ← Go back to Step 1
            </button>
          </div>
        </div>
      )}

      {step === 3 && recommendation && (
        <div className="space-y-6 animate-in fade-in duration-300 max-w-xl mx-auto text-center bg-orange-50/40 p-8 rounded-3xl border border-orange-100">
          <span className="bg-orange-600 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
            Recommended Batch
          </span>
          <div className="space-y-2 mt-4">
            <h4 className="text-3xl font-black text-[#0f172a]">{recommendation.name}</h4>
            <p className="text-orange-600 font-bold text-sm">{recommendation.type}</p>
          </div>
          <p className="text-slate-650 text-xs leading-relaxed max-w-md mx-auto">
            {recommendation.desc}
          </p>
          <div className="bg-white rounded-2xl p-4 border border-orange-100 text-left space-y-2 text-xs font-semibold text-slate-700 max-w-sm mx-auto">
            {recommendation.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-orange-500">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 justify-center pt-2">
            <Link href={recommendation.link} className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-6 py-3 rounded-xl shadow transition-all">
              View Program Details
            </Link>
            <button onClick={resetFinder} className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer">
              Restart Quiz ↺
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Testimonials -------------------------------------------------------------
const testimonials = [
  { name: 'SUMIT PANWAR', rank: 'NEET 2024 — 670 Marks', text: 'They made NEET feel like a game I could actually win. Daily targets, doubts cleared on WhatsApp at night—EDUMIRACLE isn’t just a class, it’s a family.' },
  { name: 'Shivani Patel', rank: 'NEET Classroom Student', text: "Miracle is not just an institute, it's a place where dreams turn into reality. The teachers focus on strong concepts, regular practice, and personal guidance. Doubts are cleared properly, mock tests improve confidence, and the environment keeps students motivated. It is the best institute for NEET in Indore." },
  { name: 'Vaibhav Patidar', rank: 'NEET Classroom Student', text: 'What makes this coaching unique is its strong focus on fundamentals. Instead of memorization, teachers emphasize understanding and application. Physics problem-solving skills improve drastically, Chemistry becomes systematic, and Biology revision is very effective. Regular performance tracking and feedback sessions help students identify weaknesses early. Overall, a highly supportive and result-driven institute.' },
];

// --- Page ---------------------------------------------------------------------
export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [stats, setStats] = useState({
    studentsCount: 60,
    batchesCount: 6,
    testsCount: 15,
    avgScore: 480
  });

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setStats({
            studentsCount: data.studentsCount || 60,
            batchesCount: data.batchesCount || 6,
            testsCount: data.testsCount || 15,
            avgScore: data.avgScore || 480
          });
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="overflow-x-hidden">

      {/* --------------------------------------------------------------------
          HERO  –  dark navy bg, white & amber text (no bg-clip-text issues)
      -------------------------------------------------------------------- */}
      <section className="relative min-h-[92vh] flex items-center pt-8 pb-16 px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-50 -z-10" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] bg-orange-100/10 rounded-full blur-[80px] -z-10" />

        <div className="max-w-[1400px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center gap-16">

            {/* -- Left copy -- */}
            <div className="flex-1 lg:pl-4">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-bold mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500" />
                </span>
                NEET &amp; JEE Main + Advanced Coaching
              </div>

              {/* Headline — plain text on dark bg, no bg-clip-text fallback issues */}
              <h1 className="text-[36px] md:text-[48px] font-black leading-[1.05] tracking-tight mb-6">
                <span className="text-gray-900">India&apos;s Most</span>
                <br />
                <span className="text-orange-600">Trusted</span>
                <span className="text-gray-900"> Institute.</span>
              </h1>

              <p className="text-lg text-gray-700 mb-10 max-w-xl leading-relaxed">
                With a legacy of 25+ years, EduMiracle brings Kota&apos;s finest pedagogy to your fingertips.
                Join the ranks of our <strong className="text-orange-600">2.5 Million+</strong> successful alumni.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/courses"
                  className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition-all duration-200"
                >
                  Explore Programs
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/about" className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-800 px-8 py-4 rounded-xl font-bold text-base hover:bg-gray-100 hover:border-gray-400 transition-all duration-200">
                  Learn About Us
                </Link>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-3">
                {['#1 in Kota Pedagogy', '720/720 Scorers', 'Gemini AI Tutor', 'NTA Replica CBT'].map(chip => (
                  <span key={chip} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-slate-700 text-xs font-semibold">
                    <CheckCircle2 size={12} className="text-orange-500 shrink-0" />
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* -- Right visual -- */}
            <div className="flex-1 w-full max-w-xl relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/60">
                <img
                  src="/images/exam_ai.jpg"
                  alt="Students studying at EduMiracle"
                  className="w-full object-cover aspect-[4/3] opacity-80"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between">
                  <div>
                    <div className="text-white font-black text-xl">NEET 2025</div>
                    <div className="text-amber-400 text-sm font-semibold">AIR 1, 2 &amp; 3 — All EduMiracle</div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-lg">
                    <Trophy size={22} />
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -left-8 top-1/3 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 z-10 animate-float">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Selection Rate</div>
                  <div className="text-lg font-black text-slate-900">94.7%</div>
                </div>
              </div>

              <div className="absolute -right-8 top-12 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 z-10 animate-float-delay">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
                  <Zap size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">AI Doubts Solved</div>
                  <div className="text-lg font-black text-slate-900">2M+ / day</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          INTERACTIVE BATCH FINDER QUIZ
      -------------------------------------------------------------------- */}
      <section className="py-16 px-6 bg-gradient-to-tr from-orange-50/30 to-amber-50/10">
        <div className="max-w-[1000px] mx-auto bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/30 rounded-full blur-2xl pointer-events-none" />
          
          <BatchFinderWidget />
        </div>
      </section>

      {/* --------------------------------------------------------------------
          STATS BAND
      -------------------------------------------------------------------- */}
      <section className="bg-[#0f172a] border-y border-slate-800 py-16 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-800">
          <StatCard value={stats.studentsCount} suffix="+"  label="Enrolled Students"      icon={<Users size={20} />} />
          <StatCard value={stats.batchesCount}    suffix=""   label="Active Batches"         icon={<Shield size={20} />} />
          <StatCard value={stats.testsCount}      suffix="+"  label="Practice Mock Tests"    icon={<BookOpen size={20} />} />
          <StatCard value={stats.avgScore}       suffix=""   label="Average Mock Score"     icon={<Award size={20} />} />
        </div>
      </section>

      {/* --------------------------------------------------------------------
          PROGRAMS
      -------------------------------------------------------------------- */}
      <section className="py-28 px-6 bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mb-4">Our Programs</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              The Perfect Program for
              <br className="hidden md:block" />
              <span className="text-amber-500"> Every Student</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Tailored courses designed for every stage of your preparation journey.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {/* Card 1 – Foundation */}
            <div className="group bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-400 rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                <Sprout size={28} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md w-fit mb-3">Foundation</span>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Class 11 + NEET</h3>
              <p className="text-slate-500 mb-6 flex-1 text-sm leading-relaxed">Build a rock-solid foundation for NEET/JEE while excelling in board exams with our Nurture Batch.</p>
              <ul className="space-y-2 mb-8">
                {['Daily doubt sessions', 'Integrated board prep', 'OMR practice tests'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={14} className="text-orange-500 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/courses" className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-700 group-hover:border-orange-500 group-hover:text-orange-600 transition-colors text-sm">
                Explore Program <ChevronRight size={16} />
              </Link>
            </div>

            {/* Card 2 – Target (featured) */}
            <div className="group relative rounded-3xl p-8 shadow-2xl flex flex-col overflow-hidden md:-translate-y-4 bg-[#0f172a]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/40 group-hover:scale-110 transition-transform">
                    <Rocket size={28} />
                  </div>
                  <span className="bg-orange-500 text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider">Most Popular</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-2">Target Batch</span>
                <h3 className="text-2xl font-black text-white mb-2">Class 12 + NEET</h3>
                <p className="text-slate-400 mb-6 flex-1 text-sm leading-relaxed">Intensive 1-year program covering the entire NEET/JEE syllabus with rigorous mock tests and rank-analysis.</p>
                <ul className="space-y-2 mb-8">
                  {['1000+ hour live lectures', 'NTA CBT mock engine', 'AI-powered doubt solver'].map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 size={14} className="text-orange-400 shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/courses" className="mt-auto flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition-all text-sm">
                  View Details <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Card 3 – Dropper */}
            <div className="group bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-[#0f172a] to-slate-700 rounded-2xl flex items-center justify-center text-amber-400 mb-5 shadow-lg shadow-slate-300 group-hover:scale-110 transition-transform">
                <Star size={28} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md w-fit mb-3">Dropper</span>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Achiever Batch</h3>
              <p className="text-slate-500 mb-6 flex-1 text-sm leading-relaxed">Dedicated batch focusing on advanced problem-solving, rank improvement, and confidence rebuilding.</p>
              <ul className="space-y-2 mb-8">
                {['Personalized rank plan', 'Exam-day strategy', '24/7 AI mentor access'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={14} className="text-orange-500 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/courses" className="mt-auto flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-slate-200 font-bold text-slate-700 group-hover:border-orange-500 group-hover:text-orange-600 transition-colors text-sm">
                Explore Program <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          EDUCATORS' THOUGHT (Success Formula)
      -------------------------------------------------------------------- */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#F8F9FA] to-white dark:from-slate-900 dark:to-slate-950 border-t border-slate-100 dark:border-slate-800/50">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-gradient-to-br from-[#0f172a] to-slate-900 rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-2xl" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-bold mb-6">
                  Educators' Thought
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Our Proven <br />
                  <span className="text-amber-400">Success Formula</span>
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8">
                  At EDUMIRACLE, success isn’t luck — it’s a repeatable formula. Our proven strategy begins with a strong foundation in NCERT concepts. Then comes consistency — showing up every day with discipline. We emphasize focused practice, using quality study material and regular drills. Next is test analysis — understanding every mistake, improving accuracy, and mastering time management. But what truly sets toppers apart is their mindset — the belief that success is built, not gifted. When these five steps align, success becomes inevitable. We don’t just teach subjects. We teach a system — and that system delivers results.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
                  <div>
                    <div className="text-orange-400 font-extrabold text-lg mb-1">01. NCERT Core</div>
                    <div className="text-slate-400 text-sm">Strong conceptual foundation</div>
                  </div>
                  <div>
                    <div className="text-orange-400 font-extrabold text-lg mb-1">02. Discipline</div>
                    <div className="text-slate-400 text-sm">Consistency every single day</div>
                  </div>
                  <div>
                    <div className="text-orange-400 font-extrabold text-lg mb-1">03. Test Analysis</div>
                    <div className="text-slate-400 text-sm">Mastering accuracy & time</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full max-w-md lg:max-w-none flex flex-col gap-6">
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full bg-slate-700 border border-orange-500 overflow-hidden shrink-0">
                    <img src="/images/faculty_rohit.png" alt="Mr. Rohit Yadav" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/images/faculty_ai.jpg'; }} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Mr. Rohit Yadav</h4>
                    <p className="text-orange-400 text-sm font-semibold">Physics Expert & Co-founder</p>
                    <p className="text-slate-400 text-xs mt-1">Guiding thousands of NEET aspirants to perfect physics scores.</p>
                  </div>
                </div>
                <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full bg-slate-700 border border-orange-500 overflow-hidden shrink-0">
                    <img src="/images/faculty_ashish.png" alt="Mr. Ashish Yadav" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/images/faculty_ai.jpg'; }} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Mr. Ashish Yadav</h4>
                    <p className="text-orange-400 text-sm font-semibold">Chemistry Expert & Co-founder</p>
                    <p className="text-slate-400 text-xs mt-1">Simplifying complex organic & physical chemistry reactions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          ADVANTAGE
      -------------------------------------------------------------------- */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-center mb-16">
            <div className="lg:w-1/2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mb-4">Why EduMiracle</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                An <span className="text-amber-500">Unfair</span>
                <br />Advantage.
              </h2>
            </div>
            <div className="lg:w-1/2">
              <p className="text-slate-500 text-lg leading-relaxed">
                Everything you need to outpace the competition, engineered into a single unified platform.
                From AI-powered doubt resolution to parent-facing dashboards — we&apos;ve thought of everything.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'NTA-Replica CBT',  desc: 'Our exam engine exactly mimics the NTA interface, eliminating anxiety on exam day.',                    icon: <Target size={22} />,       delay: 0 },
              { title: '24/7 AI Tutor',    desc: 'Powered by Gemini Pro — snap a photo of any question and get an instant expert explanation.',           icon: <Sparkles size={22} />,     delay: 100 },
              { title: 'OMR Syncing',      desc: 'Write tests offline. Scan your OMRs and inject analytics directly into your digital dashboard.',        icon: <FileText size={22} />,     delay: 200 },
              { title: 'Deep Analytics',   desc: 'Identify weakest topics down to the sub-chapter level with our proprietary tracking algorithm.',         icon: <BarChart size={22} />,     delay: 300 },
              { title: 'Parent Portal',    desc: 'Full transparency. Parents track attendance, test scores, and fee status in real-time.',                  icon: <Users size={22} />,        delay: 400 },
              { title: 'Kota Faculty',     desc: 'Learn from the exact educators producing top-100 AIRs year after year, in the flesh.',                   icon: <GraduationCap size={22} />, delay: 500 },
            ].map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          RESULTS
      -------------------------------------------------------------------- */}
      <section className="relative py-28 px-6 overflow-hidden bg-[#0f172a]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-700/10 rounded-full blur-[100px]" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-bold mb-4">Results 2025</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Historic Selections in NEET 2025</h2>
            <p className="text-slate-400 text-lg">Our students continue to dominate the top ranks nationwide.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { rank: 1, name: 'Aryan Gupta',  score: '720 / 720', city: 'Kota, Rajasthan' },
              { rank: 2, name: 'Sanya Singh',  score: '718 / 720', city: 'Jaipur, Rajasthan' },
              { rank: 3, name: 'Dev Patel',    score: '715 / 720', city: 'Ahmedabad, Gujarat' },
              { rank: 4, name: 'Meera Rao',    score: '712 / 720', city: 'Hyderabad, Telangana' },
            ].map(s => (
              <div
                key={s.rank}
                className="group relative rounded-2xl p-6 text-center border border-slate-700/50 bg-slate-800/30 hover:-translate-y-2 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-orange-500/60 bg-slate-700/60 flex items-center justify-center group-hover:border-orange-400 transition-colors">
                    <Trophy size={30} className="text-orange-400" />
                  </div>
                  <div className="text-orange-400 font-black text-2xl mb-1">AIR {s.rank}</div>
                  <div className="font-bold text-white text-base mb-1">{s.name}</div>
                  <div className="text-amber-400 font-semibold text-sm mb-2">{s.score}</div>
                  <div className="text-slate-500 text-xs">{s.city}</div>
                  <div className="mt-4 inline-block px-3 py-1 bg-slate-700/60 rounded-full text-xs font-bold text-slate-300 border border-slate-600">
                    Classroom Student
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/toppers"
              className="group inline-flex items-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white hover:text-slate-900 transition-all duration-200"
            >
              View All 1500+ Selections
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          TESTIMONIALS
      -------------------------------------------------------------------- */}
      <section className="py-28 px-6 bg-[#F8F9FA]">
        <div className="max-w-[900px] mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mb-4">Student Stories</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-16">
            Voices that <span className="text-amber-500">Inspire</span>
          </h2>

          <div className="relative bg-white rounded-3xl p-10 shadow-xl border border-slate-100 min-h-[220px] overflow-hidden">
            <div className="absolute top-6 left-8 text-[80px] leading-none text-orange-100 font-serif select-none">&ldquo;</div>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${i === activeTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 absolute inset-0 translate-y-4 pointer-events-none'}`}
              >
                <p className="text-slate-600 text-lg leading-relaxed mb-6 relative z-10">{t.text}</p>
                <div className="font-black text-slate-900 text-base">{t.name}</div>
                <div className="text-orange-500 font-semibold text-sm">{t.rank}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'w-8 bg-orange-500' : 'w-2 bg-slate-300'}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          SCHOLARSHIP
      -------------------------------------------------------------------- */}
      <section className="relative py-28 px-6 overflow-hidden bg-gradient-to-br from-orange-600 to-amber-600">
        <div
          className="absolute inset-0 -z-10 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}
        />
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <span className="inline-block bg-white/20 border border-white/30 text-white font-bold px-4 py-1.5 rounded-full mb-6 text-sm">EM-SAT 2026</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Win Up to 90% Scholarship <br />on Classroom Programs
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-lg">
              Take the EduMiracle Scholarship Admission Test (EM-SAT) — available online &amp; offline. Cash rewards up to <strong className="text-white">₹1 Crore!</strong>
            </p>
            <ul className="space-y-3 mb-10">
              {['Free Registration – Limited Time Only', 'Get your All-India performance report', 'Cash prizes for top 100 rankers'].map(item => (
                <li key={item} className="flex items-center gap-3 text-white font-semibold">
                  <span className="w-6 h-6 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-xs shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/em-sat"
              className="inline-flex items-center gap-2 bg-[#0f172a] text-white px-8 py-4 rounded-xl font-black text-base hover:bg-slate-800 transition-colors shadow-2xl shadow-black/30"
            >
              Register for EM-SAT <ArrowRight size={18} />
            </Link>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-white font-black text-2xl mb-6 flex items-center gap-3">
                <Clock size={22} className="text-orange-200" /> Upcoming Test Dates
              </h3>
              <div className="space-y-4">
                {[
                  { date: '15th August 2026',    mode: 'Online',  isDark: false },
                  { date: '22nd August 2026',    mode: 'Offline', isDark: true },
                  { date: '5th September 2026',  mode: 'Online',  isDark: false },
                ].map(({ date, mode, isDark }) => (
                  <div key={date} className="bg-white/10 p-4 rounded-xl flex items-center justify-between border border-white/10 hover:bg-white/20 transition-colors">
                    <div className="font-bold text-white text-base">{date}</div>
                    <span className={`${isDark ? 'bg-[#0f172a]' : 'bg-orange-500'} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>{mode}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          APP DOWNLOAD
      -------------------------------------------------------------------- */}
      <section className="py-28 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* ── Premium Phone Mockup ── */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              {/* Glow behind the phone */}
              <div className="absolute -inset-8 bg-gradient-to-br from-orange-400/30 via-amber-300/20 to-fuchsia-400/20 blur-3xl rounded-full" />
              {/* Second floating card: AI chat */}
              <div className="absolute -right-16 top-16 z-20 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 w-44 animate-float-delay">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white text-[9px] font-black shrink-0">AI</div>
                  <span className="text-[10px] font-bold text-slate-700">AI Doubt Solved!</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-relaxed">Krebs cycle generates 3 NADH, 1 FADH₂, 1 GTP per turn...</p>
                <div className="mt-2 h-1.5 rounded-full bg-fuchsia-100 overflow-hidden"><div className="h-full w-3/4 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-500" /></div>
              </div>
              {/* Left floating card: rank */}
              <div className="absolute -left-14 bottom-24 z-20 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 w-36 animate-float">
                <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider mb-1">Batch Rank</div>
                <div className="text-2xl font-black text-orange-500">#7</div>
                <div className="text-[9px] text-green-600 font-bold flex items-center gap-0.5">▲ 3 positions this week</div>
              </div>

              {/* The Phone */}
              <div className="relative w-[260px] h-[540px] bg-[#0a0a14] rounded-[3.5rem] border-[7px] border-slate-800 shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
                {/* Dynamic island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30 flex items-center justify-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-700" />
                  <div className="w-3 h-3 rounded-full bg-slate-700 border border-slate-600" />
                </div>

                {/* Status bar */}
                <div className="h-10 shrink-0 flex items-end pb-1 px-5 justify-between">
                  <span className="text-[10px] text-white font-semibold">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="flex gap-0.5 items-end h-3"><div className="w-0.5 h-1 bg-white rounded" /><div className="w-0.5 h-1.5 bg-white rounded" /><div className="w-0.5 h-2 bg-white rounded" /><div className="w-0.5 h-3 bg-white rounded" /></div>
                    <div className="text-white text-[10px]">▲</div>
                    <div className="w-5 h-2.5 border border-white/60 rounded-sm flex items-center px-0.5"><div className="h-full w-3/4 bg-green-400 rounded-sm" /></div>
                  </div>
                </div>

                {/* App header */}
                <div className="px-4 pt-1 pb-3 flex items-center justify-between shrink-0">
                  <div>
                    <div className="text-[10px] text-slate-400 font-medium">Good morning,</div>
                    <div className="text-white font-black text-sm leading-tight">Priya Sharma 👋</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 border-2 border-orange-400 flex items-center justify-center text-white text-xs font-black shrink-0">PS</div>
                </div>

                {/* NEET Countdown card */}
                <div className="mx-4 mb-3 rounded-2xl p-3.5 bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/40 shrink-0">
                  <div className="text-[9px] text-orange-100 font-semibold uppercase tracking-wider mb-1">NEET 2026 Countdown</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-white font-black text-2xl">247</span>
                    <span className="text-orange-100 text-xs font-semibold">days left</span>
                  </div>
                  <div className="mt-2 h-1.5 bg-orange-400/40 rounded-full"><div className="h-full w-[42%] bg-white/80 rounded-full" /></div>
                  <div className="text-orange-100 text-[9px] mt-1">42% of your prep complete</div>
                </div>

                {/* Quick actions grid */}
                <div className="px-4 grid grid-cols-4 gap-2 mb-3 shrink-0">
                  {[
                    { icon: '📝', label: 'Tests' },
                    { icon: '✨', label: 'AI Doubt' },
                    { icon: '📊', label: 'Results' },
                    { icon: '📅', label: 'Schedule' },
                  ].map(({ icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-2xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-base">{icon}</div>
                      <span className="text-[8px] text-slate-400 font-semibold">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Subject progress */}
                <div className="mx-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 p-3 mb-2 shrink-0">
                  <div className="text-[10px] text-slate-300 font-bold mb-2">Today's Progress</div>
                  {[
                    { sub: 'Physics', pct: 72, color: 'from-indigo-500 to-blue-400' },
                    { sub: 'Chemistry', pct: 58, color: 'from-cyan-500 to-teal-400' },
                    { sub: 'Biology', pct: 85, color: 'from-green-500 to-emerald-400' },
                  ].map(({ sub, pct, color }) => (
                    <div key={sub} className="flex items-center gap-2 mb-1.5 last:mb-0">
                      <div className="text-[9px] text-slate-400 w-12 shrink-0">{sub}</div>
                      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full bg-gradient-to-r ${color}`} style={{ width: `${pct}%` }} />
                      </div>
                      <div className="text-[9px] text-slate-300 font-bold w-6 text-right">{pct}%</div>
                    </div>
                  ))}
                </div>

                {/* Bottom Nav */}
                <div className="mt-auto h-14 bg-slate-900/95 border-t border-slate-800 flex items-center justify-around px-3 shrink-0">
                  {[
                    { icon: '🏠', label: 'Home', active: true },
                    { icon: '📝', label: 'Tests', active: false },
                    { icon: '✨', label: 'AI', active: false },
                    { icon: '📊', label: 'Stats', active: false },
                    { icon: '👤', label: 'Profile', active: false },
                  ].map(({ icon, label, active }) => (
                    <div key={label} className={`flex flex-col items-center gap-0.5 ${active ? 'opacity-100' : 'opacity-40'}`}>
                      <div className={`text-base leading-none ${active ? 'drop-shadow-[0_0_6px_rgba(251,146,60,0.8)]' : ''}`}>{icon}</div>
                      <span className={`text-[8px] font-bold ${active ? 'text-orange-400' : 'text-slate-500'}`}>{label}</span>
                      {active && <div className="w-1 h-1 rounded-full bg-orange-400" />}
                    </div>
                  ))}
                </div>
                {/* Home indicator */}
                <div className="h-4 bg-slate-900/95 flex items-center justify-center shrink-0">
                  <div className="w-20 h-0.5 bg-slate-600 rounded-full" />
                </div>
              </div>
            </div>
          </div>


          {/* Text */}
          <div className="flex-1">
            <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-bold mb-4">Mobile App</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Your Institute <br />in Your <span className="text-amber-500">Pocket</span>
            </h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed max-w-lg">
              Access live classes, submit OMR sheets via camera, instantly resolve doubts using our Gemini AI engine, and track your attendance — all from one app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => toast('🚀 App coming soon! You\'ll be notified on launch.', { icon: '📱', duration: 4000 })}
                className="group bg-[#0f172a] text-white px-6 py-4 rounded-xl flex items-center gap-4 hover:bg-slate-800 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <Smartphone size={28} className="text-orange-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-widest text-slate-400">Download on the</div>
                  <div className="font-bold text-base leading-tight text-white">App Store</div>
                </div>
              </button>
              <button
                onClick={() => toast('🚀 App coming soon! You\'ll be notified on launch.', { icon: '📱', duration: 4000 })}
                className="group bg-[#0f172a] text-white px-6 py-4 rounded-xl flex items-center gap-4 hover:bg-slate-800 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <PlaySquare size={28} className="text-amber-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[10px] uppercase tracking-widest text-slate-400">Get it on</div>
                  <div className="font-bold text-base leading-tight text-white">Google Play</div>
                </div>
              </button>
            </div>

            <div className="flex gap-8 mt-10 pt-8 border-t border-slate-100">
              {[['4.8★', 'App Rating'], ['500K+', 'Downloads'], ['50ms', 'Avg. Response']].map(([val, label]) => (
                <div key={label}>
                  <div className="text-2xl font-black text-slate-900">{val}</div>
                  <div className="text-sm text-slate-500 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------
          CTA BAND
      -------------------------------------------------------------------- */}
      <section className="py-20 px-6 bg-[#0f172a] border-t border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join 2.5 million students who transformed their future with EduMiracle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-10 py-4 rounded-xl font-bold text-base shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition-all">
              Browse Programs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-10 py-4 rounded-xl font-bold text-base hover:bg-white/10 transition-all">
              Talk to a Counselor
            </Link>
          </div>
        </div>
      </section>

      {/* Float animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-delay { animation: float-delay 5s ease-in-out infinite 1.5s; }
      `}</style>
    </div>
  );
}
