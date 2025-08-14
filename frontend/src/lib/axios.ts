import axios from "axios";

console.log(import.meta.env.VITE_API_URL);

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

export default instance;
