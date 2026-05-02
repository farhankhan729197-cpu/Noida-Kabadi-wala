'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../components/AuthContext';
import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Truck, Package, Phone, MapPin, ExternalLink, Filter, ChevronDown, Loader2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { profile, isAdmin, loading: authLoading } = useAuth();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, authLoading, router]);

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(
      collection(db, 'inquiries'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInquiries(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const updateStatus = async (inquiryId: string, newStatus: string) => {
    setUpdatingId(inquiryId);
    try {
      await updateDoc(doc(db, 'inquiries', inquiryId), {
        status: newStatus,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'picked_up': return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'done': return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const filteredInquiries = filter === 'all' 
    ? inquiries 
    : inquiries.filter(i => i.status === filter);

  if (authLoading || !isAdmin) return <div className="min-h-screen flex items-center justify-center p-20 bg-slate-50"><Loader2 className="animate-spin text-teal-600" size={48} /></div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      <Navbar />

      <main className="pt-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full w-fit mb-4 border border-teal-100">
              Admin Control Panel
            </div>
            <h1 className="text-4xl font-black font-display uppercase tracking-tight text-slate-900 leading-none mb-3">Manage Inquiries</h1>
            <p className="text-slate-500 font-medium text-sm">Review, track and update appliance pickup requests.</p>
          </div>

          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100">
            <Filter size={18} className="text-slate-400 ml-2" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-sm font-bold text-slate-700 outline-none pr-8 cursor-pointer"
            >
              <option value="all">All Inquiries</option>
              <option value="pending">Pending Only</option>
              <option value="picked_up">In Transit</option>
              <option value="done">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Desktop View Table */}
        <div className="bg-white rounded-[48px] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900 text-white border-b border-slate-800">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest opacity-60">Customer & Item</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest opacity-60">Location & Date</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest opacity-60">Photos</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest opacity-60">Control Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence>
                  {loading ? (
                    <tr><td colSpan={4} className="px-8 py-32 text-center text-slate-300 font-bold uppercase tracking-widest text-[10px]">Loading records...</td></tr>
                  ) : filteredInquiries.length === 0 ? (
                    <tr><td colSpan={4} className="px-8 py-32 text-center text-slate-300 font-bold uppercase tracking-widest text-[10px]">No inquiries found matching filter</td></tr>
                  ) : (
                    filteredInquiries.map((inq, i) => (
                      <motion.tr 
                        key={inq.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-8 py-8">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 font-display text-lg mb-0.5">{inq.applianceType}</span>
                            <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest mb-3">{inq.brand}</span>
                            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-1">
                              <User size={14} className="text-slate-300" />
                              {inq.customerName}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                              <Phone size={14} className="text-slate-300" />
                              {inq.customerPhone || inq.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-8">
                          <div className="flex flex-col text-sm max-w-xs font-medium">
                            <div className="flex items-start gap-2 text-slate-600 mb-3 leading-relaxed">
                              <MapPin size={16} className="text-teal-500 shrink-0 mt-1" />
                              <span>{inq.city}, {inq.address}</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 w-fit text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                              Pickup: <span className="text-slate-900">{inq.pickupDate}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-8">
                          <div className="flex gap-2 flex-wrap max-w-[180px]">
                            {inq.images?.map((url: string, idx: number) => (
                              <a href={url} target="_blank" key={idx} className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 hover:border-teal-400 transition-all duration-300 block relative group shadow-sm">
                                <img src={url} className="w-full h-full object-cover" alt="" />
                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                  <ExternalLink size={14} className="text-white" />
                                </div>
                              </a>
                            ))}
                            {(!inq.images || inq.images.length === 0) && <span className="text-slate-200 italic font-medium text-xs">No Photos</span>}
                          </div>
                        </td>
                        <td className="px-8 py-8">
                          <div className="flex flex-col gap-3 min-w-[140px]">
                            <div className="relative group/status">
                              <div className={`flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest cursor-pointer shadow-sm ${getStatusColor(inq.status)}`}>
                                {inq.status.replace('_', ' ')}
                                <ChevronDown size={14} />
                              </div>
                              <div className="absolute right-0 top-full mt-2 hidden group-hover/status:block bg-white shadow-2xl rounded-[32px] border border-slate-100 p-3 z-20 w-52 overflow-hidden animate-in fade-in zoom-in duration-200">
                                {['pending', 'picked_up', 'done', 'rejected'].map(s => (
                                  <button 
                                    key={s}
                                    onClick={() => updateStatus(inq.id, s)}
                                    disabled={updatingId === inq.id}
                                    className={`w-full text-left px-4 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:bg-slate-50 flex items-center justify-between ${inq.status === s ? 'text-teal-600 bg-teal-50' : 'text-slate-500'}`}
                                  >
                                    {s.replace('_', ' ')}
                                    {updatingId === inq.id ? <Loader2 className="animate-spin" size={12} /> : (inq.status === s && <CheckCircle2 size={12} />)}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="text-[9px] font-bold text-slate-300 text-center uppercase tracking-widest">
                              REF: #{inq.id.slice(-8).toUpperCase()}
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function getStatusColorStatic(status: string) {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'picked_up': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'done': return 'bg-green-100 text-green-700 border-green-200';
    case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}
