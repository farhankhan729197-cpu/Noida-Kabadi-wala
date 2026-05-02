'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroForm from '../components/HeroForm';
import { motion } from 'motion/react';
import { Truck, BadgeCheck, Zap, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#0D9488" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.5,90.1,-16.3,88.5,-0.9C86.9,14.5,81.1,29,72.4,41.4C63.7,53.8,52.2,64.2,38.8,71.4C25.4,78.6,10.1,82.7,-4.8,81.1C-19.8,79.5,-34.4,72.2,-47.4,62.1C-60.4,52.1,-71.7,39.3,-78.3,24.5C-84.9,9.8,-86.8,-6.9,-82.9,-22.4C-79,-37.9,-69.3,-52.2,-56.3,-60.9C-43.2,-69.5,-26.8,-72.5,-11.1,-75.7C4.6,-78.9,20.6,-83.5,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold rounded-full uppercase tracking-wider">
                Official Scrap Partner: Delhi NCR
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-extrabold text-slate-900 leading-[1.1] font-display">
                Turn Your Old <span className="text-teal-600">Appliances</span> Into Instant <span className="text-teal-700 underline decoration-teal-200 underline-offset-8">Cash.</span>
              </h1>
              <p className="text-slate-500 text-lg max-w-md font-medium leading-relaxed">
                Sell your old ACs, Fridges, and Washing Machines at the best prices. Free pickup within 24 hours in Noida & Ghaziabad.
              </p>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-900">4.9/5</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Customer Rating</span>
                </div>
                <div className="h-10 w-px bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-slate-900">50k+</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Items Recycled</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-400 pt-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-teal-600" />
                  Verified Service
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-teal-600" />
                  Fast Pickup
                </div>
              </div>
            </motion.div>

            {/* Inquiry Form */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <HeroForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 font-display uppercase tracking-tight">Our Recycling Categories</h2>
            <p className="text-slate-500 font-medium leading-relaxed">We buy all types of household and commercial scrap items at the absolute best market rates.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'Air Conditioners', icon: '❄️', desc: 'Any condition ACs' },
              { name: 'Refrigerators', icon: '🧊', desc: 'Single/Double door' },
              { name: 'Washing Machines', icon: '🌀', desc: 'Top/Front load' },
              { name: 'Inverters/Battery', icon: '🔋', desc: 'All sizes & types' },
              { name: 'Electronics', icon: '💻', desc: 'Laptops/TVs/LEDs' },
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 bg-slate-50 rounded-3xl border border-slate-100 hover:border-teal-200 hover:bg-white hover:shadow-xl hover:shadow-teal-600/5 transition-all text-center group"
              >
                <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition duration-500">{item.icon}</div>
                <h4 className="font-bold text-slate-800 mb-1">{item.name}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features / Why Us */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square w-full max-w-md mx-auto">
              <Image 
                src="https://picsum.photos/seed/recycle/800/800" 
                alt="Recycling" 
                fill 
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover rounded-[48px] shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
                <div className="text-4xl font-black text-teal-600 mb-1 font-display leading-none">4.9/5</div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer Rating</p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-8 font-display uppercase tracking-tight leading-tight">Why Choose <br /> Noida Kawadiwala?</h2>
              <div className="space-y-6">
                {[
                  { title: 'Verified Professionals', desc: 'Our team is background-checked and professional for safe home pickups.', icon: <BadgeCheck className="text-teal-600" /> },
                  { title: 'Transparent Pricing', desc: 'No hidden charges. We provide the best market rates based on actual condition.', icon: <Zap className="text-teal-600" /> },
                  { title: 'Eco-Friendly Disposal', desc: 'We follow strict environmental guidelines for appliance recycling and disposal.', icon: <CheckCircle2 className="text-teal-600" /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300">
                    <div className="p-3 bg-slate-100 rounded-xl shadow-sm h-fit">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-800 mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                href="/login" 
                className="mt-10 inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200"
              >
                Get a Quote Now
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-12">Noida • Ghaziabad • Delhi</h3>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {['Noida', 'Greater Noida', 'Delhi', 'Ghaziabad', 'Vaishali', 'Vasundhara', 'Kaushambi'].map(area => (
              <span key={area} className="text-xl font-display font-black text-slate-200 hover:text-teal-600 cursor-default transition-all duration-300 uppercase italic">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
