import { PageType, GymConfig } from '../types';
import { gymConfigStore } from '../services/gymConfigStore';
import { getCanonicalUrl } from '../config/productionConfig';

export interface PageSeoData {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string;
  ogType?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function getPageSeoData(page: PageType, config: GymConfig): PageSeoData {
  const gymName = config.brand.gymName || 'KSG DEMO GYM';
  const tagline = config.brand.tagline || 'Transform Your Body. Upgrade Your Life.';
  const city = config.contact.city || 'Bangalore';
  const area = config.contact.area || 'Indiranagar';
  const defaultImage = config.seo?.ogImage || config.hero.heroImage || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80';

  switch (page) {
    case 'home':
      return {
        title: config.seo?.metaTitle || `${gymName} | Luxury Fitness & High-Performance Training Sanctuary`,
        description: config.seo?.metaDescription || `Experience premier strength training, CSCS-certified coaching, Panatta biomechanics equipment, and recovery spa at ${gymName}, ${area}, ${city}.`,
        canonicalPath: '/',
        ogType: 'website',
        ogImage: defaultImage,
        keywords: config.seo?.keywords,
      };

    case 'about':
      return {
        title: `About Our Sanctuary | ${gymName} - ${city}`,
        description: `Learn the philosophy, biomechanical science, and community behind ${gymName}. Founded by strength athletes to deliver sustainable transformations.`,
        canonicalPath: '/about',
        ogType: 'website',
        ogImage: defaultImage,
      };

    case 'programs':
      return {
        title: `High-Performance Fitness Programs | ${gymName}`,
        description: `Explore structured training splits: Hypertrophy & Powerlifting, CrossFit & Hyrox, Fat Loss Recomp, and Athletic Conditioning at ${gymName}.`,
        canonicalPath: '/programs',
        ogType: 'website',
        ogImage: defaultImage,
      };

    case 'trainers':
      return {
        title: `Master Coaches & CSCS Personal Trainers | ${gymName}`,
        description: `Meet our elite internationally certified trainers specializing in Olympic lifting, body recomposition, biomechanics, and sports nutrition at ${gymName}.`,
        canonicalPath: '/trainers',
        ogType: 'website',
        ogImage: defaultImage,
      };

    case 'facilities':
      return {
        title: `World-Class Gym Facilities & Panatta Equipment | ${gymName}`,
        description: `Tour our 15,000 sq.ft facility featuring Panatta & Eleiko platforms, Olympic lifting zones, InBody 770 body scans, cryotherapy, and Finnish saunas.`,
        canonicalPath: '/facilities',
        ogType: 'website',
        ogImage: defaultImage,
      };

    case 'gallery':
      return {
        title: `Facility Gallery & Client Transformations | ${gymName}`,
        description: `Browse 4K visual tours, athletic training sessions, community events, and real member body recomposition results at ${gymName}.`,
        canonicalPath: '/gallery',
        ogType: 'website',
        ogImage: defaultImage,
      };

    case 'pricing':
      return {
        title: `Membership Plans & Transparent Pricing | ${gymName}`,
        description: `Choose your tier: Basic, Premium, or VIP Elite. Transparent luxury gym memberships with 24/7 access, personal training, and zero hidden enrollment fees.`,
        canonicalPath: '/pricing',
        ogType: 'website',
        ogImage: defaultImage,
      };

    case 'booking':
      return {
        title: `Book Free 1-Day Trial Pass & Trainer Consultation | ${gymName}`,
        description: `Claim your complimentary VIP day pass or book a 1-on-1 personal training consultation at ${gymName}, ${area}, ${city}. Instant confirmation.`,
        canonicalPath: '/booking',
        ogType: 'website',
        ogImage: defaultImage,
      };

    case 'contact':
      return {
        title: `Contact & Location | Find ${gymName} in ${city}`,
        description: `Find ${gymName} at ${config.contact.address}. Call ${config.contact.phone} or chat on WhatsApp to schedule a facility walkthrough.`,
        canonicalPath: '/contact',
        ogType: 'website',
        ogImage: defaultImage,
      };

    case 'privacy':
      return {
        title: `Privacy Policy | ${gymName}`,
        description: `Our transparent data protection practices, booking privacy guidelines, cookie management, and member rights policy for ${gymName}.`,
        canonicalPath: '/privacy',
        ogType: 'website',
        ogImage: defaultImage,
      };

    case 'terms':
      return {
        title: `Terms & Conditions | ${gymName}`,
        description: `Terms of service, membership regulations, cancellation guidelines, and code of conduct for ${gymName}.`,
        canonicalPath: '/terms',
        ogType: 'website',
        ogImage: defaultImage,
      };

    case 'login':
    case 'member-dashboard':
    case 'trainer-dashboard':
    case 'admin-dashboard':
      return {
        title: `Portal Access | ${gymName}`,
        description: `Secure member, trainer, and staff administrative management portal for ${gymName}.`,
        canonicalPath: `/${page}`,
        noIndex: true,
      };

    case 'not-found':
    default:
      return {
        title: `Page Not Found (404) | ${gymName}`,
        description: `The page you requested could not be located. Return to ${gymName} home.`,
        canonicalPath: '/404',
        noIndex: true,
      };
  }
}

/**
 * Dynamically updates document <head> tags for SEO & Social Media
 */
export function applyPageSeo(page: PageType, customConfig?: GymConfig) {
  if (typeof document === 'undefined') return;

  const config = customConfig || gymConfigStore.getConfig();
  const seoData = getPageSeoData(page, config);

  // 1. Document Title
  document.title = seoData.title;

  // 2. Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', seoData.description);

  // 3. Meta Robots
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    document.head.appendChild(metaRobots);
  }
  metaRobots.setAttribute('content', seoData.noIndex ? 'noindex, nofollow' : 'index, follow');

  // 4. Canonical Link
  const canonicalUrl = getCanonicalUrl(seoData.canonicalPath);
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // 5. Open Graph Tags
  const setOgTag = (property: string, content: string) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  setOgTag('og:title', seoData.title);
  setOgTag('og:description', seoData.description);
  setOgTag('og:url', canonicalUrl);
  setOgTag('og:type', seoData.ogType || 'website');
  if (seoData.ogImage) {
    setOgTag('og:image', seoData.ogImage);
  }

  // 6. Twitter / X Card Tags
  const setTwitterTag = (name: string, content: string) => {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  setTwitterTag('twitter:card', 'summary_large_image');
  setTwitterTag('twitter:title', seoData.title);
  setTwitterTag('twitter:description', seoData.description);
  if (seoData.ogImage) {
    setTwitterTag('twitter:image', seoData.ogImage);
  }
}
