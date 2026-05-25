export interface FeedCreator {
  username: string;
  image: string | null;
}

export interface TripLiker {
  user: {
    id: string;
    username: string;
    name: string | null;
    image: string | null;
    bio: string | null;
  };
  likedAt: string;
}

export interface FeedTrip {
  tripId: string;
  coverImage: string | null;
  tripType: string | null;
  destination: string | null;
  totalDays: number | null;
  experienceType: string | null;
  perPersonCost: number | null;
  createdAt: string;
  creator: FeedCreator;
  likesCount: number;
  isLiked: boolean;
}

export interface FeedResponse {
  status: string;
  data: FeedTrip[];
}
