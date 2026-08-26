import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Phone, 
  Mail, 
  Globe, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Filter,
  Check,
  Search,
  ExternalLink
} from 'lucide-react';
import { DemoInquiryLead } from '../../types';
import { leadStore } from '../../services/leadStore';
import { gymConfigStore } from '../../services/gymConfigStore';
import { soundManager } from '../common/SoundEffects';

export const DemoInquiriesPanel: React.FC = () => {
  const [inquiries, setInquiries] = useState<DemoInquiryLead[]>(leadStore.getDemoInquiries());
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const loadData = () => {
    setInquiries(leadStore.getDemoInquiries());
  };

  useEffect(() => {
    loadData();
    const unsub = leadStore.subscribe(loadData);
    return () => unsub();
  }, []);

  const handleStatusChange = (id: string, status: DemoInquiryLead['status']) => {
    soundManager.playClick();
    leadStore.updateDemoInquiryStatus(id, status);
    loadData();
  };

  const handleWhatsApp = (inquiry: DemoInquiryLead) => {
    soundManager.playClick();
    const msg = `Hi ${inquiry.name}! Thanks for requesting a custom gym website for ${inquiry.gymName}. I'd love to show you a demo tailored to your requirements!`;
    const cleanPhone = inquiry.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const filtered = inquiries.filter((inq) => {
    const matchesSearch = 
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.gymName.toLowerCase().includes(search.toLowerCase()) ||
      inq.phone.includes(search);
    const matchesStatus = statusFilter === 'all' || inq.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-wider">
              Agency Pipeline
            </span>
            <span className="text-xs text-zinc-500">• {inquiries.length} Gym Owner Leads</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase mt-1">
            "Want a Website Like This" Inquiries
          </h2>
          <p className="text-xs text-zinc-400">
            Prospects who clicked the Demo Website Inquiry CTA to request a turnkey white-label gym platform.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search gym or owner..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Inquiries Table / Cards */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-zinc-900/40 border border-zinc-800/80">
          <Building2 className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h4 className="text-base font-bold text-zinc-300 uppercase">No Inquiries Found</h4>
          <p className="text-zinc-500 text-xs mt-1">
            When visitors request a custom gym site from the top demo badge or footer, their requests will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((inq) => (
            <motion.div
              key={inq.id}
              id={`inquiry-row-${inq.id}`}
              className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:border-amber-500/40 transition-all"
            >
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold">
                    {inq.id}
                  </span>
                  <h4 className="text-base font-black text-white uppercase">
                    {inq.gymName}
                  </h4>
                  <span className="text-xs text-zinc-500">• {inq.createdAt}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300">
                  <span className="font-bold text-amber-400">Owner: {inq.name}</span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    <Phone className="w-3 h-3 text-zinc-500" />
                    {inq.phone}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-400">
                    <Mail className="w-3 h-3 text-zinc-500" />
                    {inq.email}
                  </span>
                  {inq.currentWebsite && (
                    <span className="flex items-center gap-1 text-sky-400">
                      <Globe className="w-3 h-3" />
                      {inq.currentWebsite}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]">
                    Requested: {inq.serviceType}
                  </span>
                  {inq.message && (
                    <span className="text-zinc-400 text-xs italic">
                      "{inq.message}"
                    </span>
                  )}
                </div>
              </div>

              {/* Status Select & Quick WhatsApp Action */}
              <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
                <select
                  value={inq.status}
                  onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold uppercase outline-none border transition-colors ${
                    inq.status === 'Won'
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : inq.status === 'Contacted' || inq.status === 'Proposal Sent'
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                      : inq.status === 'Lost'
                      ? 'bg-red-500/20 border-red-500/40 text-red-300'
                      : 'bg-zinc-800 border-zinc-700 text-zinc-200'
                  }`}
                >
                  <option value="New">Status: New</option>
                  <option value="Contacted">Status: Contacted</option>
                  <option value="Proposal Sent">Status: Proposal Sent</option>
                  <option value="Won">Status: Won (Client Onboarded)</option>
                  <option value="Lost">Status: Lost</option>
                </select>

                <button
                  onClick={() => handleWhatsApp(inq)}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Owner</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
