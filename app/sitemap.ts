import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Define your static routes
  const staticRoutes = [
    { url: 'https://swayamvasavada.com', lastModified: new Date() },
    { url: 'https://swayamvasavada.com/about', lastModified: new Date() },
    { url: 'https://swayamvasavada.com/projects', lastModified: new Date() },
    { url: 'https://swayamvasavada.com/contact', lastModified: new Date() },
  ];

  try {
    // 2. Fetch all your projects from your API to get their slugs
    // (You will need an endpoint like /api/projects/all that returns an array of projects)
    const res = await fetch('http://localhost:5000/api/projects/all');
    const data = await res.json();
    
    // 3. Map them into sitemap entries
    const dynamicRoutes = data.result.map((project: any) => ({
      url: `https://swayamvasavada.com/projects/${project.slug}`,
      lastModified: new Date(project.UpdatedAt || new Date()), // Use your DB's updated timestamp!
    }));

    return [...staticRoutes, ...dynamicRoutes];
  } catch (error) {
    // Fallback if the database is unreachable during build
    return staticRoutes;
  }
}