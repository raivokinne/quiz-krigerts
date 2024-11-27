import { Quiz } from "@/types/quiz";
import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchQuizzes(): Promise<Quiz[]> {
  const response = await instance.get<Quiz[]>("/api/quiz");
  return response.data;
}

export const getCurrentUser = async () => {
  try {
    const response = await instance.get("/api/user", { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};

export const getCsrfToken = async () => {
  try {
    await instance.get("/sanctum/csrf-cookie", {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Failed to get CSRF token", error);
  }
};

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token to request headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const isTokenExpired = (token: string) => {
  const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
  const exp = decoded.exp * 1000; // Convert expiration time to milliseconds
  return Date.now() > exp;
};
