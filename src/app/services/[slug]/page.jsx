import { servicesData } from '@/data/servicesData';
import ServicePageClient from '@/page-components/ServicePage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trustrealestate.pk';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = servicesData.find(x => x.slug === slug);
  if (!s) {
    return {
      title: 'Premium Services',
      description: 'Explore the premium real estate services offered by Trust Real Estate Marketing.',
    };
  }
  return {
    title: s.title,
    description: s.desc || s.tagline,
    alternates: {
      canonical: `${siteUrl}/services/${slug}`,
    },
    openGraph: {
      title: `${s.title} | Trust Real Estate`,
      description: s.desc || s.tagline,
      url: `${siteUrl}/services/${slug}`,
      images: [
        {
          url: s.heroImg || '/trust.jpeg',
          width: 1200,
          height: 630,
          alt: s.imgAlt || s.title,
        },
      ],
    },
  };
}

export function generateStaticParams() {
  return servicesData.map(s => ({ slug: s.slug }));
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const s = servicesData.find(x => x.slug === slug);

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
        "name": "Services",
        "item": `${siteUrl}/#services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": s ? s.title : "Service",
        "item": `${siteUrl}/services/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServicePageClient slug={slug} />
    </>
  );
}
