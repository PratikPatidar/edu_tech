# EduMiracle — Student Portal & ERP System

EduMiracle is a comprehensive, modern Next.js 16+ web application designed to manage student analytics, attendance tracking, study materials, mock tests (CBT environment), and fee ledgers.

The application features a premium UI constructed with Tailwind CSS, offering both **Light** and **Dark** modes seamlessly, and includes dynamic re-charting for detailed performance insights.

---

## 🚀 Features

- **Dynamic Dashboard**: Personalized KPI tracking including attendance percentage, fee dues, AIR (All India Rank), and mock test scores.
- **Attendance Ledger**: Premium circular gauges and grid-based calendars with visual cues for attendance statuses (Present, Absent, Late, Half-day, and Mock Test days).
- **Performance Analytics**: Visual charting (using Recharts) for subject-wise accuracy and historical mock test trends.
- **CBT Mock Tests**: Computer Based Test simulation environment for NEET/JEE preparation.
- **Study Materials & AI Doubts**: PDF library management and Gemini-powered AI doubt resolution.
- **Admin Panel**: Role-based access control (RBAC) to manage users, notices, tests, and faculty schedules.

---

## 🔑 Login Credentials (Demo Accounts)

To access the platform, you can use the following seeded demo accounts:

### 1. Student Portal
- **Student ID**: `STU2026001` or `EM-2024-102`
- **Password**: `Student@123`

### 2. Admin Portal
- **Email ID**: `admin@edumiracle.in`
- **Password**: `Admin@123` *(Assuming default admin seed)*

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16.2+](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with native `dark:` mode variants)
- **Database**: MongoDB (Mongoose ORM)
- **Icons**: Lucide React
- **Charts**: Recharts

---

## 💻 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/PratikPatidar/edu_tech.git
cd edu_tech
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory with the following keys:
```env
MONGODB_URI="your_mongodb_connection_string"
JWT_SECRET="your_jwt_secret_key"
```

### 4. Seed the Database
To populate the database with dummy data for the student portal, run the seeding script:
```bash
node --env-file=.env.local seed_em2024102.mjs
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Architecture Notes

- **Middleware**: This project uses a custom `proxy.ts` wrapper instead of Next.js edge `middleware.ts` to ensure compatibility with Node.js modules like `mongoose` and `jsonwebtoken`.
- **Theming**: Dark mode is handled via `document.documentElement.classList.add('dark')` and synced with `localStorage`. All components utilize Tailwind's `dark:` pseudo-classes for styling.

---
*Developed for the EduMiracle Coaching Institute.*
