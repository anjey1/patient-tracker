import { Icons } from '@/components/ui/icons';

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export interface Mood {
  icon: string;
  label: string;
}

export interface Symptom {
  id: string;
  name: string;
  checked?: boolean;
  level?: string; // mild, moderate, severe
}

export interface SymptomEntry {
  date: string;
  symptoms: Symptom[];
  count: number;
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export interface MoodEntry {
  date: string;
  moodValue: number;
  moodLabel: string;
  emoji: string;
}

export interface DashProps {
  initialMoodHistory?: MoodEntry[];
  initialSymptoms?: Symptom[];
  initialTasks?: Task[];
  initialNotifications?: Notification[];
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Task {
  id: string;
  name: string;
  completed: boolean;
}

export interface MoodOption {
  emoji: string;
  label: string;
  value: number;
}
