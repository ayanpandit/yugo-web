import { LayoutDashboard, Telescope, MessageSquare, Compass, LogOut, Plus } from "lucide-react";

export type Role = "ADMIN" | "USER" | "GUEST";

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  roles: Role[];
  badge?: number;
}

export const SIDEBAR_CONFIG: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["ADMIN", "USER"],
  },
  {
    title: "Explore",
    href: "/explore",
    icon: Telescope,
    roles: ["ADMIN", "USER", "GUEST"],
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
    roles: ["ADMIN", "USER"],
    badge: 1,
  },
  {
    title: "Post Trip",
    href: "/post-trip",
    icon: Plus,
    roles: ["ADMIN", "USER"],
  },
];

export const MOCK_USER = {
  name: "Raffialdo Bayu",
  role: "ADMIN" as Role,
  avatar: "/avatars/user.png",
  title: "Traveling Lover",
};
