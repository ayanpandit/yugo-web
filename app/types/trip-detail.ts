export interface TravelPreference {
  luxury_level: string;
  travel_style: string;
  food_preference: string;
}

export interface TravelMediumConfig {
  selected: boolean;
  type?: string;
  ownership?: string;
  selfDrive?: boolean;
}

export interface TravelMediums {
  bus: TravelMediumConfig;
  car: TravelMediumConfig & { type?: string; ownership?: string; selfDrive?: boolean };
  bike: TravelMediumConfig;
  train: TravelMediumConfig;
  flights: TravelMediumConfig;
  mixed_best_suitable: boolean;
}

export interface Traveler {
  sex: string;
  age: number;
}

export interface ItineraryAccommodation {
  hotelName: string;
  BookingPlatform?: string; // Compatibility field
  bookingPlatform?: string;
  BookingLink?: string;     // Compatibility field
  bookingLink?: string;
  WhyRecommended?: string;   // Compatibility field
  whyRecommended?: string;
  PricePerPersonINR?: number; // Compatibility field
  pricePerPersonINR?: number;
}

export interface predictedWeatherInfo {
  conditions: string;
  temperatureLow: string;
  temperatureHigh: string;
}

export interface ItineraryActivity {
  name: string;
  detail: string;
  estimatedINR?: number;
  imageUrl?: string;
}

export interface ItineraryTransportDetails {
  type: string;
  subType: string;
  departureTime: string;
  arrivalTime: string;
  flightOrTrainNumber: string;
}

export interface DailyItinerary {
  day: number;
  date: string;
  route: string;
  title: string;
  distance: string;
  travelTime: string;
  dailyPacing: string;
  accommodation: ItineraryAccommodation;
  costBreakdown: {
    foodINR: {
      breakfast: number;
      lunch: number;
      dinner: number;
    };
    fuelINR: number;
    tollsINR: number;
    activitiesINR: number;
    accommodationINR: number;
    transportBaseINR: number;
  };
  dailyActivities: ItineraryActivity[];
  altitudeSeaLevel: string;
  predictedWeather: predictedWeatherInfo;
  transportDetails: ItineraryTransportDetails;
  destinationImageUrl?: string;
  experienceDescription: string;
}

export interface TripSummary {
  imageUrl: string;
  tripType: string;
  totalDays: number;
  travelers: Traveler[];
  destination: string;
  baseCurrency: string;
  totalPersons: number;
  experienceType: string;
}

export interface TripLogistics {
  packingList: string[];
  healthAndSafety: string[];
}

export interface TripSurvivalGuide {
  scamWarnings: string[];
  culturalNorms: string[];
  emergencyContacts: string[];
  localAppsToDownload: string[];
}

export interface TripTravelInsights {
  hiddenGems: string[];
  cautionPoints: string[];
  bestExperiences: string[];
  bestTimeToVisit: string;
  sustainabilityTips: string[];
}

export interface CostSummary {
  maxCostINR: number;
  safeCostINR: number;
  perPersonINR: number;
  minimumCostINR: number;
}

export interface FullCostBreakdown {
  stayINR: number;
  activitiesINR: number;
  hiddenCostsINR: {
    tips: number;
    permits: number;
    tollsAndTaxes: number;
    fuelEstimatedTotal: number;
  };
  foodBreakdownINR: {
    breakfast: number;
    lunch: number;
    dinner: number;
    snacksAndDrinks: number;
  };
  interCityTransportINR: number;
  intraCityTransportINR: number;
}

export interface CanonicalTripResponse {
  days: DailyItinerary[];
  summary: TripSummary;
  logistics: TripLogistics;
  survivalGuide: TripSurvivalGuide;
  travelInsights: TripTravelInsights;
  totalCostSummary: CostSummary;
  costBreakdownFull: FullCostBreakdown;
}

export interface StepCompleted {
  stepName: string;
  validationPassed: boolean;
  error: string | null;
  createdAt: string;
}

export interface TripDetailRecord {
  generationId: string;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "DRAFT";
  error: string | null;
  createdAt: string;
  updatedAt: string;
  stepsCompleted: StepCompleted[];
  coverImage?: string | null;
  tripType?: string | null;
  totalDays?: number | null;
  destination?: string | null;
  baseCurrency?: string | null;
  totalPersons?: number | null;
  experienceType?: string | null;
  perPersonCost?: number | null;
  payload: {
    preferences: TravelPreference;
    trip_details: {
      days: number;
      origin: string;
      budgetINR: number;
      startDate: string;
      destination: string;
      isRoundTrip: boolean;
    };
    travel_medium: TravelMediums;
    party_composition: {
      travelers: Traveler[];
      totalPersons: number;
    };
  };
  response: CanonicalTripResponse;
}

export interface TripDetailAPIResponse {
  status: string;
  data: TripDetailRecord[];
}
