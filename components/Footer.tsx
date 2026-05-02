import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex flex-col mb-8 p-1">
              <span className="text-xl font-bold tracking-tight text-white font-display">NOIDA KAWADIWALA</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Scrap & Recycling Partner</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
              The most trusted scrap dealer in Noida & Delhi NCR since 2018. We provide instant valuation, free pickup, and professional recycling services.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2.5 bg-slate-800 rounded-xl hover:bg-teal-600 transition-all duration-300 text-white"><Facebook size={18} /></a>
              <a href="#" className="p-2.5 bg-slate-800 rounded-xl hover:bg-teal-600 transition-all duration-300 text-white"><Instagram size={18} /></a>
              <a href="#" className="p-2.5 bg-slate-800 rounded-xl hover:bg-teal-600 transition-all duration-300 text-white"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/" className="text-slate-400 hover:text-teal-400 transition">Home</Link></li>
              <li><Link href="#services" className="text-slate-400 hover:text-teal-400 transition">Recycling Services</Link></li>
              <li><Link href="/dashboard" className="text-slate-400 hover:text-teal-400 transition">Track Inquiry</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-teal-400 transition">Legal & Privacy</Link></li>
              <li><Link href="/login" className="text-slate-400 hover:text-teal-400 transition">Admin Access</Link></li>
            </ul>
          </div>

          {/* Pricing */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-8">Service Areas</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li>Noida (All Sectors)</li>
              <li>Greater Noida</li>
              <li>Ghaziabad & Indirapuram</li>
              <li>Vaishali & Vasundhara</li>
              <li>East & South Delhi</li>
              <li className="text-teal-500 font-bold">24hr Pickup Available</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-8">Contact Support</h4>
            <ul className="space-y-6 text-sm font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="text-teal-500 shrink-0" size={18} />
                <span className="text-slate-400">RC03, Khora Colony, Sector 62, Noida, UP 201020</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-teal-500 shrink-0" size={18} />
                <a href="tel:+919990483944" className="text-slate-400 hover:text-teal-400 transition">+91 99904 83944</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-teal-500 shrink-0" size={18} />
                <a href="mailto:contact@noidakawadiwala.com" className="text-slate-400 hover:text-teal-400 transition">contact@noidakawadiwala.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          <p>© 2024 Noida Kawadiwala. Built for Delhi NCR.</p>
          <div className="flex gap-8">
            <Link href="/terms" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
