import { LayoutDashboard, Telescope, MessageSquare, Plus, Settings, Search, Bell } from "lucide-react";

export type Role = "ADMIN" | "USER" | "GUEST";

export interface NavItem {
  title: string;
  href: string;
  icon: any;
  roles: Role[];
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
    title: "Search",
    href: "/search",
    icon: Search,
    roles: ["ADMIN", "USER", "GUEST"],
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
    roles: ["ADMIN", "USER"],
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
    roles: ["ADMIN", "USER"],
  },
  {
    title: "Post Trip",
    href: "/post-trip",
    icon: Plus,
    roles: ["ADMIN", "USER"],
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["ADMIN", "USER"],
  },
];

export const MOCK_USER = {
  name: "Raffialdo Bayu",
  role: "ADMIN" as Role,
  avatar: "/avatars/user.png",
  title: "Traveling Lover",
};
