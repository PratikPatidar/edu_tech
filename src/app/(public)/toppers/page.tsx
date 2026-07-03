'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Topper {
  year: number;
  air: number;
  name: string;
  score: string;
  quote: string;
  type: string;
  image: string;
}

export default function ToppersPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const stats = [
    { value: "480+", label: "Government Medical Selections in NEET 2025" },
    { value: "12", label: "Students in Top 100 All India Ranks" },
    { value: "99.8%", label: "Highest Percentile in JEE Mains 2025" },
    { value: "94.2%", label: "Average Attendance of Selectees" }
  ];

  const toppersData: Topper[] = [
    // --- 2025 ---
    { year: 2025, air: 1, name: "Pratyush Sen", score: "720 / 720", quote: "EduMiracle's structured syllabus plan and daily doubt resolution clinics helped me target my weak topics perfectly.", type: "NEET Classroom Student", image: "/images/topper_ai.jpg" },
    { year: 2025, air: 4, name: "Aarushi Patidar", score: "715 / 720", quote: "The AI doubts engine was my best friend during late-night study sessions. I got explanations for complex diagrams instantly.", type: "NEET Classroom Student", image: "/images/topers-1.jpg" },
    { year: 2025, air: 11, name: "Kabir Mehta", score: "99.98 %ile", quote: "Constant revisions and NTA CBT mock environment practice at the digital centers removed all my actual exam anxiety.", type: "JEE Mains Program", image: "/images/topper_ai.jpg" },
    { year: 2025, air: 18, name: "Divya Singhal", score: "710 / 720", quote: "HOD mentorship sessions kept me motivated when my scores dipped. The study modules were exceptionally detailed.", type: "NEET Achiever Batch", image: "/images/topers-1.jpg" },
    { year: 2025, air: 27, name: "Rishabh Joshi", score: "99.92 %ile", quote: "The Rank Booster crash course gave me the perfect formula sheets and mock checks in the final 3 months.", type: "JEE Rank Booster", image: "/images/topper_ai.jpg" },
    { year: 2025, air: 43, name: "Neha Deshmukh", score: "705 / 720", quote: "My teachers customized worksheets for my Botany doubts, helping me push my score from 620 to 705.", type: "NEET Nurture Batch", image: "/images/topers-1.jpg" },
    { year: 2025, air: 64, name: "Siddharth Verma", score: "702 / 720", quote: "Printed modules cover every corner of NCERT. No need to consult 10 different books.", type: "NEET Distance Learning", image: "/images/topper_ai.jpg" },
    { year: 2025, air: 85, name: "Aditi Gokhale", score: "99.85 %ile", quote: "Detailed mock test analytics pointed out precisely where I made negative-marking mistakes in Physics.", type: "JEE Classroom Student", image: "/images/topers-1.jpg" },
    { year: 2025, air: 92, name: "Rajesh Kulkarni", score: "700 / 720", quote: "The test-series analysis at EduMiracle is phenomenal. It pinpointed exactly where I was wasting time.", type: "NEET Classroom Program", image: "/images/topper_ai.jpg" },
    { year: 2025, air: 105, name: "Tanvi Shah", score: "99.78 %ile", quote: "My physics score improved dramatically because of the daily doubt clinics and continuous practice.", type: "JEE Nurture Batch", image: "/images/topers-1.jpg" },
    { year: 2025, air: 120, name: "Amit Ranade", score: "695 / 720", quote: "I recommend EduMiracle to every serious medical aspirant. The classroom discipline is top notch.", type: "NEET Classroom Student", image: "/images/topper_ai.jpg" },

    // --- 2024 ---
    { year: 2024, air: 2, name: "Sameer Nanda", score: "720 / 720", quote: "The peer group here is very competitive. It pushes you to perform better in every weekly review test.", type: "NEET Classroom Student", image: "/images/topper_ai.jpg" },
    { year: 2024, air: 7, name: "Ananya Roy", score: "716 / 720", quote: "Regular counseling kept my stress levels under check. Teachers were always approachable.", type: "NEET Achiever Batch", image: "/images/topers-1.jpg" },
    { year: 2024, air: 15, name: "Vikas Aggarwal", score: "99.96 %ile", quote: "Our physical study materials and the mock CBT modules match the final NTA pattern perfectly.", type: "JEE Main & Advanced", image: "/images/topper_ai.jpg" },
    { year: 2024, air: 22, name: "Rohit Bansal", score: "710 / 720", quote: "EduMiracle helped me structure my revision timelines so that I didn't forget 11th topics in 12th class.", type: "NEET Classroom Student", image: "/images/topers-1.jpg" },
    { year: 2024, air: 35, name: "Pooja Hegde", score: "99.91 %ile", quote: "The digital test analysis gave me speed-wise breakdowns which improved my time management.", type: "JEE Mains Program", image: "/images/topper_ai.jpg" },
    { year: 2024, air: 50, name: "Meera Nair", score: "705 / 720", quote: "The doubt solving sessions here are very thorough. No topic was left weak.", type: "NEET Nurture Batch", image: "/images/topers-1.jpg" },
    { year: 2024, air: 72, name: "Aman Preet", score: "701 / 720", quote: "Excellent library facility. It helped me study peacefully for long hours.", type: "NEET Distance Learning", image: "/images/topper_ai.jpg" },
    { year: 2024, air: 88, name: "Vikram Malhotra", score: "99.81 %ile", quote: "Highly qualified mentors who were always ready to clarify concepts from basic to advanced levels.", type: "JEE Classroom Student", image: "/images/topers-1.jpg" },
    { year: 2024, air: 99, name: "Kunal Ghosh", score: "698 / 720", quote: "The mock test papers were of a slightly higher standard which made the actual exam feel easy.", type: "NEET Classroom Program", image: "/images/topper_ai.jpg" },
    { year: 2024, air: 112, name: "Deepika Padukone", score: "99.76 %ile", quote: "The focus on mathematics shortcut techniques helped me finish the section 20 minutes earlier.", type: "JEE Nurture Batch", image: "/images/topers-1.jpg" },

    // --- 2023 ---
    { year: 2023, air: 3, name: "Gaurav Sen", score: "718 / 720", quote: "I followed my teachers' guidance blindly. Their experience in coaching is unmatched.", type: "NEET Classroom Student", image: "/images/topper_ai.jpg" },
    { year: 2023, air: 9, name: "Ishaan Khattar", score: "715 / 720", quote: "Daily Practice Papers (DPPs) are the secret to scoring full marks in Organic Chemistry.", type: "NEET Classroom Student", image: "/images/topers-1.jpg" },
    { year: 2023, air: 12, name: "Preeti Shenoy", score: "99.97 %ile", quote: "Mock tests are extremely realistic. They cover multiple conceptual combinations in single questions.", type: "JEE Mains Program", image: "/images/topper_ai.jpg" },
    { year: 2023, air: 20, name: "Rohan Mehra", score: "710 / 720", quote: "Teachers make learning very fun and logical, especially complicated physics derivations.", type: "NEET Achiever Batch", image: "/images/topers-1.jpg" },
    { year: 2023, air: 33, name: "Shruti Haasan", score: "99.90 %ile", quote: "Regular rank tracking made me realize my standing at the national level and pushed me to improve.", type: "JEE Rank Booster", image: "/images/topper_ai.jpg" },
    { year: 2023, air: 48, name: "Vijay Sethupathi", score: "702 / 720", quote: "The study materials are self-sufficient. I did not purchase any external reference books.", type: "NEET Nurture Batch", image: "/images/topers-1.jpg" },
    { year: 2023, air: 69, name: "Kajal Aggarwal", score: "700 / 720", quote: "Real-time AI doubts solver on the student dashboard gave me accurate answers late at night.", type: "NEET Distance Learning", image: "/images/topper_ai.jpg" },
    { year: 2023, air: 81, name: "Dhanush K", score: "99.83 %ile", quote: "The mock test analytics help you identify if you are wasting time on lengthy calculations.", type: "JEE Classroom Student", image: "/images/topers-1.jpg" },
    { year: 2023, air: 95, name: "Priya Anand", score: "695 / 720", quote: "I built speed and accuracy through continuous mock practice and formula revisions.", type: "NEET Classroom Program", image: "/images/topper_ai.jpg" }
  ];

  // Filtering based on year
  const filteredToppers = toppersData.filter(topper => topper.year === selectedYear);

  // Pagination Logic
  const totalItems = filteredToppers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentToppers = filteredToppers.slice(indexOfFirstItem, indexOfLastItem);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setCurrentPage(1); // reset to page 1 on filter change
  };

  const getBorderColor = (air: number) => {
    if (air === 1) return "border-amber-400 ring-4 ring-amber-100 shadow-amber-200/50"; // Gold
    if (air <= 3) return "border-amber-400 ring-4 ring-amber-100 shadow-amber-200/50"; // Gold
    if (air <= 10) return "border-slate-350 ring-4 ring-slate-100 shadow-slate-200/50"; // Silver
    if (air <= 20) return "border-amber-700 ring-4 ring-amber-55/40 shadow-amber-700/20"; // Bronze
    return "border-orange-500 ring-4 ring-orange-50 shadow-orange-200/50"; // Standard Orange
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16 space-y-20">
      
      {/* Title */}
      <div className="text-center">
        <h1 className="text-5xl font-black text-[#0f172a] mb-4">Our <span className="text-orange-600">Toppers</span></h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Meet the exceptional students who turned their determination and hard work into historic ranks.</p>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 bg-slate-900 text-white rounded-[3rem] p-10 shadow-xl border border-slate-800">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center space-y-2 border-r border-slate-800 last:border-none px-4">
            <div className="text-4xl lg:text-5xl font-black text-orange-500">{stat.value}</div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-[200px] mx-auto">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Year-wise Selector Tabs */}
      <div className="flex justify-center gap-4 border-b border-slate-200 pb-4">
        {[2025, 2024, 2023].map(year => (
          <button
            key={year}
            onClick={() => handleYearChange(year)}
            className={`px-8 py-3 rounded-full font-black text-sm transition-all duration-200 ${selectedYear === year ? 'bg-orange-600 text-white shadow-md' : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'}`}
          >
            NEET / JEE {year}
          </button>
        ))}
      </div>
      
      {/* Grid of toppers with testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentToppers.map((topper, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-6 text-center border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all flex flex-col justify-between group">
            <div>
              <div className="relative w-28 h-28 mx-auto mb-6">
                <img 
                  src={topper.image} 
                  alt={topper.name} 
                  className={`w-full h-full rounded-full object-cover border-4 transition-all duration-300 ${getBorderColor(topper.air)}`} 
                />
                <span className="absolute -bottom-2 -right-2 bg-orange-655 bg-orange-600 text-white font-black text-xs w-9 h-9 rounded-full flex items-center justify-center border-2 border-white shadow">
                  AIR {topper.air}
                </span>
              </div>
              <div className="text-orange-600 font-black text-xl mb-1">AIR {topper.air}</div>
              <h3 className="font-bold text-lg text-[#0f172a] mb-1">{topper.name}</h3>
              <div className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full inline-block mb-4">
                {topper.score}
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed italic mb-6">
                &ldquo;{topper.quote}&rdquo;
              </p>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 border-t border-slate-150 pt-4 mt-auto">
              {topper.type}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${currentPage === index + 1 ? 'bg-orange-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </div>
      )}

      {/* Inspirational call-to-action */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-[3rem] p-12 text-white text-center space-y-6 shadow-lg max-w-4xl mx-auto">
        <h2 className="text-3xl font-black">You Could Be The Next Topper!</h2>
        <p className="text-sm text-orange-55 text-orange-50 max-w-xl mx-auto leading-relaxed">Join EduMiracle today to gain access to our custom mock platforms, expert mentor guides, and immediate doubts solvers.</p>
        <Link href="/contact" className="inline-block bg-white text-orange-600 font-extrabold px-8 py-3.5 rounded-xl shadow hover:bg-orange-50 transition-colors">
          Start Your Preparation
        </Link>
      </div>

    </div>
  );
}
