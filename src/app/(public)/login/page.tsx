'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast, Toaster } from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrId, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      if (data.role === 'admin' || data.role === 'educator') {
        toast.success('Welcome Admin! Redirecting...');
        setTimeout(() => {
          window.location.href = '/admin';
        }, 800);
      } else {
        toast.success('Welcome Student! Redirecting...');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 800);
      }

    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50/50 py-10 px-6">
      <Toaster position="top-center" />
      
      <div className="w-full max-w-[420px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-10 md:p-12">
        
        <div className="text-center mb-10">
          <img src="/images/logo.png" alt="EduMiracle Logo" className="h-auto w-56 mx-auto mb-6 object-contain" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Sign in to EduMiracle</h1>
          <p className="text-sm text-slate-500">Enter your Student ID or Email to continue</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Student ID or Email</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-slate-900"
              placeholder="e.g. STU20261234"
              value={emailOrId}
              onChange={(e) => setEmailOrId(e.target.value)}
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-semibold text-slate-700">Password</label>
              <button
                type="button"
                onClick={() => toast.error('Please contact the administration office to reset your password.')}
                className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors focus:outline-none"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all text-slate-900"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition-all shadow-md shadow-orange-500/20 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            Don't have an account? <Link href="/contact" className="font-semibold text-slate-900 hover:text-orange-600 transition-colors">Contact Admissions</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
