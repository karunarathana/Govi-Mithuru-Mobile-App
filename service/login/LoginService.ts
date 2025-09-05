import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "../../api/apiConfig";

export interface SimpleResponse {
  status: string;
  message: string;
  newAccessToken?: string;   
  newRefreshToken?: string;  
  username?: string;         
  userRole?: string;         
}

export const login = async (
  userEmail: string,
  userPassword: string
): Promise<SimpleResponse> => {
  try {
    const response = await axios.post<SimpleResponse>(
      API_ENDPOINTS.LOGIN,
      {
        userEmail,
        password: userPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<any>;
      console.error("Login API error:", axiosError.response?.data);

      return {
        status: "error",
        message: axiosError.response?.data?.message || "Login failed",
      };
    }

    console.error("Unexpected error:", error);
    return {
      status: "error",
      message: "Unexpected error occurred",
    };
  }
};
