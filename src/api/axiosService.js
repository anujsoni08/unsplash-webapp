import axios from "axios";

export const API_REQUEST_TIMEOUT = 30000;

export const API_BASE_URL = "https://api.unsplash.com";

export const publicAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: API_REQUEST_TIMEOUT,
});
