'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../components/AuthContext';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, Timestamp, limit } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle2, XCircle, Package, Truck, ArrowUpRight, Search, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { user, profile, loading: authLoading } = useAuth();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'inquiries'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInquiries(docs);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'inquiries');
    });

    return () => unsubscribe();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'picked_up': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'done': return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'picked_up': return <Truck size={16} />;
      case 'done': return <CheckCircle2 size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return <Package size={16} />;
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Clock className="animate-spin text-teal-600" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar />

      <main className="pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black font-display uppercase tracking-tight text-slate-900 leading-none mb-3">My Dashboard</h1>
            <p className="text-slate-500 font-medium">Welcome back, {profile?.name || 'User'}. Track your scrap requests.</p>
          </div>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200"
          >
            New Inquiry <ArrowUpRight size={18} />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Total Requests', value: inquiries.length, color: 'slate' },
            { label: 'Pending', value: inquiries.filter(i => i.status === 'pending').length, color: 'yellow' },
            { label: 'Completed', value: inquiries.filter(i => i.status === 'green').length, color: 'green' }, // Status 'done' is green
            { label: 'Active Pickups', value: inquiries.filter(i => i.status === 'picked_up').length, color: 'teal' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</div>
              <div className={`text-4xl font-black font-display text-${stat.color === 'slate' ? 'slate-900' : stat.color + '-600'}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* List */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Inquiry History</h3>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[48px] border border-dashed border-slate-200 shadow-xl shadow-slate-200/20">
              <Clock className="animate-spin text-slate-200 mb-4" size={48} />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Fetching your history...</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-20 bg-white rounded-[48px] border border-dashed border-slate-200 text-center shadow-xl shadow-slate-200/20">
              <div className="p-8 bg-slate-50 rounded-full mb-6">
                <Search size={48} className="text-slate-200" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">No inquiries yet</h4>
              <p className="text-slate-500 mb-8 max-w-sm font-medium">Start your recycling journey by listing your first appliance for sale.</p>
              <Link href="/" className="bg-teal-600 text-white px-10 py-4 rounded-full font-bold hover:bg-teal-700 transition shadow-lg shadow-teal-600/20">List an Appliance</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {inquiries.map((inq, i) => (
                  <motion.div 
                    key={inq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-[40px] shadow-xl shadow-slate-200/30 border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group"
                  >
                    <div className="aspect-video relative bg-slate-100 overflow-hidden">
                      {inq.images?.[0] ? (
                        <img src={inq.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                          <Package size={48} />
                        </div>
                      )}
                      <div className="absolute top-5 right-5">
                        <span className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border shadow-sm backdrop-blur-xl ${getStatusColor(inq.status)}`}>
                          {getStatusIcon(inq.status)}
                          {inq.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 mb-1 font-display">{inq.applianceType}</h4>
                          <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest">{inq.brand}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pickup Date</div>
                          <div className="text-sm font-bold text-slate-700">{inq.pickupDate}</div>
                        </div>
                      </div>

                      <div className="space-y-4 py-5 border-y border-slate-50 mb-6">
                        <p className="text-slate-500 text-sm line-clamp-2 italic leading-relaxed">&quot;{inq.condition}&quot;</p>
                        <div className="flex items-start gap-2 text-xs text-slate-400 font-medium">
                          <MapPin size={14} className="shrink-0 mt-0.5 text-slate-300" />
                          <span>{inq.city}, {inq.address}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                          #ID-{inq.id.slice(-6).toUpperCase()}
                        </div>
                        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                          {inq.createdAt instanceof Timestamp ? inq.createdAt.toDate().toLocaleDateString() : 'Recent'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
