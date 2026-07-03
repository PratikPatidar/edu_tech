import styles from './page.module.css';

import { CalendarDays } from 'lucide-react';

export default function StudentDashboard() {
  return (
    <div>
      <div className={styles.header}>
        <h1>My Learning Dashboard</h1>
        <p>Track your progress, take tests, and resolve doubts instantly.</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Recent Mock Test</h2>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreText}>580</span>
            <span className={styles.scoreLabel}>out of 720</span>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Mock Test 4 (Full Syllabus)</p>
        </div>

        <div className={styles.card} style={{ padding: 0 }}>
          <div className={styles.cardTop}>
            <div className={styles.iconWrapper}><CalendarDays size={20} className={styles.purpleIcon} /></div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardValue}>11 Days</h3>
              <p className={styles.cardTitle}>Total Attendance</p>
            </div>
          </div>
          <div className={styles.cardBottom}>
            <span className={styles.purpleText}>2 days missed this month</span>
          </div>
        </div>

        <div className={styles.card}>
          <h2>Notice Board</h2>
          <ul className={styles.noticeList}>
            <li className={styles.noticeItem}>
              <div className={styles.noticeDate}>Tomorrow, 10:00 AM</div>
              <div>Extra class for Organic Chemistry (Isomerism)</div>
            </li>
            <li className={styles.noticeItem}>
              <div className={styles.noticeDate}>Upcoming Sunday</div>
              <div>Mega Mock Test (Botany & Zoology)</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
