import PrivacyPolicy from '@/page-components/PrivacyPolicy';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trustrealestate.pk';

export const metadata = {
  title: 'Privacy Policy & Terms of Service | Trust Real Estate Sahiwal',
  description: 'Read the privacy policy, cookie policy, and terms of service for Trust Real Estate operations in Sahiwal and Pakistan.',
  alternates: {
    canonical: `${siteUrl}/privacy-policy`,
  },
};

export default function PrivacyPolicyRoute() {
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
        "name": "Privacy Policy",
        "item": `${siteUrl}/privacy-policy`
      }
    ]
  };

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/privacy-policy/#webpage`,
    "url": `${siteUrl}/privacy-policy`,
    "name": "Privacy Policy & Terms of Service | Trust Real Estate Sahiwal",
    "description": "Read the privacy policy, cookie policy, and terms of service for Trust Real Estate operations in Sahiwal and Pakistan.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <PrivacyPolicy />
    </>
  );
}
