import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X, Search, Loader2, UserPlus, Check } from "lucide-react";
import { apiFetch } from "@/app/lib/api";
import { cn } from "@/app/lib/utils";

interface ConnectionUser {
  id: string;
  username: string;
  name?: string;
  image?: string;
}

interface ProfileConnectionsDrawerProps {
  userId: string;
  type: "followers" | "following" | null;
  onClose: () => void;
  onUserClick?: () => void;
}

export function ProfileConnectionsDrawer({
  userId,
  type,
  onClose,
  onUserClick,
}: ProfileConnectionsDrawerProps) {
  const [users, setUsers] = useState<ConnectionUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<ConnectionUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchConnections() {
      if (!userId || !type) return;
      try {
        setLoading(true);
        const res = await apiFetch(`/api/v1/users/${userId}/${type}`);
        if (res.ok) {
          const result = await res.json();
          setUsers(result.data || []);
          setFilteredUsers(result.data || []);
        }
      } catch (error) {
        console.error(`Failed to fetch ${type}:`, error);
      } finally {
        setLoading(false);
      }
    }

    fetchConnections();
    setSearchQuery("");
  }, [userId, type]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredUsers(users);
      return;
    }
    const q = searchQuery.toLowerCase();
    setFilteredUsers(
      users.filter(
        (u) =>
          u.username.toLowerCase().includes(q) ||
          (u.name && u.name.toLowerCase().includes(q))
      )
    );
  }, [searchQuery, users]);

  const handleUserClick = (username: string) => {
    if (onUserClick) {
      onUserClick();
    }
    router.push(`/profile/${username}`);
  };

  const isOpen = !!type;

  return (
    <div
      className={cn(
        "w-full bg-[#f8fafc] border-b border-gray-100 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) overflow-hidden relative",
        isOpen ? "max-h-[480px] opacity-100 py-6" : "max-h-0 opacity-0 py-0 border-b-0"
      )}
    >
      <div className="max-w-xl mx-auto px-4 space-y-4">
        {/* Drawer Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800 capitalize text-base md:text-lg tracking-tight">
            {type === "followers" ? "Followers" : "Following"}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-all shadow-sm border border-gray-100 flex items-center justify-center cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search connections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-150 rounded-2xl pl-10 pr-4 py-2.5 text-xs md:text-sm font-sans focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all placeholder:text-gray-400 text-gray-800"
          />
        </div>

        {/* Users List */}
        <div className="overflow-y-auto max-h-[300px] pr-1 space-y-3 no-scrollbar">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-green-500" size={24} />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs md:text-sm font-light">
              {searchQuery ? "No matching profiles found." : `No ${type} found.`}
            </div>
          ) : (
            filteredUsers.map((item) => (
              <div
                key={item.id}
                onClick={() => handleUserClick(item.username)}
                className="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-gray-50 shadow-sm hover:shadow-md hover:border-gray-100 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-50 flex items-center justify-center shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.username}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="font-bold text-gray-400 text-xs uppercase">
                        {item.username.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-bold text-gray-800 leading-tight">
                      @{item.username}
                    </span>
                    {item.name && (
                      <span className="text-xs text-gray-400">{item.name}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
