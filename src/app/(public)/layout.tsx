'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Phone, Menu, X } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (document.cookie.includes('auth_token=')) {
      setIsLoggedIn(true);
    }
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isLoginPage = pathname === '/login';

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/courses', label: 'Courses' },
    { href: '/em-sat', label: 'EM-SAT' },
    { href: '/resources', label: 'Free Resources' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/toppers', label: 'Toppers' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className={`flex flex-col bg-[#F8F9FA] text-slate-900 font-sans selection:bg-orange-500 selection:text-white ${isLoginPage ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>

      {/* -- Announcement Bar ----------------------------------------------- */}
      {!isLoginPage && (
        <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs py-2 px-4 text-center font-medium shrink-0 flex items-center justify-center gap-2 shadow-sm">
          <Flame size={14} className="text-amber-200 shrink-0 fill-current" />
          <span>
            Admissions Open for 2026-27 | Win up to{' '}
            <strong className="font-bold">90% Scholarship</strong> via EM-SAT.
          </span>
          <Link href="/em-sat" className="ml-2 text-white underline underline-offset-2 hover:text-orange-200 transition-colors font-bold">
            Apply Now
          </Link>
        </div>
      )}

      {/* -- Main Navbar ---------------------------------------------------- */}
      <nav
        className={`
          ${isLoginPage
            ? 'relative bg-white py-4 shadow-sm z-50 shrink-0'
            : `sticky top-0 z-50 shrink-0 transition-all duration-300 py-3
               ${isScrolled
                 ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100'
                 : 'bg-white border-b border-slate-100'}`
          }
        `}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="shrink-0">
            <img src="/images/logo.png" alt="EduMiracle" className="h-10 w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                  ${pathname === href
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="tel:18002585555"
              className="hidden lg:flex items-center gap-2 text-slate-600 text-sm font-semibold hover:text-orange-600 transition-colors"
            >
              <Phone size={15} className="text-orange-500" />
              1800-258-5555
            </a>
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-orange-300/40 hover:scale-[1.02] transition-all duration-200"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-orange-300/40 hover:scale-[1.02] transition-all duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-1 shadow-lg">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors
                  ${pathname === href
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'}`}
              >
                {label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-slate-100">
              <Link
                href="/login"
                className="block w-full text-center bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-md"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* -- Page Content --------------------------------------------------- */}
      <main className={`flex-1 ${isLoginPage ? 'overflow-auto' : ''}`}>
        {children}
      </main>

      {/* -- Footer --------------------------------------------------------- */}
      {!isLoginPage && (
        <footer className="bg-black text-zinc-400 pt-24 pb-12 shrink-0 border-t border-zinc-950">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">

              {/* Brand */}
              <div className="col-span-2 md:col-span-1">
                <img src="/images/logo.png" alt="EduMiracle Logo" className="h-12 w-auto mb-6 brightness-0 invert" />
                <p className="text-sm leading-relaxed mb-6 text-zinc-550">
                  India&apos;s premier coaching institute for Medical and Engineering entrance examinations. Powered by Kota expertise.
                </p>
                <div className="flex flex-col gap-3">
                  <a href="tel:18002585555" className="flex items-center gap-2.5 text-orange-500 font-extrabold text-sm hover:text-orange-400 transition-all duration-200">
                    <span className="text-base">📞</span> 1800-258-5555
                  </a>
                  <a href="mailto:info@edumiracle.in" className="flex items-center gap-2.5 text-zinc-500 text-sm hover:text-orange-500 transition-all duration-200">
                    <span className="text-base">✉️</span> info@edumiracle.in
                  </a>
                </div>
              </div>

              {/* Programs */}
              <div>
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Programs</h4>
                <ul className="space-y-3.5 text-sm">
                  {[
                    ['Class 6–10 (Foundation)', '/courses'],
                    ['Class 11 & 12 (Target)', '/courses'],
                    ['12th Pass (Dropper)', '/courses'],
                    ['Distance Learning', '/courses'],
                  ].map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="hover:text-orange-500 transition-colors duration-200">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Quick Links</h4>
                <ul className="space-y-3.5 text-sm">
                  {[
                    ['Student Login', '/login'],
                    ['About Us', '/about'],
                    ['EM-SAT Scholarship', '/em-sat'],
                    ['Contact', '/contact'],
                    ['Gallery', '/gallery'],
                  ].map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="hover:text-orange-500 transition-colors duration-200">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Resources</h4>
                <ul className="space-y-3.5 text-sm">
                  {[
                    ['NEET Results', '/toppers'],
                    ['JEE Main Analysis', '#'],
                    ['Free Mock Tests', '#'],
                    ['Blog', '#'],
                  ].map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} className="hover:text-orange-500 transition-colors duration-200">{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Bottom bar */}
            <div className="border-t border-zinc-900 pt-8 text-xs flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-650">
              <div>© {new Date().getFullYear()} EduMiracle Coaching Institute. All Rights Reserved.</div>
              <div className="flex gap-6">
                {[['Privacy Policy', '#'], ['Terms of Service', '#'], ['Refund Policy', '#']].map(([label, href]) => (
                  <Link key={label} href={href} className="hover:text-zinc-400 transition-colors duration-200">{label}</Link>
                ))}
              </div>
            </div>
          </div>
        </footer>
      )}
      <Toaster position="top-center" toastOptions={{ style: { borderRadius: '12px', fontWeight: 600, fontSize: '13px' } }} />
      {!isLoginPage && (
        <a
          href="https://wa.me/919009990502?text=Hello%20EduMiracle%2C%20I%20want%20to%20enquire%20about%20admissions."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-200"
          style={{ animation: 'bounce 2s infinite' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" className="w-8 h-8"><path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.47 2.027 7.774L0 32l8.469-2.001A15.938 15.938 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.773-1.851l-.486-.289-5.028 1.188 1.23-4.896-.318-.503A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.862c-.398-.199-2.354-1.162-2.719-1.295-.365-.133-.631-.199-.897.2-.266.398-1.029 1.295-1.261 1.561-.232.266-.465.299-.863.1-.398-.199-1.682-.62-3.203-1.977-1.184-1.057-1.983-2.363-2.215-2.761-.232-.398-.025-.613.174-.811.179-.178.398-.465.597-.697.199-.232.266-.398.398-.664.133-.266.067-.498-.033-.697-.1-.199-.897-2.162-1.229-2.96-.324-.778-.653-.672-.897-.684l-.764-.013c-.266 0-.697.1-1.062.498-.365.398-1.395 1.362-1.395 3.324s1.428 3.855 1.627 4.121c.199.266 2.811 4.291 6.81 6.018.952.41 1.695.656 2.274.84.955.304 1.824.261 2.511.158.766-.114 2.354-.963 2.686-1.893.332-.93.332-1.727.232-1.893-.099-.166-.365-.266-.763-.465z"/></svg>
        </a>
      )}
    </div>
  );
}
