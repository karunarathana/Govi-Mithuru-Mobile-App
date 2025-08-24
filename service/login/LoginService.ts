import axios from 'axios';
import { API_ENDPOINTS } from "../../api/apiConfig";

export function add(a: number, b: number): number {
  return a + b;
}
export interface SimpleResponse {
  status: string;
  message: string;
}

export const login = async (
  userEmail: string,
  userPassword: string
): Promise<SimpleResponse | null> => {
  try {
    const response = await axios.get<SimpleResponse>(API_ENDPOINTS.LOGIN, {
      params: {
        email: userEmail,
        password: userPassword,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data; // Return API data

  } catch (error: any) {
    console.error('Login error:', error.message);
    return null; // Return null if API fails
  }
};