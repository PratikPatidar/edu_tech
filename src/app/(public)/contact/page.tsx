'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ContactPage() {
  const [faqs, setFaqs] = useState([
    {
      q: "What is the fee payment structure for classroom programs?",
      a: "Fees can be paid in full with a one-time payment discount, or split into 3-4 structured installments depending on the program duration. We accept all online payments, credit cards, bank drafts, and offer quick finance options with 0% EMI partners.",
      open: false
    },
    {
      q: "Does EduMiracle offer separate hostel facilities for boys and girls?",
      a: "Yes, we partner with premier student residencies close to all our study centers. They provide secure, air-conditioned rooms, healthy meal plans, laundry services, and warden supervision. Transport facilities from hostels to our centers are also available.",
      open: false
    },
    {
      q: "How can I apply for the EM-SAT scholarship test?",
      a: "You can apply for the EduMiracle Scholarship Admission Test (EM-SAT) online through your student portal or by visiting any nearby branch. It is conducted every Sunday. Based on your scores, you can secure up to a 90% waiver on tuition fees.",
      open: false
    },
    {
      q: "What is the policy for conceptual doubt resolution?",
      a: "We have designated physical Doubt Rooms at our campuses where tutors are available from 8 AM to 8 PM. Additionally, students get 24/7 access to our AI Doubt solver on their dashboard for instant step-by-step guidance on any book page picture.",
      open: false
    }
  ]);

  const toggleFaq = (index: number) => {
    setFaqs(prev => prev.map((f, i) => i === index ? { ...f, open: !f.open } : f));
  };

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', program: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success('Inquiry submitted! We will contact you within 24 hours.');
        setFormData({ name: '', email: '', phone: '', program: '', message: '' });
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const campuses = [
    { city: "Indore Campus (HQ)", address: "9/3 A Block Manoramaganj, Geeta Bhawan, Indore, MP 452001", phone: "+91-9009990502" },
    { city: "Kota Center", address: "Plot No 4, Rajiv Gandhi Nagar, Jhalawar Road, Kota, Rajasthan 324005", phone: "+91-7442422222" },
    { city: "Jaipur Center", address: "G-3, Scheme No. 10, Gopalpura Bypass, Jaipur, Rajasthan 302018", phone: "+91-1412588888" },
    { city: "Pune Center", address: "2nd Floor, Landmark Building, FC Road, Shivaji Nagar, Pune, MH 411005", phone: "+91-2041255555" }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-16 space-y-20">
      
      {/* Title */}
      <div className="text-center">
        <h1 className="text-5xl font-black text-[#0f172a] mb-4">Contact <span className="text-orange-600">Us</span></h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">Have questions? Reach out to our admissions help desks or visit one of our smart learning center locations.</p>
      </div>
      
      {/* Contact Form and Head Office Row */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Inquiry Form */}
        <div className="flex-1 bg-white rounded-[2rem] p-10 shadow-sm border border-slate-200">
          <h3 className="text-2xl font-black mb-6 text-[#0f172a]">Send an Inquiry</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 text-sm" required value={formData.name} onChange={e => setFormData(p=>({...p, name: e.target.value}))} />
              <input type="email" placeholder="Email Address" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 text-sm" required value={formData.email} onChange={e => setFormData(p=>({...p, email: e.target.value}))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="tel" placeholder="Phone Number" className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 text-sm" required value={formData.phone} onChange={e => setFormData(p=>({...p, phone: e.target.value}))} />
              <select className="p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 text-sm text-slate-500" value={formData.program} onChange={e => setFormData(p=>({...p, program: e.target.value}))}>
                <option>Select Program</option>
                <option>Class 11 - Nurture Batch</option>
                <option>Class 12 - Target Batch</option>
                <option>Dropper - Achiever Batch</option>
                <option>Crash Course / Distance Learning</option>
              </select>
            </div>
            <textarea placeholder="Tell us about your target exams and current class..." rows={4} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 text-sm" required value={formData.message} onChange={e => setFormData(p=>({...p, message: e.target.value}))}></textarea>
            <button type="submit" disabled={submitting} className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl hover:bg-orange-700 transition-colors shadow-md hover:shadow-orange-300 disabled:opacity-60 disabled:cursor-not-allowed">
              {submitting ? 'Sending...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
        
        {/* HQ and Depts */}
        <div className="flex-1 space-y-6">
          <div className="bg-[#0f172a] text-white rounded-[2rem] p-10 shadow-xl">
            <h3 className="text-2xl font-bold mb-6">EduMiracle HQ</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-orange-500 text-2xl">📍</div>
                <div>
                  <div className="font-bold text-white mb-1">HQ Address</div>
                  <div className="text-slate-350 text-sm leading-relaxed">
                    9/3 A Block Manoramaganj,<br/>
                    Geeta Bhawan, Indore,<br/>
                    Madhya Pradesh 452001
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-orange-500 text-2xl">📞</div>
                <div>
                  <div className="font-bold text-white mb-1">Helpline</div>
                  <div className="text-slate-350 text-sm">+91-9009990502 &bull; 1800-258-5555</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-orange-500 text-2xl">✉️</div>
                <div>
                  <div className="font-bold text-white mb-1">Email Support</div>
                  <div className="text-slate-350 text-sm">info@edumiracle.in &bull; admissions@edumiracle.in</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campuses Network */}
      <div className="space-y-10">
        <h2 className="text-3xl font-black text-[#0f172a] text-center">Regional <span className="text-orange-600">Centers Network</span></h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {campuses.map((camp, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-lg text-[#0f172a] mb-2">{camp.city}</h4>
                <p className="text-slate-600 text-xs leading-relaxed mb-6">{camp.address}</p>
              </div>
              <a href={`tel:${camp.phone}`} className="text-orange-600 font-bold text-sm hover:underline flex items-center gap-1.5 mt-auto">
                📞 {camp.phone}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto space-y-10">
        <h2 className="text-3xl font-black text-[#0f172a] text-center">Frequently Asked <span className="text-orange-600">Questions</span></h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <button 
                onClick={() => toggleFaq(i)}
                className="w-full p-6 text-left font-bold text-[#0f172a] hover:bg-slate-50 flex justify-between items-center transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-orange-600 text-xl font-bold">{faq.open ? "−" : "+"}</span>
              </button>
              {faq.open && (
                <div className="px-6 pb-6 pt-2 text-slate-650 text-sm leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
