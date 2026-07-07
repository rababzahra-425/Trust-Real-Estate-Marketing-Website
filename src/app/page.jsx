import Hero          from '@/components/Hero';
import Marquee       from '@/components/Marquee';
import RevealSection from '@/components/RevealSection';
import Services      from '@/components/Services';
import Properties    from '@/components/Properties';
import Process       from '@/components/Process';
import Contact       from '@/components/Contact';

export const metadata = {
  title: 'Trust Real Estate — Sahiwal & Pakistan Premium Properties',
  description: 'Architecting the future of premium property investments across Sahiwal and Pakistan. Over 20 years of trusted boutique real estate consultancy.',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://trustrealestate.pk',
  },
};

export default function HomePage() {
  return (
    <>
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
