import PrivacyPolicy from '@/page-components/PrivacyPolicy';

export const metadata = {
  title: 'Privacy Policy & Terms of Service',
  description: 'Read the privacy policy, cookie policy, and terms of service for Trust Real Estate Marketing operations and website usage.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://trustrealestate.pk'}/privacy-policy`,
  },
};

export default function PrivacyPolicyRoute() {
  return <PrivacyPolicy />;
}
