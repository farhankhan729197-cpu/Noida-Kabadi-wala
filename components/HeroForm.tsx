'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, X, MapPin, Calendar, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from './AuthContext';
import { db, storage, OperationType, handleFirestoreError } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';

const SERVICE_AREAS = [
  'Noida', 'Greater Noida', 'Delhi', 'Ghaziabad', 
  'Vasundhara', 'Vaishali', 'Kaushambi'
];

const APPLIANCE_TYPES = [
  'AC (Split/Window)', 'Refrigerator', 'Washing Machine', 
  'Inverter/Battery', 'Microwave', 'LCD/LED TV', 'Others'
];

const formSchema = z.object({
  applianceType: z.string().min(1, 'Please select an appliance type'),
  brand: z.string().min(1, 'Please enter brand/model info'),
  condition: z.string().min(1, 'Please describe the condition'),
  address: z.string().min(10, 'Please provide a detailed address'),
  city: z.string().min(1, 'Please select your city'),
  pickupDate: z.string().min(1, 'Please select a pickup date'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

export default function HeroForm() {
  const { user, profile } = useAuth();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: profile?.phone || '',
    },
  });

  const onSubmit = async (data: any) => {
    if (!user) {
      router.push('/login?callback=/');
      return;
    }

    setUploading(true);
    try {
      const imageUrls = [];
      const prefix = `sub_${user.uid.slice(0, 5)}`;
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageRef = ref(storage, `inquiries/${user.uid}/${prefix}_${i}_${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        imageUrls.push(url);
      }

      await addDoc(collection(db, 'inquiries'), {
        ...data,
        userId: user.uid,
        customerName: profile?.name || user.displayName || 'Anonymous',
        status: 'pending',
        images: imageUrls,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setSuccess(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'inquiries');
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 text-center max-w-md mx-auto"
      >
        <div className="flex justify-center mb-4 text-teal-500">
          <CheckCircle2 size={64} />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-slate-800">Request Received!</h3>
        <p className="text-slate-500 mb-6 font-medium">
          Our team will contact you shortly to confirm the pickup and final price.
        </p>
        <button 
          onClick={() => router.push('/dashboard')}
          className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all"
        >
          Track My Request
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 max-w-lg w-full">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">Get a Quick Quote</h2>
        <p className="text-xs text-slate-400 mt-1 font-bold uppercase tracking-widest">Immediate Valuation • Free Pickup</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 tracking-wider">Appliance Type</label>
              <select 
                {...register('applianceType')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none font-medium text-slate-800"
              >
                <option value="">Select Category</option>
                {APPLIANCE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.applianceType && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.applianceType.message as string}</p>}
            </div>

            <div className="col-span-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 tracking-wider">Brand Information</label>
              <input 
                {...register('brand')}
                placeholder="e.g. LG Split 1.5T"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none font-medium text-slate-800 placeholder:text-slate-300"
              />
              {errors.brand && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.brand.message as string}</p>}
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 tracking-wider">Condition Details</label>
              <textarea 
                {...register('condition')}
                placeholder="e.g. Working condition, with remote, 4 years old"
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none font-medium text-slate-800 placeholder:text-slate-300 resize-none"
              />
              {errors.condition && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.condition.message as string}</p>}
            </div>

            <button 
              type="button"
              onClick={() => setStep(2)}
              className="col-span-2 mt-2 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-200 flex items-center justify-center gap-2 group"
            >
              Pickup Details
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 tracking-wider">Service City</label>
              <select 
                {...register('city')}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none font-medium text-slate-800"
              >
                <option value="">Select City</option>
                {SERVICE_AREAS.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              {errors.city && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.city.message as string}</p>}
            </div>

            <div className="col-span-1">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 tracking-wider">Preferred Date</label>
              <div className="relative">
                <input 
                  type="date"
                  {...register('pickupDate')}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none font-medium text-slate-800"
                />
              </div>
              {errors.pickupDate && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.pickupDate.message as string}</p>}
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 tracking-wider">Detailed Address</label>
              <textarea 
                {...register('address')}
                placeholder="Noida Sectors, Ghaziabad, or Delhi address"
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none font-medium text-slate-800 placeholder:text-slate-300 resize-none"
              />
              {errors.address && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.address.message as string}</p>}
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 tracking-wider">Mobile Number</label>
              <input 
                {...register('phone')}
                placeholder="10 digit number for coordination"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none font-medium text-slate-800 placeholder:text-slate-300"
              />
              {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase">{errors.phone.message as string}</p>}
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5 tracking-wider">Upload Items (Max 5)</label>
              <div className="flex flex-wrap gap-2 mb-2">
                <AnimatePresence>
                  {images.map((img, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-sm"
                    >
                      <img src={URL.createObjectURL(img)} alt="" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeImage(i)}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-xl"
                      >
                        <X size={10} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {images.length < 5 && (
                  <label className="w-16 h-16 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors group">
                    <Upload className="text-slate-400 group-hover:text-teal-600 transition-colors" size={18} />
                    <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>
            </div>

            <div className="col-span-2 flex gap-4 mt-2">
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-xl hover:bg-slate-200 transition"
              >
                Back
              </button>
              <button 
                type="submit"
                disabled={uploading}
                className="flex-[2] bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                  </>
                ) : (
                  'Submit Quote'
                )}
              </button>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}
