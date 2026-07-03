'use client';

import { useState } from 'react';
import { User, Lock, Bell, Shield, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile Settings', icon: <User size={18} /> },
    { id: 'security', name: 'Security', icon: <Lock size={18} /> },
    { id: 'notifications', name: 'Notifications', icon: <Bell size={18} /> },
    { id: 'roles', name: 'Roles & Permissions', icon: <Shield size={18} /> },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-[28px] font-semibold text-slate-900 dark:text-white dark:text-white tracking-tight">Account Settings</h1>
        <p className="text-[15px] text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-1">Manage your administrative profile and portal preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white dark:bg-slate-900 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 dark:border-slate-800 p-2 shadow-sm">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-fuchsia-50 dark:bg-fuchsia-900/30 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-400 dark:text-fuchsia-400' 
                    : 'text-slate-600 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50'
                }`}
              >
                <span className={activeTab === tab.id ? 'text-fuchsia-600 dark:text-fuchsia-400 dark:text-fuchsia-400' : 'text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500'}>
                  {tab.icon}
                </span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-slate-900 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800/50 dark:border-slate-800/50">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white dark:text-white">Personal Information</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">Update your photo and personal details here.</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-fuchsia-100 dark:bg-fuchsia-900/50 dark:bg-fuchsia-900/50 rounded-full flex items-center justify-center text-fuchsia-700 dark:text-fuchsia-400 dark:text-fuchsia-400 font-semibold text-2xl">
                    PP
                  </div>
                  <div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-white dark:bg-slate-900 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 dark:border-slate-800 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 dark:hover:bg-slate-800/50 dark:bg-slate-800/50 transition-colors">Change Photo</button>
                      <button className="px-4 py-2 text-sm font-semibold text-red-600 dark:text-red-400 dark:text-red-400 hover:bg-red-50 dark:bg-red-900/30 dark:bg-red-900/30 rounded-lg transition-colors">Remove</button>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 dark:text-slate-300">First Name</label>
                    <input type="text" defaultValue="Pratik" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 dark:border-slate-800 rounded-xl outline-none focus:border-fuchsia-500 focus:bg-white dark:bg-slate-900 dark:bg-slate-900 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 dark:text-slate-300">Last Name</label>
                    <input type="text" defaultValue="Patidar" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 dark:border-slate-800 rounded-xl outline-none focus:border-fuchsia-500 focus:bg-white dark:bg-slate-900 dark:bg-slate-900 transition-colors" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 dark:text-slate-300">Email Address</label>
                    <input type="email" defaultValue="admin@edumiracle.in" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 dark:border-slate-800 rounded-xl outline-none focus:border-fuchsia-500 focus:bg-white dark:bg-slate-900 dark:bg-slate-900 transition-colors" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 dark:text-slate-300">Job Title</label>
                    <input type="text" defaultValue="Master Admin" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 dark:border-slate-800 rounded-xl outline-none focus:border-fuchsia-500 focus:bg-white dark:bg-slate-900 dark:bg-slate-900 transition-colors" />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 dark:border-slate-800/50 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-800/50 dark:bg-slate-800/50 flex justify-end">
                <button 
                  onClick={() => toast.success('Profile updated successfully')}
                  className="flex items-center gap-2 px-6 py-2.5 bg-fuchsia-600 text-white font-semibold rounded-xl hover:bg-fuchsia-700 transition-colors shadow-lg shadow-fuchsia-500/20"
                >
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab !== 'profile' && (
            <div className="bg-white dark:bg-slate-900 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 dark:border-slate-800 p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">
                <Shield size={24} />
              </div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white dark:text-white mb-2">{tabs.find(t => t.id === activeTab)?.name} Settings</h2>
              <p className="text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500 dark:text-slate-500 dark:text-slate-400 dark:text-slate-500">This module is currently locked by the Super Admin.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
