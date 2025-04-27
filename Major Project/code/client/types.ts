import { Dispatch, SetStateAction } from "react";

export type User = {
  name: string,
  email: string,
  type: string
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signOut: () => void;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface ProfileData {
  name: string;
  age: string;
  gender: string;
  weight: string;
  blood_group: string;
  profession: string;
  medical_conditions: string;
  doctor_id?: string;
  medical_degree?: string;
  speciality?: string;
  hospital?: string;
}

export interface Env {
  backend_api: string
}