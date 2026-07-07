import TeamPage from '@/page-components/TeamPage';

export const metadata = {
  title: 'Meet the Team',
  description: 'Meet the professional board of directors, property advisors, sales managers, and legal counsels behind Trust Real Estate Marketing.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://trustrealestate.pk'}/team`,
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
      />
      <TeamPage />
    </>
  );
}
