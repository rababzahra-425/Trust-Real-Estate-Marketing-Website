import Hero          from '@/components/Hero';
import Marquee       from '@/components/Marquee';
import RevealSection from '@/components/RevealSection';
import Services      from '@/components/Services';
import Properties    from '@/components/Properties';
import Process       from '@/components/Process';
import Contact       from '@/components/Contact';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trustrealestate.pk';

export const metadata = {
  title: 'Best Real Estate Company in Sahiwal | Trust Real Estate',
  description: 'Looking for trusted property dealers in Sahiwal? Trust Real Estate is the premier real estate agency and property consultant in Sahiwal & Punjab, Pakistan.',
  alternates: {
    canonical: siteUrl,
  },
};

export default function HomePage() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/#webpage`,
    "url": siteUrl,
    "name": "Best Real Estate Company in Sahiwal | Trust Real Estate",
    "description": "Looking for trusted property dealers in Sahiwal? Trust Real Estate is the premier real estate agency and property consultant in Sahiwal & Punjab, Pakistan.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <Hero />
      <Marquee />
      <RevealSection />
      <Services />
      <Properties />
      <Marquee />
      <Process />
      <Contact />
    </>
  );
}
