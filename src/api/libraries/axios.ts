import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("chat-id");

        if(token){
            config.headers.Authorization = token;
        }

        return config;
    }
)

export default axiosInstance;
