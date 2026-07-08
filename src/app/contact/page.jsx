import ContactPage from '@/page-components/ContactPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trustrealestate.pk';

export const metadata = {
  title: 'Contact Trust Real Estate | Property Consultant in Sahiwal',
  description: 'Get in touch with Trust Real Estate, the leading property consultant and real estate agency in Sahiwal, Pakistan. Schedule a private consultation.',
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${siteUrl}/#organization`,
  "name": "Trust Real Estate",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+923177255555",
    "contactType": "customer service",
    "areaServed": "PK",
    "availableLanguage": ["English", "Urdu"]
  }
};

export default function ContactRoute() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contact Us",
        "item": `${siteUrl}/contact`
      }
    ]
  };

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteUrl}/contact/#webpage`,
    "url": `${siteUrl}/contact`,
    "name": "Contact Trust Real Estate | Property Consultant in Sahiwal",
    "description": "Get in touch with Trust Real Estate, the leading property consultant and real estate agency in Sahiwal, Pakistan. Schedule a private consultation.",
    "isPartOf": {
      "@id": `${siteUrl}/#website`
    },
    "about": {
      "@id": `${siteUrl}/#organization`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <ContactPage />
    </>
  );
}
