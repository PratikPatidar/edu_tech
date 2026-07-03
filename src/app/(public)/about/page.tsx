export default function AboutPage() {
  const values = [
    {
      icon: "🎯",
      title: "Student-First Mentorship",
      desc: "Our educators are mentors first. We focus on individual learning curves and provide personalized attention to unlock every student's full potential."
    },
    {
      icon: "📚",
      title: "Kota Pedagogy",
      desc: "We bring the world-renowned Kota teaching methodology, rigorous curriculum planning, and daily practice problems (DPPs) straight to your screen."
    },
    {
      icon: "💻",
      title: "AI-Powered Analytics",
      desc: "Integrating state-of-the-art AI doubts resolution and test performance analytics to pinpoint weaknesses and accelerate learning paths."
    },
    {
      icon: "🏆",
      title: "Consistent Excellence",
      desc: "A proven track record of securing top ranks in national-level competitive exams (NEET, JEE) year after year with high-success ratios."
    }
  ];

  const milestones = [
    { year: "2017", title: "Founding Year", desc: "Started with a single coaching center in Indore with just 50 students." },
    { year: "2019", title: "Regional Expansion", desc: "Opened 10+ smart learning campuses across Central India with over 2,000 enrolled pupils." },
    { year: "2021", title: "Digital Transformation", desc: "Launched our proprietary online testing engine, mimicking NTA CBT environment." },
    { year: "2024", title: "AI-Doubts Launch", desc: "Integrated real-time AI Academic Mentor for 24/7 doubt resolution." },
    { year: "2026", title: "National Network", desc: "Serving over 50,000+ active classroom and digital learning students across India." }
  ];

  const facultyList = [
    {
      name: "Dr. Alok Patidar",
      subject: "Physics",
      role: "Co-Founder & Academic Director",
      qualification: "B.Tech (IIT Bombay)",
      experience: "15+ Years",
      specialty: "Mechanics & Electrodynamics",
      initials: "AP"
    },
    {
      name: "Prof. H. S. Rawat",
      subject: "Physics",
      role: "Senior Physics Faculty",
      qualification: "B.Tech (IIT Delhi)",
      experience: "14+ Years",
      specialty: "Thermodynamics & Modern Physics",
      initials: "HR"
    },
    {
      name: "Ravi Sir",
      subject: "Physics",
      role: "Associate Physics Mentor",
      qualification: "M.Sc (Physics)",
      experience: "8+ Years",
      specialty: "Optics & Wave Motion",
      initials: "RS"
    },
    {
      name: "Prof. R. C. Vyas",
      subject: "Chemistry",
      role: "Head of Chemistry Dept",
      qualification: "M.Sc (Chemistry), Ex-Kota HOD",
      experience: "20+ Years",
      specialty: "Organic Chemistry",
      initials: "RV"
    },
    {
      name: "Anjali Ma'am",
      subject: "Chemistry",
      role: "Senior Chemistry Specialist",
      qualification: "Ph.D (Organic Chemistry)",
      experience: "10+ Years",
      specialty: "Physical & Inorganic Chemistry",
      initials: "AM"
    },
    {
      name: "Dr. Shweta Sharma",
      subject: "Biology",
      role: "Head of Biology Dept",
      qualification: "MBBS, MD",
      experience: "12+ Years",
      specialty: "Human Physiology & Genetics",
      initials: "SS"
    },
    {
      name: "Dr. Vikas Patel",
      subject: "Biology",
      role: "Senior Botany Mentor",
      qualification: "Ph.D (Botany)",
      experience: "9+ Years",
      specialty: "Plant Physiology & Ecology",
      initials: "VP"
    },
    {
      name: "Vikas Sir",
      subject: "Mathematics",
      role: "Senior Mathematics Coach",
      qualification: "B.Tech (IIT Kharagpur)",
      experience: "11+ Years",
      specialty: "Calculus & Coordinate Geometry",
      initials: "VS"
    },
    {
      name: "Sanjay Mehta",
      subject: "Mathematics",
      role: "JEE Advanced Specialist",
      qualification: "M.Sc (Mathematics)",
      experience: "12+ Years",
      specialty: "Algebra & Vectors",
      initials: "SM"
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16 space-y-20">
      
      {/* Introduction Hero Section */}
      <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl font-black text-[#0f172a] mb-6">
            About <span className="text-orange-600">EduMiracle</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Established in 2017, EduMiracle Institute has emerged as a beacon of academic excellence in the field of medical and engineering entrance preparation. With a clear vision to nurture talent and ignite intellectual brilliance, we have been consistently delivering superb results in NEET and JEE.
          </p>
          <p className="text-lg text-slate-650 leading-relaxed">
            At EduMiracle, we believe that success is no miracle—it is the direct outcome of relentless hard work, smart study strategies, and expert guidance. Our highly experienced faculty members bring deep subject knowledge and a structured approach that empowers students to confidently ace competitive exams.
          </p>
          <div className="flex flex-wrap gap-6 pt-4">
            <div className="bg-orange-50 px-6 py-4 rounded-2xl border border-orange-100 flex-1 min-w-[150px]">
              <div className="text-3xl font-black text-orange-600 mb-1">9+ Years</div>
              <div className="font-bold text-[#0f172a] text-sm">Academic Legacy</div>
            </div>
            <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200 flex-1 min-w-[150px]">
              <div className="text-3xl font-black text-[#0f172a] mb-1">15,000+</div>
              <div className="font-bold text-[#0f172a] text-sm">Successful Selections</div>
            </div>
            <div className="bg-orange-50 px-6 py-4 rounded-2xl border border-orange-100 flex-1 min-w-[150px]">
              <div className="text-3xl font-black text-orange-600 mb-1">150+</div>
              <div className="font-bold text-[#0f172a] text-sm">Expert Mentors</div>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/faculty_ai.jpg" className="w-full h-64 object-cover rounded-3xl" alt="EduMiracle Faculty Classroom" />
            <img src="/images/exam_ai.jpg" className="w-full h-64 object-cover rounded-3xl mt-12" alt="EduMiracle Test Center" />
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-black text-[#0f172a]">Our Core <span className="text-orange-600">Values</span></h2>
          <p className="text-slate-650 mt-2 max-w-xl mx-auto">The principles that guide our day-to-day work, teaching styles, and student interactions.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl mb-6">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">{v.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-12 bg-slate-900 text-white rounded-[3rem] p-12 shadow-xl border border-slate-800">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-white">Our Journey <span className="text-orange-500">&amp; Milestones</span></h2>
          <p className="text-slate-400 text-sm mt-3">From humble beginnings to one of India's most trusted coaching brands.</p>
        </div>
        <div className="grid md:grid-cols-5 gap-8 mt-12">
          {milestones.map((m, i) => (
            <div key={i} className="relative group">
              {i < 4 && (
                <div className="hidden md:block absolute top-7 left-full w-full h-[2px] bg-slate-800 z-0 group-hover:bg-orange-500 transition-colors" />
              )}
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 bg-slate-800 text-orange-500 rounded-2xl flex items-center justify-center font-black text-lg border border-slate-700 shadow-lg">
                  {m.year}
                </div>
                <div>
                  <h4 className="font-bold text-lg text-white mb-1">{m.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{m.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Team Section */}
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-black text-[#0f172a]">Meet Our <span className="text-orange-600">Expert Faculty</span></h2>
          <p className="text-slate-655 mt-2 max-w-xl mx-auto">Highly qualified mentors driving competitive subject mastery for IIT-JEE and NEET programs.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyList.map((fac, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-orange-200 transition-all group">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-black text-xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    {fac.initials}
                  </div>
                  <span className="bg-slate-100 text-slate-700 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full border border-slate-200">
                    {fac.subject}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0f172a] mb-1">{fac.name}</h3>
                <div className="text-orange-655 text-orange-600 text-xs font-semibold uppercase tracking-wider mb-4">
                  {fac.role}
                </div>
                <div className="space-y-2 text-slate-600 text-xs font-medium">
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span>Qualification:</span>
                    <span className="text-[#0f172a] font-bold">{fac.qualification}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-1.5">
                    <span>Experience:</span>
                    <span className="text-[#0f172a] font-bold">{fac.experience}</span>
                  </div>
                  <div className="flex justify-between pb-1.5">
                    <span>Core Specialty:</span>
                    <span className="text-[#0f172a] font-bold text-right max-w-[160px] truncate" title={fac.specialty}>{fac.specialty}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="space-y-12 bg-slate-50 border border-slate-200 rounded-[3rem] p-12 shadow-sm">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-4xl font-black text-[#0f172a]">What Parents <span className="text-orange-600">&amp; Students Say</span></h2>
          <p className="text-slate-600 text-sm mt-3">Read reviews from successful candidates and families who experienced the EduMiracle curriculum.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Mr. Rajesh Singhal",
              sub: "Parent of Divya Singhal (AIR 18 NEET)",
              quote: "The transparency is what we loved about EduMiracle. Their bi-weekly test SMS, personalized doubt clinics, and individual study analysis kept us fully informed. Divya got all the mental strength and training she needed to score 710.",
              rating: "⭐⭐⭐⭐⭐"
            },
            {
              name: "Kabir Mehta",
              sub: "Student (AIR 11 JEE Main 2025)",
              quote: "Having ex-Kota HODs right here in Indore was a game-changer. The physics module sheets and simulated CBT exams made the real exam feel like just another Sunday test. The AI Academic doubt solver solved my doubts at 1 AM.",
              rating: "⭐⭐⭐⭐⭐"
            },
            {
              name: "Mrs. Sunita Roy",
              sub: "Parent of Ananya Roy (AIR 7 NEET 2024)",
              quote: "Moving our daughter from our small town to a hostel was stressful, but EduMiracle's hostel security, round-the-clock wardens, and dedicated study libraries gave us complete peace of mind. Excellent results follow excellent environment.",
              rating: "⭐⭐⭐⭐⭐"
            }
          ].map((testi, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="text-orange-500 mb-4">{testi.rating}</div>
                <p className="text-slate-650 text-sm italic leading-relaxed mb-6">
                  &ldquo;{testi.quote}&rdquo;
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4">
                <div className="font-bold text-[#0f172a] text-sm">{testi.name}</div>
                <div className="text-slate-500 text-xs mt-0.5">{testi.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
