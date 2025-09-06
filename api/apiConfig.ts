const BASE_URL = "http://10.137.144.10:8082/api/com-test";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/login-user`,
  REGISTER: `${BASE_URL}/create-user`,
  USERS: `${BASE_URL}/users`,

  CREATE_NEW_PRODUCT: `${BASE_URL}/add-product`,
  GET_ALL_Product: `${BASE_URL}/view-product`,
  UPDATE_SINGLE_PRODUCT: `${BASE_URL}/update-product`,
  DELETE_SINGLE_PRODUCT: `${BASE_URL}/delete-product`
};