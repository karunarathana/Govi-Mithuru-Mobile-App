import { API_ENDPOINTS } from "@/api/apiConfig";
import axios from "axios";

export interface SimpleResponse {
  responseMessage: string;
  responseCode: string;
}

export const Register = async (
  userEmail: string,
  userPassword: string,
  profileName:string
): Promise<SimpleResponse> => {
  try {
    console.log("*************************");
    console.log("Register Function Called");
    console.log("*************************");
    const response = await axios.post<SimpleResponse>(
      API_ENDPOINTS.REGISTER,
      {
        userName: profileName,
        userEmail: userEmail,
        password: userPassword,
        role:'Farmer'
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