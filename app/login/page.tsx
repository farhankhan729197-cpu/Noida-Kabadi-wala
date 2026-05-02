'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Loader2, Mail, Lock, ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

function LoginContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback = searchParams.get('callback') || '/';

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if profile exists
      let userDoc;
      try {
        userDoc = await getDoc(doc(db, 'users', user.uid));
      } catch (firestoreErr) {
        handleFirestoreError(firestoreErr, OperationType.GET, `users/${user.uid}`);
      }

      if (userDoc && !userDoc.exists()) {
        try {
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            email: user.email,
            name: user.displayName || 'User',
            role: 'customer',
            createdAt: new Date().toISOString(),
          });
        } catch (firestoreErr) {
          handleFirestoreError(firestoreErr, OperationType.WRITE, `users/${user.uid}`);
        }
      }
      router.push(callback);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(callback);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side: Brand & Visual */}
      <div className="hidden lg:flex flex-col bg-slate-900 text-white p-16 justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-teal-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <Link href="/" className="flex flex-col relative z-10">
          <span className="text-2xl font-black tracking-tight font-display uppercase">NOIDA KAWADIWALA</span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Scrap & Recycling</span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-5xl font-black font-display uppercase leading-tight mb-6 text-white">Welcome Back to <br /> Professional Recycling.</h2>
          <p className="text-slate-400 text-lg font-medium max-w-md">Access your dashboard to track your inquiries and manage your recycling requests.</p>
        </div>

        <div className="relative z-10 flex gap-12">
          <div>
            <div className="text-2xl font-bold font-display text-teal-500 tracking-tight leading-none mb-1">10k+</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pickups Done</div>
          </div>
          <div>
            <div className="text-2xl font-bold font-display text-teal-500 tracking-tight leading-none mb-1">4.9/5</div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">User Rating</div>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center p-8 bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white p-10 rounded-[48px] shadow-xl shadow-slate-200/60 border border-slate-100"
        >
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-black font-display uppercase tracking-tight text-slate-900 mb-2">Customer Login</h1>
            <p className="text-slate-500 font-medium text-sm">Secure access to your recycling dashboard</p>
          </div>

          <button 
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 p-4 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition mb-6 shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="" />
            Continue with Google
          </button>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <span className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or login with email</span>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none font-medium pr-12 text-slate-800"
                  placeholder="name@example.com"
                  required
                />
                <Mail className="absolute right-4 top-4 text-slate-300" size={20} />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none font-medium pr-12 text-slate-800"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute right-4 top-4 text-slate-300" size={20} />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 transition shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Login to Account'}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Don&apos;t have an account? <Link href="/signup" className="text-teal-600 font-bold hover:underline">Sign up for free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-teal-600" size={40} />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
