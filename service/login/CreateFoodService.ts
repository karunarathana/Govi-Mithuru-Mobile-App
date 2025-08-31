import { API_ENDPOINTS } from "@/api/apiConfig";
import axios, { AxiosError } from "axios";

export const addNewProduct = async (
    fileUri: string | null,
    productDto: any
): Promise<string> => {
    console.log("call addNewProduct Function");

    if (!fileUri) {
        console.warn("No image selected");
        return "No image selected";
    }

    try {
        const formData = new FormData();

        // Append image
        formData.append("image", {
            uri: fileUri,
            type: "image/jpeg", // Use correct MIME type
            name: "product.jpg",
        } as any);

        // Append JSON as string
        formData.append("product", JSON.stringify(productDto));

        // Send POST request
        const response = await axios.post(API_ENDPOINTS.CREATE_NEW_PRODUCT, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Response:", response.data);
        return response.data;

    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<any>;
            console.error("Login API error:", axiosError.response?.data);
            return "Update failed";
        }

        console.error("Unexpected error:", error);
        return "Unexpected error occurred";
    }
};
