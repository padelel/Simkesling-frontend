import axios from "axios";
// Create an instance of Axios with custom configurations
const api = axios.create({
  // baseURL: 'http://localhost:8000/api',
  // baseURL: "http://localhost:8000/api/v1", // Your API base URL
  baseURL: "https://be-simkesling.lalapan-depok.com/api/v1", // Your API base URL
  timeout: 30000, // Request timeout in milliseconds
  headers: {
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config: any) => {
    // if () {
    //   value = localStorage.getItem("favoriteNumber") || "";
    // }
    // Add any request transformations here, such as adding headers or modifying data
    let token = await localStorage.getItem("token");
    if (token !== null && typeof window !== "undefined") {
      config.headers.Authorization = `${token}`;
    }
    // console.log(config)
    return config;
  },
  (error: any) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: any) => {
    // Add any response transformations here, such as modifying response data
    return response;
  },
  (error: any) => {
    alert("Error coy, cek console..!");
    // Handle response errors
    return Promise.reject(error);
  }
);

export default api;
