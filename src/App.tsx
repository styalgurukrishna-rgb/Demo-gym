import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { OfflineNotice } from './components/OfflineNotice';

// Critical First-Screen Page (Direct Import)
import { HomePage } from './pages/HomePage';

// Code-Split Secondary Pages (Lazy Loaded)
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProgramsPage = lazy(() => import('./pages/ProgramsPage').then(m => ({ default: m.ProgramsPage })));
const TrainersPage = lazy(() => import('./pages/TrainersPage').then(m => ({ default: m.TrainersPage })));
const FacilitiesPage = lazy(() => import('./pages/FacilitiesPage').then(m => ({ default: m.FacilitiesPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const PricingPage = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const BookingPage = lazy(() => import('./pages/BookingPage').then(m => ({ default: m.BookingPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const MemberDashboardPage = lazy(() => import('./pages/MemberDashboardPage').then(m => ({ default: m.MemberDashboardPage })));
const TrainerDashboardPage = lazy(() => import('./pages/TrainerDashboardPage').then(m => ({ default: m.TrainerDashboardPage })));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Code-Split Modals (Lazy Loaded on User Demand)
const JoinModal = lazy(() => import('./components/Modals/JoinModal').then(m => ({ default: m.JoinModal })));
const VirtualTourModal = lazy(() => import('./components/Modals/VirtualTourModal').then(m => ({ default: m.VirtualTourModal })));
const ProgramDetailModal = lazy(() => import('./components/Modals/ProgramDetailModal').then(m => ({ default: m.ProgramDetailModal })));
const TrainerProfileModal = lazy(() => import('./components/Modals/TrainerProfileModal').then(m => ({ default: m.TrainerProfileModal })));
const FacilityLightboxModal = lazy(() => import('./components/Modals/FacilityLightboxModal').then(m => ({ default: m.FacilityLightboxModal })));
const FreeTrialModal = lazy(() => import('./components/Modals/FreeTrialModal').then(m => ({ default: m.FreeTrialModal })));
const PaymentModal = lazy(() => import('./components/Modals/PaymentModal').then(m => ({ default: m.PaymentModal })));
const MemberLoginModal = lazy(() => import('./components/Modals/MemberLoginModal').then(m => ({ default: m.MemberLoginModal })));
const MemberDashboardModal = lazy(() => import('./components/Modals/MemberDashboardModal').then(m => ({ default: m.MemberDashboardModal })));
const AdminCrmModal = lazy(() => import('./components/Modals/AdminCrmModal').then(m => ({ default: m.AdminCrmModal })));
const ExitIntentModal = lazy(() => import('./components/Modals/ExitIntentModal').then(m => ({ default: m.ExitIntentModal })));
const ConsultationModal = lazy(() => import('./components/Modals/ConsultationModal').then(m => ({ default: m.ConsultationModal })));
const SmartPlanAdvisorModal = lazy(() => import('./components/Modals/SmartPlanAdvisorModal').then(m => ({ default: m.SmartPlanAdvisorModal })));

import { PageType, ModalState, Program, Trainer, Facility, PricingPlan, MemberProfile } from './types';
import { leadStore } from './services/leadStore';
import { gymConfigStore } from './services/gymConfigStore';
import { applyPageSeo } from './utils/seo';
import { updateStructuredData } from './utils/structuredData';
import { analytics } from './utils/analytics';
import { Sparkles } from 'lucide-react';
import { soundManager } from './components/common/SoundEffects';

// Helper to resolve route from URL pathname and hash on initial load or refresh
const getInitialRoute = (): { page: PageType; sectionId?: string } => {
  if (typeof window === 'undefined') return { page: 'home' };
  
  const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const rawHash = window.location.hash.replace(/^#+/, '').toLowerCase();

  const validPages: Record<string, PageType> = {
    '': 'home',
    'home': 'home',
    'about': 'about',
    'programs': 'programs',
    'trainers': 'trainers',
    'facilities': 'facilities',
    'gallery': 'gallery',
    'pricing': 'pricing',
    'booking': 'booking',
    'contact': 'contact',
    'privacy': 'privacy',
    'terms': 'terms',
    'login': 'login',
    'member-dashboard': 'member-dashboard',
    'trainer-dashboard': 'trainer-dashboard',
    'admin-dashboard': 'admin-dashboard',
    'not-found': 'not-found'
  };

  if (validPages[rawPath]) {
    return { page: validPages[rawPath], sectionId: rawHash || undefined };
  }

  // If hash corresponds to a dedicated page
  if (rawHash && validPages[rawHash]) {
    return { page: validPages[rawHash] };
  }

  // If unrecognized route on direct refresh, check if path exists or fallback
  if (rawPath) {
    return { page: 'not-found' };
  }

  return { page: 'home', sectionId: rawHash || undefined };
};

export default function App() {
  const initialRoute = getInitialRoute();

  // Dynamic Routing State initialized from URL pathname/hash
  const [currentPage, setCurrentPage] = useState<PageType>(initialRoute.page);
  const [initialSectionId, setInitialSectionId] = useState<string | undefined>(initialRoute.sectionId);

  // Modal states
  const [modalState, setModalState] = useState<ModalState>({ type: null, data: null });

  const [selectedPlanForJoin, setSelectedPlanForJoin] = useState<PricingPlan | null>(null);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<PricingPlan | null>(null);
  const [activeMember, setActiveMember] = useState<MemberProfile | null>(null);

  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [programActionType, setProgramActionType] = useState<'learnMore' | 'bookTrainer' | 'explore' | 'start' | null>(null);

  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  // Configure manual scroll restoration and guarantee initial (0, 0) top position
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    
    if (initialSectionId) {
      setTimeout(() => {
        const el = document.getElementById(initialSectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }

    // Handle browser forward/back buttons thoughtfully
    const handlePopState = (event: PopStateEvent) => {
      const currentRoute = getInitialRoute();
      const targetPage = (event.state && event.state.page) || currentRoute.page;
      const targetSection = (event.state && event.state.sectionId) || currentRoute.sectionId;

      setCurrentPage(targetPage);

      if (targetSection) {
        setTimeout(() => {
          const element = document.getElementById(targetSection);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Apply dynamic SEO and structured data whenever page or config changes
  useEffect(() => {
    const config = gymConfigStore.getConfig();
    applyPageSeo(currentPage, config);
    updateStructuredData(config);
    analytics.trackEvent('page_view', { page: currentPage });
  }, [currentPage]);

  // Subscribe to config changes for real-time SEO & Schema updates
  useEffect(() => {
    const unsub = gymConfigStore.subscribe((newCfg) => {
      applyPageSeo(currentPage, newCfg);
      updateStructuredData(newCfg);
    });
    return () => unsub();
  }, [currentPage]);

  // Exit intent detection (session-based)
  useEffect(() => {
    let hasTriggered = false;
    const isDismissed = sessionStorage.getItem('ksg_exit_intent_dismissed');
    if (isDismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasTriggered) {
        hasTriggered = true;
        sessionStorage.setItem('ksg_exit_intent_dismissed', 'true');
        setModalState({ type: 'exitIntent' });
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // Global Escape key listener to close any active modal
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalState.type !== null) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [modalState.type]);

  // Comprehensive navigation handler supporting both full page transitions and section anchors
  const handleNavigate = (page: PageType, sectionId?: string) => {
    soundManager.playClick();
    setCurrentPage(page);

    const path = page === 'home'
      ? (sectionId ? `/#${sectionId}` : '/')
      : `/${page}${sectionId ? `#${sectionId}` : ''}`;

    try {
      window.history.pushState({ page, sectionId }, '', path);
    } catch {
      // fallback
    }

    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        }
      }, 80);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  // Generic modal opener
  const handleOpenModal = (type: ModalState['type'], data?: any) => {
    soundManager.playClick();
    if (type === 'join') {
      setSelectedPlanForJoin(data || null);
    } else if (type === 'payment') {
      setSelectedPlanForPayment(data?.plan || data || null);
    } else if (type === 'programDetail' || type === 'program') {
      setSelectedProgram(data?.program || data || null);
      setProgramActionType(data?.actionType || 'learnMore');
    } else if (type === 'trainerProfile' || type === 'trainer') {
      setSelectedTrainer(data?.trainer || data || null);
    } else if (type === 'facilityLightbox' || type === 'facility') {
      setSelectedFacility(data?.facility || data || null);
    } else if (type === 'login' || type === 'memberLogin') {
      const existing = leadStore.getCurrentMember();
      if (existing) {
        setActiveMember(existing);
        setModalState({ type: 'memberDashboard' });
        return;
      }
    }
    setModalState({ type, data });
  };

  const handleCloseModal = () => {
    setModalState({ type: null, data: null });
    setSelectedPlanForJoin(null);
    setSelectedPlanForPayment(null);
    setSelectedProgram(null);
    setSelectedTrainer(null);
    setSelectedFacility(null);
  };

  const handleLoginSuccess = (member: MemberProfile) => {
    setActiveMember(member);
    setModalState({ type: 'memberDashboard' });
  };

  const handleLogout = () => {
    leadStore.logoutMember();
    setActiveMember(null);
    setModalState({ type: null });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-black font-sans">
      {/* 1. Top Sticky Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenModal={handleOpenModal}
      />

      {/* 2. Dynamic Page View Renderer */}
      <main className="flex-1 pt-16 pb-20 md:pb-0">
        {currentPage === 'home' ? (
          <HomePage onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
        ) : (
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" /></div>}>
            {currentPage === 'about' && (
              <AboutPage onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
            )}
            {currentPage === 'programs' && (
              <ProgramsPage onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
            )}
            {currentPage === 'trainers' && (
              <TrainersPage onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
            )}
            {currentPage === 'facilities' && (
              <FacilitiesPage onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
            )}
            {currentPage === 'gallery' && (
              <GalleryPage onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
            )}
            {currentPage === 'pricing' && (
              <PricingPage onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
            )}
            {currentPage === 'booking' && (
              <BookingPage onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
            )}
            {currentPage === 'contact' && (
              <ContactPage onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
            )}
            {currentPage === 'privacy' && (
              <PrivacyPolicyPage onNavigate={handleNavigate} />
            )}
            {currentPage === 'terms' && (
              <TermsPage onNavigate={handleNavigate} />
            )}
            {currentPage === 'not-found' && (
              <NotFoundPage onNavigate={handleNavigate} />
            )}
            {currentPage === 'login' && (
              <LoginPage onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
            )}
            {currentPage === 'member-dashboard' && (
              <MemberDashboardPage onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
            )}
            {currentPage === 'trainer-dashboard' && (
              <TrainerDashboardPage onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
            )}
            {currentPage === 'admin-dashboard' && (
              <AdminDashboardPage onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
            )}
          </Suspense>
        )}
      </main>

      {/* Network Offline Status Alert */}
      <OfflineNotice />

      {/* Cookie & Privacy Consent Banner */}
      <CookieConsentBanner onViewPrivacyPolicy={() => handleNavigate('privacy')} />

      {/* 4. Footer */}
      <Footer onNavigate={handleNavigate} onOpenModal={handleOpenModal} />

      {/* 5. Floating Action Buttons (WhatsApp, Quick Call, Booking) */}
      <FloatingActions 
        onOpenJoin={() => handleOpenModal('join')} 
        onOpenBooking={() => handleNavigate('booking')}
      />

      {/* --- MODALS SUITE (Loaded On Demand via Suspense) --- */}
      <Suspense fallback={null}>
        {/* 1. Free Trial Booking Modal */}
        <FreeTrialModal
          isOpen={modalState.type === 'trial'}
          onClose={handleCloseModal}
        />

        {/* 2. Direct Membership / Lead Join Modal */}
        <JoinModal
          isOpen={modalState.type === 'join'}
          onClose={handleCloseModal}
          selectedPlan={selectedPlanForJoin}
        />

        {/* 3. Payment / Checkout Modal */}
        <PaymentModal
          isOpen={modalState.type === 'payment'}
          onClose={handleCloseModal}
          plan={selectedPlanForPayment}
        />

        {/* 4. Consultation Booking Modal */}
        <ConsultationModal
          isOpen={modalState.type === 'consultation'}
          onClose={handleCloseModal}
        />

        {/* 5. Member Login Modal */}
        <MemberLoginModal
          isOpen={modalState.type === 'login'}
          onClose={handleCloseModal}
          onSuccess={handleLoginSuccess}
        />

        {/* 6. Member Portal Dashboard Modal */}
        <MemberDashboardModal
          isOpen={modalState.type === 'memberDashboard'}
          onClose={handleCloseModal}
          member={activeMember}
          onLogout={handleLogout}
        />

        {/* 7. Gym Owner CRM & Lead Management System Modal */}
        <AdminCrmModal
          isOpen={modalState.type === 'admin'}
          onClose={handleCloseModal}
        />

        {/* 8. Exit Intent Special Offer Popup */}
        <ExitIntentModal
          isOpen={modalState.type === 'exitIntent'}
          onClose={handleCloseModal}
          onClaimTrial={() => {
            handleCloseModal();
            handleNavigate('booking');
          }}
          onViewMembership={() => {
            handleCloseModal();
            handleNavigate('pricing');
          }}
        />

        {/* Smart Plan Advisor / Help Me Choose Modal */}
        <SmartPlanAdvisorModal
          isOpen={modalState.type === 'helpMeChoose'}
          onClose={handleCloseModal}
          onSelectPlan={(plan) => {
            handleCloseModal();
            handleOpenModal('payment', { plan, finalPrice: plan.price, billingCycle: 'monthly' });
          }}
          onBookTrial={() => {
            handleCloseModal();
            handleNavigate('booking');
          }}
        />

        {/* 9. Virtual Tour 4K Player Popup */}
        <VirtualTourModal
          isOpen={modalState.type === 'tour'}
          onClose={handleCloseModal}
          onOpenJoin={() => {
            handleCloseModal();
            handleOpenModal('join');
          }}
        />

        {/* 10. Program Detail & Booking Popup */}
        <ProgramDetailModal
          program={selectedProgram}
          actionType={programActionType}
          onClose={handleCloseModal}
          onRegister={() => {
            handleCloseModal();
            handleNavigate('booking');
          }}
        />

        {/* 11. Trainer Profile & Consultation Popup */}
        <TrainerProfileModal
          trainer={selectedTrainer}
          onClose={handleCloseModal}
          onBookTrainer={() => {
            handleCloseModal();
            handleNavigate('booking');
          }}
        />

        {/* 12. Facility High-Res Lightbox */}
        <FacilityLightboxModal
          facility={selectedFacility}
          onClose={handleCloseModal}
          onOpenJoin={() => {
            handleCloseModal();
            handleNavigate('booking');
          }}
        />

      </Suspense>
    </div>
  );
}
