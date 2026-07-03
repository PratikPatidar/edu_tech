# EduMiracle Platform - Project Plan & Requirements

## 1. Executive Summary
EduMiracle is a premium, high-performance web platform designed for NEET coaching. The platform will serve three primary audiences: public visitors, enrolled students, and administrators/faculty. 

**Core Objective:** Build a high-fidelity, interactive prototype with dummy data to secure client approval. The project MUST look and function completely like a real, state-of-the-art client application.

## 2. Technology Stack
*   **Core Framework**: **Next.js (React)** 
    *   *Why*: Provides lightning-fast page loads, Server-Side Rendering (SSR), and built-in API routes.
*   **Styling**: **Vanilla CSS / CSS Modules**
    *   *Why*: Keeps the bundle size minimal. Allows for a highly custom, premium aesthetic without being constrained by utility framework defaults.
*   **Database**: **MongoDB (Atlas Cloud)**
    *   *Why*: Flexible NoSQL structure makes it easy to mock data quickly. We will connect to it directly via Next.js API routes using Mongoose.
*   **Hosting**: **Vercel**
    *   *Why*: Vercel is free, perfectly optimized for Next.js, and natively supports the required subdomain routing out of the box.

## 3. Architecture & Routing Setup
We will use a single Next.js codebase to serve multiple interfaces using **Next.js Middleware**.
*   `edumiracle.in` (Root): Public landing page highlighting courses, success stories, and an entrance to login.
*   `edumiracle.in/dashboard` (Student Route): The interactive learning portal.
*   `admin.edumiracle.in` (Subdomain Route): The management portal. Middleware will detect the `admin.` subdomain and render the admin layout seamlessly.

## 4. UI/UX Design System
The interface MUST look like a top-tier, funded ed-tech startup.
*   **Color Palette**: Deep Midnight Blue (Primary), Vibrant Orange/Cyan (Accents for buttons and alerts), and Pure White/Light Gray (Backgrounds for readability).
*   **Typography**: `Outfit` for headings (modern, geometric) and `Inter` for body text (highly readable).
*   **Aesthetics**: 
    *   **Glassmorphism**: Soft, frosted-glass effects on sidebars and floating cards.
    *   **Micro-interactions**: Subtle hover states on buttons, smooth expanding accordions for course modules, and skeleton loaders for fetching data.

## 5. Feature Requirements (The Flows)

### 🎓 Student (and Parent) Flow
1.  **Immersive Dashboard**: Overview of ongoing progress, next recommended video lecture, and recent mock test score.
2.  **AI Doubt Resolution (Gemini Powered)**: A built-in smart chat interface where students can ask academic doubts (Physics, Chemistry, Bio) 24/7 and get instant AI-generated explanations.
3.  **Attendance & Leave Tracking**: A visual calendar showing present days, absent days (leaves taken), and overall attendance percentage.
4.  **Fee Structure & History**: A section where students can view their total fees, paid amounts, and pending dues.
5.  **Upcoming Holidays & Notices**: A widget displaying upcoming institute holidays and important batch announcements.
6.  **Online Mock Test Engine**: A proper, fully-featured online interface mimicking the real NEET CBT environment. Includes a countdown timer, question palette grid, and instant result generation.
7.  **Offline Test Results**: A section to view results, OMR scans, and analytics for tests taken physically at the coaching center.
8.  **Study Material Hub**: Categorized tabs for Physics, Chemistry, and Biology. Downloadable PDFs and embedded video player.

*(Note: Parents can log in using the student's credentials to monitor attendance, test scores, and fee status. This "Parent View" will be highly appealing to the client.)*

### 👑 Admin/Faculty Flow
1.  **Master Dashboard**: At-a-glance metrics of active students, daily attendance trends, and fee collections.
2.  **Student Management & Registration**: Admin creates a profile, generating a unique ID/Password, and assigns them to a batch.
3.  **Attendance & Fees Manager**: Tools for the admin to mark student attendance/leaves and update fee payment records.
4.  **Online Test Creator**: Clean forms to upload new online mock tests and answer keys.
5.  **Offline Test & OMR Scanner Module**: 
    *   An interface where educators can select a test and upload scanned images of students' filled OMR sheets.
    *   The backend (BE) processes the OMR image, extracts the marked answers, compares them against the master answer key, and automatically generates the student's result and rank.
    *   Alternatively, a manual entry grid for educators to quickly type in scores if scanning is unavailable.

## 6. Authentication Flow
*   **No Self-Signup:** Students cannot sign themselves up. 
*   **Admin-Led Registration:** The Admin creates the student profile from the Admin Panel. The system will issue a unique **Student ID Number** and **Password**.
*   **Login Page:** Students log in exclusively using the ID Number and Password provided by the coaching institute.

## 7. Dummy Database Mockup Plan
We will populate the MongoDB with the following collections:
*   `Users`: Admin account, 3-5 Student accounts (using ID number authentication).
*   `Tests`: 2 mock tests with sample Physics/Chemistry questions.
*   `Materials`: Dummy links to sample PDFs and placeholder videos.

## 8. Phased Execution Plan (FE + BE Concurrent)
Because we are using Next.js, the Frontend (FE) and Backend (BE) will be built concurrently. Next.js API routes act as our BE, tightly integrated with our FE components.

**Phase 1: Foundation & Admin/Educator Portal**
*   *Why first?* Data must originate somewhere. We need the Admin portal working so we can register dummy students, upload tests, and push announcements to the database.
*   *Focus:* Database setup (MongoDB), Authentication, and the Admin Dashboard UI.

**Phase 2: The Student Portal**
*   *Why second?* Now that the database has tests and materials created by the Admin, we can build the Student UI to display them.
*   *Focus:* Mock Test Engine (CBT), Analytics, Attendance Viewer, and the Gemini AI Doubt Support chat.

**Phase 3: Public Marketing Page & Polish**
*   *Why last?* It's the simplest part. Once the core software works, we build the beautiful `edumiracle.in` landing page to attract users.
*   *Focus:* High-end animations, glassmorphism UI, and Vercel deployment.
