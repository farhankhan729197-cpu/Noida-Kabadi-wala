'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { Menu, X, User, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const { user, profile, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link href="/" className="flex items-center gap-2 leading-tight">
            <div className="bg-teal-600 p-2 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div className="flex flex-col mb-1">
              <span className="text-xl font-bold tracking-tight text-slate-800 font-display">NOIDA KAWADIWALA</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Scrap & Recycling</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-bold text-slate-600 hover:text-teal-600 transition">Home</Link>
            <Link href="#services" className="text-sm font-bold text-slate-600 hover:text-teal-600 transition">Services</Link>
            <Link href="/terms" className="text-sm font-bold text-slate-600 hover:text-teal-600 transition">Pricing & Policy</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href={isAdmin ? '/admin' : '/dashboard'} 
                  className="flex items-center gap-2 text-sm font-bold bg-teal-50 text-teal-600 px-4 py-2 rounded-full hover:bg-teal-100 transition"
                >
                  {isAdmin ? <ShieldCheck size={18} /> : <LayoutDashboard size={18} />}
                  {isAdmin ? 'Admin' : 'Dashboard'}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-500 transition"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-teal-600 transition">Login</Link>
                <Link 
                  href="/signup" 
                  className="bg-slate-900 text-white text-sm font-bold px-6 py-2.5 rounded-full hover:bg-slate-800 transition shadow-lg shadow-slate-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link href="/" className="block px-3 py-3 rounded-lg text-base font-bold text-slate-700 hover:bg-slate-50">Home</Link>
              <Link href="#services" className="block px-3 py-3 rounded-lg text-base font-bold text-slate-700 hover:bg-slate-50">Services</Link>
              <Link href="/terms" className="block px-3 py-3 rounded-lg text-base font-bold text-slate-700 hover:bg-slate-50">Policy</Link>
              <div className="pt-4 border-t border-slate-50 flex flex-col gap-2">
                {user ? (
                  <>
                    <Link 
                      href={isAdmin ? '/admin' : '/dashboard'} 
                      className="w-full flex items-center justify-center gap-2 bg-teal-50 text-teal-600 px-3 py-4 rounded-xl font-bold"
                      onClick={() => setIsOpen(false)}
                    >
                      {isAdmin ? <ShieldCheck size={20} /> : <LayoutDashboard size={20} />}
                      {isAdmin ? 'Admin Panel' : 'My Dashboard'}
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-3 py-4 rounded-xl font-bold"
                    >
                      <LogOut size={20} /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="w-full text-center px-3 py-4 rounded-xl font-bold text-slate-700 border border-slate-200">Login</Link>
                    <Link href="/signup" className="w-full text-center px-3 py-4 rounded-xl font-bold bg-slate-900 text-white">Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
