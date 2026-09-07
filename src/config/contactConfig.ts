/**
 * Centralized Contact Configuration for KSG DEMO GYM
 * Single Source of Truth for all phone, WhatsApp, email and contact destinations.
 */

export const CONTACT_CONFIG = {
  // Official Business Phone (Digits only)
  rawPhone: '7549929102',
  
  // International format with country code
  intlPhone: '+917549929102',
  
  // Formatted display string for UI
  displayPhone: '+91 75499 29102',
  
  // WhatsApp digits with country code
  whatsappNumber: '917549929102',
  
  // Formatted WhatsApp display string
  displayWhatsapp: '+91 75499 29102',
  
  // Official Business Email
  email: 'contact@ksgdemogym.com',
  supportEmail: 'support@ksgdemogym.com',
  
  // Physical Location
  address: 'Platinum Towers, 100ft Road, Indiranagar, Bangalore 560038',
  city: 'Bangalore',
  state: 'Karnataka',
  country: 'India',
  
  // Operating Hours
  hours: '5:00 AM - 11:00 PM (Daily)',
  
  // Pre-filled WhatsApp message generators
  getWhatsAppUrl: (message?: string) => {
    const defaultMsg = 'Hello KSG DEMO GYM, I would like to know more about your membership plans and book a free trial.';
    const text = encodeURIComponent(message || defaultMsg);
    return `https://wa.me/917549929102?text=${text}`;
  },
  
  getTelUrl: () => 'tel:+917549929102',
  getMailtoUrl: (subject?: string) => `mailto:contact@ksgdemogym.com${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`,
};
