import { API_ENDPOINTS } from "@/api/apiConfig";
import axios from "axios";

export interface SimpleResponse {
  responseMessage: string;
  responseCode: string;
}

export const Register = async (
  userRole: string,
  userEmail: string,
  userPassword: string,
  profileName:string
): Promise<SimpleResponse> => {
  try {
    console.log("UserRole ",userRole);
    
    const response = await axios.post<SimpleResponse>(
      API_ENDPOINTS.REGISTER,
      {
        userName: profileName,
        userEmail: userEmail,
        password: userPassword,
        role:userRole
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        responseMessage: "error",
        responseCode: error.response.data?.message || "Login failed",
      };
    }

    return {
      responseMessage: "error",
      responseCode: "Unexpected error occurred",
    };
  }
};