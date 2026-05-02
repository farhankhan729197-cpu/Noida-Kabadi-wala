import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Shield, FileText, Lock, Scale, AlertCircle, MapPin, Zap } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gray-900 p-8 sm:p-12 text-white text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-500/30">
                <FileText size={14} />
                Updated 2024
              </div>
              <h1 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tight mb-4">Terms & Policies</h1>
              <p className="text-gray-400 font-medium max-w-xl mx-auto">
                Please read our service area guidelines, preparation requirements, and payment policies before using our services.
              </p>
            </div>

            {/* Content */}
            <div className="p-8 sm:p-12 space-y-12">
              {/* Section 1 */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                    <MapPin size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 font-display uppercase tracking-tight">Service Area</h2>
                </div>
                <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100">
                  <p className="text-gray-700 font-medium leading-relaxed">
                    Our pickup service is strictly limited to <strong>Delhi, Ghaziabad, Noida, and Greater Noida</strong> (including <strong>Vasundhara, Vaishali, and Kaushambi</strong>). Your location must be within these defined areas to be eligible for free pickup.
                  </p>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-green-50 rounded-2xl text-green-600">
                    <Scale size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 font-display uppercase tracking-tight">Condition & Pricing</h2>
                </div>
                <p className="text-gray-600 font-medium leading-relaxed mb-4">
                  The information, photos, and location you provide must match the actual appliance. Quoted prices represent an estimate based on your description.
                </p>
                <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-2xl text-yellow-800 border border-yellow-100 italic">
                  <AlertCircle className="shrink-0 mt-0.5" size={18} />
                  <p className="text-sm font-bold">Important: Quoted prices may change if the physical condition of the appliance differs from your description or photos.</p>
                </div>
              </section>

              {/* Section 3 */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-50 rounded-2xl text-red-600">
                    <Lock size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 font-display uppercase tracking-tight">Preparation & Safety</h2>
                </div>
                <div className="space-y-4">
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-2">Check & Clean</h4>
                    <p className="text-gray-600 text-sm font-medium leading-relaxed">
                      Please check the appliance thoroughly before pickup. Remove all personal belongings, documents, and data (e.g., from laptops, refrigerators, or storage compartments). We are <strong>not responsible</strong> for personal items left behind.
                    </p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-2">Safe Extraction</h4>
                    <p className="text-gray-600 text-sm font-medium leading-relaxed">
                      Our team will take full care in removing or demounting the appliance to avoid any damage to it or your home. However, ensuring a clear path for removal is the customer&apos;s responsibility.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-purple-50 rounded-2xl text-purple-600">
                    <Zap size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 font-display uppercase tracking-tight">Payment & Returns</h2>
                </div>
                <ul className="space-y-4 font-medium text-gray-600">
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2.5"></div>
                    <p>Payment will be made <strong>only after</strong> our representative verifies the appliance and confirms it matches your description.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2.5"></div>
                    <p>Please release the appliance <strong>only after receiving payment</strong> via Cash, UPI, or Bank Transfer.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2.5"></div>
                    <p className="text-red-600 font-bold uppercase italic">Returns Policy: All sales are final after collection. The item cannot be returned, nor the payment refunded after the transaction is complete.</p>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
