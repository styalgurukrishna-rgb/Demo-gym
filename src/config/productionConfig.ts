/**
 * Centralized Production Configuration for KSG DEMO GYM Platform
 * Supports custom domains, environment variables, timezones, and seamless client handover.
 */

export interface AppEnvConfig {
  env: 'development' | 'staging' | 'production';
  appUrl: string;
  isProduction: boolean;
  timezone: string;
  gaMeasurementId: string;
  googleMapsApiKey: string;
  paymentGatewayKey: string;
  isPaymentGatewayConfigured: boolean;
}

export const PRODUCTION_CONFIG: AppEnvConfig = {
  env: (import.meta.env.VITE_APP_ENV as 'development' | 'staging' | 'production') || 
       (import.meta.env.MODE === 'production' ? 'production' : 'development'),
  appUrl: import.meta.env.VITE_APP_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://www.ksgdemogym.com'),
  isProduction: import.meta.env.PROD || import.meta.env.VITE_APP_ENV === 'production',
  timezone: import.meta.env.VITE_DEFAULT_TIMEZONE || 'Asia/Kolkata',
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  paymentGatewayKey: import.meta.env.VITE_PAYMENT_GATEWAY_KEY || '',
  isPaymentGatewayConfigured: Boolean(import.meta.env.VITE_PAYMENT_GATEWAY_KEY && import.meta.env.VITE_PAYMENT_GATEWAY_KEY !== 'rzp_live_XXXXXXXXXX'),
};

/**
 * Format a Date in the configured gym timezone
 */
export function formatInGymTimezone(date: Date | string, formatOptions?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return String(date);

  const defaultOptions: Intl.DateTimeFormatOptions = {
    timeZone: PRODUCTION_CONFIG.timezone,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  try {
    return new Intl.DateTimeFormat('en-IN', { ...defaultOptions, ...formatOptions }).format(d);
  } catch {
    return d.toLocaleString();
  }
}

/**
 * Normalizes custom domain canonical URLs
 */
export function getCanonicalUrl(path: string = ''): string {
  const baseUrl = PRODUCTION_CONFIG.appUrl.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath === '/' ? '' : cleanPath}`;
}
