import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-md space-y-6">
        {/* Glow Header */}
        <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-fuchsia-500 leading-none drop-shadow-lg animate-pulse">
          404
        </h1>
        <h2 className="text-2xl font-extrabold text-white">
          Page Not Found
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          The page you are looking for does not exist or has been moved to another coordinate. Let's get you back on track!
        </p>
        <div className="pt-4 flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:scale-[1.02] text-white text-xs font-black px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all"
          >
            Go to Home Page
          </Link>
          <Link
            href="/courses"
            className="border border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-300 text-xs font-bold px-6 py-3.5 rounded-xl transition-all"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
