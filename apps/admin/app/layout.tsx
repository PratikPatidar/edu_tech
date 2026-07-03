"use client";

import { useState } from 'react';
import styles from './AdminLayout.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Scan, 
  BookOpen, 
  IndianRupee, 
  Menu,
  Grid,
  Moon,
  Bell,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/students', label: 'Student Manager', icon: Users },
  { href: '/tests', label: 'Online Test Creator', icon: FileText },
  { href: '/omr', label: 'Offline OMR Scanner', icon: Scan },
  { href: '/materials', label: 'Study Materials', icon: BookOpen },
  { href: '/attendance', label: 'Attendance & Fees', icon: IndianRupee },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const currentTabName = navItems.find(item => item.href === pathname)?.label || 'Dashboard';

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.brandContainer}>
            <div className={styles.brandIcon}>EM</div>
            {!isCollapsed && (
              <div className={styles.brandText}>
                <span className={styles.brandTitle}>EduMiracle</span>
                <span className={styles.brandSubtitle}>Admin Panel</span>
              </div>
            )}
          </div>
        </div>
        
        {!isCollapsed && <div className={styles.menuLabel}>MAIN MENU</div>}
        
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon size={20} className={styles.icon} />
                {!isCollapsed && (
                  <>
                    <span className={styles.linkLabel}>{item.label}</span>
                    <ChevronRight size={16} className={styles.chevron} />
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile at Bottom */}
        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>PP</div>
          {!isCollapsed && (
            <div className={styles.userInfo}>
              <span className={styles.userName}>Pratik Patidar</span>
              <span className={styles.userRole}>admin@edumiracle.com</span>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainWrapper}>
        {/* Top Navbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button 
              className={styles.toggleBtn} 
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <Menu size={20} />
            </button>
            <h1 className={styles.pageTitle}>{currentTabName}</h1>
          </div>
          <div className={styles.topbarRight}>
            <button className={styles.iconBtn}><Grid size={20} /></button>
            <button className={styles.iconBtn}><Moon size={20} /></button>
            <button className={styles.iconBtn}><Bell size={20} /></button>
            <button className={styles.iconBtn}><Sparkles size={20} className={styles.sparkleIcon} /></button>
            <div className={styles.topbarUser}>
              <div className={styles.userAvatarSmall}>PP</div>
              <div className={styles.userInfoTop}>
                <span className={styles.userNameTop}>Pratik Patidar</span>
                <span className={styles.userRoleTop}>Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
