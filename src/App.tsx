import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { LoadingScreen } from './components/LoadingScreen';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { OfflineNotice } from './components/OfflineNotice';

// Production Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { TrainersPage } from './pages/TrainersPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { GalleryPage } from './pages/GalleryPage';
import { PricingPage } from './pages/PricingPage';
import { BookingPage } from './pages/BookingPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { MemberDashboardPage } from './pages/MemberDashboardPage';
import { TrainerDashboardPage } from './pages/TrainerDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Modals
import { JoinModal } from './components/Modals/JoinModal';
import { VirtualTourModal } from './components/Modals/VirtualTourModal';
import { ProgramDetailModal } from './components/Modals/ProgramDetailModal';
import { TrainerProfileModal } from './components/Modals/TrainerProfileModal';
import { FacilityLightboxModal } from './components/Modals/FacilityLightboxModal';
import { FreeTrialModal } from './components/Modals/FreeTrialModal';
import { PaymentModal } from './components/Modals/PaymentModal';
import { MemberLoginModal } from './components/Modals/MemberLoginModal';
import { MemberDashboardModal } from './components/Modals/MemberDashboardModal';
import { AdminCrmModal } from './components/Modals/AdminCrmModal';
import { ExitIntentModal } from './components/Modals/ExitIntentModal';
import { ConsultationModal } from './components/Modals/ConsultationModal';
import { DemoHighlightsModal } from './components/Modals/DemoHighlightsModal';
import { DemoInquiryModal } from './components/Modals/DemoInquiryModal';
import { SmartPlanAdvisorModal } from './components/Modals/SmartPlanAdvisorModal';
import { DemoWebsiteBadge } from './components/DemoWebsiteBadge';

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

  // Loading screen state
  const [isLoading, setIsLoading] = useState(true);

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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });

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
        }, 80);
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle post-loading scroll or anchor jump
  const handleLoadingComplete = () => {
    setIsLoading(false);
    if (initialSectionId) {
      setTimeout(() => {
        const element = document.getElementById(initialSectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
        }
        setInitialSectionId(undefined);
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

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
      {/* 1. Initial Cinematic Luxury Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* 2. Top Sticky Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenModal={handleOpenModal}
      />

      {/* 3. Dynamic Page View Renderer */}
      <main className="flex-1 pt-16">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onOpenModal={handleOpenModal} />
        )}
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

      {/* 6. Gym Owner CRM Pitch / Demo Highlights Floating Trigger Button */}
      <div className="fixed bottom-20 left-4 z-40 hidden sm:block">
        <button
          id="client-pitch-demo-btn"
          onClick={() => {
            soundManager.playClick();
            handleOpenModal('demoHighlights');
          }}
          className="group px-3.5 py-2 rounded-2xl bg-zinc-900/90 hover:bg-zinc-900 border border-amber-500/40 hover:border-amber-400 text-white text-[11px] font-black uppercase tracking-wider shadow-2xl backdrop-blur-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
        >
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 group-hover:rotate-12 transition-transform">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="hidden md:inline">SYSTEM DEMO GUIDE</span>
          <span className="md:hidden">GUIDE</span>
        </button>
      </div>

      {/* --- MODALS SUITE --- */}

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

      {/* 13. Gym Owner Demo Highlights Modal */}
      <DemoHighlightsModal
        isOpen={modalState.type === 'demoHighlights'}
        onClose={handleCloseModal}
        onOpenAdmin={() => {
          handleCloseModal();
          handleNavigate('admin-dashboard');
        }}
        onOpenTrial={() => {
          handleCloseModal();
          handleNavigate('booking');
        }}
      />

      {/* 14. Demo Website Inquiry Modal */}
      <DemoInquiryModal
        isOpen={modalState.type === 'demoInquiry'}
        onClose={handleCloseModal}
      />

      {/* Floating Demo Website Badge */}
      <DemoWebsiteBadge
        onOpenCustomizer={() => handleNavigate('admin-dashboard')}
        onOpenInquiry={() => handleOpenModal('demoInquiry')}
      />
    </div>
  );
}
