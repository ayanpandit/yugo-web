export const siteMeta = {
  name: "YouGO",
  description:
    "Social + AI powered travel for trusted partner discovery, smart planning, and community-driven experiences.",
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";
