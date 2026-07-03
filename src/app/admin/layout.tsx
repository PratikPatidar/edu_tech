'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { toast } from 'react-hot-toast';
import { 
  Home, CheckSquare, Bell, FileText, Calendar, 
  Receipt, Wallet, ChevronDown, ChevronRight,
  LayoutGrid, Moon, Sparkles, Sidebar, LogOut, Settings, IndianRupee
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  // Dummy auth state as requested by user
  const isAdmin = true; 

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signout', { method: 'POST' });
      if (res.ok) {
        toast.success('Signed out successfully');
        window.location.href = '/login';
      } else {
        toast.error('Failed to sign out');
      }
    } catch (err) {
      console.error(err);
      toast.error('Sign out error');
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navLinks = [
    { name: 'Dashboard', path: '/admin', icon: <Home size={16} />, show: true },
    { name: 'Students', path: '/admin/students', icon: <CheckSquare size={16} />, show: true },
    { name: 'Tests & Exams', path: '/admin/tests', icon: <FileText size={16} />, show: true },
    { name: 'Attendance', path: '/admin/attendance', icon: <Calendar size={16} />, hasSubmenu: true, show: true },
    { name: 'Payroll & Salary', path: '/admin/payroll', icon: <IndianRupee size={16} />, show: isAdmin },
    { name: 'OMR Scanner', path: '/admin/omr', icon: <Receipt size={16} />, show: true },
    { name: 'Materials', path: '/admin/materials', icon: <Wallet size={16} />, hasSubmenu: true, show: true },
  ];

  return (
    <div className="h-screen overflow-hidden flex bg-[#f8fafc] dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200">
      
      {/* Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 ease-in-out bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col z-20 shrink-0`}>
        <div className="h-16 px-6 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/50 overflow-hidden shrink-0">
          <div className="w-8 h-8 bg-fuchsia-700 rounded-full flex items-center justify-center text-white font-semibold text-xs shrink-0">
            EM
          </div>
          {!isSidebarCollapsed && (
            <div className="whitespace-nowrap">
              <div className="font-semibold text-sm leading-tight text-slate-900 dark:text-white">EduMiracle Portal</div>
              <div className="text-[12px] text-slate-500 dark:text-slate-400">Institute Management</div>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 flex flex-col overflow-hidden">
          {!isSidebarCollapsed && (
            <div className="px-5 mb-2 whitespace-nowrap">
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 tracking-wider uppercase">Main Menu</span>
            </div>
          )}
          
          <nav className="flex-1 space-y-1 mt-2">
            {navLinks.filter(link => link.show).map((link, idx) => {
              const isActive = pathname === link.path;
              return (
                <Tippy 
                  key={idx} 
                  content={link.name} 
                  placement="right" 
                  animation="shift-away" 
                  disabled={!isSidebarCollapsed}
                >
                  <Link 
                    href={link.path} 
                    className={`flex items-center transition-colors ${
                      isSidebarCollapsed 
                        ? `justify-center mx-auto py-0.5`
                        : `justify-between px-3 py-0.5 rounded-xl text-[14px] ${isActive ? 'font-medium text-fuchsia-700 dark:text-fuchsia-400 bg-fuchsia-50 dark:bg-fuchsia-900/30' : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'}`
                    }`}
                  >
                    <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-colors ${
                        isActive 
                          ? 'bg-white dark:bg-slate-900 border-fuchsia-200 dark:border-fuchsia-800/50 text-fuchsia-600 dark:text-fuchsia-400 shadow-sm' 
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 group-hover:border-slate-300'
                      }`}>
                        {link.icon}
                      </span>
                      {!isSidebarCollapsed && <span className="whitespace-nowrap">{link.name}</span>}
                    </div>
                    {!isSidebarCollapsed && link.hasSubmenu && <ChevronRight size={14} className="text-slate-400 dark:text-slate-500" />}
                  </Link>
                </Tippy>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile Widget in Sidebar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-xl cursor-pointer transition-colors`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 font-medium text-xs shrink-0">
                PP
              </div>
              {!isSidebarCollapsed && (
                <div className="whitespace-nowrap">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">Master Admin</div>
                  <div className="text-[12px] text-slate-500 dark:text-slate-400">admin@edumiracle.in</div>
                </div>
              )}
            </div>
            {!isSidebarCollapsed && <Settings onClick={() => toast.success('Opening settings...')} size={16} className="text-slate-400 dark:text-slate-500 shrink-0 hover:text-fuchsia-600 dark:text-fuchsia-400" />}
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between shrink-0 transition-all duration-300">
          <div className="flex items-center gap-4 text-[15px] font-medium text-slate-700 dark:text-slate-300">
            <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" title="Toggle Sidebar">
              <Sidebar size={20} className="text-slate-400 dark:text-slate-500" />
            </button>
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <Link href="/admin" className="hover:text-fuchsia-600 dark:text-fuchsia-400 transition-colors">Dashboard</Link>
              {pathname !== '/admin' && (
                <>
                  <ChevronRight size={14} className="text-slate-400 dark:text-slate-500" />
                  <span className="capitalize font-semibold text-slate-900 dark:text-white">
                    {pathname.split('/').pop()}
                  </span>
                </>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-5 relative">
            <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <LayoutGrid onClick={() => toast.success('App Launcher opening...')} size={18} className="cursor-pointer hover:text-fuchsia-600 dark:text-fuchsia-400 transition-colors" />
              <Moon onClick={() => setIsDark(!isDark)} size={18} className="cursor-pointer hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors" />
              <div className="relative cursor-pointer" onClick={() => toast.success('No new notifications')}>
                <Bell size={18} className="hover:text-fuchsia-600 dark:text-fuchsia-400 transition-colors" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </div>
              <Sparkles onClick={() => toast.success('AI Insights Generated!')} size={18} className="cursor-pointer text-fuchsia-500 hover:text-fuchsia-600 dark:text-fuchsia-400 transition-colors" />
            </div>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>
            <div className="relative" ref={profileRef}>
              <div 
                className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-1.5 rounded-lg transition-colors"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-8 h-8 bg-fuchsia-100 dark:bg-fuchsia-900/50 text-fuchsia-700 dark:text-fuchsia-400 rounded-full flex items-center justify-center font-medium text-sm">
                  PP
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">Master Admin</div>
                  <div className="text-[12px] text-slate-500 dark:text-slate-400 text-right">admin@...</div>
                </div>
                <ChevronDown size={14} className={`text-slate-400 dark:text-slate-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/50 mb-1">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Pratik Patidar</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 truncate">admin@edumiracle.in</div>
                  </div>
                  <Link href="/admin/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-fuchsia-600 dark:text-fuchsia-400 transition-colors">
                    <Settings size={16} /> Account Settings
                  </Link>
                  <button onClick={handleSignOut} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:bg-red-900/30 transition-colors mt-1 border-t border-slate-100 dark:border-slate-800/50 pt-2 cursor-pointer">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-[#f8fafc] dark:bg-slate-950 p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
