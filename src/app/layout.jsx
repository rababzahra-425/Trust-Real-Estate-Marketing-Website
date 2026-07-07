import './globals.css';
import 'aos/dist/aos.css';
import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import Navbar      from '@/components/Navbar';
import Footer      from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import Cursor      from '@/components/Cursor';
import AOSInit     from '@/components/AOSInit';
import CookieBanner from '@/components/CookieBanner';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trustrealestate.pk';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Trust Real Estate — Luxury & Premium Properties',
    template: '%s | Trust Real Estate',
  },
  description: 'Curating premium residential and commercial property investments across Sahiwal and Pakistan. Over 20 years of trusted real estate expertise.',
  keywords: [
    'Trust Real Estate',
    'Real Estate Sahiwal',
    'Pakistan Real Estate',
    'Luxury Properties',
    'Commercial Plots Sahiwal',
    'Bahria Town Pakistan',
    'DHA Properties',
    'Property Buying Sahiwal',
    'Property Selling Sahiwal',
    'Real Estate Marketing Sahiwal',
  ],
  authors: [{ name: 'Trust Real Estate Team', url: siteUrl }],
  creator: 'Trust Real Estate Marketing',
  publisher: 'Trust Real Estate Marketing',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Trust Real Estate — Luxury & Premium Properties',
    description: 'Curating premium residential and commercial property investments across Sahiwal and Pakistan. Over 20 years of trusted real estate expertise.',
    siteName: 'Trust Real Estate',
    images: [
      {
        url: '/trust.jpeg',
        width: 1200,
        height: 630,
        alt: 'Trust Real Estate — Luxury Properties',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trust Real Estate — Luxury & Premium Properties',
    description: 'Curating premium residential and commercial property investments across Sahiwal and Pakistan. Over 20 years of trusted real estate expertise.',
    images: ['/trust.jpeg'],
  },
  icons: {
    icon: '/logo_r.png',
    shortcut: '/logo_r.png',
    apple: '/logo_r.png',
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${siteUrl}/#organization`,
  "name": "Trust Real Estate",
  "url": siteUrl,
  "logo": `${siteUrl}/logo_r.png`,
  "image": `${siteUrl}/trust.jpeg`,
  "description": "Curating premium residential and commercial property investments across Sahiwal and Pakistan. Over 20 years of trusted real estate expertise.",
  "telephone": "+923177255555",
  "email": "hello@trustrealestate.pk",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kalma Garden, Plaza Street no.2, near Shopping Club, Commercial Market Sahiwal",
    "addressLocality": "Sahiwal",
    "addressRegion": "Punjab",
    "postalCode": "57000",
    "addressCountry": "PK"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 30.6682,
    "longitude": 73.1114
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "19:00"
  },
  "sameAs": [
    "https://www.facebook.com/share/1915FqG7Wc/",
    "https://www.instagram.com/trustrealestatemarketing"
  ]
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  "url": siteUrl,
  "name": "Trust Real Estate",
  "description": "Curating premium properties for those who demand nothing less than extraordinary.",
  "publisher": {
    "@id": `${siteUrl}/#organization`
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <Cursor />
        <AOSInit />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
        <CookieBanner />
      </body>
    </html>
  );
}

