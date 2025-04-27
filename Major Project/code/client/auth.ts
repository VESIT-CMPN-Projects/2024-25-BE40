import axios from "axios";
import { User } from "../types";
import { env } from "../config";

export const login = async (email: string, password: string): Promise<User> => {
  const { data } = await axios.post(
    `${env.backend_api}/user/login`,
    { email, password },
    { withCredentials: true }
  );
  return data;
};

export const signup = async (name: string, email: string, password: string): Promise<void> => {
  await axios.post(
    `${env.backend_api}/user`,
    { name, email, password }
  );
};

export const doctorSignup = async (
  name: string,
  email: string, 
  doctor_id: string, 
  medical_degree: string, 
  speciality: string, 
  password: string
) => {
  await axios.post(
    `${env.backend_api}/user/doctor`,
    { name, email, doctor_id, medical_degree, speciality, password },
    { withCredentials: true }
  );
};

// New function to upload doctor's location
export const uploadDoctorLocation = async (latitude: number, longitude: number): Promise<void> => {
  await axios.post(
    `${env.backend_api}/user/doctor/location`,
    { latitude, longitude },
    { withCredentials: true }
  );
};
