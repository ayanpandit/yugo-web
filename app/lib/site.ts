const defaultSiteName = "YouGO-Trusted Travel Partner Discovery";
const defaultSiteDescription =
  "Social + AI powered travel for trusted partner discovery, smart planning, and community-driven experiences.";

export const siteMeta = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || defaultSiteName,
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || defaultSiteDescription,
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";
