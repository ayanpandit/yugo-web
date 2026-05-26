import React, { useRef, useState } from "react";
import { MapPin, Sparkles } from "lucide-react";
import { ProfileStats } from "./profile-stats";
import { ProfileActions } from "./profile-actions";
import { API_URL } from "@/app/lib/api";

interface ProfileHeaderProps {
  user: any;
  isOwner: boolean;
  isEditing: boolean;
  isLoadingAuth?: boolean;
  onEditToggle: () => void;
  onLogout: () => void;
  isFollowing: boolean;
  onToggleFollow: () => void;
  onRefreshSession: () => void;
  onFollowersClick?: () => void;
  onFollowingClick?: () => void;
  onMessageClick?: () => void;
  isLoadingMessage?: boolean;
}

export function ProfileHeader({
  user,
  isOwner,
  isEditing,
  isLoadingAuth,
  onEditToggle,
  onLogout,
  isFollowing,
  onToggleFollow,
  onRefreshSession,
  onFollowersClick,
  onFollowingClick,
  onMessageClick,
  isLoadingMessage = false,
}: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Long press avatar
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const longPressTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressActiveRef = useRef(false);

  const startLongPress = (e: React.MouseEvent | React.TouchEvent) => {
    isLongPressActiveRef.current = false;
    longPressTimeoutRef.current = setTimeout(() => {
      setIsPreviewOpen(true);
      isLongPressActiveRef.current = true;
      if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(15);
      }
    }, 500);
  };

  const endLongPress = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
    setIsPreviewOpen(false);
  };

  const handleAvatarClick = () => {
    if (!isOwner) return;
    if (isLongPressActiveRef.current) {
      isLongPressActiveRef.current = false;
      return;
    }
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !isOwner) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const res = await fetch(`${API_URL}/auth/profile/image`, {
        method: "POST",
        headers: {
          ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: formData,
      });

      if (res.ok) {
        onRefreshSession();
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const getInitial = () => {
    return user?.name ? user.name.charAt(0).toUpperCase() : user?.username?.charAt(0).toUpperCase() || "U";
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-6 md:gap-16 pb-8 md:pb-10 border-b border-gray-150">
      
      {/* Avatar and Stats Row container */}
      <div className="flex items-center gap-6 md:gap-16 w-full md:w-auto">
        <div className="flex-shrink-0">
          <div className="relative group">
            <div
              onMouseDown={startLongPress}
              onMouseUp={endLongPress}
              onMouseLeave={endLongPress}
              onTouchStart={startLongPress}
              onTouchEnd={endLongPress}
              onTouchCancel={endLongPress}
              onClick={handleAvatarClick}
              onContextMenu={(e) => e.preventDefault()}
              className={`w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5 shadow-md transition-all select-none ${isOwner ? 'cursor-pointer hover:rotate-6' : ''}`}
            >
              <div className="w-full h-full rounded-full bg-white p-0.5 sm:p-1 relative overflow-hidden">
                {uploadingImage ? (
                  <div className="w-full h-full rounded-full bg-emerald-50 border border-emerald-100 flex flex-col items-center justify-center text-[10px] sm:text-xs text-green-600 font-bold animate-pulse">
                    <span>Uploading...</span>
                  </div>
                ) : user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name || user.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-2xl sm:text-4xl md:text-5xl shadow-inner select-none font-bold text-green-700">
                    {getInitial()}
                  </div>
                )}
              </div>
            </div>
            
            {isOwner && (
              <>
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] sm:text-xs font-semibold cursor-pointer pointer-events-none">
                  {uploadingImage ? "Processing..." : "Change Photo"}
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                  disabled={uploadingImage}
                />
              </>
            )}
          </div>
        </div>

        {/* Mobile-Only Stats */}
        <ProfileStats
          tripsCount={user?.tripsCount || 0}
          followersCount={user?.followersCount || 0}
          followingCount={user?.followingCount || 0}
          isMobile={true}
          onFollowersClick={onFollowersClick}
          onFollowingClick={onFollowingClick}
        />
      </div>

      {/* Right Profile Meta Section */}
      <div className="flex-1 space-y-4 md:space-y-6 w-full text-left">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <h2 className="text-xl md:text-2xl font-light text-gray-800 tracking-wide font-sans text-left">
            @{user?.username}
          </h2>

          <ProfileActions 
            isOwner={isOwner}
            isEditing={isEditing}
            isLoadingAuth={isLoadingAuth}
            isFollowing={isFollowing}
            onEditToggle={onEditToggle}
            onLogout={onLogout}
            onToggleFollow={onToggleFollow}
            onMessageClick={onMessageClick}
            isLoadingMessage={isLoadingMessage}
          />
        </div>

        <ProfileStats
          tripsCount={user?.tripsCount || 0}
          followersCount={user?.followersCount || 0}
          followingCount={user?.followingCount || 0}
          onFollowersClick={onFollowersClick}
          onFollowingClick={onFollowingClick}
        />

        {!isEditing && (
          <div className="space-y-2 md:space-y-3 font-sans w-full text-left">
            <h3 className="font-bold text-gray-900 text-sm md:text-base text-left">
              {user?.name || ""}
            </h3>
            {user?.bio ? (
              <p className="text-gray-600 text-sm font-light leading-relaxed whitespace-pre-wrap text-left">
                {user.bio}
              </p>
            ) : (
              <p className="text-gray-300 text-xs italic font-light text-left">No bio added yet.</p>
            )}

            <div className="pt-1 space-y-1.5 text-left">
              {(user?.city || user?.country) && (
                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium justify-start">
                  <MapPin size={14} className="text-gray-400" />
                  <span>
                    {[user.city, user.country].filter(Boolean).join(", ")}
                  </span>
                </div>
              )}

              {user?.travelStyle && (
                <div className="flex items-center gap-1.5 text-xs text-[#006644] font-bold justify-start">
                  <Sparkles size={14} className="text-green-500" />
                  <span>Style: {user.travelStyle}</span>
                </div>
              )}

              {user?.interests && user.interests.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1 justify-start">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Interests:</span>
                  {user.interests.map((interest: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] md:text-xs rounded-full font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              )}

              {user?.languages && user.languages.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 justify-start">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Languages:</span>
                  {user.languages.map((lang: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-emerald-50 text-[#006644] text-[10px] md:text-xs rounded-full font-bold border border-emerald-100">
                      {lang}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <ProfileActions 
          isOwner={isOwner}
          isEditing={isEditing}
          isLoadingAuth={isLoadingAuth}
          isFollowing={isFollowing}
          onEditToggle={onEditToggle}
          onLogout={onLogout}
          onToggleFollow={onToggleFollow}
          onMessageClick={onMessageClick}
          isLoadingMessage={isLoadingMessage}
          isMobile={true}
        />
      </div>
    </div>
  );
}
