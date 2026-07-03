import styles from './StudentLayout.module.css';
import Link from 'next/link';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>EduMiracle Portal</div>
        <nav className={styles.nav}>
          <Link href="/dashboard" className={styles.navLink}>My Dashboard</Link>
          <Link href="/dashboard/tests" className={styles.navLink}>Mock Tests CBT</Link>
          <Link href="/dashboard/materials" className={styles.navLink}>Study Materials</Link>
          <Link href="/dashboard/attendance" className={styles.navLink}>Attendance & Leaves</Link>
          <Link href="/dashboard/fees" className={styles.navLink}>Fee Status</Link>
          <Link href="/dashboard/ai-doubt" className={styles.navLink}>AI Doubt Support ✨</Link>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
