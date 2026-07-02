export interface SearchUser {
  id: string;
  username: string;
  name: string | null;
  image: string | null;
  isPrivate: boolean;
  relationship: {
    status: string;
    isFollowing: boolean;
  };
}

export interface SearchResponse {
  status: string;
  data: {
    items: SearchUser[];
    nextCursor: string | null;
  };
}

export type NotificationType =
  | "FOLLOW_REQUEST"
  | "FOLLOW_ACCEPT"
  | "LIKE"
  | "COMMENT"
  | "SYSTEM"
  | "MESSAGE";

export interface NotificationActor {
  id: string;
  username: string;
  name: string | null;
  image: string | null;
}

export interface NotificationItem {
  id: string;
  actorId: string;
  receiverId: string;
  type: NotificationType;
  entityId: string | null;
  entityType: string | null;
  isRead: boolean;
  createdAt: string;
  actor: NotificationActor;
}

export interface NotificationsResponse {
  status: string;
  data: {
    items: NotificationItem[];
    nextCursor: string | null;
  };
}

export interface UnreadCountResponse {
  status: string;
  data: {
    unreadCount: number;
  };
}

export interface UserSettings {
  isPrivate: boolean;
  isDiscoverable: boolean;
  messagingPermission: "ANYONE" | "FOLLOWINGS" | "NO_ONE";
  notifyEmail: boolean;
  notifyMessages: boolean;
  notifyFollowRequests: boolean;
}

export interface SettingsResponse {
  status: string;
  data: UserSettings;
}
