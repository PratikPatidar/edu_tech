import Link from 'next/link';

export default function CoursesPage() {
  const comparisonData = [
    { feature: "Class Hours", nurture: "850+ Hours", target: "750+ Hours", achiever: "900+ Hours", booster: "320+ Hours" },
    { feature: "Weekly Tests", nurture: "Part + Cumulative", target: "Full + CBT Mock", achiever: "Rigorous CBT Series", booster: "Full Length Mock" },
    { feature: "Doubt Solving", nurture: "In-class + 24/7 AI", target: "Specialized Clinics + AI", achiever: "Priority Desk + 24/7 AI", booster: "Chat & AI only" },
    { feature: "Study Material", nurture: "Full Kit (Modules + DPP)", target: "Full Kit + Revision Kit", achiever: "Advanced Modules + Rankers", booster: "Formulas + Mock PDF" },
    { feature: "Scholarship Limit", nurture: "Up to 90% (EM-SAT)", nurtureLimit: "90%", target: "Up to 75% (EM-SAT)", achiever: "Up to 90% (Rank-Based)", booster: "Flat 10% Early Bird" }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16 space-y-24">
      
      {/* Header */}
      <div className="text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-4">Our <span className="text-orange-600">Courses</span></h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">Tailored programs for every stage of your NEET/JEE preparation, backed by expert faculty, comprehensive modules, and AI‑driven analytics.</p>
      </div>
      
      {/* Course Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Class 11 */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-xl transition-all relative overflow-hidden group flex flex-col justify-between">
          <div>
            <div className="absolute top-0 right-0 bg-slate-100 text-slate-700 font-bold px-4 py-1.5 rounded-bl-2xl text-xs">2 Year Program</div>
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl mb-6 text-orange-500">🌱</div>
            <h3 className="text-2xl font-black text-[#0f172a] mb-2">Class 11 + NEET / JEE</h3>
            <p className="text-orange-600 font-bold mb-4">Nurture Batch</p>
            <p className="text-slate-650 text-sm mb-6">Build a rock-solid foundation for competitive exams from the ground up while excelling in your school boards.</p>
            <div className="h-px bg-slate-100 my-4" />
            <ul className="space-y-3 mb-8 text-sm font-medium text-slate-700">
              <li className="flex items-center gap-2.5">✓ Complete NCERT + Advanced Concepts</li>
              <li className="flex items-center gap-2.5">✓ Daily Practice Problems (DPPs) & Answer keys</li>
              <li className="flex items-center gap-2.5">✓ Mentorship & Counseling Seminars</li>
              <li className="flex items-center gap-2.5">✓ Bi-weekly Offline and CBT Mock Tests</li>
              <li className="flex items-center gap-2.5">✓ Comprehensive Study Modules (Set of 18)</li>
            </ul>
          </div>
          <Link href="/courses/nurture" className="block w-full py-3 text-center bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#0f172a] group-hover:bg-orange-600 group-hover:text-white transition-colors">
            Enroll Now
          </Link>
        </div>

        {/* Class 12 */}
        <div className="bg-[#0f172a] rounded-3xl p-8 shadow-xl relative overflow-hidden group transform lg:-translate-y-4 flex flex-col justify-between border-2 border-orange-500/55">
          <div>
            <div className="absolute top-0 right-0 bg-orange-500 text-white font-bold px-4 py-1.5 rounded-bl-2xl text-xs uppercase tracking-wider">Most Popular</div>
            <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-3xl mb-6">🚀</div>
            <h3 className="text-2xl font-black text-white mb-2">Class 12 + NEET / JEE</h3>
            <p className="text-orange-400 font-bold mb-4">Target Batch</p>
            <p className="text-slate-350 text-sm mb-6">Intensive 1-year master program covering the core syllabus along with integrated board examination practice and revisions.</p>
            <div className="h-px bg-slate-800 my-4" />
            <ul className="space-y-3 mb-8 text-sm font-medium text-slate-300">
              <li className="flex items-center gap-2.5">✓ High-speed Class 11 Crash Revision</li>
              <li className="flex items-center gap-2.5">✓ Live Interactive Lectures + Recordings</li>
              <li className="flex items-center gap-2.5">✓ Regular board-style Mock Tests</li>
              <li className="flex items-center gap-2.5">✓ NTA CBT Mock Engine Unlimited Access</li>
              <li className="flex items-center gap-2.5">✓ Direct Interaction Clinics with HODs</li>
            </ul>
          </div>
          <Link href="/courses/target" className="block w-full py-3 text-center bg-orange-600 rounded-xl font-bold text-white hover:bg-orange-500 transition-colors">
            Enroll Now
          </Link>
        </div>

        {/* Droppers */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-xl transition-all relative overflow-hidden group flex flex-col justify-between">
          <div>
            <div className="absolute top-0 right-0 bg-slate-100 text-slate-700 font-bold px-4 py-1.5 rounded-bl-2xl text-xs">1 Year Program</div>
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-3xl mb-6">⭐</div>
            <h3 className="text-2xl font-black text-[#0f172a] mb-2">Dropper / Repeater</h3>
            <p className="text-orange-600 font-bold mb-4">Achiever Batch</p>
            <p className="text-slate-650 text-sm mb-6">Designed strictly for repeaters looking to sharpen problem-solving speeds, eliminate conceptual mistakes, and maximize rank.</p>
            <div className="h-px bg-slate-100 my-4" />
            <ul className="space-y-3 mb-8 text-sm font-medium text-slate-700">
              <li className="flex items-center gap-2.5">✓ Full Focus on Advanced Problems</li>
              <li className="flex items-center gap-2.5">✓ Ex-Kota Expert Mentorship</li>
              <li className="flex items-center gap-2.5">✓ 24/7 AI-Backed doubts support</li>
              <li className="flex items-center gap-2.5">✓ National Level Rank Predictor Tests</li>
              <li className="flex items-center gap-2.5">✓ Customized Worksheets based on weak topics</li>
            </ul>
          </div>
          <Link href="/courses/achiever" className="block w-full py-3 text-center bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#0f172a] group-hover:bg-orange-600 group-hover:text-white transition-colors">
            Enroll Now
          </Link>
        </div>
      </div>

      {/* Additional Short-Term Programs */}
      <div className="space-y-12 bg-slate-55 bg-gradient-to-tr from-slate-50 to-orange-50/20 rounded-[3rem] p-12 border border-slate-200">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-4xl font-black text-[#0f172a]">Short-Term <span className="text-orange-600">&amp; Distance Programs</span></h2>
          <p className="text-slate-600 text-sm mt-3">Flexible coaching options for self-paced learners or students preparing close to exam dates.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-[#0f172a]">Rank Booster Crash Course</h3>
              <span className="bg-amber-150 text-orange-700 border border-orange-200 font-bold text-[10px] uppercase px-3 py-1 rounded-full">3 Months</span>
            </div>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">Fast-paced course highlighting high-weightage topics, fast-track question tips, and full-length exam series in the final weeks.</p>
            <ul className="space-y-2.5 text-slate-700 text-xs font-semibold mb-6">
              <li>⚡ 150+ hours of lecture videos</li>
              <li>⚡ 20 Full-syllabus mock examinations</li>
              <li>⚡ Handcrafted formula sheets & summary charts</li>
            </ul>
            <Link href="/courses/booster" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors">
              Join Crash Course
            </Link>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-[#0f172a]">Distance Learning & Test Series</h3>
              <span className="bg-slate-100 text-slate-700 border border-slate-200 font-bold text-[10px] uppercase px-3 py-1 rounded-full">Self-Paced</span>
            </div>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">Get our premium printed study books, daily practice booklets, and All India Test Series (AITS) dispatched straight to your home.</p>
            <ul className="space-y-2.5 text-slate-700 text-xs font-semibold mb-6">
              <li>📦 24 Study Modules (Theory + Exercises)</li>
              <li>📦 OMR sheets & detail solutions booklet</li>
              <li>📦 Student dashboard access for performance graph</li>
            </ul>
            <Link href="/courses/dlp" className="inline-block bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors">
              Subscribe Now
            </Link>
          </div>
        </div>
      </div>

      {/* Program Matrix / Comparison Table */}
      <div className="space-y-10">
        <div className="text-center">
          <h2 className="text-4xl font-black text-[#0f172a]">Program <span className="text-orange-600">Comparison Matrix</span></h2>
          <p className="text-slate-600 mt-2 max-w-xl mx-auto">Compare the structural features of each course program to choose the perfect fit.</p>
        </div>
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-850">
                <th className="p-6 font-bold text-sm uppercase">Features / Benefits</th>
                <th className="p-6 font-bold text-sm uppercase text-orange-600">Nurture (Class 11)</th>
                <th className="p-6 font-bold text-sm uppercase text-fuchsia-600">Target (Class 12)</th>
                <th className="p-6 font-bold text-sm uppercase text-blue-600">Achiever (Droppers)</th>
                <th className="p-6 font-bold text-sm uppercase text-slate-600">Rank Booster</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {comparisonData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 font-bold text-[#0f172a]">{row.feature}</td>
                  <td className="p-6 text-slate-600">{row.nurture}</td>
                  <td className="p-6 text-slate-600">{row.target}</td>
                  <td className="p-6 text-slate-600">{row.achiever}</td>
                  <td className="p-6 text-slate-600">{row.booster}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
