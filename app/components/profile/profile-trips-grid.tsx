import React, { useEffect, useState } from "react";
import { Heart, Bookmark, MapPin, Grid, User } from "lucide-react";
import { apiFetch } from "@/app/lib/api";

interface ProfileTripsGridProps {
  username: string;
}

export function ProfileTripsGrid({ username }: ProfileTripsGridProps) {
  const [activeTab, setActiveTab] = useState<"trips" | "saved" | "tagged">("trips");
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrips() {
      try {
        setLoading(true);
        const res = await apiFetch(`/profile/${username}/trips`);
        if (res.ok) {
          const result = await res.json();
          setTrips(result.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch profile trips:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (username) {
      fetchTrips();
    }
  }, [username]);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-center gap-12">
        <button
          onClick={() => setActiveTab("trips")}
          className={`flex items-center gap-2 py-4 border-t-2 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === "trips"
              ? "border-gray-800 text-gray-800"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          <Grid size={16} />
          <span>Trips</span>
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`flex items-center gap-2 py-4 border-t-2 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === "saved"
              ? "border-gray-800 text-gray-800"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          <Bookmark size={16} />
          <span>Saved</span>
        </button>

        <button
          onClick={() => setActiveTab("tagged")}
          className={`flex items-center gap-2 py-4 border-t-2 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
            activeTab === "tagged"
              ? "border-gray-800 text-gray-800"
              : "border-transparent text-gray-400 hover:text-gray-600"
          }`}
        >
          <User size={16} className="stroke-[2.5]" />
          <span>Tagged</span>
        </button>
      </div>

      <div className="mt-8">
        {activeTab === "trips" && (
          loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(n => (
                <div key={n} className="aspect-[4/3] bg-gray-100 rounded-3xl animate-pulse"></div>
              ))}
            </div>
          ) : trips.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-[fadeIn_0.4s_ease-out]">
              {trips.map((trip) => (
                <div
                  key={trip.tripId}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer relative"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {trip.coverImage ? (
                      <img
                        src={trip.coverImage}
                        alt={trip.destination}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-50 flex items-center justify-center">
                        <span className="text-4xl">🌴</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold text-sm md:text-base">
                      <span className="flex items-center gap-1.5">
                        <Heart size={18} fill={trip.isLiked ? "red" : "white"} className={trip.isLiked ? "text-red-500" : ""} /> {trip.likesCount}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 space-y-1 bg-white">
                    <h4 className="font-bold text-gray-900 text-sm md:text-base truncate">
                      {trip.destination} Trip
                    </h4>
                    <p className="text-gray-400 text-xs truncate flex items-center gap-1">
                      <MapPin size={12} />
                      {trip.totalDays} Days • {trip.experienceType}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4 max-w-sm mx-auto animate-[fadeIn_0.4s_ease-out]">
              <div className="h-16 w-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto shadow-inner text-2xl">
                ✈️
              </div>
              <h4 className="font-bold text-gray-800 text-lg">No Trips Yet</h4>
              <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                This user hasn't published any trips.
              </p>
            </div>
          )
        )}

        {activeTab === "saved" && (
          <div className="py-20 text-center space-y-4 max-w-sm mx-auto animate-[fadeIn_0.4s_ease-out]">
            <div className="h-16 w-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto shadow-inner text-2xl">
              🔖
            </div>
            <h4 className="font-bold text-gray-800 text-lg">No Saved Trips</h4>
            <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
              Saved itineraries securely populate here.
            </p>
          </div>
        )}

        {activeTab === "tagged" && (
          <div className="py-20 text-center space-y-4 max-w-sm mx-auto animate-[fadeIn_0.4s_ease-out]">
            <div className="h-16 w-16 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto shadow-inner text-2xl">
              🏷️
            </div>
            <h4 className="font-bold text-gray-800 text-lg">No Tagged Travels</h4>
            <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
              Tagged trips will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
