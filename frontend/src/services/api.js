import axios from "axios";

// Get API base URL from environment variable
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 5 minutes
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message =
        error.response.data?.message ||
        error.response.data ||
        "An error occurred";
      return Promise.reject(new Error(message));
    } else if (error.request) {
      return Promise.reject(
        new Error("Network error. Please check your connection.")
      );
    } else {
      return Promise.reject(
        new Error(error.message || "An unexpected error occurred")
      );
    }
  }
);

/* ---------------- API METHODS ---------------- */

/**
 * Upload resume & generate portfolio
 * Backend endpoint: POST /api/portfolio/generate
 */
export const uploadResume = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/api/portfolio/generate", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    responseType: "blob",
    onUploadProgress: (progressEvent) => {
      if (onUploadProgress && progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onUploadProgress(percentCompleted);
      }
    },
  });

  return response;
};

/**
 * Alias for clarity
 */
export const generatePortfolio = uploadResume;

/**
 * Download portfolio ZIP
 */
export const downloadPortfolio = (blob, filename = "portfolio_website.zip") => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

export default apiClient;
