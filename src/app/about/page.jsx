import AboutPage from '@/page-components/AboutPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trustrealestate.pk';

export const metadata = {
  title: 'Trusted Property Dealer & Real Estate Experts in Sahiwal',
  description: 'Learn about Trust Real Estate, the most trusted property dealers and real estate experts in Sahiwal, Punjab. Over 20 years of premium real estate consultancy.',
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

export default function AboutRoute() {
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
        "name": "About Us",
        "item": `${siteUrl}/about`
      }
    ]
  };

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${siteUrl}/about/#webpage`,
    "url": `${siteUrl}/about`,
    "name": "Trusted Property Dealer & Real Estate Experts in Sahiwal",
    "description": "Learn about Trust Real Estate, the most trusted property dealers and real estate experts in Sahiwal, Punjab. Over 20 years of premium real estate consultancy.",
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
      <AboutPage />
    </>
  );
}
