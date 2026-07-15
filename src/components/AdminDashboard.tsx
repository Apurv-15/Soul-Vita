"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Search,
  Trash2,
  Check,
  Clock,
  ArrowLeft,
  RefreshCw,
  Download,
  AlertCircle,
  Briefcase,
  Layers,
  ChevronDown,
  CheckCircle,
  Truck,
  LogIn,
  LogOut,
  Lock
} from 'lucide-react';
import { PRODUCTS } from '../data';
import { db, auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  writeBatch,
  getDocs
} from 'firebase/firestore';

interface Submission {
  id: string;
  type: 'trade' | 'sample';
  timestamp: string;
  status: 'pending' | 'reviewed' | 'dispatched';
  data: {
    name?: string;
    firstName?: string;
    lastName?: string;
    company: string;
    jobTitle?: string;
    email: string;
    phone: string;
    country: string;
    businessType: string;
    message?: string;
    variants?: string[];
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    notes?: string;
    confirmed?: boolean;
  };
}

interface AdminDashboardProps {
  onBackToHome?: () => void;
}



export default function AdminDashboard({ onBackToHome }: AdminDashboardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  // Active inquiries state for the actual dashboard
  const [inquiries, setInquiries] = useState<Submission[]>([]);
  const [activeTypeTab, setActiveTypeTab] = useState<'all' | 'trade' | 'sample'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Rate Limiting & Cooldown Lockout State
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState<number>(0);

  // Setup authentication state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  // Cooldown timer tick down
  useEffect(() => {
    if (!lockoutUntil) return;
    const checkLockout = () => {
      const now = Date.now();
      if (now >= lockoutUntil) {
        setLockoutUntil(null);
        setLockoutTimeLeft(0);
      } else {
        setLockoutTimeLeft(Math.ceil((lockoutUntil - now) / 1000));
      }
    };
    checkLockout();
    const interval = setInterval(checkLockout, 1000);
    return () => clearInterval(interval);
  }, [lockoutUntil]);

  // Setup real-time listener to Firestore (only active when logged in)
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'inquiries'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedInquiries: Submission[] = [];
      snapshot.forEach((doc) => {
        fetchedInquiries.push({
          id: doc.id,
          ...doc.data()
        } as Submission);
      });
      setInquiries(fetchedInquiries);
    }, (err) => {
      console.error('Error listening to inquiries:', err);
    });

    return () => unsubscribe();
  }, [user]);

  // Handle Auth Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutUntil && Date.now() < lockoutUntil) {
      return;
    }
    setAuthError('');
    setLoadingLogin(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setFailedAttempts(0);
      setLockoutUntil(null);
    } catch (err: any) {
      console.error('Login failed:', err);
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 5) {
        const cooldown = Date.now() + 60000; // 60-second cooldown
        setLockoutUntil(cooldown);
        setFailedAttempts(0);
        setAuthError('Too many failed login attempts. Input is temporarily locked for 60 seconds.');
      } else {
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          setAuthError(`Incorrect email or password. Attempt ${newAttempts} of 5 before temporary block.`);
        } else {
          setAuthError(err.message || 'Failed to authenticate. Please check connection.');
        }
      }
    } finally {
      setLoadingLogin(false);
    }
  };

  // Update Status
  const handleUpdateStatus = async (id: string, newStatus: 'pending' | 'reviewed' | 'dispatched') => {
    try {
      const docRef = doc(db, 'inquiries', id);
      await updateDoc(docRef, { status: newStatus });
    } catch (err) {
      console.error('Error updating status in Firestore:', err);
      alert('Failed to update status. Please try again.');
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this submission?')) return;
    try {
      const docRef = doc(db, 'inquiries', id);
      await deleteDoc(docRef);
      if (expandedId === id) setExpandedId(null);
    } catch (err) {
      console.error('Error deleting inquiry from Firestore:', err);
      alert('Failed to delete inquiry. Please try again.');
    }
  };



  const loadInquiries = () => {
    // Left as no-op or status message since onSnapshot keeps it synced in real-time
    console.log('Real-time sync active, manually refreshed snapshot connection.');
  };

  // Export CSV
  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'ID,Type,Date,Status,Company,Name/Contact,Email,Phone,Country,Business Type,Details/Notes,Address/Variants\n';
    
    inquiries.forEach(sub => {
      const type = sub.type.toUpperCase();
      const date = new Date(sub.timestamp).toLocaleString().replace(/,/g, '');
      const status = sub.status.toUpperCase();
      const company = `"${sub.data.company.replace(/"/g, '""')}"`;
      const name = sub.type === 'trade' 
        ? `"${(sub.data.name || '').replace(/"/g, '""')}"`
        : `"${(sub.data.firstName + ' ' + sub.data.lastName).replace(/"/g, '""')}"`;
      const email = sub.data.email;
      const phone = sub.data.phone;
      const country = sub.data.country;
      const businessType = sub.data.businessType;
      
      const message = sub.type === 'trade'
        ? `"${(sub.data.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
        : `"${(sub.data.notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;
        
      const additional = sub.type === 'trade'
        ? 'N/A'
        : `"${[
            sub.data.address1, 
            sub.data.address2, 
            sub.data.city, 
            sub.data.state, 
            sub.data.zip,
            `Variants: ${(sub.data.variants || []).join('|')}`
          ].filter(Boolean).join(', ').replace(/"/g, '""')}"`;

      csvContent += `${sub.id},${type},${date},${status},${company},${name},${email},${phone},${country},${businessType},${message},${additional}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `soul_viva_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter computations
  const filteredInquiries = inquiries.filter(item => {
    // Type tab
    if (activeTypeTab !== 'all' && item.type !== activeTypeTab) return false;
    
    // Status filter
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    
    // Country filter
    if (filterCountry !== 'all' && item.data.country !== filterCountry) return false;
    
    // Search filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const company = item.data.company.toLowerCase();
      const email = item.data.email.toLowerCase();
      const phone = item.data.phone.toLowerCase();
      const text = item.type === 'trade' 
        ? (item.data.name || '').toLowerCase() + ' ' + (item.data.message || '').toLowerCase()
        : (item.data.firstName || '').toLowerCase() + ' ' + (item.data.lastName || '').toLowerCase() + ' ' + (item.data.notes || '').toLowerCase();
      
      if (!company.includes(q) && !email.includes(q) && !phone.includes(q) && !text.includes(q)) {
        return false;
      }
    }
    
    return true;
  });

  // Extract unique countries for filter dropdown
  const uniqueCountries = Array.from(new Set(inquiries.map(item => item.data.country))).filter(Boolean);

  // Metrics
  const totalCount = inquiries.length;
  const tradeCount = inquiries.filter(i => i.type === 'trade').length;
  const sampleCount = inquiries.filter(i => i.type === 'sample').length;
  const pendingCount = inquiries.filter(i => i.status === 'pending').length;
  const reviewedCount = inquiries.filter(i => i.status === 'reviewed').length;
  const dispatchedCount = inquiries.filter(i => i.status === 'dispatched').length;

  if (loadingAuth) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-transparent">
        <div className="w-10 h-10 rounded-full border-[3px] border-stone-250 border-t-[#2D3A2F] animate-spin" />
        <span className="text-[11px] tracking-[0.25em] uppercase text-[#2D3A2F]/50 font-sans font-semibold">Verifying credentials...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full min-h-[80vh] flex items-center justify-center px-4 py-8 bg-transparent select-text">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[520px] bg-white rounded-[32px] p-10 md:p-12 border border-[#E5DEC1]/60 shadow-xl space-y-8 text-left"
        >
          <div className="text-center space-y-3.5">
            <div className="w-16 h-16 bg-[#2D3A2F]/5 text-[#2D3A2F] rounded-[20px] flex items-center justify-center mx-auto border border-[#E5DEC1]/30">
              <Lock className="w-7 h-7 stroke-[1.8]" />
            </div>
            <h2 className="font-display text-[32px] font-normal text-neutral-800 tracking-tight">Admin Authentication</h2>
            <p className="font-sans text-sm text-neutral-500 font-light leading-relaxed max-w-md mx-auto">
              Access is restricted to authorized brand administrators of Belleaves Private Limited.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-[11px] tracking-widest font-bold uppercase text-neutral-500 block">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                disabled={loadingLogin || !!lockoutUntil}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@belleaves.com"
                className="w-full bg-[#FAF9F5] border border-neutral-200/80 rounded-2xl px-5 py-4 text-base font-sans placeholder-neutral-400 text-neutral-800 focus:outline-none focus:border-[#2D3A2F] focus:ring-1 focus:ring-[#2D3A2F]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-[11px] tracking-widest font-bold uppercase text-neutral-500 block">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                disabled={loadingLogin || !!lockoutUntil}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#FAF9F5] border border-neutral-200/80 rounded-2xl px-5 py-4 text-base font-sans placeholder-neutral-400 text-neutral-800 focus:outline-none focus:border-[#2D3A2F] focus:ring-1 focus:ring-[#2D3A2F]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {lockoutUntil && (
              <div className="flex items-start gap-2.5 text-sm text-amber-700 bg-amber-50/50 border border-amber-100 rounded-2xl p-4 leading-relaxed font-sans">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>Temporary login lockout active. Please wait <strong>{lockoutTimeLeft}s</strong>.</span>
              </div>
            )}

            {authError && !lockoutUntil && (
              <div className="flex items-start gap-2.5 text-sm text-red-650 bg-red-50/50 border border-red-100 rounded-2xl p-4 leading-relaxed font-sans">
                <AlertCircle className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loadingLogin || !!lockoutUntil}
              className="w-full flex items-center justify-center gap-2.5 bg-[#2D3A2F] hover:bg-[#1E2720] disabled:bg-neutral-300 text-white rounded-2xl py-4 text-sm font-bold tracking-widest uppercase cursor-pointer transition-all duration-300 active:scale-[0.985] shadow-md hover:shadow-lg disabled:cursor-not-allowed"
            >
              {loadingLogin ? (
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Authenticate
                </>
              )}
            </button>
          </form>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="w-full text-center text-xs font-sans font-bold tracking-widest uppercase text-neutral-500 hover:text-black transition-colors pt-3 block cursor-pointer"
            >
              Cancel & Return Home
            </button>
          )}
        </motion.div>
      </div>
    );
  }



  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16 bg-transparent select-text">
      
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="space-y-3 text-left">
          <span className="font-sans text-[10px] tracking-[0.3em] text-[#2d5a56] font-bold uppercase block">
            B2B OPERATIONAL PORTAL
          </span>
          <h1 className="font-display text-[42px] font-normal leading-none text-neutral-900 tracking-tight">
            Inquiry Dashboard
          </h1>
          <p className="font-sans text-xs md:text-sm text-neutral-500 font-light max-w-xl leading-relaxed select-text">
            Admin console for evaluating general trade enquiries, tracking logistics requests, and managing product sample dispatch logs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={loadInquiries}
            className="flex items-center gap-2 font-sans text-xs font-bold tracking-wider uppercase text-neutral-600 hover:text-black bg-white border border-neutral-200 hover:border-neutral-400 rounded-xl px-4 py-3 cursor-pointer transition-all duration-300 active:scale-97 shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
          
          <button
            onClick={handleExportCSV}
            disabled={inquiries.length === 0}
            className="flex items-center gap-2 font-sans text-xs font-bold tracking-wider uppercase text-neutral-600 hover:text-black bg-white border border-neutral-200 hover:border-neutral-400 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl px-4 py-3 cursor-pointer transition-all duration-300 active:scale-97 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>

          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 font-sans text-xs font-bold tracking-wider uppercase bg-[#2D3A2F] hover:bg-[#1E2720] text-white rounded-xl px-5 py-3 cursor-pointer transition-all duration-300 active:scale-97 shadow-sm hover:shadow"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return
            </button>
          )}

          <button
            onClick={async () => {
              try {
                await signOut(auth);
              } catch (err) {
                console.error('Sign out error:', err);
              }
            }}
            className="flex items-center gap-2 font-sans text-xs font-bold tracking-wider uppercase bg-stone-250 hover:bg-stone-300 border border-neutral-300 text-neutral-700 rounded-xl px-5 py-3 cursor-pointer transition-all duration-300 active:scale-97 shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* METRICS Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Metric 1: Total inquiries */}
        <div className="bg-white rounded-3xl p-6 border border-[#E5DEC1]/60 shadow-xs flex flex-col justify-between text-left space-y-4">
          <div>
            <span className="text-[10px] tracking-widest font-bold uppercase text-neutral-400 block">Total Enquiries</span>
            <span className="font-display text-3xl md:text-4xl font-normal text-neutral-800 block mt-2">{totalCount}</span>
          </div>
          <div className="text-[10px] text-neutral-500 font-light pt-2 border-t border-stone-100 flex justify-between">
            <span>Trade: <strong>{tradeCount}</strong></span>
            <span>Samples: <strong>{sampleCount}</strong></span>
          </div>
        </div>

        {/* Metric 2: Pending Reviews */}
        <div className="bg-white rounded-3xl p-6 border border-[#E5DEC1]/60 shadow-xs flex flex-col justify-between text-left space-y-4">
          <div>
            <span className="text-[10px] tracking-widest font-bold uppercase text-neutral-400 block">Pending Review</span>
            <span className="font-display text-3xl md:text-4xl font-normal text-amber-600 block mt-2">{pendingCount}</span>
          </div>
          <div className="text-[10px] text-neutral-500 font-light pt-2 border-t border-stone-100 flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-amber-500" />
            <span>Awaiting buyer response audit</span>
          </div>
        </div>

        {/* Metric 3: Reviewed and Approved */}
        <div className="bg-white rounded-3xl p-6 border border-[#E5DEC1]/60 shadow-xs flex flex-col justify-between text-left space-y-4">
          <div>
            <span className="text-[10px] tracking-widest font-bold uppercase text-neutral-400 block">Reviewed Trade</span>
            <span className="font-display text-3xl md:text-4xl font-normal text-teal-600 block mt-2">{reviewedCount}</span>
          </div>
          <div className="text-[10px] text-neutral-500 font-light pt-2 border-t border-stone-100 flex items-center gap-1.5">
            <CheckCircle className="w-3 h-3 text-teal-500" />
            <span>B2B verification completed</span>
          </div>
        </div>

        {/* Metric 4: Samples Dispatched */}
        <div className="bg-white rounded-3xl p-6 border border-[#E5DEC1]/60 shadow-xs flex flex-col justify-between text-left space-y-4">
          <div>
            <span className="text-[10px] tracking-widest font-bold uppercase text-neutral-400 block">Samples Dispatched</span>
            <span className="font-display text-3xl md:text-4xl font-normal text-emerald-700 block mt-2">{dispatchedCount}</span>
          </div>
          <div className="text-[10px] text-neutral-500 font-light pt-2 border-t border-stone-100 flex items-center gap-1.5">
            <Truck className="w-3 h-3 text-emerald-600" />
            <span>Fulfillment log dispatched</span>
          </div>
        </div>

      </div>

      {/* FILTER PANEL AND SEARCH */}
      <div className="bg-white border border-[#E5DEC1]/60 rounded-3xl p-6 shadow-sm mb-8 space-y-6 text-left">
        
        {/* Search and Filters grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search bar */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by company, name, email or message..."
              className="w-full pl-11 pr-4 py-3 bg-[#FAF9F5] border border-stone-200 focus:border-[#5EC7B6] focus:ring-1 focus:ring-[#5EC7B6]/20 rounded-xl text-xs font-medium text-neutral-800 outline-none transition-all placeholder:text-neutral-400"
            />
          </div>

          {/* Country filter */}
          <div>
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="w-full bg-[#FAF9F5] border border-stone-200 focus:border-[#5EC7B6] rounded-xl px-4 py-3 text-xs font-semibold text-neutral-700 outline-none cursor-pointer"
            >
              <option value="all">All Countries</option>
              {uniqueCountries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-[#FAF9F5] border border-stone-200 focus:border-[#5EC7B6] rounded-xl px-4 py-3 text-xs font-semibold text-neutral-700 outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="dispatched">Dispatched</option>
            </select>
          </div>
        </div>

        {/* Tab filters and admin commands row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-stone-100 pt-4 gap-4">
          <div className="flex bg-neutral-100 p-1 rounded-xl w-fit">
            <button
              onClick={() => setActiveTypeTab('all')}
              className={`px-4 py-2 rounded-lg font-sans text-xs font-bold tracking-wider uppercase cursor-pointer transition-all ${
                activeTypeTab === 'all' 
                  ? 'bg-white text-neutral-800 shadow-xs' 
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setActiveTypeTab('trade')}
              className={`px-4 py-2 rounded-lg font-sans text-xs font-bold tracking-wider uppercase cursor-pointer transition-all ${
                activeTypeTab === 'trade' 
                  ? 'bg-white text-neutral-800 shadow-xs' 
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              Trade Inquiries
            </button>
            <button
              onClick={() => setActiveTypeTab('sample')}
              className={`px-4 py-2 rounded-lg font-sans text-xs font-bold tracking-wider uppercase cursor-pointer transition-all ${
                activeTypeTab === 'sample' 
                  ? 'bg-white text-neutral-800 shadow-xs' 
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              Sample Requests
            </button>
          </div>


        </div>

      </div>

      {/* SUBMISSIONS LIST */}
      <div className="space-y-4">
        {filteredInquiries.length > 0 ? (
          filteredInquiries.map((item, index) => {
            const isExpanded = expandedId === item.id;
            const formattedDate = new Date(item.timestamp).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={item.id}
                className={`bg-white border rounded-3xl transition-all duration-300 overflow-hidden text-left ${
                  isExpanded 
                    ? 'border-[#2D5A56] shadow-md ring-1 ring-[#2D5A56]/20' 
                    : 'border-[#E5DEC1]/60 hover:border-neutral-300 shadow-xs'
                }`}
              >
                
                {/* Header row (Click to expand) */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-8 md:p-10 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 select-none hover:bg-stone-50/50 transition-colors"
                >
                  <div className="flex items-center gap-5">
                    {/* Icon based on type */}
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                      item.type === 'trade' 
                        ? 'bg-[#E8F3F1] text-[#2d5a56] border border-[#C5DFDA]' 
                        : 'bg-indigo-50 text-indigo-700 border border-indigo-150'
                    }`}>
                      {item.type === 'trade' ? <Briefcase className="w-7 h-7" /> : <Layers className="w-7 h-7" />}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-sans text-sm sm:text-base font-bold text-neutral-800 select-text">
                          {item.type === 'trade' 
                            ? item.data.name 
                            : `${item.data.firstName} ${item.data.lastName}`}
                        </span>
                        <span className="font-mono text-[10px] sm:text-xs text-neutral-400 bg-neutral-100 rounded px-2 py-0.5">
                          {item.data.company}
                        </span>
                        
                        {/* Type badge */}
                        <span className={`text-[10px] sm:text-xs uppercase tracking-wider font-bold px-2.5 py-1 rounded-full ${
                          item.type === 'trade' 
                            ? 'bg-[#C5DFDA]/40 text-[#2d5a56]' 
                            : 'bg-indigo-100/60 text-indigo-700'
                        }`}>
                          {item.type === 'trade' ? 'Trade Inquiry' : 'Sample Request'}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-neutral-400 text-xs sm:text-sm font-light select-text">
                        <span>{item.data.businessType}</span>
                        <span>&bull;</span>
                        <span>{item.data.country}</span>
                        <span>&bull;</span>
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-auto">
                    {/* Status Badge */}
                    <span className={`text-xs tracking-wider uppercase font-bold px-4 py-2 rounded-full border ${
                      item.status === 'pending'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : item.status === 'reviewed'
                        ? 'bg-teal-50 text-teal-700 border-teal-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {item.status}
                    </span>

                    {/* Delete button */}
                    <button
                      onClick={(e) => handleDeleteInquiry(item.id, e)}
                      className="p-3 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details Pane */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-stone-100 bg-[#FAF9F5]/40"
                    >
                      <div className="p-6 md:p-8 space-y-6">
                        
                        {/* Bento Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Col 1: Contact card */}
                          <div className="bg-white border border-[#E5DEC1]/40 rounded-2xl p-5 space-y-4">
                            <h4 className="text-[10px] tracking-widest font-bold uppercase text-neutral-400 border-b border-stone-100 pb-2">
                              Contact Channels
                            </h4>
                            
                            <div className="space-y-3 font-sans text-xs">
                              {/* Email */}
                              <div className="flex items-center gap-3.5 select-text">
                                <Mail className="w-4 h-4 text-neutral-400" />
                                <div>
                                  <span className="block text-[9px] uppercase font-bold text-neutral-400">Email</span>
                                  <a href={`mailto:${item.data.email}`} className="font-semibold text-[#2D5A56] hover:underline">
                                    {item.data.email}
                                  </a>
                                </div>
                              </div>

                              {/* Phone */}
                              {item.data.phone && (
                                <div className="flex items-center gap-3.5 select-text">
                                  <Phone className="w-4 h-4 text-neutral-400" />
                                  <div>
                                    <span className="block text-[9px] uppercase font-bold text-neutral-400">Phone / WhatsApp</span>
                                    <a href={`tel:${item.data.phone}`} className="font-semibold text-neutral-800 hover:underline">
                                      {item.data.phone}
                                    </a>
                                  </div>
                                </div>
                              )}

                              {/* Job Title */}
                              {item.data.jobTitle && (
                                <div className="flex items-center gap-3.5 select-text">
                                  <Briefcase className="w-4 h-4 text-neutral-400" />
                                  <div>
                                    <span className="block text-[9px] uppercase font-bold text-neutral-400">Job Title</span>
                                    <span className="font-semibold text-neutral-850">
                                      {item.data.jobTitle}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {/* Country & Biz */}
                              <div className="flex items-center gap-3.5 select-text">
                                <Globe className="w-4 h-4 text-neutral-400" />
                                <div>
                                  <span className="block text-[9px] uppercase font-bold text-neutral-400">Demographics & Biz</span>
                                  <span className="font-semibold text-neutral-850">
                                    {item.data.country} ({item.data.businessType})
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Col 2 & 3: Content / Request Details */}
                          <div className="md:col-span-2 bg-white border border-[#E5DEC1]/40 rounded-2xl p-5 flex flex-col justify-between">
                            
                            {item.type === 'trade' ? (
                              // Trade details
                              <div className="space-y-3 h-full">
                                <h4 className="text-[10px] tracking-widest font-bold uppercase text-neutral-400 border-b border-stone-100 pb-2">
                                  Enquiry Message
                                </h4>
                                <p className="font-sans text-xs text-neutral-700 leading-relaxed font-light select-text whitespace-pre-line">
                                  {item.data.message || 'No additional message was provided.'}
                                </p>
                              </div>
                            ) : (
                              // Sample Request details
                              <div className="space-y-4">
                                <h4 className="text-[10px] tracking-widest font-bold uppercase text-neutral-400 border-b border-stone-100 pb-2">
                                  Sample Pack Configuration
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  
                                  {/* Requested Variants */}
                                  <div className="space-y-2">
                                    <span className="block text-[9px] uppercase font-bold text-neutral-400">Selected Soap Bars</span>
                                    <div className="flex flex-wrap gap-1.5">
                                      {item.data.variants && item.data.variants.length > 0 ? (
                                        item.data.variants.map(vId => {
                                          const prod = PRODUCTS.find(p => p.id === vId);
                                          return (
                                            <span
                                              key={vId}
                                              className="inline-block bg-[#F5F2EB] text-neutral-700 border border-stone-200 px-2 py-1 rounded-md text-[10px] font-semibold"
                                            >
                                              {prod ? prod.name : vId}
                                            </span>
                                          );
                                        })
                                      ) : (
                                        <span className="text-[10px] text-red-500 flex items-center gap-1 font-medium">
                                          <AlertCircle className="w-3 h-3" />
                                          No variants selected
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Address */}
                                  <div className="space-y-1 select-text">
                                    <span className="block text-[9px] uppercase font-bold text-neutral-400">Delivery Address</span>
                                    <div className="font-sans text-xs font-light text-neutral-700 leading-relaxed flex items-start gap-1">
                                      <MapPin className="w-3.5 h-3.5 text-neutral-400 mt-0.5 shrink-0" />
                                      <div>
                                        <span className="font-medium block">{item.data.address1}</span>
                                        {item.data.address2 && <span className="block">{item.data.address2}</span>}
                                        <span>
                                          {item.data.city}, {item.data.state && `${item.data.state}, `} {item.data.zip}
                                        </span>
                                        <span className="block font-medium uppercase text-stone-500 mt-0.5">{item.data.country}</span>
                                      </div>
                                    </div>
                                  </div>

                                </div>

                                {item.data.notes && (
                                  <div className="space-y-1 pt-2 border-t border-stone-100 select-text">
                                    <span className="block text-[9px] uppercase font-bold text-neutral-400">Special Notes & Attachments</span>
                                    <p className="font-sans text-xs text-neutral-600 font-light leading-relaxed">
                                      {item.data.notes}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}

                          </div>
                        </div>

                        {/* Status Admin Control Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-100 select-none">
                          <div className="flex items-center gap-2">
                            <span className="font-sans text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                              Update Status:
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleUpdateStatus(item.id, 'pending')}
                                className={`px-2.5 py-1.5 rounded-lg font-sans text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                  item.status === 'pending'
                                    ? 'bg-amber-100 border border-amber-300 text-amber-800'
                                    : 'bg-white border border-stone-200 text-neutral-500 hover:text-black hover:border-neutral-400'
                                }`}
                              >
                                Pending
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(item.id, 'reviewed')}
                                className={`px-2.5 py-1.5 rounded-lg font-sans text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                  item.status === 'reviewed'
                                    ? 'bg-teal-100 border border-teal-300 text-teal-800'
                                    : 'bg-white border border-stone-200 text-neutral-500 hover:text-black hover:border-neutral-400'
                                }`}
                              >
                                Reviewed
                              </button>
                              {item.type === 'sample' && (
                                <button
                                  onClick={() => handleUpdateStatus(item.id, 'dispatched')}
                                  className={`px-2.5 py-1.5 rounded-lg font-sans text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                    item.status === 'dispatched'
                                      ? 'bg-emerald-100 border border-emerald-300 text-emerald-800'
                                      : 'bg-white border border-stone-200 text-neutral-500 hover:text-black hover:border-neutral-400'
                                  }`}
                                >
                                  Dispatched
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="text-[10px] text-neutral-400 font-mono">
                            ID: {item.id}
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })
        ) : (
          <div className="bg-white border border-[#E5DEC1]/60 rounded-3xl p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-sans text-sm font-semibold text-neutral-800">No submissions found</h4>
              <p className="font-sans text-xs text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                Try resetting search queries and filters, or wait for a new B2B trade inquiry form submission.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
