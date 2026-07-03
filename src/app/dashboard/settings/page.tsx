'use client';

import { User, Lock, Bell, LogOut, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

const TABS = ['Profile', 'Security', 'Notifications'];

interface ProfileData {
  name: string;
  studentId: string;
  email: string;
  phone: string;
  batch: string;
  examTarget: string;
}

export default function StudentSettings() {
  const [tab, setTab] = useState('Profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const router = useRouter();

  // Profile form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    fetch('/api/student/profile')
      .then(r => r.json())
      .then(d => {
        if (d.success && d.profile) {
          setProfile(d.profile);
          setName(d.profile.name || '');
          setEmail(d.profile.email || '');
          setPhone(d.profile.phone || '');
        }
      })
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/student/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Profile updated successfully');
        if (profile) setProfile({ ...profile, name, email, phone });
      } else {
        toast.error(data.error || 'Failed to update profile');
      }
    } catch (e) {
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error('All fields are required');
    }
    if (newPassword !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    setSaving(true);
    try {
      const res = await fetch('/api/student/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Password updated successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(data.error || 'Failed to update password');
      }
    } catch (e) {
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleSignout = async () => {
    toast.loading('Signing out...');
    await fetch('/api/auth/signout', { method: 'POST' });
    toast.dismiss();
    router.push('/login');
    router.refresh();
  };

  if (loading) return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
    </div>
  );

  const initials = profile?.name ? profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'ST';

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-[28px] font-bold text-slate-900 dark:text-white tracking-tight">Settings</h1>
        <p className="text-[15px] text-slate-500 dark:text-slate-400 mt-1">Manage your account and preferences.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl w-fit">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === t ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Profile' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800/50">
              <div className="w-16 h-16 bg-fuchsia-100 dark:bg-fuchsia-900/50 text-fuchsia-700 dark:text-fuchsia-400 rounded-full flex items-center justify-center text-xl font-bold">{initials}</div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{profile?.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Student ID: {profile?.studentId} &bull; {profile?.batch}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:border-fuchsia-500 transition-colors outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Student ID</label>
                <input value={profile?.studentId || ''} disabled className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-500 cursor-not-allowed outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:border-fuchsia-500 transition-colors outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Mobile</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:border-fuchsia-500 transition-colors outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Batch</label>
                <input value={profile?.batch || ''} disabled className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-500 cursor-not-allowed outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Exam Target</label>
                <input value={profile?.examTarget || ''} disabled className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-sm text-slate-500 cursor-not-allowed outline-none" />
              </div>
            </div>
            <button 
              onClick={handleSaveProfile}
              disabled={saving || (!name && !email && !phone)}
              className="mt-6 px-6 py-2.5 bg-fuchsia-700 hover:bg-fuchsia-800 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <Loader2 size={16} className="animate-spin" />} Save Changes
            </button>
          </div>
        </div>
      )}

      {tab === 'Security' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2"><Lock size={18} /> Change Password</h2>
          
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Current Password</label>
            <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-fuchsia-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">New Password</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-fuchsia-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">Confirm New Password</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-fuchsia-500 transition-colors" />
          </div>
          
          <button 
            onClick={handleChangePassword}
            disabled={saving || !currentPassword || !newPassword || !confirmPassword}
            className="px-6 py-2.5 bg-fuchsia-700 hover:bg-fuchsia-800 text-white rounded-xl font-semibold text-sm transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
          >
            {saving && <Loader2 size={16} className="animate-spin" />} Update Password
          </button>
          
          <div className="pt-5 border-t border-slate-100 dark:border-slate-800/50">
            <button onClick={handleSignout} className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 font-semibold hover:underline">
              <LogOut size={16} /> Sign out of all devices
            </button>
          </div>
        </div>
      )}

      {tab === 'Notifications' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-5"><Bell size={18} /> Notification Preferences</h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {[
              { label: 'New Test Available', desc: 'When a new mock test is added by the admin', on: true },
              { label: 'Attendance Alert', desc: 'When your attendance drops below 75%', on: true },
              { label: 'Fee Reminder', desc: 'Reminders before due date', on: true },
              { label: 'Holiday Announcements', desc: 'When the institute announces a holiday', on: false },
              { label: 'AI Doubt Replies', desc: 'Email summary of your AI doubt sessions', on: false },
            ].map(({ label, desc, on }) => (
              <div key={label} className="flex items-center justify-between py-4">
                <div>
                  <div className="font-semibold text-sm text-slate-900 dark:text-white">{label}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</div>
                </div>
                <button className={`w-11 h-6 rounded-full transition-colors relative ${on ? 'bg-fuchsia-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${on ? 'left-5' : 'left-0.5'}`}></span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
