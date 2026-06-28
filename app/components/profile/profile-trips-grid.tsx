import React, { useEffect, useState } from "react";
import { Heart, Bookmark, MapPin, Grid, User, Trash2, X, AlertTriangle } from "lucide-react";
import { apiFetch } from "@/app/lib/api";
import { useAuth } from "@/app/components/providers/auth-provider";
import { useRouter } from "next/navigation";

interface ProfileTripsGridProps {
  username: string;
}

export function ProfileTripsGrid({ username }: ProfileTripsGridProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"trips" | "saved" | "tagged">("trips");
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Deletion Modal State
  const [tripToDelete, setTripToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = user?.username === username;

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

  const handleDeleteTrip = async () => {
    if (!tripToDelete) return;

    try {
      setIsDeleting(true);
      const res = await apiFetch(`/api/v1/generate/${tripToDelete}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setTrips((prevTrips) => prevTrips.filter((t) => t.tripId !== tripToDelete));
        setTripToDelete(null);
      } else {
        console.error("Failed to delete trip");
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
    } finally {
      setIsDeleting(false);
    }
  };

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
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all relative"
                >
                  <div 
                    className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/trip/${trip.tripId}`)}
                  >
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

                  {isOwner && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTripToDelete(trip.tripId);
                      }}
                      className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-full backdrop-blur-sm transition-colors z-10"
                      title="Delete Trip"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}

                  <div className="p-4 space-y-1 bg-white cursor-pointer" onClick={() => router.push(`/trip/${trip.tripId}`)}>
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

      {/* Confirmation Modal */}
      {tripToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-[32px] p-8 max-w-md w-full mx-4 shadow-2xl relative animate-[zoomIn_0.2s_ease-out]">
            <button
              onClick={() => setTripToDelete(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 text-center mb-2">Delete Trip?</h3>
            <p className="text-gray-500 text-sm text-center mb-8 font-medium leading-relaxed">
              This action is permanent. Once deleted, this expedition and all associated data cannot be recovered.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setTripToDelete(null)}
                disabled={isDeleting}
                className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTrip}
                disabled={isDeleting}
                className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
