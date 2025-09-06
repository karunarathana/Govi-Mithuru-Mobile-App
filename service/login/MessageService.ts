import { API_ENDPOINTS } from "@/api/apiConfig";
import axios from "axios";

export interface SimpleResponse {
    message: string;
}


export const createMessage = async (
    messageSubject: string,
    messageBody: string
): Promise<SimpleResponse> => {
    try {
        const response = await axios.post<SimpleResponse>(
            API_ENDPOINTS.CREATE_MESSAGE,
            {
                messageSubject: 'ADMIN',
                messageBody: 'This is a test message',
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error: unknown) {
        return {
            message: "Unexpected error occurred",
        };
    }
};