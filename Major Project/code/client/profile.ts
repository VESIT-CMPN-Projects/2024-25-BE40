import axios from "axios";
import { ProfileData } from "../types";
import { env } from "../config";

export const fetchProfile = async (userType: string): Promise<ProfileData> => {
  const endpoint = userType === "DOCTOR" ? "/user/doctor/profile" : "/user/profile";

  const { data } = await axios.get(
    `${env.backend_api}${endpoint}`,
    { withCredentials: true }
  ).catch(err => err);

  return {
    ...data.profile
  };
};

export const updateProfile = async (profileData: ProfileData, userType: string): Promise<void> => {
  const endpoint = userType === "DOCTOR" ? "/user/doctor/profile" : "/user/profile";

  await axios.post(
    `${env.backend_api}${endpoint}`,
    { ...profileData },
    { withCredentials: true }
  ).catch(err => err);
};