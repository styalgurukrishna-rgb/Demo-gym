/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV?: string;
  readonly VITE_APP_URL?: string;
  readonly VITE_DEFAULT_TIMEZONE?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  readonly VITE_PAYMENT_GATEWAY_KEY?: string;
  readonly VITE_ENABLE_DEMO_MODE?: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
