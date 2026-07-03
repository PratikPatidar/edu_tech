'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft, ChevronRight, Clock, Flag, AlertTriangle,
  CheckCircle2, Circle, SkipForward, Send, X, Menu
} from 'lucide-react';

// --- Mock Questions -----------------------------------------------------------

type Question = {
  id: number;
  subject: string;
  section: string;
  text: string;
  options: string[];
  correct: number;
};

const questions: Question[] = [
  // Physics
  { id: 1, subject: 'Physics', section: 'Section A', text: 'A body is thrown vertically upward with velocity u. The ratio of its speed at ½ of maximum height to speed at ¼ of maximum height is:', options: ['√(2/3)', '√(3/4)', '√(2/4)', '√(1/2)'], correct: 0 },
  { id: 2, subject: 'Physics', section: 'Section A', text: 'In a parallel plate capacitor, the capacity increases if:', options: ['Area of the plate is decreased', 'Distance between the plates is increased', 'Distance between the plates is decreased', 'Dielectric constant is decreased'], correct: 2 },
  { id: 3, subject: 'Physics', section: 'Section A', text: 'Which of the following is not a unit of energy?', options: ['Calorie', 'Joule', 'Electron volt', 'Watt'], correct: 3 },
  { id: 4, subject: 'Physics', section: 'Section B', text: 'A ray of light passes from glass to air. The angle of incidence for total internal reflection is called:', options: ['Brewster angle', 'Critical angle', 'Polarisation angle', 'Deviation angle'], correct: 1 },
  { id: 5, subject: 'Physics', section: 'Section B', text: 'The frequency of visible light that has maximum energy in solar spectrum is:', options: ['Infrared', 'Ultraviolet', 'Green-yellow', 'Violet'], correct: 2 },
  // Chemistry
  { id: 6, subject: 'Chemistry', section: 'Section A', text: 'Which of the following has highest electronegativity?', options: ['Fluorine', 'Oxygen', 'Nitrogen', 'Chlorine'], correct: 0 },
  { id: 7, subject: 'Chemistry', section: 'Section A', text: 'The IUPAC name of CH₃-CH₂-CHO is:', options: ['Propanal', 'Butanal', 'Propan-1-ol', 'Ethanal'], correct: 0 },
  { id: 8, subject: 'Chemistry', section: 'Section A', text: 'Bond order of N₂ molecule is:', options: ['1', '2', '3', '2.5'], correct: 2 },
  { id: 9, subject: 'Chemistry', section: 'Section B', text: 'Which reaction involves transfer of electrons?', options: ['Precipitation', 'Redox', 'Neutralisation', 'Complex formation'], correct: 1 },
  { id: 10, subject: 'Chemistry', section: 'Section B', text: 'pH of pure water at 25°C is:', options: ['7', '0', '14', '6'], correct: 0 },
  // Biology
  { id: 11, subject: 'Biology', section: 'Botany', text: 'The powerhouse of the cell is:', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Lysosome'], correct: 2 },
  { id: 12, subject: 'Biology', section: 'Botany', text: 'Which plant hormone promotes fruit ripening?', options: ['Auxin', 'Gibberellin', 'Ethylene', 'Cytokinin'], correct: 2 },
  { id: 13, subject: 'Biology', section: 'Botany', text: 'Photosynthesis primarily takes place in:', options: ['Mitochondria', 'Nucleus', 'Chloroplast', 'Ribosome'], correct: 2 },
  { id: 14, subject: 'Biology', section: 'Zoology', text: 'The basic unit of heredity is:', options: ['Chromosome', 'Cell', 'Gene', 'Nucleotide'], correct: 2 },
  { id: 15, subject: 'Biology', section: 'Zoology', text: 'Which blood group is universal donor?', options: ['A', 'B', 'AB', 'O'], correct: 3 },
];

const SUBJECTS = ['Physics', 'Chemistry', 'Biology'];
const TOTAL_TIME = 180 * 60; // 180 minutes in seconds

type AnswerState = 'unanswered' | 'answered' | 'marked' | 'marked-answered';

// --- CBT Page ----------------------------------------------------------------

export default function CBTPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [states, setStates] = useState<Record<number, AnswerState>>({ [questions[0].id]: 'unanswered' });
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [activeSubject, setActiveSubject] = useState('Physics');
  const [showPalette, setShowPalette] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const allVisited = Object.keys(states).length === questions.length;

  // Timer
  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(t); handleSubmit(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [submitted]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const isLow = timeLeft < 300;

  const q = questions[currentQ];
  const filteredQs = questions.filter(q => q.subject === activeSubject);
  const globalIdx = (qId: number) => questions.findIndex(q => q.id === qId);

  const selectOption = (optIdx: number) => {
    setAnswers(prev => ({ ...prev, [q.id]: optIdx }));
    setStates(prev => ({
      ...prev,
      [q.id]: prev[q.id] === 'marked' || prev[q.id] === 'marked-answered' ? 'marked-answered' : 'answered'
    }));
  };

  const clearResponse = () => {
    setAnswers(prev => { const n = { ...prev }; delete n[q.id]; return n; });
    setStates(prev => ({
      ...prev,
      [q.id]: prev[q.id] === 'marked-answered' ? 'marked' : 'unanswered'
    }));
  };

  const markForReview = () => {
    setStates(prev => ({
      ...prev,
      [q.id]: answers[q.id] !== undefined ? 'marked-answered' : 'marked'
    }));
    if (currentQ < questions.length - 1) setCurrentQ(c => c + 1);
  };

  const goTo = (idx: number) => {
    setCurrentQ(idx);
    const subj = questions[idx].subject;
    setActiveSubject(subj);
    // mark as visited if unanswered
    setStates(prev => ({
      ...prev,
      [questions[idx].id]: prev[questions[idx].id] || 'unanswered'
    }));
  };

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    setShowSubmitModal(false);

    // Calculate score based on actual correct/incorrect answers
    let physicsCorrect = 0, physicsWrong = 0, physicsSkipped = 0;
    let chemistryCorrect = 0, chemistryWrong = 0, chemistrySkipped = 0;
    let biologyCorrect = 0, biologyWrong = 0, biologySkipped = 0;

    questions.forEach(qItem => {
      const selected = answers[qItem.id];
      const isCorrect = selected === qItem.correct;
      const isAnswered = selected !== undefined;

      if (qItem.subject === 'Physics') {
        if (!isAnswered) physicsSkipped++;
        else if (isCorrect) physicsCorrect++;
        else physicsWrong++;
      } else if (qItem.subject === 'Chemistry') {
        if (!isAnswered) chemistrySkipped++;
        else if (isCorrect) chemistryCorrect++;
        else chemistryWrong++;
      } else if (qItem.subject === 'Biology') {
        if (!isAnswered) biologySkipped++;
        else if (isCorrect) biologyCorrect++;
        else biologyWrong++;
      }
    });

    const physicsScore = (physicsCorrect * 4) - physicsWrong;
    const chemistryScore = (chemistryCorrect * 4) - chemistryWrong;
    const biologyScore = (biologyCorrect * 4) - biologyWrong;
    const totalScore = physicsScore + chemistryScore + biologyScore;
    const totalAttempted = questions.length - (physicsSkipped + chemistrySkipped + biologySkipped);

    const resultData = {
      id: 'aits-3',
      name: 'AITS Minor Test #3 – Full Syllabus',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      duration: '180 min',
      totalQuestions: questions.length,
      totalMarks: questions.length * 4,
      attempted: totalAttempted,
      score: totalScore,
      batchRank: totalScore >= 50 ? 2 : totalScore >= 35 ? 7 : totalScore >= 20 ? 15 : 28,
      batchStrength: 120,
      percentile: totalScore >= 50 ? 98.5 : totalScore >= 35 ? 92.1 : totalScore >= 20 ? 84.3 : 62.4,
      subjects: [
        {
          name: 'Physics', color: '#6366f1', icon: '⚡',
          totalQ: 5, correct: physicsCorrect, incorrect: physicsWrong, skipped: physicsSkipped,
          score: physicsScore, maxScore: 20, accuracy: totalAttempted > 0 ? Math.round((physicsCorrect / (physicsCorrect + physicsWrong || 1)) * 100) : 0,
        },
        {
          name: 'Chemistry', color: '#0ea5e9', icon: '🧪',
          totalQ: 5, correct: chemistryCorrect, incorrect: chemistryWrong, skipped: chemistrySkipped,
          score: chemistryScore, maxScore: 20, accuracy: totalAttempted > 0 ? Math.round((chemistryCorrect / (chemistryCorrect + chemistryWrong || 1)) * 100) : 0,
        },
        {
          name: 'Biology', color: '#22c55e', icon: '🧬',
          totalQ: 5, correct: biologyCorrect, incorrect: biologyWrong, skipped: biologySkipped,
          score: biologyScore, maxScore: 20, accuracy: totalAttempted > 0 ? Math.round((biologyCorrect / (biologyCorrect + biologyWrong || 1)) * 100) : 0,
        },
      ],
    };

    localStorage.setItem('cbt_result_aits-3', JSON.stringify(resultData));

    // Update cumulative history
    let historyList = [
      { test: 'Test #1', score: 495, rank: 35, percentile: 71 },
      { test: 'Test #2', score: 540, rank: 28, percentile: 77 }
    ];
    const stored = localStorage.getItem('cbt_test_history');
    if (stored) {
      try {
        historyList = JSON.parse(stored);
      } catch (e) {}
    }
    // Remove if already exists with same name to avoid duplicates on re-submission
    historyList = historyList.filter(t => t.test !== 'Test #3');
    historyList.push({
      test: 'Test #3',
      score: totalScore,
      rank: resultData.batchRank,
      percentile: resultData.percentile
    });
    localStorage.setItem('cbt_test_history', JSON.stringify(historyList));

    router.push('/dashboard/tests/aits-3');
  }, [answers, router]);

  const statusColor = (id: number) => {
    const st = states[id];
    if (st === 'answered') return 'bg-green-500 text-white';
    if (st === 'marked') return 'bg-purple-500 text-white';
    if (st === 'marked-answered') return 'bg-purple-700 text-white ring-2 ring-green-400';
    if (st === 'unanswered' && answers[id] === undefined) return 'bg-red-100 dark:bg-red-900/30 text-red-600 border border-red-200';
    return 'bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700';
  };

  const counts = {
    answered: Object.values(states).filter(s => s === 'answered' || s === 'marked-answered').length,
    marked: Object.values(states).filter(s => s === 'marked' || s === 'marked-answered').length,
    unanswered: questions.length - Object.values(states).filter(s => s === 'answered' || s === 'marked-answered').length,
    notVisited: questions.length - Object.keys(states).length,
  };

  return (
    <div className="h-screen flex flex-col bg-[#f0f4f8] dark:bg-slate-950 overflow-hidden font-sans">

      {/* -- Top Bar -- */}
      <header className="bg-fuchsia-700 text-white px-4 md:px-8 h-14 flex items-center justify-between shrink-0 shadow-lg z-30">
        <div className="flex items-center gap-3">
          <div className="font-black text-lg tracking-tight">EduMiracle CBT</div>
          <span className="hidden md:block text-fuchsia-200 text-sm">• NEET Mock Test #1 — Full Syllabus</span>
        </div>
        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl font-black text-lg tabular-nums ${isLow ? 'bg-red-500 animate-pulse' : 'bg-fuchsia-800'}`}>
            <Clock size={16} />
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </div>
          <button
            className="px-4 py-1.5 bg-white text-fuchsia-700 rounded-xl font-bold text-sm hover:bg-fuchsia-50 transition-colors"
            onClick={() => setShowSubmitModal(true)}
          >
            Submit Test
          </button>
          <button className="md:hidden" onClick={() => setShowPalette(p => !p)}>
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* -- Subject Tabs -- */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 flex items-center gap-1 shrink-0">
        {SUBJECTS.map(s => {
          const subjQs = questions.filter(q => q.subject === s);
          const answered = subjQs.filter(q => states[q.id] === 'answered' || states[q.id] === 'marked-answered').length;
          return (
            <button
              key={s}
              onClick={() => { setActiveSubject(s); goTo(globalIdx(subjQs[0].id)); }}
              className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeSubject === s
                  ? 'border-fuchsia-600 text-fuchsia-700 dark:text-fuchsia-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              {s}
              <span className={`ml-1.5 text-xs font-bold ${answered > 0 ? 'text-green-600' : 'text-slate-400'}`}>
                {answered}/{subjQs.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* -- Body -- */}
      <div className="flex flex-1 overflow-hidden">

        {/* -- Question Panel -- */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">

          {/* Q header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-700 dark:text-fuchsia-400 rounded-lg text-xs font-bold uppercase tracking-wide">
                {q.subject} — {q.section}
              </span>
            </div>
            <span className="text-sm text-slate-400 font-medium">Q {currentQ + 1} of {questions.length}</span>
          </div>

          {/* Question Text */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <p className="text-[16px] font-medium text-slate-900 dark:text-white leading-relaxed">
              <span className="font-black text-fuchsia-700 dark:text-fuchsia-400 mr-2">Q{currentQ + 1}.</span>
              {q.text}
            </p>

            {/* Marking scheme note */}
            <p className="text-xs text-slate-400 mt-3">+4 correct &nbsp;|&nbsp; -1 wrong &nbsp;|&nbsp; 0 skipped</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const selected = answers[q.id] === i;
              return (
                <button
                  key={i}
                  onClick={() => selectOption(i)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                    selected
                      ? 'border-fuchsia-500 bg-fuchsia-50 dark:bg-fuchsia-900/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-fuchsia-300 dark:hover:border-fuchsia-700'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 transition-colors ${
                    selected
                      ? 'bg-fuchsia-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-fuchsia-100 group-hover:text-fuchsia-700'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className={`font-medium text-[15px] ${selected ? 'text-fuchsia-900 dark:text-fuchsia-100' : 'text-slate-800 dark:text-slate-200'}`}>
                    {opt}
                  </span>
                  {selected && <CheckCircle2 size={18} className="ml-auto text-fuchsia-600 dark:text-fuchsia-400" />}
                </button>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={markForReview}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50 rounded-xl text-sm font-semibold hover:bg-purple-100 transition-colors"
            >
              <Flag size={15} /> Mark for Review & Next
            </button>
            <button
              onClick={clearResponse}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors"
            >
              <X size={15} /> Clear Response
            </button>

            <div className="ml-auto flex items-center gap-2">
              <button
                disabled={currentQ === 0}
                onClick={() => goTo(currentQ - 1)}
                className="flex items-center gap-1 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} /> Prev
              </button>
              {allVisited ? (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold transition-all shadow-md hover:shadow-lg"
                >
                  <Send size={15} /> Submit Test
                </button>
              ) : (
                <button
                  disabled={currentQ === questions.length - 1}
                  onClick={() => goTo(currentQ + 1)}
                  className="flex items-center gap-1 px-4 py-2.5 bg-fuchsia-700 hover:bg-fuchsia-800 text-white rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Save & Next <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* -- Right Palette -- */}
        <aside className={`${showPalette ? 'w-72' : 'w-0'} shrink-0 transition-all duration-300 overflow-hidden bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col`}>
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Question Palette</h3>
            {/* Legend */}
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              {[
                { color: 'bg-green-500', label: 'Answered' },
                { color: 'bg-red-100 border border-red-200 text-red-600', label: 'Not Answered' },
                { color: 'bg-purple-500', label: 'Marked' },
                { color: 'bg-slate-100 border border-slate-200', label: 'Not Visited' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className={`w-4 h-4 rounded-sm ${l.color} shrink-0`} />
                  <span className="text-slate-500 dark:text-slate-400">{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="px-4 py-3 grid grid-cols-2 gap-2 border-b border-slate-100 dark:border-slate-800">
            <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="text-lg font-black text-green-600">{counts.answered}</div>
              <div className="text-[10px] text-green-600/70 font-semibold">Answered</div>
            </div>
            <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <div className="text-lg font-black text-red-500">{counts.unanswered}</div>
              <div className="text-[10px] text-red-500/70 font-semibold">Unanswered</div>
            </div>
            <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <div className="text-lg font-black text-purple-600">{counts.marked}</div>
              <div className="text-[10px] text-purple-600/70 font-semibold">Marked</div>
            </div>
            <div className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
              <div className="text-lg font-black text-slate-500">{counts.notVisited}</div>
              <div className="text-[10px] text-slate-400 font-semibold">Not Visited</div>
            </div>
          </div>

          {/* Subject palette */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {SUBJECTS.map(subj => (
              <div key={subj}>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">{subj}</div>
                <div className="flex flex-wrap gap-2">
                  {questions.filter(q => q.subject === subj).map(qItem => (
                    <button
                      key={qItem.id}
                      onClick={() => goTo(globalIdx(qItem.id))}
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition-all hover:scale-105 ${statusColor(qItem.id)} ${
                        questions[currentQ].id === qItem.id ? 'ring-2 ring-fuchsia-500 ring-offset-1' : ''
                      }`}
                    >
                      {qItem.id}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-fuchsia-700 hover:bg-fuchsia-800 text-white rounded-xl font-bold text-sm transition-colors"
            >
              <Send size={15} /> Submit Test
            </button>
          </div>
        </aside>
      </div>

      {/* -- Submit Modal -- */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 w-full max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center">
                <AlertTriangle size={24} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h2 className="font-black text-slate-900 dark:text-white text-lg">Submit Test?</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">You cannot change answers after submitting.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Answered', val: counts.answered, color: 'text-green-600 bg-green-50 dark:bg-green-900/20' },
                { label: 'Unanswered', val: counts.unanswered, color: 'text-red-500 bg-red-50 dark:bg-red-900/20' },
                { label: 'Marked', val: counts.marked, color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20' },
                { label: 'Not Visited', val: counts.notVisited, color: 'text-slate-500 bg-slate-100 dark:bg-slate-800' },
              ].map(s => (
                <div key={s.label} className={`p-3 rounded-xl ${s.color} text-center`}>
                  <div className="text-2xl font-black">{s.val}</div>
                  <div className="text-xs font-semibold opacity-80">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 rounded-xl bg-fuchsia-700 hover:bg-fuchsia-800 text-white font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Send size={16} /> Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
