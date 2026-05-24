import { create } from "zustand";
import { apiFetch } from "../lib/api";

export interface TravelerState {
  sex: string;
  age: number;
}

export interface ActivityState {
  name: string;
  detail?: string;
  imageUrl?: string;
  estimatedINR?: number;
}

export interface DayPlanState {
  day: number;
  title: string;
  date?: string;
  route?: string;
  distance?: string;
  travelTime?: string;
  altitudeSeaLevel?: string;
  dailyPacing?: string;
  experienceDescription?: string;
  destinationImageUrl?: string;
  accommodation?: {
    hotelName?: string;
    bookingLink?: string;
    whyRecommended?: string;
    bookingPlatform?: string;
    pricePerPersonINR?: number;
  };
  transportDetails?: {
    type?: string;
    subType?: string;
    flightOrTrainNumber?: string;
    departureTime?: string;
    arrivalTime?: string;
  };
  predictedWeather?: {
    conditions?: string;
    temperatureLow?: string;
    temperatureHigh?: string;
  };
  dailyActivities?: ActivityState[];
  costBreakdown?: {
    transportBaseINR?: number;
    fuelINR?: number;
    tollsINR?: number;
    accommodationINR?: number;
    activitiesINR?: number;
    foodINR?: {
      breakfast?: number;
      lunch?: number;
      dinner?: number;
    };
  };
}

export interface TravelMediumConfig {
  selected: boolean;
  type?: string;
  ownership?: string;
}

export interface TravelMediumState {
  bus: TravelMediumConfig;
  car: TravelMediumConfig;
  bike: TravelMediumConfig;
  train: TravelMediumConfig;
  flights: TravelMediumConfig;
  mixed_best_suitable: boolean;
}

export interface PostTripFormData {
  generationId?: string;
  destination: string;
  tripType: string;
  totalDays: number;
  totalPersons: number;
  experienceType: string;
  baseCurrency: string;
  travelers: TravelerState[];
  days: DayPlanState[];
  
  // New input fidelity fields
  origin: string;
  startDate: string;
  budgetINR: number;
  luxuryLevel: string; // "budget" | "moderate" | "luxury"
  travelStyle: string; // "adventure" | "relaxed" | "sightseeing"
  foodPreference: string; // "veg" | "non-veg" | "any"
  isRoundTrip: boolean;
  travelMedium: TravelMediumState;
  imageUrl: string;
}

const INITIAL_FORM_DATA: PostTripFormData = {
  destination: "Manali, Simulated Region",
  tripType: "Round Trip",
  totalDays: 2,
  totalPersons: 2,
  experienceType: "Adventure & Mountain Exploration",
  baseCurrency: "INR (₹)",
  travelers: [
    { sex: "M", age: 21 },
    { sex: "M", age: 22 }
  ],
  origin: "Ghaziabad",
  startDate: "2026-06-15",
  budgetINR: 45000,
  luxuryLevel: "moderate",
  travelStyle: "adventure",
  foodPreference: "veg",
  isRoundTrip: true,
  imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
  travelMedium: {
    bus: { selected: false },
    car: { selected: true, type: "suv", ownership: "rented" },
    bike: { selected: false },
    train: { selected: false },
    flights: { selected: false },
    mixed_best_suitable: false
  },
  days: [
    {
      day: 1,
      title: "The Ascent: Journey to the Valley of Gods",
      date: "15/06/2026",
      route: "Ghaziabad, Chandigarh, Manali",
      distance: "540 km",
      travelTime: "12.5 hrs",
      altitudeSeaLevel: "2050m",
      dailyPacing: "Moderate",
      experienceDescription: "The day starts with an early morning drive from Ghaziabad to Manali. The scenic route takes you through the beautiful hills of Chandigarh.",
      accommodation: {
        hotelName: "Hotel Manali Heights",
        whyRecommended: "Reasonable price and great view",
        bookingPlatform: "Booking.com",
        bookingLink: "https://www.booking.com/hotel/in/manali-heights.html",
        pricePerPersonINR: 1600
      },
      transportDetails: {
        type: "car (Rented)",
        subType: "Mahindra Thar",
        flightOrTrainNumber: "Not Applicable",
        departureTime: "04:30 AM, 15/06/2026",
        arrivalTime: "05:00 PM, 15/06/2026"
      },
      predictedWeather: {
        conditions: "Clear Skies / Cool Breeze",
        temperatureLow: "12°C",
        temperatureHigh: "22°C"
      },
      dailyActivities: [
        { name: "Old Manali Cafe Crawl", detail: "Explore the cafes of Old Manali and enjoy local food.", estimatedINR: 1200 }
      ],
      costBreakdown: {
        transportBaseINR: 3500,
        fuelINR: 4500,
        tollsINR: 650,
        accommodationINR: 1600,
        activitiesINR: 1200,
        foodINR: {
          breakfast: 300,
          lunch: 700,
          dinner: 1200
        }
      }
    },
    {
      day: 2,
      title: "Exploring Manali",
      date: "16/06/2026",
      route: "Manali",
      distance: "0 km",
      travelTime: "0 hrs",
      altitudeSeaLevel: "2050m",
      dailyPacing: "Relaxed",
      experienceDescription: "The day is spent exploring the beautiful town of Manali. Visit Hadimba Devi Temple, take a stroll on Mall Road.",
      accommodation: {
        hotelName: "Hotel Manali Heights",
        whyRecommended: "Reasonable price and great view",
        bookingPlatform: "Booking.com",
        bookingLink: "https://www.booking.com/hotel/in/manali-heights.html",
        pricePerPersonINR: 1600
      },
      transportDetails: {
        type: "Not Applicable",
        subType: "Not Applicable",
        flightOrTrainNumber: "Not Applicable",
        departureTime: "Not Applicable",
        arrivalTime: "Not Applicable"
      },
      predictedWeather: {
        conditions: "Clear Skies / Cool Breeze",
        temperatureLow: "12°C",
        temperatureHigh: "22°C"
      },
      dailyActivities: [
        { name: "Hadimba Devi Temple Visit", detail: "Visit the famous temple and take in beautiful pine forests.", estimatedINR: 500 }
      ],
      costBreakdown: {
        transportBaseINR: 0,
        fuelINR: 0,
        tollsINR: 0,
        accommodationINR: 1600,
        activitiesINR: 500,
        foodINR: {
          breakfast: 300,
          lunch: 700,
          dinner: 1200
        }
      }
    }
  ]
};

interface PostTripState {
  activeStep: number;
  formData: PostTripFormData;
  drafts: any[];
  loading: boolean;
  error: string | null;
  setStep: (step: number) => void;
  updateFormData: (data: Partial<PostTripFormData>) => void;
  updateDay: (index: number, dayData: Partial<DayPlanState>) => void;
  addDay: () => void;
  removeDay: (index: number) => void;
  saveDraft: () => Promise<string | null>;
  publishTrip: () => Promise<boolean>;
  fetchDrafts: () => Promise<void>;
  loadDraft: (draft: any) => void;
  resetForm: () => void;
  uploadCover: (file: File) => Promise<string | null>;
}

export const usePostTripStore = create<PostTripState>((set, get) => ({
  activeStep: 1,
  formData: { ...INITIAL_FORM_DATA },
  drafts: [],
  loading: false,
  error: null,

  setStep: (step: number) => {
    set({ activeStep: step });
  },

  updateFormData: (data: Partial<PostTripFormData>) => {
    set((state) => ({
      formData: {
        ...state.formData,
        ...data
      }
    }));
  },

  updateDay: (index: number, dayData: Partial<DayPlanState>) => {
    set((state) => {
      const updatedDays = [...state.formData.days];
      updatedDays[index] = {
        ...updatedDays[index],
        ...dayData,
        day: updatedDays[index]?.day || index + 1
      };
      return {
        formData: {
          ...state.formData,
          days: updatedDays
        }
      };
    });
  },

  addDay: () => {
    set((state) => {
      const nextDayNum = state.formData.days.length + 1;
      const newDay: DayPlanState = {
        day: nextDayNum,
        title: `Day ${nextDayNum} Exploration`,
        route: `Day ${nextDayNum} Local`,
        distance: "Not Applicable",
        travelTime: "Not Applicable",
        altitudeSeaLevel: "Not Applicable",
        dailyPacing: "Moderate",
        experienceDescription: `Details about Day ${nextDayNum} experiences.`,
        accommodation: {
          hotelName: "Local Homestay",
          whyRecommended: "Recommended by local hosts",
          bookingPlatform: "Direct Booking",
          bookingLink: "Not Applicable",
          pricePerPersonINR: 3000
        },
        transportDetails: {
          type: "Walking",
          subType: "Local Transit",
          flightOrTrainNumber: "Not Applicable",
          departureTime: "Not Applicable",
          arrivalTime: "Not Applicable"
        },
        predictedWeather: {
          conditions: "Sunny & Calm",
          temperatureLow: "10°C",
          temperatureHigh: "20°C"
        },
        dailyActivities: [],
        costBreakdown: {
          transportBaseINR: 0,
          fuelINR: 0,
          tollsINR: 0,
          accommodationINR: 3000,
          activitiesINR: 0,
          foodINR: {
            breakfast: 500,
            lunch: 800,
            dinner: 1200
          }
        }
      };
      return {
        formData: {
          ...state.formData,
          totalDays: nextDayNum,
          days: [...state.formData.days, newDay]
        }
      };
    });
  },

  removeDay: (index: number) => {
    set((state) => {
      const filteredDays = state.formData.days.filter((_, idx) => idx !== index);
      const updatedDays = filteredDays.map((d, idx) => ({
        ...d,
        day: idx + 1
      }));
      return {
        formData: {
          ...state.formData,
          totalDays: updatedDays.length || 1,
          days: updatedDays
        }
      };
    });
  },

  saveDraft: async () => {
    set({ loading: true, error: null });
    const { formData } = get();
    try {
      const res = await apiFetch("/api/v1/generate/manual", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          status: "DRAFT"
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to save draft");
      }

      const responseData = await res.json();
      const generationId = responseData.data?.generationId;

      set((state) => ({
        loading: false,
        formData: {
          ...state.formData,
          generationId
        }
      }));

      await get().fetchDrafts();
      return generationId;
    } catch (err: any) {
      set({ error: err.message || "Failed to save draft", loading: false });
      return null;
    }
  },

  publishTrip: async () => {
    set({ loading: true, error: null });
    const { formData } = get();
    try {
      const res = await apiFetch("/api/v1/generate/manual", {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          status: "COMPLETED"
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to publish expedition");
      }

      set({ loading: false });
      return true;
    } catch (err: any) {
      set({ error: err.message || "Failed to publish expedition", loading: false });
      return false;
    }
  },

  fetchDrafts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await apiFetch("/api/v1/generate/manual/drafts");
      if (!res.ok) {
        throw new Error("Failed to load drafts");
      }
      const data = await res.json();
      set({ drafts: data.data || [], loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch drafts", loading: false });
    }
  },

  loadDraft: (draft: any) => {
    if (draft && draft.payload) {
      const payload = typeof draft.payload === "string" ? JSON.parse(draft.payload) : draft.payload;
      
      // Map the nested payload parameters back to the flat form format
      const mappedFormData: Partial<PostTripFormData> = {
        destination: draft.destination || "Manali",
        tripType: draft.tripType || "Round Trip",
        totalDays: draft.totalDays || 2,
        totalPersons: draft.totalPersons || 1,
        experienceType: draft.experienceType || "Adventure & Mountain Exploration",
        baseCurrency: draft.baseCurrency || "INR (₹)",
        imageUrl: draft.coverImage || "",
        
        origin: payload.trip_details?.origin || "Ghaziabad",
        startDate: payload.trip_details?.startDate || "2026-06-15",
        budgetINR: Number(payload.trip_details?.budgetINR) || 45000,
        luxuryLevel: payload.preferences?.luxury_level || "moderate",
        travelStyle: payload.preferences?.travel_style || "adventure",
        foodPreference: payload.preferences?.food_preference || "veg",
        isRoundTrip: payload.trip_details?.isRoundTrip ?? true,
        travelMedium: {
          bus: payload.travel_medium?.bus || { selected: false },
          car: payload.travel_medium?.car || { selected: false, type: "suv", ownership: "rented" },
          bike: payload.travel_medium?.bike || { selected: false },
          train: payload.travel_medium?.train || { selected: false },
          flights: payload.travel_medium?.flights || { selected: false },
          mixed_best_suitable: payload.travel_medium?.mixed_best_suitable || false
        },
        travelers: payload.party_composition?.travelers || [],
        days: (draft.response?.days || []).map((d: any) => ({
          day: d.day,
          title: d.title,
          date: d.date,
          route: d.route,
          distance: d.distance,
          travelTime: d.travelTime,
          altitudeSeaLevel: d.altitudeSeaLevel,
          dailyPacing: d.dailyPacing,
          experienceDescription: d.experienceDescription,
          accommodation: d.accommodation,
          transportDetails: d.transportDetails,
          predictedWeather: d.predictedWeather,
          dailyActivities: d.dailyActivities,
          costBreakdown: d.costBreakdown
        }))
      };

      set({
        formData: {
          ...INITIAL_FORM_DATA,
          ...mappedFormData,
          generationId: draft.generationId
        },
        activeStep: 1,
        error: null
      });
    }
  },

  uploadCover: async (file: File) => {
    set({ loading: true, error: null });
    try {
      const fd = new FormData();
      fd.append("image", file);

      // Perform a multipart file upload using standard fetch options
      const jwtToken = localStorage.getItem("token"); // or read from cookie
      const headers: Record<string, string> = {};
      if (jwtToken) {
        headers["Authorization"] = `Bearer ${jwtToken}`;
      }

      const res = await fetch("/api/v1/generate/manual/upload-image", {
        method: "POST",
        headers,
        body: fd
      });

      if (!res.ok) {
        throw new Error("Cloudinary image upload failed");
      }

      const data = await res.json();
      const imageUrl = data.data?.url;

      if (imageUrl) {
        set((state) => ({
          loading: false,
          formData: {
            ...state.formData,
            imageUrl
          }
        }));
        return imageUrl;
      }
      throw new Error("No URL returned from server upload");
    } catch (err: any) {
      set({ error: err.message || "Failed to upload cover banner", loading: false });
      return null;
    }
  },

  resetForm: () => {
    set({
      formData: { ...INITIAL_FORM_DATA },
      activeStep: 1,
      error: null
    });
  }
}));
