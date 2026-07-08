import TeamPage from '@/page-components/TeamPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trustrealestate.pk';

export const metadata = {
  title: 'Property Advisors & Consultants in Sahiwal | Our Team',
  description: 'Meet our team of professional property advisors, real estate consultants, sales managers, and legal counsels at Trust Real Estate Sahiwal.',
  alternates: {
    canonical: `${siteUrl}/team`,
  },
};

const teamJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Trust Real Estate Team",
  "description": "Board of Directors, Sales and Marketing Specialists, and Legal Counsel of Trust Real Estate.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Person",
        "name": "Sheikh Muhammad Azam",
        "jobTitle": "Founder & Chief Executive Officer",
        "worksFor": {
          "@type": "RealEstateAgent",
          "name": "Trust Real Estate"
        }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Person",
        "name": "Sheikh Adnan Haidry",
        "jobTitle": "Co-Founder & Director of Operations",
        "worksFor": {
          "@type": "RealEstateAgent",
          "name": "Trust Real Estate"
        }
      }
    }
  ]
};

export default function TeamRoute() {
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
        "name": "Our Team",
        "item": `${siteUrl}/team`
      }
    ]
  };

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/team/#webpage`,
    "url": `${siteUrl}/team`,
    "name": "Property Advisors & Consultants in Sahiwal | Our Team",
    "description": "Meet our team of professional property advisors, real estate consultants, sales managers, and legal counsels at Trust Real Estate Sahiwal.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
      />
      <TeamPage />
    </>
  );
}
