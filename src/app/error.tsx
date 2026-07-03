'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an analytics or error tracking service
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-red-650 bg-red-600/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 text-center max-w-md space-y-6">
        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
          <AlertCircle size={32} />
        </div>
        <h1 className="text-2xl font-black text-white">
          Something went wrong!
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          An unexpected application crash occurred. Our technical staff has been notified. You can try refreshing the page or navigating back.
        </p>
        <div className="pt-4 flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-black px-6 py-3.5 rounded-xl shadow-lg shadow-red-500/20 transition-all cursor-pointer"
          >
            Try Again ↺
          </button>
          <Link
            href="/"
            className="border border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-300 text-xs font-bold px-6 py-3.5 rounded-xl transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
