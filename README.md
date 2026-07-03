# EduMiracle – JEE & NEET Coaching Portal

EduMiracle is a premium, modern coaching institute portal built using Next.js, TailwindCSS, and MongoDB Atlas. It features a complete student dashboard, admin manager panel, interactive batch quiz pathfinders, scholarship waiver calculators, and dynamic edge-crypto route protection.

---

## 🚀 Key Features

### 1. Public Facing Site
* **Interactive Batch Finder Quiz**: Located on the landing page, guides prospective students to Nurture, Target, or Achiever batches.
* **Scholarship Waiver Calculator**: Predicts fee waiver percentages (up to 90%) dynamically on `/em-sat` based on target scores.
* **Free Study Materials**: Auto-generates and downloads mock exam papers and revision PDFs directly in the browser on `/resources`.
* **Dynamic Faculty & Toppers Listings**: Curates expert faculty cards, milestone timelines, and paginated topper ranks filterable by year.
* **Announcements**: Header banner notifications routing directly to admissions registers.

### 2. Edge-Secured Portal Access
* **Token-Based Auth**: Protected routes verify HS256 JWT tokens using the Web Crypto API (`crypto.subtle`) directly in the Edge runtime.
* **Custom Route Handler**: `src/proxy.ts` acts as the single gateway, routing logged-in users to their respective dashboards and protecting `/admin` and `/dashboard` directories.

### 3. Student Portal (`/dashboard`)
* **KPI Board**: Tracks latest mock test scores, All India Ranks, monthly attendance percentages, and pending fee balances.
* **Syllabus Progress Bar**: Graphic display of subject-wise completion rates.
* **Calendar Ledger**: Active monthly calendar displaying presents, half-days, absents, and holidays.
* **Materials & Profile Manager**: Access to batch study guides and account settings.

### 4. Admin Manager (`/admin`)
* **Analytics**: Overview of total students, batch statistics, test results, and attendance curves.
* **Student Registry**: Complete student list showing fee status, enrollment details, and batch designations.

### 5. Self-Healing Database
* When test student accounts (like `Aadhya` or `STU2026001`) sign in, if the database finds their logs are missing or empty, the dashboard API **proactively creates and populates** their profiles, fee installments, mock tests, and attendance ledgers on the fly.

---

## 🛠️ Technology Stack
* **Framework**: Next.js 16 (using App Router and Turbopack)
* **Styling**: TailwindCSS & Vanilla CSS
* **Database**: MongoDB Atlas
* **Query Builder**: Mongoose
* **Authentication**: JWT signed via Web Crypto API (Edge-safe)

---

## ⚙️ Setup & Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file in the root folder:
   ```env
   MONGODB_URI="your_mongodb_atlas_connection_string"
   JWT_SECRET="your_secure_hash_secret"
   ADMIN_EMAIL="admin@gmail.com"
   ADMIN_PASSWORD="Admin@1234"
   ```

3. **Database Seeding**:
   - Run the dev server.
   - Visit `http://localhost:3000/api/init` in your browser once to initialize the default administrator account.
   - Visit `http://localhost:3000/api/seed` to seed 60 mock student profiles.

4. **Launch Local Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the portal.

---

## 👥 Default Test Credentials

* **Student Portal**:
  * **User ID**: `Aadhya`  *(or `STU2026001`)*
  * **Password**: `Student@123`
* **Admin Portal**:
  * **Email**: `admin@gmail.com`
  * **Password**: `Admin@1234`
