import { GymConfig } from '../types';
import { getCanonicalUrl } from '../config/productionConfig';

/**
 * Injects or updates Schema.org JSON-LD structured data for LocalBusiness/HealthClub
 */
export function updateStructuredData(config: GymConfig) {
  if (typeof document === 'undefined') return;

  const gymName = config.brand.gymName || 'KSG DEMO GYM';
  const tagline = config.brand.tagline || 'Transform Your Body. Upgrade Your Life.';
  const city = config.contact.city || 'Bangalore';
  const address = config.contact.address || 'Indiranagar, Bangalore';
  const phone = config.contact.phone || '+91 98765 00000';
  const email = config.contact.email || 'contact@demogym.com';
  const image = config.seo?.ogImage || config.hero.heroImage || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80';
  const websiteUrl = getCanonicalUrl('/');

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    name: gymName,
    alternateName: config.brand.name || gymName,
    description: `${gymName} - ${tagline}. World-class luxury fitness sanctuary, certified CSCS coaches, Olympic strength equipment, and bespoke transformation programs.`,
    url: websiteUrl,
    logo: config.brand.logo || image,
    image: image,
    telephone: phone,
    email: email,
    priceRange: '₹2000 - ₹5000 / month',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: city,
      addressRegion: 'Karnataka',
      postalCode: '560038',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9784,
      longitude: 77.6408,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '05:00',
        closes: '23:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '06:00',
        closes: '21:00',
      },
    ],
    sameAs: [
      config.contact.instagram,
      config.contact.facebook,
      config.contact.youtube,
    ].filter(Boolean),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '542',
      bestRating: '5',
      worstRating: '1',
    },
  };

  let script = document.getElementById('structured-data-jsonld') as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = 'structured-data-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(schemaData, null, 2);
}
