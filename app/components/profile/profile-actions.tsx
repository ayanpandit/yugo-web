import React from "react";
import { LogOut } from "lucide-react";

interface ProfileActionsProps {
  isOwner: boolean;
  isFollowing: boolean;
  isEditing: boolean;
  isLoadingAuth?: boolean;
  onEditToggle: () => void;
  onLogout: () => void;
  onToggleFollow: () => void;
  isMobile?: boolean;
}

export function ProfileActions({
  isOwner,
  isFollowing,
  isEditing,
  isLoadingAuth,
  onEditToggle,
  onLogout,
  onToggleFollow,
  isMobile = false
}: ProfileActionsProps) {
  if (isLoadingAuth) {
    if (isMobile) {
      return (
        <div className="flex sm:hidden items-center gap-2 w-full pt-3">
          <div className="flex-1 py-4 bg-gray-100 rounded-lg animate-pulse" />
        </div>
      );
    }
    return (
      <div className="hidden sm:flex items-center gap-3">
        <div className="w-24 py-3.5 bg-gray-100 rounded-lg animate-pulse" />
        <div className="w-9 h-9 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="flex sm:hidden items-center gap-2 w-full pt-3">
        {isOwner ? (
          <>
            <button
              onClick={onEditToggle}
              className="flex-1 py-2 bg-white border border-gray-250 text-gray-700 hover:bg-gray-50 active:scale-[0.98] font-bold text-xs rounded-lg shadow-sm transition-all text-center cursor-pointer"
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
            <button
              onClick={onLogout}
              className="px-3 py-2 bg-white border border-gray-250 text-red-500 hover:bg-red-50 active:scale-[0.98] rounded-lg shadow-sm transition-all flex items-center justify-center cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </>
        ) : (
          <button
            onClick={onToggleFollow}
            className={`flex-1 py-2 font-bold text-xs rounded-lg shadow-sm transition-all text-center cursor-pointer ${
              isFollowing
                ? "bg-white border border-gray-250 text-gray-700 hover:bg-gray-50"
                : "bg-green-500 text-white hover:bg-green-600 border border-green-500"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="hidden sm:flex items-center gap-3">
      {isOwner ? (
        <>
          <button
            onClick={onEditToggle}
            className="px-6 py-1.5 bg-white border border-gray-250 text-gray-700 hover:bg-gray-50 active:scale-[0.98] font-bold text-xs md:text-sm rounded-lg shadow-sm transition-all cursor-pointer"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
          <button
            onClick={onLogout}
            className="p-1.5 md:p-2 bg-white border border-gray-250 text-red-500 hover:bg-red-50 active:scale-[0.98] rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center"
            title="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </>
      ) : (
        <button
          onClick={onToggleFollow}
          className={`px-8 py-1.5 font-bold text-xs md:text-sm rounded-lg shadow-sm transition-all cursor-pointer ${
            isFollowing
              ? "bg-white border border-gray-250 text-gray-700 hover:bg-gray-50"
              : "bg-green-500 text-white hover:bg-green-600 border border-green-500"
          }`}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
}
