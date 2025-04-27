import axios from "axios";
import { env } from "../config";

export interface DoctorLocation {
  name: string;
  location: { latitude: number; longitude: number };
}

export const fetchAllDoctorsLocations = async (): Promise<DoctorLocation[] | null> => {
  try {
    const { data } = await axios.get(
      `${env.backend_api}/user/doctors/locations`,
      { withCredentials: true }
    );

    if (data.success) {
      return data.locations;
    } else {
      console.error(data.msg);
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch doctors' locations:", error);
    return null;
  }
};