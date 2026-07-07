import ContactPage from '@/page-components/ContactPage';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trustrealestate.pk';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with our expert property advisors at Trust Real Estate for a private property consultation in Sahiwal and Pakistan.',
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactPage />
    </>
  );
}
