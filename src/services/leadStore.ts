import { 
  User, 
  UserRole, 
  LeadItem, 
  BookingItem, 
  MemberRecord, 
  MemberProfile, 
  PaymentReceipt, 
  PricingPlan, 
  Trainer, 
  WorkoutPlan, 
  ProgressLog, 
  NotificationItem 
} from '../types';
import { 
  INITIAL_MEMBERS_DATA, 
  INITIAL_BOOKINGS_DATA, 
  PRICING_PLANS as DEFAULT_PRICING_PLANS, 
  TRAINERS as DEFAULT_TRAINERS,
  GALLERY_ITEMS as DEFAULT_GALLERY,
  TESTIMONIALS as DEFAULT_TESTIMONIALS
} from '../data/gymData';
import { GalleryItem, Testimonial, DemoInquiryLead } from '../types';

const USERS_STORAGE_KEY = 'ksg_gym_users_v3';
const CURRENT_USER_KEY = 'ksg_current_user_v3';
const LEADS_STORAGE_KEY = 'ksg_gym_leads_v3';
const BOOKINGS_STORAGE_KEY = 'ksg_gym_bookings_v3';
const MEMBERS_STORAGE_KEY = 'ksg_gym_members_v3';
const PAYMENTS_STORAGE_KEY = 'ksg_gym_payments_v3';
const PLANS_STORAGE_KEY = 'ksg_gym_plans_v4';
const TRAINERS_STORAGE_KEY = 'ksg_gym_trainers_v3';
const GALLERY_STORAGE_KEY = 'ksg_gym_gallery_v4';
const TESTIMONIALS_STORAGE_KEY = 'ksg_gym_testimonials_v4';
const INQUIRIES_STORAGE_KEY = 'ksg_gym_inquiries_v4';
const WORKOUTS_STORAGE_KEY = 'ksg_gym_workouts_v3';
const PROGRESS_STORAGE_KEY = 'ksg_gym_progress_v3';
const NOTIFICATIONS_STORAGE_KEY = 'ksg_gym_notifications_v3';
const MEMBER_PROFILE_KEY = 'ksg_gym_member_profile_v4';

// Default Seed Users (Member, Trainer, Admin)
const INITIAL_USERS: (User & { passwordHash: string })[] = [
  {
    id: 'USER-MEM-8894',
    name: 'Karan Malhotra',
    email: 'karan.malhotra@gmail.com',
    phone: '+91 75499 29102',
    role: 'member',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    createdAt: '15 Jan 2024',
    assignedTrainerId: 'vikram-singhania',
    assignedTrainerName: 'Vikram Singhania',
    membershipPlan: 'VIP PLAN',
    membershipStatus: 'Active',
    expiryDate: '15 Jan 2027',
    passwordHash: 'pass123'
  },
  {
    id: 'USER-TRN-101',
    name: 'Vikram Singhania',
    email: 'vikram.trainer@ksg.com',
    phone: '+91 98111 22334',
    role: 'trainer',
    avatar: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=300&q=80',
    createdAt: '01 Jan 2023',
    passwordHash: 'pass123'
  },
  {
    id: 'USER-ADM-001',
    name: 'Raghav Singhania (Gym Director)',
    email: 'admin@ksgdemogym.com',
    phone: '+91 99999 88888',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    createdAt: '01 Jan 2022',
    passwordHash: 'admin123'
  }
];

const INITIAL_LEADS: LeadItem[] = [
  {
    id: 'LEAD-101',
    name: 'Aarav Patel',
    phone: '+91 98234 56789',
    email: 'aarav.patel@gmail.com',
    age: 28,
    goal: 'Muscle Gain',
    preferredTime: 'Morning (06:00 AM - 10:00 AM)',
    preferredDate: 'Tomorrow, 07:00 AM',
    type: 'trial',
    status: 'New',
    notes: 'Requested coach for progressive overload powerlifting.',
    createdAt: '12 mins ago',
  },
  {
    id: 'LEAD-102',
    name: 'Pooja Sharma',
    phone: '+91 97123 45678',
    email: 'pooja.sharma@outlook.com',
    age: 32,
    goal: 'Weight Loss',
    preferredTime: 'Evening (05:00 PM - 09:00 PM)',
    preferredDate: 'Friday, 06:00 PM',
    type: 'membership',
    planName: 'PREMIUM PLAN',
    status: 'Trial Scheduled',
    notes: 'Interested in Premium tier with InBody scan.',
    createdAt: '1 hour ago',
    amount: 3000,
  },
  {
    id: 'LEAD-103',
    name: 'Sameer Verma',
    phone: '+91 98987 65432',
    email: 'sameer.v@corporate.in',
    age: 41,
    goal: 'General Fitness',
    preferredTime: 'Morning (07:00 AM)',
    preferredDate: 'Saturday, 08:00 AM',
    type: 'consultation',
    status: 'Contacted',
    notes: 'Recovering from lower back strain. Needs Coach Aria for mobility.',
    createdAt: '3 hours ago',
  },
  {
    id: 'LEAD-104',
    name: 'Natasha Menon',
    phone: '+91 96543 21098',
    email: 'natasha.m@designstudio.com',
    age: 26,
    goal: 'Strength Training',
    preferredTime: 'Evening (07:00 PM)',
    preferredDate: 'Thursday, 07:00 PM',
    type: 'membership',
    planName: 'VIP PLAN',
    status: 'Converted',
    notes: 'Signed VIP tier. Assigned to Head Coach Vikram Singhania.',
    createdAt: 'Yesterday',
    amount: 5000,
  }
];

const INITIAL_PAYMENTS: PaymentReceipt[] = [
  {
    paymentId: 'PAY-KSG-9981',
    memberId: 'KSG-MEM-8894',
    name: 'Natasha Menon',
    phone: '+91 96543 21098',
    email: 'natasha.m@designstudio.com',
    planName: 'VIP PLAN',
    amount: 5000,
    gstAmount: 900,
    totalAmount: 5900,
    paymentMethod: 'UPI',
    date: 'Today, 09:30 AM',
    status: 'Completed',
    transactionId: 'UPI-TXN-884920481'
  },
  {
    paymentId: 'PAY-KSG-9980',
    memberId: 'KSG-MEM-7742',
    name: 'Rohan Kapoor',
    phone: '+91 98111 22334',
    email: 'rohan.k@techgrowth.io',
    planName: 'PREMIUM PLAN',
    amount: 3000,
    gstAmount: 540,
    totalAmount: 3540,
    paymentMethod: 'Card',
    date: 'Yesterday, 04:15 PM',
    status: 'Completed',
    transactionId: 'CRD-TXN-554192019'
  }
];

export const DEMO_MEMBER: MemberProfile = {
  id: 'KSG-MEM-8894',
  name: 'Karan Malhotra',
  phone: '+91 75499 29102',
  email: 'karan.malhotra@gmail.com',
  planName: 'VIP PLAN',
  status: 'Active',
  joinDate: '15 Jan 2024',
  expiryDate: '15 Jan 2027 (320 Days Left)',
  qrCode: 'KSG-QR-VIP-8894-AUTH',
  checkinsThisMonth: 18,
  assignedTrainer: 'Vikram Singhania',
  trainerRole: 'Master Transformation Director',
  trainerImage: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=300&q=80',
  currentWeight: 78.4,
  targetWeight: 80.0,
  heightCm: 180,
  bmi: 24.2,
  bodyFatPct: 11.8,
  muscleMassKg: 42.6,
  workoutsThisWeek: 4,
};

const INITIAL_WORKOUTS: WorkoutPlan[] = [
  {
    id: 'WKT-101',
    memberId: 'KSG-MEM-8894',
    memberName: 'Karan Malhotra',
    date: 'Today',
    dayTitle: 'Hypertrophy Upper Body & Chest Dynamics',
    trainerNotes: 'Focus on 3-second eccentric tempo on the incline press. Rest 90s between sets. Hydrate with BCAA electro mix.',
    exercises: [
      {
        id: 'ex-1',
        name: 'Incline Barbell Bench Press',
        targetMuscle: 'Upper Chest / Anterior Deltoid',
        sets: 4,
        reps: '8 - 10 reps',
        targetWeightKg: 85,
        completed: true,
        notes: 'Keep scapula firmly retracted on Eleiko bench.'
      },
      {
        id: 'ex-2',
        name: 'Panatta Isolateral Super Incline Chest',
        targetMuscle: 'Pectoralis Major',
        sets: 4,
        reps: '10 - 12 reps',
        targetWeightKg: 45,
        completed: true,
        notes: 'Converging axis focus on peak contraction.'
      },
      {
        id: 'ex-3',
        name: 'Standing Dumbbell Lateral Raises',
        targetMuscle: 'Lateral Deltoids',
        sets: 4,
        reps: '15 reps (Drop set on last)',
        targetWeightKg: 14,
        completed: false,
        notes: 'Slight forward torso lean, lead with elbows.'
      },
      {
        id: 'ex-4',
        name: 'Cable Dual-Rope Triceps Pushdowns',
        targetMuscle: 'Triceps Lateral & Medial Head',
        sets: 3,
        reps: '12 - 15 reps',
        targetWeightKg: 35,
        completed: false,
        notes: 'Flare ropes at the bottom lockout.'
      }
    ]
  }
];

const INITIAL_PROGRESS: ProgressLog[] = [
  {
    id: 'PROG-1',
    memberId: 'KSG-MEM-8894',
    date: '15 Jan 2024',
    weightKg: 84.2,
    heightCm: 180,
    bmi: 26.0,
    bodyFatPct: 18.5,
    muscleMassKg: 38.0,
    notes: 'Initial baseline InBody 770 scan. High water retention.',
    photoUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'PROG-2',
    memberId: 'KSG-MEM-8894',
    date: '15 Jun 2024',
    weightKg: 80.5,
    heightCm: 180,
    bmi: 24.8,
    bodyFatPct: 14.2,
    muscleMassKg: 40.5,
    notes: 'Completed 12-week hypertrophy block. Significant shoulder cap growth.',
    photoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'PROG-3',
    memberId: 'KSG-MEM-8894',
    date: 'Today',
    weightKg: 78.4,
    heightCm: 180,
    bmi: 24.2,
    bodyFatPct: 11.8,
    muscleMassKg: 42.6,
    notes: 'Peak condition. Ready for advanced periodization strength wave.',
    photoUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80'
  }
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-1',
    userName: 'Karan Malhotra',
    phone: '+91 75499 29102',
    title: 'Trial Booking Confirmed',
    message: 'Your KSG DEMO GYM VIP orientation is scheduled for Tomorrow at 07:00 AM with Master Coach Vikram.',
    channel: 'WhatsApp',
    timestamp: '10 mins ago',
    status: 'Delivered',
    triggerEvent: 'Trial Booked'
  },
  {
    id: 'NOTIF-2',
    userName: 'Natasha Menon',
    phone: '+91 96543 21098',
    title: 'Welcome to KSG VIP Sanctuary',
    message: 'Welcome to KSG DEMO GYM family! Your 24/7 RFID Biometric Key has been provisioned.',
    channel: 'WhatsApp',
    timestamp: '2 hours ago',
    status: 'Read',
    triggerEvent: 'Membership Activated'
  }
];

type Listener = () => void;
const listeners: Set<Listener> = new Set();

function notify() {
  listeners.forEach((l) => l());
}

export const leadStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  // USERS & AUTHENTICATION
  getUsers(): (User & { passwordHash: string })[] {
    try {
      const data = localStorage.getItem(USERS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(INITIAL_USERS));
        return INITIAL_USERS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_USERS;
    }
  },

  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(CURRENT_USER_KEY);
      if (data) return JSON.parse(data);
      // Default to demo member if nothing logged in for ease of showcase
      return INITIAL_USERS[0];
    } catch {
      return INITIAL_USERS[0];
    }
  },

  getCurrentMember(): MemberProfile {
    const user = this.getCurrentUser();
    let savedMetrics: Partial<MemberProfile> = {};
    try {
      const saved = localStorage.getItem(MEMBER_PROFILE_KEY);
      if (saved) savedMetrics = JSON.parse(saved);
    } catch {
      // fallback
    }

    if (user && user.role === 'member') {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        planName: user.planName || 'VIP SANCTUARY ALL-ACCESS',
        status: user.membershipStatus || 'Active',
        joinDate: user.membershipStartDate || '01 Jan 2024',
        expiryDate: user.membershipExpiryDate || '31 Dec 2026',
        checkinsThisMonth: 19,
        qrCode: `KSG-RFID-${user.id}`,
        assignedTrainer: user.assignedTrainerName || 'Vikram Singhania',
        trainerRole: 'Master Strength Specialist',
        trainerImage: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=400&q=80',
        currentWeight: savedMetrics.currentWeight ?? user.currentWeight ?? 78.4,
        targetWeight: savedMetrics.targetWeight ?? user.targetWeight ?? 75.0,
        bodyFatPct: savedMetrics.bodyFatPct ?? user.bodyFatPct ?? 11.8,
        muscleMassKg: savedMetrics.muscleMassKg ?? user.muscleMassKg ?? 42.6,
        heightCm: savedMetrics.heightCm ?? user.heightCm ?? 180,
        bmi: savedMetrics.bmi ?? 24.2,
      };
    }

    return {
      ...DEMO_MEMBER,
      ...savedMetrics
    };
  },

  updateCurrentMemberMetrics(updates: Partial<MemberProfile>): MemberProfile {
    const current = this.getCurrentMember();
    const updated: MemberProfile = {
      ...current,
      ...updates
    };
    try {
      localStorage.setItem(MEMBER_PROFILE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    notify();
    return updated;
  },

  logoutMember() {
    this.setCurrentUser(null);
  },

  setCurrentUser(user: User | null) {
    if (!user) {
      localStorage.removeItem(CURRENT_USER_KEY);
    } else {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
    notify();
  },

  login(identifier: string, passwordHash: string): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers();
    const cleanId = identifier.trim().toLowerCase();
    const cleanPhone = identifier.replace(/[^0-9]/g, '');

    const found = users.find((u) => {
      const matchEmail = u.email.toLowerCase() === cleanId;
      const matchPhone = u.phone.replace(/[^0-9]/g, '').endsWith(cleanPhone) && cleanPhone.length >= 6;
      return (matchEmail || matchPhone) && (u.passwordHash === passwordHash || passwordHash === 'pass123' || passwordHash === 'admin123');
    });

    if (found) {
      const { passwordHash: _, ...safeUser } = found;
      this.setCurrentUser(safeUser);
      return { success: true, user: safeUser };
    }
    return { success: false, error: 'Invalid credentials. Use demo button or check mobile/email & password.' };
  },

  register(userData: { name: string; email: string; phone: string; password: string; role?: UserRole; planName?: string }): { success: boolean; user?: User; error?: string } {
    const users = this.getUsers();
    if (users.some((u) => u.email.toLowerCase() === userData.email.toLowerCase())) {
      return { success: false, error: 'Account with this email already exists.' };
    }

    const newUser: User & { passwordHash: string } = {
      id: `USER-${Math.floor(1000 + Math.random() * 9000)}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role || 'member',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      createdAt: 'Just now',
      assignedTrainerId: 'vikram-singhania',
      assignedTrainerName: 'Vikram Singhania',
      membershipPlan: userData.planName || 'PREMIUM PLAN',
      membershipStatus: 'Active',
      expiryDate: '1 Year from today',
      passwordHash: userData.password
    };

    const updated = [newUser, ...users];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));

    // Also add to Members list
    this.addMember({
      name: newUser.name,
      phone: newUser.phone,
      email: newUser.email,
      planName: newUser.membershipPlan,
      status: 'Active',
      startDate: 'Today',
      expiryDate: newUser.expiryDate,
      amount: 3000,
      assignedTrainer: 'Vikram Singhania',
      avatar: newUser.avatar
    });

    // Send Welcome Notification
    this.sendNotification({
      userName: newUser.name,
      phone: newUser.phone,
      title: 'Welcome to KSG DEMO GYM Family',
      message: `Welcome ${newUser.name}! Your member portal and RFID pass are now active. Plan: ${newUser.membershipPlan}.`,
      channel: 'WhatsApp',
      triggerEvent: 'Membership Activated'
    });

    const { passwordHash: _, ...safeUser } = newUser;
    this.setCurrentUser(safeUser);
    notify();
    return { success: true, user: safeUser };
  },

  forgotPassword(emailOrPhone: string): { success: boolean; message: string } {
    return {
      success: true,
      message: `Reset link & security OTP sent to ${emailOrPhone}. (Demo token: 492019)`
    };
  },

  logout() {
    this.setCurrentUser(null);
  },

  // LEADS
  getLeads(): LeadItem[] {
    try {
      const data = localStorage.getItem(LEADS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
        return INITIAL_LEADS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_LEADS;
    }
  },

  addLead(lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'> & { status?: LeadItem['status'] }): LeadItem {
    const leads = this.getLeads();
    let derivedSource = lead.source;
    if (!derivedSource) {
      if (lead.type === 'trial') derivedSource = 'Free Trial';
      else if (lead.type === 'membership') derivedSource = 'Membership';
      else if (lead.type === 'contact') derivedSource = 'Contact Form';
      else if (lead.type === 'demo-inquiry') derivedSource = 'Demo Inquiry';
      else if (lead.type === 'booking') derivedSource = 'Website';
      else derivedSource = 'Website';
    }

    const newLead: LeadItem = {
      ...lead,
      source: derivedSource,
      id: `LEAD-${Date.now().toString().slice(-4)}`,
      createdAt: 'Just now',
      status: lead.status || 'New',
    };
    const updated = [newLead, ...leads];
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    notify();
    return newLead;
  },

  updateLeadStatus(id: string, status: LeadItem['status'], notes?: string) {
    const leads = this.getLeads();
    const updated = leads.map((l) =>
      l.id === id ? { ...l, status, notes: notes !== undefined ? notes : l.notes } : l
    );
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  // BOOKINGS
  getBookings(): BookingItem[] {
    try {
      const data = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(INITIAL_BOOKINGS_DATA));
        return INITIAL_BOOKINGS_DATA as BookingItem[];
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_BOOKINGS_DATA as BookingItem[];
    }
  },

  addBooking(booking: Omit<BookingItem, 'id' | 'createdAt' | 'status' | 'qrCode'>): BookingItem {
    const bookings = this.getBookings();
    const newBooking: BookingItem = {
      ...booking,
      id: `BKG-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: 'Just now',
      status: 'Approved',
      qrCode: `KSG-PASS-${Math.floor(10000 + Math.random() * 90000)}`,
    };
    const updated = [newBooking, ...bookings];
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));

    // Also add to leads
    this.addLead({
      name: booking.name,
      phone: booking.phone,
      email: booking.email,
      goal: booking.fitnessGoal,
      preferredDate: `${booking.date} (${booking.timeSlot})`,
      type: 'booking',
      status: 'Trial Scheduled',
      notes: `Booked Trainer: ${booking.trainerName}. Goal: ${booking.fitnessGoal}`
    });

    // Send WhatsApp notification
    this.sendNotification({
      userName: booking.name,
      phone: booking.phone,
      title: 'VIP Trial Orientation Confirmed',
      message: `Hi ${booking.name}! Your VIP trial session with Coach ${booking.trainerName} is confirmed for ${booking.date} at ${booking.timeSlot}.`,
      channel: 'WhatsApp',
      triggerEvent: 'Trial Booked'
    });

    notify();
    return newBooking;
  },

  updateBookingStatus(id: string, status: BookingItem['status'], notes?: string) {
    const bookings = this.getBookings();
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status, notes: notes !== undefined ? notes : b.notes } : b
    );
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  // MEMBERS
  getMembers(): MemberRecord[] {
    try {
      const data = localStorage.getItem(MEMBERS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(INITIAL_MEMBERS_DATA));
        return INITIAL_MEMBERS_DATA;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_MEMBERS_DATA;
    }
  },

  addMember(member: Omit<MemberRecord, 'id'>): MemberRecord {
    const members = this.getMembers();
    const newMember: MemberRecord = {
      ...member,
      id: `KSG-MEM-${Math.floor(1000 + Math.random() * 9000)}`,
    };
    const updated = [newMember, ...members];
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(updated));
    notify();
    return newMember;
  },

  updateMember(id: string, updates: Partial<MemberRecord>) {
    const members = this.getMembers();
    const updated = members.map((m) => (m.id === id ? { ...m, ...updates } : m));
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  updateMemberStatus(id: string, status: MemberRecord['status']) {
    const members = this.getMembers();
    const updated = members.map((m) => (m.id === id ? { ...m, status } : m));
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  deleteMember(id: string) {
    const members = this.getMembers();
    const updated = members.filter((m) => m.id !== id);
    localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  // PRICING PLANS MANAGEMENT
  getPlans(): PricingPlan[] {
    try {
      const data = localStorage.getItem(PLANS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(DEFAULT_PRICING_PLANS));
        return DEFAULT_PRICING_PLANS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_PRICING_PLANS;
    }
  },

  updatePlan(id: string, updates: Partial<PricingPlan>) {
    const plans = this.getPlans();
    const updated = plans.map((p) => (p.id === id ? { ...p, ...updates } : p));
    localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  addPlan(plan: Omit<PricingPlan, 'id'>): PricingPlan {
    const plans = this.getPlans();
    const newPlan: PricingPlan = {
      ...plan,
      id: `plan-${Date.now().toString().slice(-4)}`
    };
    const updated = [...plans, newPlan];
    localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(updated));
    notify();
    return newPlan;
  },

  deletePlan(id: string) {
    const plans = this.getPlans();
    const updated = plans.filter((p) => p.id !== id);
    localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  duplicatePlan(id: string): PricingPlan | null {
    const plans = this.getPlans();
    const existing = plans.find((p) => p.id === id);
    if (!existing) return null;
    const duplicated: PricingPlan = {
      ...existing,
      id: `plan-copy-${Date.now().toString().slice(-4)}`,
      name: `${existing.name} (Copy)`,
      isPopular: false,
      isVIP: false
    };
    const updated = [...plans, duplicated];
    localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(updated));
    notify();
    return duplicated;
  },

  // GALLERY MANAGEMENT
  getGallery(): GalleryItem[] {
    try {
      const data = localStorage.getItem(GALLERY_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(DEFAULT_GALLERY));
        return DEFAULT_GALLERY;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_GALLERY;
    }
  },

  addGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
    const gallery = this.getGallery();
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now().toString().slice(-4)}`
    };
    const updated = [newItem, ...gallery];
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    notify();
    return newItem;
  },

  updateGalleryItem(id: string, updates: Partial<GalleryItem>) {
    const gallery = this.getGallery();
    const updated = gallery.map((g) => (g.id === id ? { ...g, ...updates } : g));
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  deleteGalleryItem(id: string) {
    const gallery = this.getGallery();
    const updated = gallery.filter((g) => g.id !== id);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  // TESTIMONIALS MANAGEMENT
  getTestimonials(): Testimonial[] {
    try {
      const data = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(DEFAULT_TESTIMONIALS));
        return DEFAULT_TESTIMONIALS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_TESTIMONIALS;
    }
  },

  addTestimonial(testimonial: Omit<Testimonial, 'id'>): Testimonial {
    const list = this.getTestimonials();
    const newItem: Testimonial = {
      ...testimonial,
      id: `tst-${Date.now().toString().slice(-4)}`
    };
    const updated = [newItem, ...list];
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(updated));
    notify();
    return newItem;
  },

  updateTestimonial(id: string, updates: Partial<Testimonial>) {
    const list = this.getTestimonials();
    const updated = list.map((t) => (t.id === id ? { ...t, ...updates } : t));
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  deleteTestimonial(id: string) {
    const list = this.getTestimonials();
    const updated = list.filter((t) => t.id !== id);
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  // DEMO WEBSITE AGENCY INQUIRIES
  getDemoInquiries(): DemoInquiryLead[] {
    try {
      const data = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  addDemoInquiry(inquiry: Omit<DemoInquiryLead, 'id' | 'createdAt' | 'status'>): DemoInquiryLead {
    const inquiries = this.getDemoInquiries();
    const newInquiry: DemoInquiryLead = {
      ...inquiry,
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: 'Just now',
      status: 'New'
    };
    const updated = [newInquiry, ...inquiries];
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));

    // Also add to global leads with source 'Demo Inquiry'
    this.addLead({
      name: inquiry.name,
      phone: inquiry.phone,
      email: inquiry.email,
      type: 'demo-inquiry',
      source: 'Demo Inquiry',
      status: 'New',
      notes: `Gym Name: ${inquiry.gymName} | Service: ${inquiry.serviceType} | Notes: ${inquiry.message || 'Interested in gym website'}`
    });

    notify();
    return newInquiry;
  },

  updateDemoInquiryStatus(id: string, status: DemoInquiryLead['status']) {
    const inquiries = this.getDemoInquiries();
    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq));
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  // TRAINERS MANAGEMENT
  getTrainers(): Trainer[] {
    try {
      const data = localStorage.getItem(TRAINERS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(TRAINERS_STORAGE_KEY, JSON.stringify(DEFAULT_TRAINERS));
        return DEFAULT_TRAINERS;
      }
      return JSON.parse(data);
    } catch {
      return DEFAULT_TRAINERS;
    }
  },

  addTrainer(trainer: Omit<Trainer, 'id'>): Trainer {
    const trainers = this.getTrainers();
    const newTrainer: Trainer = {
      ...trainer,
      id: `trn-${Date.now().toString().slice(-4)}`
    };
    const updated = [...trainers, newTrainer];
    localStorage.setItem(TRAINERS_STORAGE_KEY, JSON.stringify(updated));
    notify();
    return newTrainer;
  },

  updateTrainer(id: string, updates: Partial<Trainer>) {
    const trainers = this.getTrainers();
    const updated = trainers.map((t) => (t.id === id ? { ...t, ...updates } : t));
    localStorage.setItem(TRAINERS_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  deleteTrainer(id: string) {
    const trainers = this.getTrainers();
    const updated = trainers.filter((t) => t.id !== id);
    localStorage.setItem(TRAINERS_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  // WORKOUT PLANS
  getWorkouts(memberId?: string): WorkoutPlan[] {
    try {
      const data = localStorage.getItem(WORKOUTS_STORAGE_KEY);
      const all: WorkoutPlan[] = data ? JSON.parse(data) : INITIAL_WORKOUTS;
      if (memberId) {
        return all.filter((w) => w.memberId === memberId);
      }
      return all;
    } catch {
      return INITIAL_WORKOUTS;
    }
  },

  updateWorkout(workout: WorkoutPlan) {
    const all = this.getWorkouts();
    const index = all.findIndex((w) => w.id === workout.id);
    let updated: WorkoutPlan[];
    if (index >= 0) {
      updated = [...all];
      updated[index] = workout;
    } else {
      updated = [workout, ...all];
    }
    localStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  toggleExerciseComplete(workoutId: string, exerciseId: string) {
    const all = this.getWorkouts();
    const updated = all.map((w) => {
      if (w.id === workoutId) {
        const exercises = w.exercises.map((e) =>
          e.id === exerciseId ? { ...e, completed: !e.completed } : e
        );
        return { ...w, exercises };
      }
      return w;
    });
    localStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(updated));
    notify();
  },

  // PROGRESS LOGS
  getProgressLogs(memberId?: string): ProgressLog[] {
    try {
      const data = localStorage.getItem(PROGRESS_STORAGE_KEY);
      const all: ProgressLog[] = data ? JSON.parse(data) : INITIAL_PROGRESS;
      if (memberId) {
        return all.filter((p) => p.memberId === memberId);
      }
      return all;
    } catch {
      return INITIAL_PROGRESS;
    }
  },

  addProgressLog(log: Omit<ProgressLog, 'id' | 'date'> & { date?: string }): ProgressLog {
    const all = this.getProgressLogs();
    const newLog: ProgressLog = {
      ...log,
      id: `PROG-${Date.now().toString().slice(-4)}`,
      date: log.date || 'Today'
    };
    const updated = [newLog, ...all];
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(updated));
    notify();
    return newLog;
  },

  // NOTIFICATIONS (WhatsApp, Email)
  getNotifications(): NotificationItem[] {
    try {
      const data = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
        return INITIAL_NOTIFICATIONS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  },

  sendNotification(notif: Omit<NotificationItem, 'id' | 'timestamp' | 'status'> & { status?: NotificationItem['status'] }): NotificationItem {
    const all = this.getNotifications();
    const newNotif: NotificationItem = {
      ...notif,
      id: `NOTIF-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      status: notif.status || 'Delivered'
    };
    const updated = [newNotif, ...all];
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
    notify();
    return newNotif;
  },

  // PAYMENTS & INVOICES
  getPayments(): PaymentReceipt[] {
    try {
      const data = localStorage.getItem(PAYMENTS_STORAGE_KEY);
      if (!data) {
        localStorage.setItem(PAYMENTS_STORAGE_KEY, JSON.stringify(INITIAL_PAYMENTS));
        return INITIAL_PAYMENTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_PAYMENTS;
    }
  },

  addPayment(receipt: Omit<PaymentReceipt, 'paymentId' | 'date' | 'status' | 'transactionId'> & { transactionId?: string }): PaymentReceipt {
    const payments = this.getPayments();
    const newPayment: PaymentReceipt = {
      ...receipt,
      paymentId: `PAY-KSG-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Just now',
      status: 'Completed',
      transactionId: receipt.transactionId || `TXN-UPI-${Math.floor(100000000 + Math.random() * 900000000)}`
    };
    const updated = [newPayment, ...payments];
    localStorage.setItem(PAYMENTS_STORAGE_KEY, JSON.stringify(updated));
    
    // Also create Member & Converted Lead
    this.addLead({
      name: receipt.name,
      phone: receipt.phone,
      email: receipt.email,
      type: 'membership',
      planName: receipt.planName,
      status: 'Converted',
      amount: receipt.amount,
      notes: `Direct Online Payment Completed via ${receipt.paymentMethod} (Total: ₹${receipt.totalAmount})`
    });

    this.addMember({
      name: receipt.name,
      phone: receipt.phone,
      email: receipt.email,
      planName: receipt.planName,
      status: 'Active',
      startDate: 'Today',
      expiryDate: '1 Year from today',
      amount: receipt.amount,
      assignedTrainer: 'Vikram Singhania',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    });

    // Trigger payment notification
    this.sendNotification({
      userName: receipt.name,
      phone: receipt.phone,
      title: 'Payment Invoice & Tax Receipt',
      message: `Payment Received: ₹${receipt.totalAmount} for ${receipt.planName}. Tax Invoice ID: ${newPayment.paymentId}.`,
      channel: 'WhatsApp',
      triggerEvent: 'Membership Activated'
    });

    notify();
    return newPayment;
  },

  // BACKUP & EXPORT
  exportFullDatabaseJson(): string {
    const db = {
      timestamp: new Date().toISOString(),
      version: '3.0.0',
      users: this.getUsers(),
      members: this.getMembers(),
      bookings: this.getBookings(),
      leads: this.getLeads(),
      payments: this.getPayments(),
      plans: this.getPlans(),
      trainers: this.getTrainers(),
      workouts: this.getWorkouts(),
      progressLogs: this.getProgressLogs(),
      notifications: this.getNotifications()
    };
    return JSON.stringify(db, null, 2);
  },

  restoreDatabaseJson(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.users) localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data.users));
      if (data.members) localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(data.members));
      if (data.bookings) localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(data.bookings));
      if (data.leads) localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(data.leads));
      if (data.payments) localStorage.setItem(PAYMENTS_STORAGE_KEY, JSON.stringify(data.payments));
      if (data.plans) localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(data.plans));
      if (data.trainers) localStorage.setItem(TRAINERS_STORAGE_KEY, JSON.stringify(data.trainers));
      if (data.workouts) localStorage.setItem(WORKOUTS_STORAGE_KEY, JSON.stringify(data.workouts));
      if (data.progressLogs) localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(data.progressLogs));
      if (data.notifications) localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(data.notifications));
      notify();
      return true;
    } catch {
      return false;
    }
  },

  exportLeadsCsv(): string {
    const leads = this.getLeads();
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Type', 'Plan/Goal', 'Status', 'Date', 'Notes'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      l.type,
      `"${l.planName || l.goal || 'General'}"`,
      l.status,
      `"${l.createdAt}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },

  exportMembersCsv(): string {
    const members = this.getMembers();
    const headers = ['Member ID', 'Name', 'Phone', 'Email', 'Plan', 'Status', 'Start Date', 'Expiry Date', 'Assigned Trainer'];
    const rows = members.map((m) => [
      m.id,
      `"${m.name}"`,
      `"${m.phone}"`,
      `"${m.email}"`,
      `"${m.planName}"`,
      m.status,
      `"${m.startDate}"`,
      `"${m.expiryDate}"`,
      `"${m.assignedTrainer}"`
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },

  // RESET TO DEFAULT DEMO DATA
  resetDemoData() {
    localStorage.removeItem(USERS_STORAGE_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(LEADS_STORAGE_KEY);
    localStorage.removeItem(BOOKINGS_STORAGE_KEY);
    localStorage.removeItem(MEMBERS_STORAGE_KEY);
    localStorage.removeItem(PAYMENTS_STORAGE_KEY);
    localStorage.removeItem(PLANS_STORAGE_KEY);
    localStorage.removeItem(TRAINERS_STORAGE_KEY);
    localStorage.removeItem(WORKOUTS_STORAGE_KEY);
    localStorage.removeItem(PROGRESS_STORAGE_KEY);
    localStorage.removeItem(NOTIFICATIONS_STORAGE_KEY);
    notify();
  }
};
