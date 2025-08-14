import axios from "axios";

console.log(import.meta.mode);

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default instance;
