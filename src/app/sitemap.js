import { servicesData } from '@/data/servicesData';

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://trustrealestate.pk';

  // Base website pages
  const routes = ['', '/about', '/team', '/contact', '/privacy-policy'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic service pages
  const services = servicesData.map(s => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...routes, ...services];
}
