import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-black text-teal-600 font-display">404</h1>
          <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-tight">Page Not Found</h2>
          <p className="text-slate-500 font-medium">
            The recycling page you are looking for doesn't exist or has been moved to a new location.
          </p>
        </div>
        <div className="pt-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
