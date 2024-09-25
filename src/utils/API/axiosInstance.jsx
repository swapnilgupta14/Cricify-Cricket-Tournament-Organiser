import axios from "axios";

const axiosInstance = axios.create({
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "x-rapidapi-host": import.meta.env.REACT_APP_CRICBUZZ_API_HOST,
    "x-rapidapi-key": import.meta.env.REACT_APP_RAPIDAPI_KEY,
  },
});

export default axiosInstance;