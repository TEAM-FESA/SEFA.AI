// User related types
export interface UserProfile {
  name: string;
  email?: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  language: string;
}

// Chat related types
export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  metadata?: {
    type: 'text' | 'image' | 'file';
    size?: number;
    url?: string;
  };
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// Educational content types
export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
}

export interface Schedule {
  id: string;
  title: string;
  description: string;
  date: Date;
  duration: number; // in minutes
  subject: string;
  completed: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  Profile: undefined;
  Explore: undefined;
  Onboarding: undefined;
  Download: undefined;
}; 