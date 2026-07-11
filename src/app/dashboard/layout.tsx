'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { toast, Toaster } from 'react-hot-toast';
import {
  Home, FileText, Calendar, Wallet, BookOpen, MessageSquare, TrendingUp,
  ChevronDown, ChevronRight, Moon, Sparkles, Sidebar, LogOut, Settings, Bell,
  AlertCircle, CreditCard, CheckCircle, Clock, X, Menu,
} from 'lucide-react';

const NOTIFICATIONS = [
  { id: 1, icon: <FileText size={14} />, iconCls: 'bg-fuchsia-100 dark:bg-fuchsia-900/40 text-fuchsia-600 dark:text-fuchsia-400', title: 'New Mock Test Available', desc: 'NEET Full Syllabus Mock #2 is live. Ends in 3 days.', time: '2 hrs ago', read: false },
  { id: 2, icon: <CreditCard size={14} />, iconCls: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400', title: 'Fee Due Reminder', desc: '₹40,000 is due on Nov 30, 2024. Please pay on time.', time: '1 day ago', read: false },
  { id: 3, icon: <AlertCircle size={14} />, iconCls: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400', title: 'Attendance Alert', desc: 'Your attendance this week is 68%. Attend all classes.', time: '2 days ago', read: false },
  { id: 4, icon: <Clock size={14} />, iconCls: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400', title: 'Holiday Announced', desc: 'Diwali break: Oct 24 – Oct 30. Classes resume Oct 31.', time: '3 days ago', read: true },
  { id: 5, icon: <CheckCircle size={14} />, iconCls: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400', title: 'Result Published', desc: 'AITS Minor Test #3 result is now available. Score: 612.', time: '5 days ago', read: true },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/auth/signout', { method: 'POST' });
      if (res.ok) {
        router.push('/login');
        router.refresh();
      } else {
        toast.error('Failed to sign out');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred during sign out');
    }
  };
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const [isDark, setIsDark] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifs.filter(n => !n.read).length;

  // Close drawers on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dark mode: restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('edumiracle-dark');
    if (saved === 'true') setIsDark(true);
  }, []);

  // Dark mode toggle + persist
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('edumiracle-dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('edumiracle-dark', 'false');
    }
  }, [isDark]);

  // Close mobile drawer on route change
  useEffect(() => { setIsMobileDrawerOpen(false); }, [pathname]);

  const navLinks = [
    { name: 'Dashboard',   path: '/dashboard',             icon: <Home size={18} /> },
    { name: 'Performance', path: '/dashboard/performance', icon: <TrendingUp size={18} /> },
    { name: 'Mock Tests',  path: '/dashboard/tests',       icon: <FileText size={18} /> },
    { name: 'Materials',   path: '/dashboard/materials',   icon: <BookOpen size={18} /> },
    { name: 'Attendance',  path: '/dashboard/attendance',  icon: <Calendar size={18} /> },
    { name: 'Fee Details', path: '/dashboard/fees',        icon: <Wallet size={18} /> },
    { name: 'AI Doubts',   path: '/dashboard/doubts',      icon: <MessageSquare size={18} /> },
  ];

  /* --- Sidebar nav item --------------------------------------------------- */
  const NavItem = ({ link }: { link: typeof navLinks[0] }) => {
    const isActive = pathname === link.path;
    return (
      <div className="relative group block">
        <Link
          href={link.path}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
            isSidebarCollapsed ? 'justify-center' : ''
          } ${
            isActive
              ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span className={`shrink-0 flex items-center justify-center transition-all ${
            isActive
              ? 'text-indigo-600 dark:text-indigo-400 drop-shadow-sm'
              : 'text-slate-500 dark:text-slate-500'
          }`}>
            {link.icon}
          </span>
          {!isSidebarCollapsed && <span className="whitespace-nowrap">{link.name}</span>}
        </Link>
        {isSidebarCollapsed && (
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-xl z-50 whitespace-nowrap">
            {link.name}
            <div className="absolute top-1/2 right-full -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-slate-900 dark:border-r-slate-800" />
          </div>
        )}
      </div>
    );
  };

  /* --- Sidebar content (shared between desktop & mobile drawer) ----------- */
  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={`h-16 px-4 flex items-center gap-3 shrink-0 mb-4 ${mobile ? 'justify-between' : ''}`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl shadow-md flex items-center justify-center text-white font-bold text-xs shrink-0">
            EM
          </div>
          {(!isSidebarCollapsed || mobile) && (
            <div className="whitespace-nowrap">
              <div className="font-semibold text-sm leading-tight text-slate-900 dark:text-white">Student Portal</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">EduMiracle NEET</div>
            </div>
          )}
        </div>
        {mobile && (
          <button onClick={() => setIsMobileDrawerOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <div className="flex-1 px-3">
        {(!isSidebarCollapsed || mobile) && (
          <div className="px-3 mb-3">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase">My Learning</span>
          </div>
        )}
        <nav className="space-y-1">
          {navLinks.map(link => (
            <NavItem key={link.path} link={link} />
          ))}
        </nav>
      </div>

      {/* Bottom profile */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 shrink-0">
        <div className={`flex items-center ${(isSidebarCollapsed && !mobile) ? 'justify-center' : 'justify-between'} hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 rounded-xl cursor-pointer transition-colors`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 font-medium text-xs shrink-0">
              ST
            </div>
            {(!isSidebarCollapsed || mobile) && (
              <div className="whitespace-nowrap">
                <div className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">Student Name</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">ID: EM-2024-102</div>
              </div>
            )}
          </div>
          {(!isSidebarCollapsed || mobile) && (
            <Settings
              onClick={() => toast.success('Opening settings...')}
              size={15}
              className="text-slate-400 shrink-0 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen overflow-hidden flex bg-[#f8fafc] dark:bg-slate-950 font-sans text-slate-800 dark:text-slate-200">

      {/* -- Desktop Sidebar ------------------------------------------------ */}
      <aside className={`hidden md:flex flex-col overflow-hidden ${isSidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-20 shrink-0`}>
        <SidebarContent />
      </aside>

      {/* -- Mobile Drawer Overlay ------------------------------------------ */}
      {isMobileDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsMobileDrawerOpen(false)}
        />
      )}

      {/* -- Mobile Drawer -------------------------------------------------- */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 flex flex-col transition-transform duration-300 md:hidden ${isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent mobile />
      </aside>

      {/* -- Main Content --------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0 relative">

        {/* Top Header */}
        <header className="h-14 md:h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
            >
              <Menu size={20} />
            </button>

            {/* Desktop sidebar toggle */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden md:flex p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              title="Toggle Sidebar"
            >
              <Sidebar size={18} className="text-slate-400 dark:text-slate-500" />
            </button>

            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 hidden md:block" />

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400">
              <Link href="/dashboard" className="hover:text-orange-600 transition-colors hidden sm:inline">Dashboard</Link>
              {pathname !== '/dashboard' && (
                <>
                  <ChevronRight size={13} className="text-slate-400 hidden sm:inline" />
                  <span className="capitalize text-slate-900 dark:text-white font-semibold">
                    {pathname.split('/').pop()}
                  </span>
                </>
              )}
              {pathname === '/dashboard' && (
                <span className="text-slate-900 dark:text-white font-semibold sm:hidden">Dashboard</span>
              )}
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              title="Toggle Theme"
            >
              <Moon size={16} />
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative"
                title="Notifications"
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 top-full mt-3 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-2xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">Notifications</div>
                    {unreadCount > 0 && (
                      <button onClick={() => setNotifs(n => n.map(x => ({ ...x, read: true })))} className="text-xs font-semibold text-fuchsia-600 dark:text-fuchsia-400 hover:underline">
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/50">
                    {notifs.map(n => (
                      <div
                        key={n.id}
                        onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                        className={`flex gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${!n.read ? 'bg-fuchsia-50/40 dark:bg-fuchsia-900/10' : ''}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.iconCls}`}>{n.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-semibold text-slate-900 dark:text-white leading-tight ${!n.read ? '' : 'opacity-70'}`}>{n.title}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{n.desc}</div>
                          <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">{n.time}</div>
                        </div>
                        {!n.read && <div className="w-2 h-2 bg-fuchsia-500 rounded-full shrink-0 mt-1.5" />}
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <button onClick={() => toast.success('Opening Notifications Center...')} className="text-xs font-semibold text-slate-500 hover:text-fuchsia-600 w-full text-center transition-colors cursor-pointer">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="w-px h-5 bg-slate-200 dark:bg-slate-700" />

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <div
                className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-1.5 rounded-lg transition-colors"
                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
              >
                <div className="w-8 h-8 bg-fuchsia-100 dark:bg-fuchsia-900/50 text-fuchsia-700 dark:text-fuchsia-400 rounded-full flex items-center justify-center font-semibold text-sm">
                  ST
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">Student</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Batch A1</div>
                </div>
                <ChevronDown size={13} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/50 mb-1">
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Student Name</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">EM-2024-102</div>
                  </div>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-fuchsia-600 transition-colors"
                  >
                    <Settings size={15} /> Account Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-1 border-t border-slate-100 dark:border-slate-800/50"
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto pb-16 md:pb-0">
          {children}
        </main>

        {/* -- Mobile Bottom Navigation ----------------------------------- */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-30 flex items-center justify-around px-2 py-1 safe-area-pb">
          {navLinks.slice(0, 5).map(link => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex flex-col items-center gap-1 px-2 py-2 rounded-xl transition-all min-w-[48px] ${
                  isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <span className={`flex items-center justify-center transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}>
                  {link.icon}
                </span>
                <span className={`text-[10px] font-semibold tracking-tight whitespace-nowrap ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                  {link.name.split(' ')[0]}
                </span>
              </Link>
            );
          })}
          {/* "More" button opens drawer for remaining links */}
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl text-slate-500 min-w-[48px]"
          >
            <span className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500">
              <Menu size={18} />
            </span>
            <span className="text-[9px] font-semibold text-slate-400">More</span>
          </button>
        </nav>
      </div>
      <Toaster position="top-right" toastOptions={{ style: { borderRadius: '12px', fontWeight: 600, fontSize: '13px' } }} />
    </div>
  );
}
