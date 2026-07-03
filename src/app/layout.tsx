import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduMiracle | India's #1 Coaching Institute for JEE & NEET",
  description: "Join EduMiracle, India's most trusted coaching institute for JEE and NEET preparation. Expert faculty from Kota, AI-powered doubt resolution, and NTA replica CBT tests.",
  keywords: ["JEE Coaching", "NEET Coaching", "Kota Faculty", "EduMiracle", "Best Coaching Institute", "IIT JEE", "Medical Entrance"],
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: "EduMiracle | India's #1 Coaching Institute for JEE & NEET",
    description: "Join EduMiracle, India's most trusted coaching institute for JEE and NEET preparation.",
    url: "https://edumiracle.in",
    siteName: "EduMiracle",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduMiracle | India's #1 Coaching Institute",
    description: "Expert faculty from Kota, AI-powered doubt resolution, and NTA replica CBT tests.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "EduMiracle Coaching Institute",
              "url": "https://edumiracle.in",
              "logo": "https://edumiracle.in/images/logo.png",
              "description": "India's premier coaching institute for JEE and NEET preparation.",
              "telephone": "+91-9009990502",
              "email": "info@edumiracle.in",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "9/3 A Block Manoramaganj, Geeta Bhawan",
                "addressLocality": "Indore",
                "addressRegion": "Madhya Pradesh",
                "postalCode": "452001",
                "addressCountry": "IN"
              }
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
