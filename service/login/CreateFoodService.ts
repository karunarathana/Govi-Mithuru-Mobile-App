import { API_ENDPOINTS } from "@/api/apiConfig";
import axios, { AxiosError } from "axios";

export interface Product {
    productID: number;
    productName: string;
    productPrice: string;
    productCreateData: string; // ISO date string
    productCategory: string;
    others: string | null;
    placeImageData: string; // Base64 encoded image string
}

export interface ProductResponse {
    totalItem: string;
    items: Product[];
    totalPages: string;
}

// --------------------- CREATE PRODUCT ---------------------
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
            type: "image/jpeg",
            name: "product.jpg",
        } as any);

        // Append product JSON
        formData.append("product", JSON.stringify(productDto));

        const response = await axios.post(API_ENDPOINTS.CREATE_NEW_PRODUCT, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Response:", response.data);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<any>;
            console.error("Add Product API error:", axiosError.response?.data);
            return "Add failed";
        }
        console.error("Unexpected error:", error);
        return "Unexpected error occurred";
    }
};

// --------------------- GET ALL PRODUCTS ---------------------
export const getAllProduct = async (): Promise<ProductResponse | null> => {
    console.log("call getAllProduct Function");

    try {
        const response = await axios.get<ProductResponse>(API_ENDPOINTS.GET_ALL_Product, {
            headers: { "Content-Type": "application/json" },
        });

        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<any>;
            console.error("Get Products API error:", axiosError.response?.data);
            return null;
        }
        console.error("Unexpected error:", error);
        return null;
    }
};

// --------------------- UPDATE PRODUCT ---------------------
export const updateProduct = async (
    id: number,
    fileUri: string | null,
    productDto: any
): Promise<string> => {
    console.log("call updateProduct Function", id);

    try {
        const formData = new FormData();

        // Append ID
        formData.append("id", id.toString());

        // Append product JSON
        formData.append("product", JSON.stringify(productDto));

        // ✅ Only append new image if picked (file path starts with "file:")
        if (fileUri && fileUri.startsWith("file:")) {
            formData.append("image", {
                uri: fileUri,
                type: "image/jpeg",
                name: "product.jpg",
            } as any);
        }

        const response = await axios.post(API_ENDPOINTS.UPDATE_SINGLE_PRODUCT, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Response:", response.data);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Update API error:", error.response?.data);
            return "Update failed";
        }
        console.error("Unexpected error:", error);
        return "Unexpected error occurred";
    }
};

export const deleteProduct = async (id: number): Promise<string> => {
    console.log("call deleteProduct Function", id);

    try {
        // Include id as query parameter
        const response = await axios.delete(`${API_ENDPOINTS.DELETE_SINGLE_PRODUCT}?id=${id}`, {
            headers: { "Content-Type": "application/json" },
        });

        console.log("Delete Response:", response.data);
        return response.data.items; // or response.data depending on your backend
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Delete API error:", error.response?.data);
            return "Delete failed";
        }
        console.error("Unexpected error:", error);
        return "Unexpected error occurred";
    }
};
