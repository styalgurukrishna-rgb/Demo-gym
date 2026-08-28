import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Users, UserPlus, Phone, Mail, Calendar, CheckCircle2, Clock, MessageSquare, TrendingUp, DollarSign, RefreshCw, Plus, Search, Filter, ShieldCheck, Download } from 'lucide-react';
import { LeadItem } from '../../types';
import { leadStore } from '../../services/leadStore';
import { soundManager } from '../common/SoundEffects';
import { GYM_INFO, AUTOMATED_FOLLOWUPS } from '../../data/gymData';

interface AdminCrmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminCrmModal: React.FC<AdminCrmModalProps> = ({ isOpen, onClose }) => {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'bookings' | 'members' | 'automations'>('leads');

  // Add Lead Modal State
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    goal: 'Muscle Gain',
    type: 'trial' as LeadItem['type'],
    planName: 'PREMIUM PLAN',
    notes: 'Walk-in lead at front desk',
  });

  useEffect(() => {
    setLeads(leadStore.getLeads());
    const unsubscribe = leadStore.subscribe(() => {
      setLeads(leadStore.getLeads());
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const totalLeadsCount = leads.length;
  const trialBookingsCount = leads.filter((l) => l.type === 'trial' || l.status === 'Trial Scheduled').length;
  const convertedCount = leads.filter((l) => l.status === 'Converted').length;
  const conversionRate = totalLeadsCount > 0 ? Math.round((convertedCount / totalLeadsCount) * 100) : 0;
  
  // Simulated Total Revenue
  const totalRevenue = leads.reduce((acc, l) => acc + (l.amount || (l.status === 'Converted' ? 3000 : 0)), 485000);

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      (l.email && l.email.toLowerCase().includes(searchQuery.toLowerCase()));

    if (filterType === 'all') return matchesSearch;
    if (filterType === 'trial') return matchesSearch && (l.type === 'trial' || l.status === 'Trial Scheduled');
    if (filterType === 'new') return matchesSearch && l.status === 'New';
    if (filterType === 'converted') return matchesSearch && l.status === 'Converted';
    return matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: LeadItem['status']) => {
    soundManager.playClick();
    leadStore.updateLeadStatus(id, newStatus);
  };

  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.phone) return;

    soundManager.playClick();
    leadStore.addLead({
      name: newLeadForm.name,
      phone: newLeadForm.phone,
      email: newLeadForm.email || 'walkin@gym.com',
      goal: newLeadForm.goal,
      type: newLeadForm.type,
      planName: newLeadForm.planName,
      status: 'New',
      notes: newLeadForm.notes,
    });

    setShowAddLead(false);
    setNewLeadForm({
      name: '',
      phone: '',
      email: '',
      goal: 'Muscle Gain',
      type: 'trial',
      planName: 'PREMIUM PLAN',
      notes: 'Walk-in lead at front desk',
    });
  };

  const handleExportCSV = () => {
    soundManager.playClick();
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Name,Phone,Email,Goal,Type,Status,Created At,Notes"]
        .concat(leads.map(l => `"${l.id}","${l.name}","${l.phone}","${l.email}","${l.goal || ''}","${l.type}","${l.status}","${l.createdAt}","${l.notes || ''}"`))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "KSG_Gym_Leads_Export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Admin Panel Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl rounded-3xl bg-[#0E0E12] border border-white/15 shadow-2xl z-10 my-4 flex flex-col max-h-[92vh] overflow-hidden"
      >
        {/* Top Control Bar */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#181822] to-[#101016]">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                LIVE GYM CRM & ACQUISITION MACHINE
              </span>
            </div>
            <h3 className="text-2xl font-black font-['Syne',sans-serif] uppercase tracking-tight text-white mt-1">
              GYM OWNER <span className="text-[#D4AF37]">ADMIN PANEL</span>
            </h3>
            <p className="text-xs text-neutral-400">
              Live customer acquisition pipeline, trial bookings, and automated follow-ups.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowAddLead(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#EF4444] text-white text-xs font-bold uppercase flex items-center gap-1.5 shadow-md shadow-red-600/30 hover:scale-105 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Walk-In Lead</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Export Leads to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              onClick={() => {
                leadStore.resetDemoData();
                soundManager.playClick();
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-400 hover:text-white transition-colors"
              title="Reset Demo Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4 KPI Dashboard Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 p-5 sm:px-6 bg-black/40 border-b border-white/10">
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <span className="text-[10px] font-bold uppercase text-neutral-400 block">Total Inquiries / Leads</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-white">{totalLeadsCount}</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                +28% MoM
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <span className="text-[10px] font-bold uppercase text-neutral-400 block">Trial Bookings</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-[#D4AF37]">{trialBookingsCount}</span>
              <span className="text-[10px] font-bold text-neutral-400">Scheduled</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <span className="text-[10px] font-bold uppercase text-neutral-400 block">New Converted Members</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-emerald-400">{convertedCount + 42}</span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                High Close Rate
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
            <span className="text-[10px] font-bold uppercase text-neutral-400 block">Monthly Revenue</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-white">₹{(totalRevenue / 1000).toFixed(0)}k</span>
              <span className="text-[10px] text-emerald-400 font-bold">+18.4%</span>
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1 p-3.5 rounded-2xl bg-gradient-to-br from-[#1C1810] to-[#120F0A] border border-[#D4AF37]/40">
            <span className="text-[10px] font-bold uppercase text-[#D4AF37] block">Conversion Rate</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-[#D4AF37]">{conversionRate}%</span>
              <span className="text-[10px] text-neutral-400 font-medium">Industry Top 5%</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 border-b border-white/10 flex items-center justify-between gap-4 overflow-x-auto bg-[#0A0A0E]">
          <div className="flex gap-2 shrink-0">
            {[
              { id: 'leads', label: 'Leads & Inquiries', count: totalLeadsCount },
              { id: 'bookings', label: 'Trial Bookings', count: trialBookingsCount },
              { id: 'automations', label: 'Automated Follow-ups', count: 3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#D4AF37] text-black shadow'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{tab.label}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-black/30 text-[10px] font-mono font-bold">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search & Filter */}
          {activeTab === 'leads' && (
            <div className="flex items-center gap-2 shrink-0">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] w-36 sm:w-48"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="new">New Inquiries</option>
                <option value="trial">Trial Scheduled</option>
                <option value="converted">Converted / Paid</option>
              </select>
            </div>
          )}
        </div>

        {/* Tab Contents */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'leads' && (
            <div className="space-y-3">
              {filteredLeads.length === 0 ? (
                <div className="text-center py-12 text-neutral-500 text-sm">
                  No inquiries found matching current filter. Try adding a test lead or booking a free trial.
                </div>
              ) : (
                filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    {/* Lead Info */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EF4444] to-[#D4AF37] p-[1px] shrink-0">
                        <div className="w-full h-full bg-[#101014] rounded-[11px] flex items-center justify-center font-bold text-white text-xs">
                          {lead.name.slice(0, 2).toUpperCase()}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-bold text-white">{lead.name}</h4>
                          <span className="font-mono text-[10px] text-neutral-500">{lead.id}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                              lead.status === 'New'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : lead.status === 'Trial Scheduled'
                                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30'
                                : lead.status === 'Converted'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-white/10 text-neutral-300'
                            }`}
                          >
                            {lead.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400 mt-1">
                          <span className="flex items-center gap-1 text-neutral-300">
                            <Phone className="w-3 h-3 text-[#EF4444]" />
                            {lead.phone}
                          </span>
                          {lead.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3 text-[#D4AF37]" />
                              {lead.email}
                            </span>
                          )}
                          {lead.goal && (
                            <span className="text-neutral-300">
                              Goal: <strong className="text-white">{lead.goal}</strong>
                            </span>
                          )}
                          {lead.planName && (
                            <span className="text-[#D4AF37]">
                              Plan: <strong>{lead.planName}</strong>
                            </span>
                          )}
                        </div>

                        {lead.notes && (
                          <p className="text-xs text-neutral-400 mt-1.5 italic bg-black/30 p-2 rounded-lg border border-white/5">
                            "{lead.notes}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions & Status Dropdown */}
                    <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                        className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/15 text-xs text-white focus:outline-none cursor-pointer"
                      >
                        <option value="New">Status: New</option>
                        <option value="Contacted">Status: Contacted</option>
                        <option value="Trial Scheduled">Status: Trial Scheduled</option>
                        <option value="Converted">Status: Converted / Paid</option>
                        <option value="Dropped">Status: Dropped</option>
                      </select>

                      {/* 1-Click WhatsApp reply */}
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.name)}%2C%20this%20is%20KSG%20DEMO%20GYM.%20We%20saw%20your%20interest%20in%20our%20fitness%20programs%20and%20wanted%20to%20help%20you%20schedule%20your%20visit!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-400 transition-colors"
                        title="Instant WhatsApp Message"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>

                      {/* 1-Click Phone Call */}
                      <a
                        href={`tel:${lead.phone}`}
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
                        title="Direct Phone Call"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <h4 className="text-base font-black text-white uppercase mb-3">Scheduled Free Trial Slots</h4>
                <div className="space-y-3">
                  {leads.filter(l => l.type === 'trial' || l.status === 'Trial Scheduled').map((booking) => (
                    <div key={booking.id} className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{booking.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-bold">
                            {booking.preferredDate || 'Tomorrow'}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          Time: <strong className="text-neutral-200">{booking.preferredTime || 'Morning'}</strong> • Goal: {booking.goal || 'General Fitness'}
                        </p>
                      </div>
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Pass Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'automations' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <h4 className="text-base font-black text-white uppercase mb-1">
                  Automated Follow-Up Drip Engine
                </h4>
                <p className="text-xs text-neutral-400 mb-4">
                  Multi-channel messages automatically triggered to convert leads within 15 minutes of initial interest.
                </p>

                <div className="space-y-3">
                  {AUTOMATED_FOLLOWUPS.map((auto, idx) => (
                    <div key={auto.step || idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-black font-black text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h5 className="text-sm font-bold text-white">{auto.title}</h5>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] px-2 py-0.5 rounded bg-[#D4AF37]/15">
                          {auto.trigger}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-300 italic bg-white/5 p-3 rounded-xl border border-white/5">
                        "{auto.message}"
                      </p>
                      <div className="text-[10px] text-neutral-400 flex items-center gap-2">
                        <span>Channel: <strong>{auto.channel}</strong></span>
                        <span>•</span>
                        <span className="text-emerald-400">Status: Active & Auto-Sending</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Walk-In Lead Inner Modal */}
        <AnimatePresence>
          {showAddLead && (
            <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-md rounded-3xl bg-[#14141A] border border-white/20 p-6 shadow-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-black text-white uppercase">Add Walk-In Lead</h4>
                  <button
                    onClick={() => setShowAddLead(false)}
                    className="p-1 rounded text-neutral-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddLeadSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Verma"
                      value={newLeadForm.name}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 75499 29102"
                      value={newLeadForm.phone}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Lead Type</label>
                      <select
                        value={newLeadForm.type}
                        onChange={(e) => setNewLeadForm({ ...newLeadForm, type: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                      >
                        <option value="trial">Free Trial Booking</option>
                        <option value="membership">Membership Lead</option>
                        <option value="consultation">VIP Consultation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Target Plan</label>
                      <select
                        value={newLeadForm.planName}
                        onChange={(e) => setNewLeadForm({ ...newLeadForm, planName: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                      >
                        <option value="BASIC PLAN">BASIC (₹2,000)</option>
                        <option value="PREMIUM PLAN">PREMIUM (₹3,000)</option>
                        <option value="VIP PLAN">VIP (₹5,000)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">Internal Staff Notes</label>
                    <textarea
                      rows={2}
                      value={newLeadForm.notes}
                      onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#D4AF37] hover:bg-[#AA8012] text-black font-black text-xs uppercase tracking-wider"
                  >
                    Save Prospect To Pipeline
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
