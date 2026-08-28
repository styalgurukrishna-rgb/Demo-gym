import { PRODUCTION_CONFIG } from '../config/productionConfig';

export type AnalyticsEventName =
  | 'page_view'
  | 'join_now_click'
  | 'free_trial_click'
  | 'pricing_view'
  | 'plan_selected'
  | 'booking_started'
  | 'booking_completed'
  | 'whatsapp_click'
  | 'call_click'
  | 'directions_click'
  | 'contact_submitted'
  | 'demo_inquiry_submitted'
  | 'conversion_funnel_step';

export interface AnalyticsEventPayload {
  eventName: AnalyticsEventName;
  page?: string;
  category?: string;
  label?: string;
  value?: number;
  currency?: string;
  planName?: string;
  trainerName?: string;
  funnelStep?: 'visitor' | 'program_view' | 'pricing_view' | 'plan_selection' | 'booking_start' | 'booking_complete';
  [key: string]: any;
}

const CONSENT_KEY = 'ksg_cookie_consent_status_v1';
const ANALYTICS_STORE_KEY = 'ksg_analytics_events_log_v1';

class AnalyticsTracker {
  private hasConsent: boolean = false;
  private isInitialized: boolean = false;

  constructor() {
    this.checkConsent();
    this.initialize();
  }

  private checkConsent() {
    if (typeof window === 'undefined') return;
    const consent = localStorage.getItem(CONSENT_KEY);
    this.hasConsent = consent === 'accepted';
  }

  public setConsent(accepted: boolean) {
    if (typeof window === 'undefined') return;
    this.hasConsent = accepted;
    localStorage.setItem(CONSENT_KEY, accepted ? 'accepted' : 'declined');
    if (accepted && !this.isInitialized) {
      this.initialize();
    }
  }

  public getConsentStatus(): 'accepted' | 'declined' | 'pending' {
    if (typeof window === 'undefined') return 'pending';
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'accepted') return 'accepted';
    if (consent === 'declined') return 'declined';
    return 'pending';
  }

  private initialize() {
    if (typeof window === 'undefined') return;
    const gaId = PRODUCTION_CONFIG.gaMeasurementId;
    if (gaId && this.hasConsent && !document.getElementById('ga-script')) {
      const script = document.createElement('script');
      script.id = 'ga-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      const inlineScript = document.createElement('script');
      inlineScript.id = 'ga-init-script';
      inlineScript.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', { anonymize_ip: true });
      `;
      document.head.appendChild(inlineScript);
      this.isInitialized = true;
    }
  }

  /**
   * Track high-intent user interaction & conversion events
   */
  public trackEvent(eventName: AnalyticsEventName, payload?: Partial<AnalyticsEventPayload>) {
    if (typeof window === 'undefined') return;

    const eventData: AnalyticsEventPayload = {
      eventName,
      page: payload?.page || window.location.pathname,
      timestamp: new Date().toISOString(),
      ...payload,
    };

    // 1. Google Analytics 4 integration if available
    if (this.hasConsent && typeof (window as any).gtag === 'function' && PRODUCTION_CONFIG.gaMeasurementId) {
      (window as any).gtag('event', eventName, {
        event_category: payload?.category || 'User Engagement',
        event_label: payload?.label,
        value: payload?.value,
        ...payload,
      });
    }

    // 2. Local session & analytics logging for internal admin conversion funnel metrics
    try {
      const existing = localStorage.getItem(ANALYTICS_STORE_KEY);
      const events: AnalyticsEventPayload[] = existing ? JSON.parse(existing) : [];
      events.unshift(eventData);
      // Keep recent 100 events to manage storage cleanly
      localStorage.setItem(ANALYTICS_STORE_KEY, JSON.stringify(events.slice(0, 100)));
    } catch {
      // Graceful fallback if storage is restricted
    }
  }

  public getEventLogs(): AnalyticsEventPayload[] {
    try {
      const existing = localStorage.getItem(ANALYTICS_STORE_KEY);
      return existing ? JSON.parse(existing) : [];
    } catch {
      return [];
    }
  }

  public getFunnelStats() {
    const logs = this.getEventLogs();
    return {
      totalEvents: logs.length,
      pageViews: logs.filter(e => e.eventName === 'page_view').length,
      pricingViews: logs.filter(e => e.eventName === 'pricing_view').length,
      plansSelected: logs.filter(e => e.eventName === 'plan_selected').length,
      bookingsStarted: logs.filter(e => e.eventName === 'booking_started').length,
      bookingsCompleted: logs.filter(e => e.eventName === 'booking_completed').length,
      whatsAppClicks: logs.filter(e => e.eventName === 'whatsapp_click').length,
      callClicks: logs.filter(e => e.eventName === 'call_click').length,
      contactSubmissions: logs.filter(e => e.eventName === 'contact_submitted').length,
    };
  }
}

export const analytics = new AnalyticsTracker();
