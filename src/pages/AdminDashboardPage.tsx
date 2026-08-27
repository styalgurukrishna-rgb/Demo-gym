import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Calendar, 
  CreditCard, 
  MessageCircle, 
  Phone, 
  Mail, 
  Download, 
  Plus, 
  Check, 
  X, 
  Search, 
  Filter, 
  ShieldCheck, 
  RefreshCw,
  TrendingUp,
  Sparkles,
  Award,
  ChevronDown,
  Edit3,
  Trash2,
  Save,
  Send,
  Database,
  Upload,
  CheckCircle2,
  DollarSign,
  PieChart,
  FileSpreadsheet,
  LogOut,
  AlertCircle,
  Image as ImageIcon,
  Star,
  Building2,
  Globe,
  Sliders
} from 'lucide-react';
import { PageType, ModalState, LeadItem, BookingItem, MemberRecord, PricingPlan, Trainer, NotificationItem } from '../types';
import { leadStore } from '../services/leadStore';
import { gymConfigStore } from '../services/gymConfigStore';
import { soundManager } from '../components/common/SoundEffects';
import { WebsiteCustomizerPanel } from '../components/Admin/WebsiteCustomizerPanel';
import { PlansManagerPanel } from '../components/Admin/PlansManagerPanel';
import { TrainersManagerPanel } from '../components/Admin/TrainersManagerPanel';
import { GalleryManagerPanel } from '../components/Admin/GalleryManagerPanel';
import { TestimonialsManagerPanel } from '../components/Admin/TestimonialsManagerPanel';
import { DemoInquiriesPanel } from '../components/Admin/DemoInquiriesPanel';

interface AdminDashboardPageProps {
  onNavigate: (page: PageType) => void;
  onOpenModal: (type: ModalState['type'], data?: any) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'customizer' | 'plans' | 'trainers' | 'gallery' | 'testimonials' | 'inquiries' | 'members' | 'leads' | 'bookings' | 'whatsapp' | 'backup'
  >('overview');
  
  // Data States
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [members, setMembers] = useState<MemberRecord[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [inquiriesCount, setInquiriesCount] = useState(0);
  
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [leadSourceFilter, setLeadSourceFilter] = useState('all');
  const [editingNoteLeadId, setEditingNoteLeadId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  // Modals & Forms
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberForm, setNewMemberForm] = useState({
    name: '',
    phone: '',
    email: '',
    planName: 'PREMIUM PLAN',
    amount: 3000,
    assignedTrainer: 'Vikram Singhania'
  });

  const [showAddTrainerModal, setShowAddTrainerModal] = useState(false);
  const [newTrainerForm, setNewTrainerForm] = useState({
    name: '',
    role: 'Strength & Conditioning Specialist',
    experience: '6+ Years',
    specialization: 'Hypertrophy & Biomechanics',
    rating: 4.9,
    clientsTrained: '250+ Athletes',
    bio: 'Certified strength and conditioning coach focused on injury-free progressive overload.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    certifications: ['CSCS (NSCA)', 'ACE Certified']
  });

  // Backup & Restore state
  const [restoreJsonInput, setRestoreJsonInput] = useState('');
  const [restoreMessage, setRestoreMessage] = useState('');
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  const loadData = () => {
    setLeads(leadStore.getLeads());
    setBookings(leadStore.getBookings());
    setMembers(leadStore.getMembers());
    setTrainers(leadStore.getTrainers());
    setPlans(leadStore.getPlans());
    setNotifications(leadStore.getNotifications());
    setInquiriesCount(leadStore.getDemoInquiries().length);
  };

  useEffect(() => {
    loadData();
    const unsubscribe = leadStore.subscribe(loadData);
    return () => unsubscribe();
  }, []);

  // Lead Actions
  const handleLeadStatus = (id: string, status: LeadItem['status']) => {
    soundManager.playClick();
    leadStore.updateLeadStatus(id, status);
  };

  // Booking Actions
  const handleBookingStatus = (id: string, status: BookingItem['status']) => {
    soundManager.playSuccess();
    leadStore.updateBookingStatus(id, status);
  };

  // Member Actions
  const handleMemberStatus = (id: string, status: MemberRecord['status']) => {
    soundManager.playClick();
    leadStore.updateMemberStatus(id, status);
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to remove this member?')) {
      soundManager.playClick();
      leadStore.deleteMember(id);
    }
  };

  // Plan Price & Feature Updates
  const handleUpdatePlanPrice = (id: string, newPrice: number) => {
    soundManager.playSuccess();
    leadStore.updatePlan(id, { price: newPrice });
  };

  // WhatsApp Trigger Test
  const handleTriggerTestWhatsApp = (eventType: 'Trial Booked' | 'Membership Activated' | 'Expiry Reminder') => {
    soundManager.playSuccess();
    leadStore.sendNotification({
      userName: 'Aarav Patel',
      phone: '+91 98234 56789',
      title: `${eventType} Notification`,
      message: `[Automated KSG Cloud Engine] Your request for ${eventType} has been verified and processed.`,
      channel: 'WhatsApp',
      triggerEvent: eventType
    });
    setTestNotificationSent(true);
    setTimeout(() => setTestNotificationSent(false), 3000);
  };

  // Export CSV Handlers
  const handleExportLeadsCsv = () => {
    soundManager.playClick();
    const csvContent = leadStore.exportLeadsCsv();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ksg_leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportMembersCsv = () => {
    soundManager.playClick();
    const csvContent = leadStore.exportMembersCsv();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ksg_members_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Full DB JSON Export
  const handleExportDatabaseJson = () => {
    soundManager.playSuccess();
    const jsonStr = leadStore.exportFullDatabaseJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ksg_gym_database_backup_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRestoreDatabase = () => {
    if (!restoreJsonInput) return;
    const ok = leadStore.restoreDatabaseJson(restoreJsonInput);
    if (ok) {
      soundManager.playSuccess();
      setRestoreMessage('Database successfully restored!');
      setRestoreJsonInput('');
    } else {
      setRestoreMessage('Failed to restore. Please verify valid JSON format.');
    }
  };

  // Create Member
  const handleCreateMember = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();
    leadStore.addMember({
      name: newMemberForm.name,
      phone: newMemberForm.phone,
      email: newMemberForm.email,
      planName: newMemberForm.planName,
      status: 'Active',
      startDate: 'Today',
      expiryDate: '1 Year from today',
      amount: newMemberForm.amount,
      assignedTrainer: newMemberForm.assignedTrainer,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    });
    setShowAddMemberModal(false);
    setNewMemberForm({
      name: '',
      phone: '',
      email: '',
      planName: 'PREMIUM PLAN',
      amount: 3000,
      assignedTrainer: 'Vikram Singhania'
    });
  };

  // Create Trainer
  const handleCreateTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();
    leadStore.addTrainer({
      name: newTrainerForm.name,
      role: newTrainerForm.role,
      experience: newTrainerForm.experience,
      specialization: newTrainerForm.specialization,
      rating: Number(newTrainerForm.rating),
      clientsTrained: newTrainerForm.clientsTrained,
      bio: newTrainerForm.bio,
      image: newTrainerForm.image,
      certifications: newTrainerForm.certifications,
      achievements: ['National Biomechanics Gold Medalist'],
      availableSlots: ['06:00 AM - 10:00 AM', '05:00 PM - 09:00 PM']
    });
    setShowAddTrainerModal(false);
    setNewTrainerForm({
      name: '',
      role: 'Strength & Conditioning Specialist',
      experience: '6+ Years',
      specialization: 'Hypertrophy & Biomechanics',
      rating: 4.9,
      clientsTrained: '250+ Athletes',
      bio: 'Certified strength and conditioning coach focused on injury-free progressive overload.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      certifications: ['CSCS (NSCA)', 'ACE Certified']
    });
  };

  const handleLogout = () => {
    soundManager.playClick();
    leadStore.logout();
    onNavigate('login');
  };

  // Filtered members & leads
  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || m.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const filteredLeads = leads.filter((l) => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || l.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalRevenue = members.reduce((sum, m) => sum + (m.amount || 3000), 0);
  const activeMembersCount = members.filter(m => m.status === 'Active').length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'Pending').length;

  return (
    <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP ADMIN BANNER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shadow-lg">
              <LayoutDashboard className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase">
                  CRM Cloud V3.0
                </span>
                <span className="text-zinc-500 text-xs">• Live Database</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white uppercase mt-0.5">
                KSG Gym Owner Command Center
              </h1>
              <p className="text-xs text-zinc-400">
                Lead Pipeline • Member Roster • Pricing Matrix • Automated WhatsApp Drip
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto relative z-10">
            <button
              onClick={() => onNavigate('trainer-dashboard')}
              className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-bold uppercase transition-colors"
            >
              Coach Portal
            </button>
            <button
              onClick={handleExportDatabaseJson}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Full DB Backup</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 border-b border-zinc-800 pb-3">
          {[
            { id: 'customizer', label: 'Website Customizer', icon: Sliders },
            { id: 'overview', label: 'KPIs & Analytics', icon: LayoutDashboard },
            { id: 'leads', label: 'Lead Pipeline', count: leads.filter(l => l.status === 'New').length, icon: UserPlus },
            { id: 'bookings', label: 'Trial Bookings', count: pendingBookingsCount, icon: Calendar },
            { id: 'plans', label: 'Plans Manager', count: plans.length, icon: DollarSign },
            { id: 'trainers', label: 'Trainers Manager', count: trainers.length, icon: Award },
            { id: 'gallery', label: 'Gallery Manager', icon: ImageIcon },
            { id: 'testimonials', label: 'Testimonials', icon: Star },
            { id: 'inquiries', label: 'Website Inquiries', count: inquiriesCount, icon: Globe },
            { id: 'members', label: 'Member Roster', count: members.length, icon: Users },
            { id: 'whatsapp', label: 'WhatsApp Automation', icon: MessageCircle },
            { id: 'backup', label: 'Backup & Restore', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${isActive ? 'bg-black text-amber-400' : 'bg-zinc-800 text-zinc-300'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 0: WEBSITE CUSTOMIZER */}
        {activeTab === 'customizer' && (
          <WebsiteCustomizerPanel onNavigate={onNavigate} />
        )}

        {/* TAB 1: OVERVIEW & KPIS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] uppercase font-bold">Total Active Members</span>
                <div className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono">{activeMembersCount}</div>
                <span className="text-[10px] text-emerald-400 font-semibold">+18 this month</span>
              </div>
              <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] uppercase font-bold">Monthly Recurring (MRR)</span>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1 font-mono">₹{(totalRevenue).toLocaleString()}</div>
                <span className="text-[10px] text-emerald-400 font-semibold">94.8% Renewal Rate</span>
              </div>
              <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] uppercase font-bold">New Inbound Leads</span>
                <div className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono">{leads.length}</div>
                <span className="text-[10px] text-amber-400 font-semibold">{leads.filter(l => l.status === 'Converted').length} Converted</span>
              </div>
              <div className="p-5 rounded-3xl bg-zinc-900 border border-zinc-800">
                <span className="text-zinc-500 text-[10px] uppercase font-bold">Scheduled Trials</span>
                <div className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono">{bookings.length}</div>
                <span className="text-[10px] text-emerald-400 font-semibold">88% Show-up Rate</span>
              </div>
            </div>

            {/* Visual Analytics Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Monthly Revenue Growth (₹ Lakhs)
                  </h3>
                  <span className="text-xs text-amber-400 font-mono font-bold">+24% YoY</span>
                </div>

                <div className="h-44 flex items-end gap-3 pt-6 pb-2 border-b border-zinc-800">
                  {[
                    { month: 'Oct', val: 45, height: '45%' },
                    { month: 'Nov', val: 60, height: '60%' },
                    { month: 'Dec', val: 75, height: '75%' },
                    { month: 'Jan', val: 90, height: '90%' },
                    { month: 'Feb', val: 110, height: '100%' },
                  ].map((bar) => (
                    <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-[10px] font-mono text-zinc-400">₹{bar.val}k</span>
                      <div
                        style={{ height: bar.height }}
                        className="w-full rounded-t-xl bg-gradient-to-t from-amber-600 to-amber-400 hover:brightness-110 transition-all"
                      />
                      <span className="text-[10px] font-bold text-zinc-500">{bar.month}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Membership Tier Distribution
                  </h3>
                  <span className="text-xs text-zinc-400">By Member Count</span>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-zinc-300">VIP Sanctuary (₹5,000/mo)</span>
                      <span className="font-mono text-amber-400 font-bold">45%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-zinc-950 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-zinc-300">Premium Plan (₹3,000/mo)</span>
                      <span className="font-mono text-emerald-400 font-bold">38%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-zinc-950 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '38%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-bold text-zinc-300">Basic Tier (₹2,000/mo)</span>
                      <span className="font-mono text-zinc-400 font-bold">17%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-zinc-950 overflow-hidden">
                      <div className="h-full bg-zinc-600 rounded-full" style={{ width: '17%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEMBER MANAGEMENT (CRUD) */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search by name or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 focus:border-amber-500 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                  <option value="Expiring Soon">Expiring Soon</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleExportMembersCsv}
                  className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-bold uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => setShowAddMemberModal(true)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Member</span>
                </button>
              </div>
            </div>

            {/* Member Table */}
            <div className="rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-[10px] font-black uppercase tracking-wider text-zinc-500 bg-zinc-950/50">
                      <th className="py-3 px-4">Member Info</th>
                      <th className="py-3 px-4">Plan & Amount</th>
                      <th className="py-3 px-4">Assigned Coach</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Expiry Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 text-xs">
                    {filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-zinc-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={m.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                              alt={m.name}
                              className="w-9 h-9 rounded-xl object-cover border border-zinc-700"
                            />
                            <div>
                              <div className="font-bold text-white">{m.name}</div>
                              <div className="text-[11px] text-zinc-400 font-mono">{m.phone}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-amber-400">{m.planName}</div>
                          <div className="text-[10px] text-zinc-400 font-mono">₹{m.amount || 3000}/yr</div>
                        </td>
                        <td className="py-3.5 px-4 text-zinc-300 font-medium">{m.assignedTrainer}</td>
                        <td className="py-3.5 px-4">
                          <select
                            value={m.status}
                            onChange={(e) => handleMemberStatus(m.id, e.target.value as any)}
                            className={`px-2 py-1 rounded text-[10px] font-black uppercase bg-zinc-950 border border-zinc-800 ${
                              m.status === 'Active'
                                ? 'text-emerald-400'
                                : m.status === 'Expired'
                                ? 'text-red-400'
                                : 'text-amber-400'
                            }`}
                          >
                            <option value="Active">Active</option>
                            <option value="Expiring Soon">Expiring Soon</option>
                            <option value="Expired">Expired</option>
                            <option value="Suspended">Suspended</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-zinc-400 font-mono text-[11px]">{m.expiryDate}</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`https://wa.me/${m.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-zinc-950 hover:bg-emerald-500/20 text-emerald-400 border border-zinc-800 transition-colors"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => handleDeleteMember(m.id)}
                              className="p-1.5 rounded-lg bg-zinc-950 hover:bg-red-500/20 text-zinc-500 hover:text-red-400 border border-zinc-800 transition-colors cursor-pointer"
                              title="Delete Member"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LEAD PIPELINE */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Customer Acquisition Pipeline ({leads.length} Inquiries)
              </h3>
              <button
                onClick={handleExportLeadsCsv}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-bold uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Export Leads CSV</span>
              </button>
            </div>

            <div className="space-y-3">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400">{lead.id}</span>
                      <h4 className="text-sm font-bold text-white">{lead.name}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-zinc-950 text-zinc-300 border border-zinc-800">
                        {lead.type}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Goal / Plan: <span className="text-white font-semibold">{lead.planName || lead.goal || 'General Orientation'}</span> • {lead.preferredDate || lead.createdAt}
                    </p>
                    {lead.notes && (
                      <p className="text-[11px] text-zinc-500 italic bg-zinc-950/60 p-1.5 rounded-lg border border-zinc-800/80">
                        "{lead.notes}"
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                    <select
                      value={lead.status}
                      onChange={(e) => handleLeadStatus(lead.id, e.target.value as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase bg-zinc-950 border border-zinc-800 ${
                        lead.status === 'Converted'
                          ? 'text-emerald-400 border-emerald-500/40'
                          : lead.status === 'Trial Scheduled'
                          ? 'text-amber-400 border-amber-500/40'
                          : 'text-zinc-300'
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Trial Scheduled">Trial Scheduled</option>
                      <option value="Converted">Converted</option>
                      <option value="Dropped">Dropped</option>
                    </select>

                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.name}! This is KSG DEMO GYM following up on your VIP orientation inquiry.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TRIAL BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Trial Session Reservations ({bookings.length})
            </h3>

            <div className="space-y-3">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400">{booking.id}</span>
                      <h4 className="text-sm font-bold text-white">{booking.name}</h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        booking.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">
                      {booking.date} at {booking.timeSlot} • Assigned: <span className="text-white font-semibold">{booking.trainerName}</span>
                    </p>
                    <p className="text-[11px] text-zinc-500">{booking.phone} • {booking.email}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleBookingStatus(booking.id, 'Approved')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-black font-bold text-xs uppercase transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleBookingStatus(booking.id, 'Rejected')}
                      className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white font-bold text-xs uppercase transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: TRAINER STAFF MANAGEMENT */}
        {activeTab === 'trainers' && (
          <TrainersManagerPanel />
        )}

        {/* TAB: PLAN PRICING MANAGEMENT */}
        {activeTab === 'plans' && (
          <PlansManagerPanel />
        )}

        {/* TAB: GALLERY MEDIA MANAGEMENT */}
        {activeTab === 'gallery' && (
          <GalleryManagerPanel />
        )}

        {/* TAB: TESTIMONIALS REPUTATION MANAGEMENT */}
        {activeTab === 'testimonials' && (
          <TestimonialsManagerPanel />
        )}

        {/* TAB: WEBSITE INQUIRIES */}
        {activeTab === 'inquiries' && (
          <DemoInquiriesPanel />
        )}

        {/* TAB 7: WHATSAPP & NOTIFICATION ENGINE */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-white uppercase">Automated WhatsApp & Email Drip Hub</h3>
                  <p className="text-xs text-zinc-400">Trigger automated transactional messages or test templates in real-time.</p>
                </div>
                {testNotificationSent && (
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Trigger Sent to WhatsApp Gateway!
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  onClick={() => handleTriggerTestWhatsApp('Trial Booked')}
                  className="p-4 rounded-2xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-left transition-colors cursor-pointer"
                >
                  <span className="text-xs font-black text-amber-400 block uppercase">Test "Trial Booked"</span>
                  <span className="text-[11px] text-zinc-400 block mt-1">Sends instant confirmation + QR pass</span>
                </button>

                <button
                  onClick={() => handleTriggerTestWhatsApp('Membership Activated')}
                  className="p-4 rounded-2xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-left transition-colors cursor-pointer"
                >
                  <span className="text-xs font-black text-emerald-400 block uppercase">Test "Welcome VIP"</span>
                  <span className="text-[11px] text-zinc-400 block mt-1">Sends receipt & RFID turnstile key</span>
                </button>

                <button
                  onClick={() => handleTriggerTestWhatsApp('Expiry Reminder')}
                  className="p-4 rounded-2xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-left transition-colors cursor-pointer"
                >
                  <span className="text-xs font-black text-amber-500 block uppercase">Test "Expiry Alert"</span>
                  <span className="text-[11px] text-zinc-400 block mt-1">Sends 7-day renewal reminder</span>
                </button>
              </div>
            </div>

            {/* Notification History Log */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Recent Outbound Dispatch Log ({notifications.length})
              </h4>

              {notifications.map((n) => (
                <div key={n.id} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase">
                        {n.channel}
                      </span>
                      <h5 className="text-xs font-bold text-white">{n.title}</h5>
                      <span className="text-zinc-500 text-[11px]">→ {n.userName} ({n.phone})</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">{n.message}</p>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 whitespace-nowrap">{n.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: BACKUP & RESTORE */}
        {activeTab === 'backup' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
            <div>
              <h3 className="text-base font-black text-white uppercase">Cloud Database Backup & JSON Restore</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Download a complete JSON snapshot of all members, leads, bookings, workouts, and settings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                <div className="flex items-center gap-2 text-amber-400">
                  <Download className="w-5 h-5" />
                  <h4 className="text-sm font-bold text-white uppercase">Export Full Snapshot</h4>
                </div>
                <p className="text-xs text-zinc-400">
                  Exports a portable JSON database backup containing every table and configuration.
                </p>
                <button
                  onClick={handleExportDatabaseJson}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  DOWNLOAD JSON DATABASE BACKUP
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Upload className="w-5 h-5" />
                  <h4 className="text-sm font-bold text-white uppercase">Restore from JSON</h4>
                </div>
                <textarea
                  rows={2}
                  placeholder="Paste exported JSON here..."
                  value={restoreJsonInput}
                  onChange={(e) => setRestoreJsonInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white font-mono focus:border-emerald-500 focus:outline-none"
                />
                {restoreMessage && (
                  <p className="text-xs text-emerald-400 font-bold">{restoreMessage}</p>
                )}
                <button
                  onClick={handleRestoreDatabase}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  RESTORE DATABASE
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
              <span className="text-xs text-zinc-500">Need to reset demo records?</span>
              <button
                onClick={() => {
                  if (confirm('Reset database to clean initial demonstration dataset?')) {
                    leadStore.resetDemoData();
                    soundManager.playSuccess();
                  }
                }}
                className="text-xs text-red-400 hover:text-red-300 font-bold uppercase"
              >
                Reset Demo Database
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Modal: Add Member */}
      <AnimatePresence>
        {showAddMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-white uppercase">Add New Gym Member</h3>
                <button onClick={() => setShowAddMemberModal(false)} className="text-zinc-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateMember} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aman Gupta"
                    value={newMemberForm.name}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98..."
                      value={newMemberForm.phone}
                      onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="aman@..."
                      value={newMemberForm.email}
                      onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">Membership Tier</label>
                    <select
                      value={newMemberForm.planName}
                      onChange={(e) => setNewMemberForm({ ...newMemberForm, planName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                    >
                      <option value="BASIC PLAN">BASIC (₹2,000)</option>
                      <option value="PREMIUM PLAN">PREMIUM (₹3,000)</option>
                      <option value="VIP PLAN">VIP SANCTUARY (₹5,000)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">Coach</label>
                    <select
                      value={newMemberForm.assignedTrainer}
                      onChange={(e) => setNewMemberForm({ ...newMemberForm, assignedTrainer: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Vikram Singhania">Vikram Singhania</option>
                      <option value="Marcus Vance">Marcus Vance</option>
                      <option value="Elena Rostova">Elena Rostova</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-colors cursor-pointer mt-2"
                >
                  PROVISION RFID PASS & CREATE MEMBER
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Add Trainer */}
      <AnimatePresence>
        {showAddTrainerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-white uppercase">Add Master Coach</h3>
                <button onClick={() => setShowAddTrainerModal(false)} className="text-zinc-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateTrainer} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">Trainer Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Coach David Lee"
                    value={newTrainerForm.name}
                    onChange={(e) => setNewTrainerForm({ ...newTrainerForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">Role Title</label>
                    <input
                      type="text"
                      required
                      value={newTrainerForm.role}
                      onChange={(e) => setNewTrainerForm({ ...newTrainerForm, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">Experience</label>
                    <input
                      type="text"
                      required
                      value={newTrainerForm.experience}
                      onChange={(e) => setNewTrainerForm({ ...newTrainerForm, experience: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-400 mb-1">Specialization</label>
                  <input
                    type="text"
                    required
                    value={newTrainerForm.specialization}
                    onChange={(e) => setNewTrainerForm({ ...newTrainerForm, specialization: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition-colors cursor-pointer mt-2"
                >
                  ADD COACH TO DIRECTORY
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboardPage;
