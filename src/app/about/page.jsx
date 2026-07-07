import AboutPage from '@/page-components/AboutPage';

export const metadata = {
  title: 'About Us',
  description: 'Two decades of earned trust. Built on integrity, refined by experience, and delivering premium real estate guidance in Sahiwal and across Pakistan.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://trustrealestate.pk'}/about`,
  },
};

export default function AboutRoute() {
  return <AboutPage />;
}
