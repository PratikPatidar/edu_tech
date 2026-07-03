import styles from './AdminDashboard.module.css';
import { Clock, CalendarDays, Layers, Hourglass, Receipt, Cake } from 'lucide-react';

export default function AdminDashboard() {
  const stats = {
    totalStudents: 142,
    activeTests: 3,
    pendingLeaves: 5,
    totalRevenue: '₹ 4,25,000'
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Good Afternoon, Admin!</h1>
        <p>Here is your overview this month.</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.iconWrapper}><Clock size={20} className={styles.purpleIcon} /></div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardValue}>0h 0m</h3>
              <p className={styles.cardTitle}>Logged Today</p>
            </div>
          </div>
          <div className={styles.cardBottom}>
            <span className={styles.purpleText}>11 days present this month</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.iconWrapper}><CalendarDays size={20} className={styles.purpleIcon} /></div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardValue}>11 Days</h3>
              <p className={styles.cardTitle}>Total Attendance</p>
            </div>
          </div>
          <div className={styles.cardBottom}>
            <span className={styles.purpleText}>10 days missed this month</span>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.iconWrapper}><Layers size={20} className={styles.purpleIcon} /></div>
            <div className={styles.cardInfo}>
              <h3 className={styles.cardValue}>8</h3>
              <p className={styles.cardTitle}>Running Batches</p>
            </div>
          </div>
          <div className={styles.cardBottom}>
            <span className={styles.mutedText}>3 upcoming next week</span>
          </div>
        </div>
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.largeCard}>
          <div className={styles.largeCardHeader}>
            <div className={styles.headerTitleWrap}>
              <div className={styles.iconWrapperSmall}><Hourglass size={18} className={styles.purpleIcon} /></div>
              <h2>Pending Approvals</h2>
            </div>
            <span className={styles.badgePink}>31 new</span>
          </div>
          <div className={styles.listContainer}>
            <div className={styles.listItem}>
              <div className={styles.iconWrapperLight}><Receipt size={16} className={styles.purpleIcon} /></div>
              <div className={styles.itemInfo}>
                <h4>Expenses</h4>
                <p>31 pending approval</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.largeCard}>
          <div className={styles.largeCardHeader}>
            <div className={styles.headerTitleWrap}>
              <div className={styles.iconWrapperSmall}><Cake size={18} className={styles.purpleIcon} /></div>
              <h2>Team Birthdays</h2>
            </div>
          </div>
          <div className={styles.listContainer}>
            <div className={styles.sectionLabel}>UPCOMING</div>
            <div className={styles.listItem}>
              <div className={styles.avatarCircle}>SS</div>
              <div className={styles.itemInfo}>
                <h4>Shristi Sharma</h4>
                <p>TECH-053</p>
              </div>
              <div className={styles.itemRight}>
                <span className={styles.dateDark}>Jul 4</span>
                <span className={styles.dateLight}>in 13d</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
