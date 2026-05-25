"use client";

import React, { use } from "react";
import { ProfileTemplate } from "@/app/components/profile/profile-template";

export default function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);

  return <ProfileTemplate username={resolvedParams.username} />;
}
