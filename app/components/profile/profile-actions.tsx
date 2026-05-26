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
  onMessageClick?: () => void;
  isLoadingMessage?: boolean;
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
  onMessageClick,
  isLoadingMessage = false,
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
          <>
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
            <button
              onClick={onMessageClick}
              disabled={isLoadingMessage}
              className={`flex-1 py-2 font-bold text-xs rounded-lg shadow-sm transition-all text-center flex items-center justify-center gap-1 ${
                isLoadingMessage
                  ? "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-250 text-gray-700 hover:bg-gray-50 active:scale-[0.98] cursor-pointer"
              }`}
            >
              {isLoadingMessage ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                "Message"
              )}
            </button>
          </>
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
        <>
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
          <button
            onClick={onMessageClick}
            disabled={isLoadingMessage}
            className={`px-8 py-1.5 font-bold text-xs md:text-sm rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 ${
              isLoadingMessage
                ? "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white border border-gray-250 text-gray-700 hover:bg-gray-50 active:scale-[0.98] cursor-pointer"
            }`}
          >
            {isLoadingMessage ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              "Message"
            )}
          </button>
        </>
      )}
    </div>
  );
}
