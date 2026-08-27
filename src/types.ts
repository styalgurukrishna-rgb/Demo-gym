export type UserRole = 'member' | 'trainer' | 'admin';

export type PageType = 
  | 'home'
  | 'about'
  | 'programs'
  | 'trainers'
  | 'facilities'
  | 'gallery'
  | 'pricing'
  | 'booking'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'not-found'
  | 'login'
  | 'member-dashboard'
  | 'trainer-dashboard'
  | 'admin-dashboard';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  assignedTrainerId?: string;
  assignedTrainerName?: string;
  membershipPlan?: string;
  membershipStatus?: 'Active' | 'Expiring Soon' | 'Expired' | 'Suspended';
  expiryDate?: string;
}

export interface Program {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  image: string;
  duration: string;
  caloriesBurn: string;
  level: string;
  trainer: {
    name: string;
    role: string;
    avatar: string;
  };
  benefits: string[];
  schedule: string;
  description: string;
  ctaText: string;
  badge?: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialization: string;
  image: string;
  bio: string;
  certifications: string[];
  achievements: string[];
  instagram?: string;
  rating: number;
  clientsTrained: string;
  availableDays?: string[];
  availableSlots?: string[];
  assignedMembersCount?: number;
}

export interface Facility {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
  highlight: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'workout' | 'events' | 'transformation' | 'trainers';
  categoryLabel: string;
  image: string;
  description: string;
  tag: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  tagline: string;
  isPopular?: boolean;
  isVIP?: boolean;
  features: string[];
  ctaText: string;
  discountBadge?: string;
  active?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  transformation: string;
  quote: string;
  timeframe: string;
}

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  age?: number | string;
  goal?: string;
  preferredTime?: string;
  preferredDate?: string;
  type: 'trial' | 'membership' | 'consultation' | 'contact' | 'booking' | 'demo-inquiry';
  source?: 'Website' | 'WhatsApp' | 'Free Trial' | 'Membership' | 'Contact Form' | 'Demo Inquiry';
  planName?: string;
  status: 'New' | 'Contacted' | 'Follow-up' | 'Converted' | 'Lost' | 'Trial Scheduled' | 'Dropped';
  notes?: string;
  createdAt: string;
  amount?: number;
}

export interface DemoInquiryLead {
  id: string;
  name: string;
  gymName: string;
  phone: string;
  email: string;
  currentWebsite?: string;
  serviceType: 'New Website' | 'Redesign Existing Website' | 'Online Booking' | 'Membership System' | 'Complete Gym Website';
  message?: string;
  status: 'New' | 'Contacted' | 'Follow-up' | 'Converted' | 'Lost';
  createdAt: string;
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  author?: string;
  robots?: string;
}

export interface BrandConfig {
  gymName: string;
  name?: string;
  shortName?: string;
  logoSubtitle?: string;
  establishedYear?: string;
  tagline: string;
  logo: string;
  logoBadge: string;
  favicon: string;
  aboutText: string;
  storyHeading: string;
  storyDescription: string;
  experienceYears?: string;
}

export interface ThemeColors {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  primary?: string;
  secondary?: string;
}

export interface HeroConfig {
  heroHeading: string;
  heroSubtitle: string;
  ctaButtonText: string;
  secondaryButtonText: string;
  heroImage: string;
  heroVideo: string;
  badge?: string;
  titleMain?: string;
  titleHighlight?: string;
  subtitle?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  backgroundImage?: string;
}

export interface ContactConfig {
  phone: string;
  email: string;
  address: string;
  city: string;
  area: string;
  googleMapsUrl: string;
  openingHours: string;
  instagram: string;
  facebook: string;
  youtube: string;
  landmark?: string;
  state?: string;
  pincode?: string;
  workingHours?: {
    weekdays: string;
    sunday: string;
  };
}

export interface WhatsAppConfig {
  whatsappNumber: string;
  defaultMessage: string;
  trainerDefaultMessage?: string;
  number?: string;
}

export interface GymConfig {
  id: string;
  brand: BrandConfig;
  colors: ThemeColors;
  theme?: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  hero: HeroConfig;
  contact: ContactConfig;
  whatsapp: WhatsAppConfig;
  seo: SeoConfig;
  demoMode: boolean;
  whiteLabelMode: boolean;
  clientPreviewMode: boolean;
  updatedAt: string;
}

export interface BookingItem {
  id: string;
  name: string;
  phone: string;
  email: string;
  fitnessGoal: string;
  trainerName: string;
  trainerId?: string;
  date: string;
  timeSlot: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  createdAt: string;
  notes?: string;
  qrCode?: string;
}

export interface MemberRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  planName: string;
  status: 'Active' | 'Expired' | 'Expiring Soon' | 'Suspended';
  startDate: string;
  expiryDate: string;
  amount: number;
  assignedTrainer: string;
  avatar?: string;
}

export interface MemberProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  planName: string;
  status: 'Active' | 'Expiring Soon' | 'Suspended' | 'Expired';
  joinDate: string;
  expiryDate: string;
  qrCode: string;
  checkinsThisMonth: number;
  assignedTrainer: string;
  trainerRole: string;
  trainerImage: string;
  currentWeight: number;
  targetWeight: number;
  heightCm?: number;
  bmi?: number;
  bodyFatPct: number;
  muscleMassKg: number;
  workoutsThisWeek?: number;
}

export interface ExerciseItem {
  id: string;
  name: string;
  targetMuscle: string;
  sets: number;
  reps: string;
  targetWeightKg?: number;
  completed?: boolean;
  notes?: string;
}

export interface WorkoutPlan {
  id: string;
  memberId: string;
  memberName: string;
  date: string;
  dayTitle: string; // e.g. "Chest & Triceps Hypertrophy"
  trainerNotes: string;
  exercises: ExerciseItem[];
  completedCount?: number;
}

export interface ProgressLog {
  id: string;
  memberId: string;
  date: string;
  weightKg: number;
  heightCm: number;
  bmi: number;
  bodyFatPct: number;
  muscleMassKg: number;
  notes: string;
  photoUrl?: string;
}

export interface PaymentReceipt {
  paymentId: string;
  memberId: string;
  name: string;
  phone: string;
  email: string;
  planName: string;
  amount: number;
  gstAmount: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking';
  date: string;
  status: 'Completed' | 'Pending';
  transactionId?: string;
}

export interface NotificationItem {
  id: string;
  userId?: string;
  userName: string;
  phone: string;
  title: string;
  message: string;
  channel: 'WhatsApp' | 'Email' | 'SMS' | 'System';
  timestamp: string;
  status: 'Sent' | 'Delivered' | 'Read' | 'Pending';
  triggerEvent: 'Trial Booked' | 'Membership Activated' | 'Expiry Reminder' | 'Trainer Assigned' | 'Workout Updated';
}

export type ModalType = 
  | 'join'
  | 'tour'
  | 'program'
  | 'programDetail'
  | 'trainer'
  | 'trainerProfile'
  | 'trial'
  | 'payment'
  | 'consultation'
  | 'login'
  | 'memberLogin'
  | 'memberDashboard'
  | 'admin'
  | 'adminPanel'
  | 'exitIntent'
  | 'facilityLightbox'
  | 'demoHighlights'
  | 'demoInquiry'
  | 'websiteCustomizer'
  | 'deletePlanConfirm'
  | 'addTrainer'
  | 'addMember'
  | 'editPlan'
  | 'invoice'
  | null;

export interface ModalState {
  type: ModalType;
  data?: any;
}
