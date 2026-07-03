'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Your Dream Medical College Awaits.",
      desc: "Join India's most advanced NEET coaching platform. Real-time Mock Tests, Top Faculty, and 24/7 AI Doubt Support.",
      bg: "linear-gradient(135deg, #0A192F, #112B52)"
    },
    {
      title: "Get Instant AI Doubt Support",
      desc: "Stuck on a tricky Physics question? Snap a picture and our Gemini AI tutor will explain it step-by-step instantly.",
      bg: "linear-gradient(135deg, #203A43, #2C5364)"
    },
    {
      title: "Real NEET CBT Environment",
      desc: "Practice with our state-of-the-art Computer Based Test engine that exactly mimics the real NTA exam interface.",
      bg: "linear-gradient(135deg, #1A202C, #2D3748)"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className={styles.pageWrapper}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>EduMiracle</div>
        <div className={styles.navLinks}>
          <Link href="#features" className={styles.navItem}>Features</Link>
          <Link href="#courses" className={styles.navItem}>Courses</Link>
          <Link href="#faculty" className={styles.navItem}>Faculty</Link>
        </div>
        <Link href="/login" className={styles.loginBtn}>
          Portal Login
        </Link>
      </nav>

      {/* Hero Slider */}
      <header className={styles.heroSlider}>
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`${styles.slide} ${currentSlide === index ? styles.active : ''}`}
            style={{ background: slide.bg }}
          >
            <div className={styles.slideContent}>
              <h1 className={styles.slideTitle}>{slide.title}</h1>
              <p className={styles.slideDesc}>{slide.desc}</p>
            </div>
          </div>
        ))}
        <div className={styles.sliderControls}>
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`${styles.dot} ${currentSlide === idx ? styles.active : ''}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </header>

      {/* Core Features Section */}
      <section id="features" className={styles.section}>
        <h2 className={styles.sectionTitle}>Why Choose EduMiracle?</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>🤖</div>
            <h3>24/7 AI Doubt Resolution</h3>
            <p>Upload a photo of your doubt and get instant, step-by-step solutions powered by Gemini AI. No more waiting for the next day's class.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>📝</div>
            <h3>NTA-Style CBT Mock Tests</h3>
            <p>Experience the exact pressure and interface of the real NEET exam. Our engine perfectly replicates the NTA question palette.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>📊</div>
            <h3>OMR Offline Support</h3>
            <p>Prefer giving tests on paper? Our educators scan your OMR sheets and our system instantly extracts and updates your ranking online.</p>
          </div>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>📅</div>
            <h3>Attendance & Leave Tracking</h3>
            <p>Complete transparency for students and parents. Track daily attendance and fee status directly from your personalized dashboard.</p>
          </div>
        </div>
      </section>

      {/* Courses / Batches */}
      <section id="courses" className={styles.section} style={{ background: '#F1F5F9' }}>
        <h2 className={styles.sectionTitle}>Our Featured Batches</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div style={{ background: '#E0E7FF', padding: '0.5rem 1rem', borderRadius: '50px', display: 'inline-block', color: '#4338CA', fontWeight: 'bold', marginBottom: '1rem' }}>NEET 2026</div>
            <h3>Target Batch (Class 12)</h3>
            <p>Intensive 1-year program covering the entire Class 11 & 12 syllabus with rigorous weekly mock tests.</p>
          </div>
          <div className={styles.card}>
            <div style={{ background: '#FEF3C7', padding: '0.5rem 1rem', borderRadius: '50px', display: 'inline-block', color: '#B45309', fontWeight: 'bold', marginBottom: '1rem' }}>NEET 2026</div>
            <h3>Dropper's Achiever Batch</h3>
            <p>Specialized batch focusing on advanced problem-solving, test analysis, and rank improvement.</p>
          </div>
          <div className={styles.card}>
            <div style={{ background: '#D1FAE5', padding: '0.5rem 1rem', borderRadius: '50px', display: 'inline-block', color: '#047857', fontWeight: 'bold', marginBottom: '1rem' }}>NEET 2027</div>
            <h3>Foundation Batch (Class 11)</h3>
            <p>2-year comprehensive program to build a rock-solid foundation in Physics, Chemistry, and Biology.</p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <div className={styles.ctaBanner}>
        <h2>Ready to Secure Your Seat in a Govt. Medical College?</h2>
        <p>Contact our admissions office today to enroll and get your portal access credentials.</p>
        <Link href="/login" className={styles.ctaBtn}>Go to Student Portal</Link>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <h2>EduMiracle Coaching Institute</h2>
        <p style={{ marginTop: '1rem' }}>© {new Date().getFullYear()} EduMiracle. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Powered by Advanced EdTech Systems</p>
      </footer>
    </div>
  );
}
