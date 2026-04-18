import type { MetadataRoute } from 'next';

const routes = ['/', '/about', '/trips', '/destinations', '/gallery', '/blogs', '/contact', '/faq', '/policies'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://adventures-wheel.local${route}`,
    lastModified: new Date(),
  }));
}
