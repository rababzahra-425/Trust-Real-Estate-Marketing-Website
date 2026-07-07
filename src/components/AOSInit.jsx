'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AOSInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Dynamically import to avoid SSR issues
    import('aos').then(AOS => {
      AOS.default.init({
        duration:   700,
        easing:     'ease-out-cubic',
        once:       true,       // animate only once per element
        mirror:     false,      // avoid re-triggering animations on scroll-up
        offset:     80,         // trigger 80px before element enters viewport
        delay:      0,
        anchorPlacement: 'top-bottom',
      });
    });
  }, []);

  useEffect(() => {
    // Refresh AOS elements on page route changes
    import('aos').then(AOS => {
      setTimeout(() => {
        AOS.default.refresh();
      }, 150); // Small delay to let React finish rendering the new page
    });
  }, [pathname]);

  return null;
}
