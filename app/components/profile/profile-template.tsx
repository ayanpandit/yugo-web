import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/app/lib/api";
import { useAuth } from "@/app/components/providers/auth-provider";
import { ProfileHeader } from "./profile-header";
import { ProfileEditForm } from "./profile-edit-form";
import { ProfileTripsGrid } from "./profile-trips-grid";
import { ProfileConnectionsDrawer } from "./profile-connections-drawer";

interface ProfileTemplateProps {
  username: string;
}

export function ProfileTemplate({ username }: ProfileTemplateProps) {
  const { user: loggedInUser, refreshSession, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();
  
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [isEditing, setIsEditing] = useState(false);
  const [connectionsType, setConnectionsType] = useState<"followers" | "following" | null>(null);

  const isOwner = loggedInUser?.username === username;

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        // We use the new GET /profile/:username endpoint
        const res = await apiFetch(`/profile/${username}`);
        
        if (res.ok) {
          const result = await res.json();
          setProfileData(result.data);
        } else {
          setError("Profile not found");
        }
      } catch (err) {
        setError("An error occurred loading the profile");
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchProfile();
      setConnectionsType(null); // Reset drawer on user change
    }
  }, [username, isOwner]);

  const handleLogout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
      await refreshSession();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleToggleFollow = async () => {
    if (!loggedInUser) {
      router.push("/login");
      return;
    }
    if (!profileData?.user?.id) return;
    
    try {
      const res = await apiFetch(`/api/v1/users/${profileData.user.id}/follow`, { method: "POST" });
      if (res.ok) {
        const result = await res.json();
        setProfileData((prev: any) => ({
          ...prev,
          isFollowing: result.data.following,
          followersCount: result.data.followersCount,
        }));
      }
    } catch (err) {
      console.error("Toggle follow failed:", err);
    }
  };

  const handleRefreshProfile = async () => {
    // Re-fetch logic or just refresh session for owner
    if (isOwner) {
      await refreshSession();
      const res = await apiFetch(`/profile/${username}`);
      if (res.ok) {
        const result = await res.json();
        setProfileData(result.data);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto bg-[#fcfdfe] p-10 flex justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
          <div className="w-48 h-6 bg-gray-200 rounded"></div>
          <div className="w-64 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="flex-1 overflow-y-auto bg-[#fcfdfe] p-10 flex justify-center items-center">
        <div className="text-center text-gray-500">
          <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
          <p>The profile you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  // If viewing own profile, map tripsCount locally for consistency
  const displayUser = {
    ...profileData.user,
    followersCount: profileData.followersCount,
    followingCount: profileData.followingCount,
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar bg-[#fcfdfe]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
        <ProfileHeader
          user={displayUser}
          isOwner={isOwner}
          isEditing={isEditing}
          isLoadingAuth={isAuthLoading}
          onEditToggle={() => setIsEditing(!isEditing)}
          onLogout={handleLogout}
          isFollowing={profileData.isFollowing}
          onToggleFollow={handleToggleFollow}
          onRefreshSession={handleRefreshProfile}
          onFollowersClick={() => setConnectionsType(connectionsType === "followers" ? null : "followers")}
          onFollowingClick={() => setConnectionsType(connectionsType === "following" ? null : "following")}
        />

        <ProfileConnectionsDrawer
          userId={displayUser.id}
          type={connectionsType}
          onClose={() => setConnectionsType(null)}
          onUserClick={() => setConnectionsType(null)}
        />

        {isOwner && isEditing ? (
          <ProfileEditForm
            user={displayUser}
            onSuccess={() => {
              handleRefreshProfile();
              setIsEditing(false);
            }}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <ProfileTripsGrid username={username} />
        )}
      </div>
    </div>
  );
}
