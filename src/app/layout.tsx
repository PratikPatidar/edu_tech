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
  metadataBase: new URL("https://edumiracle.in"),
  title: {
    default: "EduMiracle | India's Best Coaching for JEE & NEET | Indore",
    template: "%s | EduMiracle",
  },
  description:
    "EduMiracle is Indore's premier coaching institute for JEE Main, JEE Advanced & NEET UG. Expert faculty from Kota, AI-powered doubt resolution, NTA-replica CBT tests & live classes. Enroll now!",
  keywords: [
    "JEE Coaching Indore",
    "NEET Coaching Indore",
    "Best Coaching Institute Indore",
    "IIT JEE Preparation",
    "NEET UG Preparation",
    "EduMiracle",
    "Kota Faculty",
    "NTA Replica Test",
    "JEE Advanced Coaching",
    "Medical Entrance Coaching",
    "Online Coaching India",
    "JEE Mains 2025",
    "NEET 2025",
  ],
  authors: [{ name: "EduMiracle", url: "https://edumiracle.in" }],
  creator: "EduMiracle Coaching Institute",
  publisher: "EduMiracle",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://edumiracle.in",
  },
  icons: {
    icon: [
      { url: "/images/favicon-icon.jpg", type: "image/jpeg" },
    ],
    shortcut: "/images/favicon-icon.jpg",
    apple: "/images/favicon-icon.jpg",
  },
  openGraph: {
    title: "EduMiracle | India's Best Coaching for JEE & NEET | Indore",
    description:
      "EduMiracle — Indore's top JEE & NEET coaching with Kota faculty, AI-powered doubt resolution, and NTA-replica CBT tests. Join thousands of successful students.",
    url: "https://edumiracle.in",
    siteName: "EduMiracle",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "EduMiracle — India's Best JEE & NEET Coaching Institute",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduMiracle | Best JEE & NEET Coaching in Indore",
    description:
      "Kota faculty. AI doubt solving. NTA-replica tests. Join EduMiracle — Indore's #1 coaching for JEE & NEET.",
    images: ["/images/logo.png"],
  },
  verification: {
    google: "google-site-verification-placeholder",
  },
  category: "education",
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
              "alternateName": "EduMiracle",
              "url": "https://edumiracle.in",
              "logo": {
                "@type": "ImageObject",
                "url": "https://edumiracle.in/images/logo.png",
                "width": 512,
                "height": 512
              },
              "image": "https://edumiracle.in/images/logo.png",
              "description": "EduMiracle is Indore's premier coaching institute for JEE Main, JEE Advanced & NEET UG preparation. Expert faculty from Kota, AI-powered doubt resolution, NTA-replica CBT tests.",
              "telephone": "+91-9009990502",
              "email": "info@edumiracle.in",
              "foundingDate": "2018",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "9/3 A Block Manoramaganj, Geeta Bhawan",
                "addressLocality": "Indore",
                "addressRegion": "Madhya Pradesh",
                "postalCode": "452001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "22.7196",
                "longitude": "75.8577"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "08:00",
                  "closes": "20:00"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Courses",
                "itemListElement": [
                  {
                    "@type": "Course",
                    "name": "JEE Main & Advanced Preparation",
                    "description": "Comprehensive coaching for IIT JEE Main and Advanced with Kota-expert faculty.",
                    "provider": { "@type": "Organization", "name": "EduMiracle" }
                  },
                  {
                    "@type": "Course",
                    "name": "NEET UG Preparation",
                    "description": "Complete NEET UG coaching with biology, physics and chemistry specialists.",
                    "provider": { "@type": "Organization", "name": "EduMiracle" }
                  }
                ]
              },
              "sameAs": [
                "https://www.instagram.com/edumiracle",
                "https://www.youtube.com/@edumiracle",
                "https://www.facebook.com/edumiracle"
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
