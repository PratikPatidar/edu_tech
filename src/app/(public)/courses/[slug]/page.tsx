import Link from 'next/link';

interface Faculty {
  name: string;
  role: string;
  qualification: string;
  initials: string;
}

interface CourseDetail {
  title: string;
  batchName: string;
  icon: string;
  duration: string;
  description: string;
  details: string[];
  fees: string;
  syllabus: string[];
  schedule: string;
  startDate: string;
  materials: string;
  assignedFaculty: Faculty[];
}

const courseDetails: Record<string, CourseDetail> = {
  nurture: {
    title: "Class 11 + NEET / JEE",
    batchName: "Nurture Batch",
    icon: "🌱",
    duration: "2 Year Program",
    description: "Our flagship program designed for Class 11 students to build strong concepts in Physics, Chemistry, Biology, and Mathematics. This batch prepares students for both school board exams and national level competitive examinations like NEET & JEE.",
    details: [
      "850+ Hours of Interactive classroom lectures",
      "Comprehensive printed study modules and daily practice problems (DPPs)",
      "Bi-weekly tests & All India Test Series (AITS)",
      "Regular parent-teacher meetings and detailed student progress analytics"
    ],
    fees: "₹ 1,20,000 / Year",
    schedule: "Monday to Saturday (4 Hours Daily, 3:30 PM - 7:30 PM)",
    startDate: "April 15, 2026 & May 10, 2026",
    materials: "EduMiracle Nurture Theory Modules (18 Books) + Daily DPP Notebooks",
    syllabus: [
      "Physics: Mechanics, Waves, Gravitation, Thermodynamics",
      "Chemistry: Physical Chemistry, Inorganic Trends, Organic Fundamentals",
      "Biology: Plant Diversity, Cell Biology, Human Physiology",
      "Mathematics: Calculus basics, Algebra, Coordinate Geometry"
    ],
    assignedFaculty: [
      { name: "Dr. Alok Patidar", role: "Physics HOD", qualification: "B.Tech (IIT Bombay)", initials: "AP" },
      { name: "Dr. Shweta Sharma", role: "Biology HOD", qualification: "MBBS, MD", initials: "SS" },
      { name: "Prof. R. C. Vyas", role: "Chemistry HOD", qualification: "Ex-Kota Chemistry HOD", initials: "RV" }
    ]
  },
  target: {
    title: "Class 12 + NEET / JEE",
    batchName: "Target Batch",
    icon: "🚀",
    duration: "1 Year Program",
    description: "Designed for Class 12 students to complete their core syllabus and simultaneously revise Class 11 chapters. It features intensive problem solving and simulated CBT examinations.",
    details: [
      "750+ Hours of lectures with integrated board preparation",
      "Unlimited practice on our simulated computer-based test (CBT) platform",
      "Specialized doubt clinics and daily revision worksheets",
      "Dedicated focus on speed, accuracy, and error correction"
    ],
    fees: "₹ 1,35,000 / Year",
    schedule: "Monday to Saturday (4.5 Hours Daily, 2:00 PM - 6:30 PM)",
    startDate: "April 1, 2026 & May 1, 2026",
    materials: "EduMiracle Target Theory & Review Modules (24 Books) + NTA CBT Login",
    syllabus: [
      "Physics: Electrostatics, Magnetism, Optics, Modern Physics",
      "Chemistry: Solution kinetics, Coordination compounds, Carbonyl reactions",
      "Biology: Reproduction, Genetics, Biotech, Ecology",
      "Mathematics: Differential Equations, Vectors, 3D Geometry"
    ],
    assignedFaculty: [
      { name: "Prof. H. S. Rawat", role: "Senior Physics Faculty", qualification: "B.Tech (IIT Delhi)", initials: "HR" },
      { name: "Anjali Ma'am", role: "Senior Chemistry Mentor", qualification: "Ph.D (Organic Chemistry)", initials: "AM" },
      { name: "Dr. Vikas Patel", role: "Senior Botany Faculty", qualification: "Ph.D (Botany)", initials: "VP" }
    ]
  },
  achiever: {
    title: "Dropper / Repeater Batch",
    batchName: "Achiever Batch",
    icon: "⭐",
    duration: "1 Year Program",
    description: "A highly focused, fast-paced program designed exclusively for repeaters. We eliminate conceptual gaps and focus heavily on advanced problem-solving techniques and rank improvement.",
    details: [
      "900+ Hours of intensive syllabus coverage and advanced exercises",
      "Customized weaknesses-based practice modules",
      "Priority doubt solving desks and 24/7 AI-Backed doubts support",
      "Weekly simulated NTA mock tests with national-level ranking analytics"
    ],
    fees: "₹ 1,15,000 / Year",
    schedule: "Monday to Saturday (5 Hours Daily, 8:00 AM - 1:00 PM)",
    startDate: "June 1, 2026 & July 15, 2026",
    materials: "Achiever Worksheets + Past 15 Years solved paper bank + AI-Doubts portal",
    syllabus: [
      "Full Combined Syllabus of Class 11 and Class 12",
      "High-Weightage Chapter Drills",
      "Advanced test-taking strategy analysis"
    ],
    assignedFaculty: [
      { name: "Ravi Sir", role: "Physics Mentor", qualification: "M.Sc (Physics)", initials: "RS" },
      { name: "Prof. R. C. Vyas", role: "Chemistry HOD", qualification: "Ex-Kota Chemistry HOD", initials: "RV" },
      { name: "Vikas Sir", role: "Senior Math Coach", qualification: "B.Tech (IIT Kharagpur)", initials: "VS" }
    ]
  },
  booster: {
    title: "Rank Booster Crash Course",
    batchName: "Booster Batch",
    icon: "⚡",
    duration: "3 Months Program",
    description: "A high-speed revision program conducted close to the final exam dates. Highlights crucial chapters, high-scoring questions, and extensive mock test practice.",
    details: [
      "320+ Hours of high-yield lectures and problem workshops",
      "20 Full-syllabus CBT mock tests with detailed performance reports",
      "Handcrafted formula books and shortcut summaries for physics and math"
    ],
    fees: "₹ 35,000 (Complete Course)",
    schedule: "Monday to Sunday (6 Hours Daily, 9:00 AM - 3:00 PM)",
    startDate: "January 10, 2027",
    materials: "Rankers Formula Booklet + Quick-Revision Map PDFs + CBT Mock Pass",
    syllabus: [
      "High-Weightage Core Topics only",
      "Previous Year Question (PYQ) dissection",
      "Formula and concept revision maps"
    ],
    assignedFaculty: [
      { name: "Vikas Sir", role: "Senior Math Coach", qualification: "B.Tech (IIT Kharagpur)", initials: "VS" },
      { name: "Dr. Alok Patidar", role: "Physics HOD", qualification: "B.Tech (IIT Bombay)", initials: "AP" },
      { name: "Anjali Ma'am", role: "Senior Chemistry Mentor", qualification: "Ph.D (Organic Chemistry)", initials: "AM" }
    ]
  },
  dlp: {
    title: "Distance Learning & Test Series",
    batchName: "DLP Program",
    icon: "📦",
    duration: "Self-Paced Program",
    description: "Study from the comfort of your home with our premium printed study books, detailed question booklets, and the national-level All India Test Series (AITS).",
    details: [
      "24 Complete Study Modules dispatched to your home address",
      "OMR sheets and answer key booklets for practice tests",
      "Access to student dashboard for digital performance reporting"
    ],
    fees: "₹ 15,000 (Complete Package)",
    schedule: "Flexible / Self-Paced (Weekly test schedule online)",
    startDate: "Open Admissions (Anytime enrollment)",
    materials: "Full 24-Module theory kit + Printed mock series dispatched to home",
    syllabus: [
      "Complete NCERT + competitive syllabus printed modules",
      "Full syllabus & unit-wise mock test booklets"
    ],
    assignedFaculty: [
      { name: "Dr. Alok Patidar", role: "Physics HOD", qualification: "B.Tech (IIT Bombay)", initials: "AP" },
      { name: "Prof. R. C. Vyas", role: "Chemistry HOD", qualification: "Ex-Kota Chemistry HOD", initials: "RV" },
      { name: "Dr. Shweta Sharma", role: "Biology HOD", qualification: "MBBS, MD", initials: "SS" }
    ]
  }
};

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courseDetails[slug];

  if (!course) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-32 text-center space-y-6">
        <h1 className="text-4xl font-black text-slate-900">Course Not Found</h1>
        <p className="text-slate-655 max-w-md mx-auto">We couldn't find the course program you were looking for. Please check the URL or return to the main courses list.</p>
        <Link href="/courses" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow">
          Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-16 space-y-12">
      <Link href="/courses" className="text-sm font-bold text-orange-600 hover:underline flex items-center gap-1.5">
        ← Back to All Courses
      </Link>

      {/* Hero Card */}
      <div className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <span className="bg-orange-50 text-orange-700 font-extrabold text-xs uppercase px-3 py-1 rounded-full border border-orange-100">
            {course.duration}
          </span>
          <h1 className="text-4xl font-black text-slate-900 leading-tight">
            {course.title} <span className="text-orange-600">({course.batchName})</span>
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            {course.description}
          </p>
          <div className="text-2xl font-black text-slate-900">
            Course Fee: <span className="text-orange-600">{course.fees}</span>
          </div>
          <Link href="/contact" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3.5 rounded-xl shadow transition-all">
            Apply & Enroll Now
          </Link>
        </div>
        <div className="w-40 h-40 bg-orange-50 rounded-[2rem] flex items-center justify-center text-7xl shrink-0">
          {course.icon}
        </div>
      </div>

      {/* Schedule, Commences, Materials Details Block */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xl font-black text-[#0f172a] border-b border-slate-100 pb-3">Program Schedule & Logistics</h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Weekly Schedule</div>
            <p className="text-slate-800 font-bold mt-1">{course.schedule}</p>
          </div>
          <div>
            <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Commencement Dates</div>
            <p className="text-slate-800 font-bold mt-1">{course.startDate}</p>
          </div>
          <div>
            <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Course Materials</div>
            <p className="text-slate-800 font-bold mt-1">{course.materials}</p>
          </div>
        </div>
      </div>

      {/* Course Features */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-[#0f172a]">What is Included in the Program</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {course.details.map((detail, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4 items-start">
              <span className="text-orange-600 text-lg">✓</span>
              <p className="text-slate-655 text-sm leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Assigned Faculty Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-[#0f172a]">Assigned Faculty Experts</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {course.assignedFaculty.map((fac, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-orange-200 transition-colors">
              <div className="w-12 h-12 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-black text-sm shrink-0">
                {fac.initials}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{fac.name}</h4>
                <p className="text-orange-600 text-[10px] font-bold uppercase tracking-wider">{fac.role}</p>
                <p className="text-slate-400 text-[10px] mt-0.5">{fac.qualification}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Syllabus / Study Path */}
      <div className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-xl border border-slate-800 space-y-6">
        <h2 className="text-2xl font-black text-white">Academic Study Path</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {course.syllabus.map((topic, i) => (
            <div key={i} className="flex gap-3 items-center">
              <span className="w-6 h-6 bg-slate-800 text-orange-500 rounded-lg flex items-center justify-center text-xs font-black shrink-0">
                {i + 1}
              </span>
              <span className="text-slate-300 text-sm">{topic}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
