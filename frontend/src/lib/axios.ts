import axios from "axios";

const instance = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? `https://elegant-giy6.onrender.com/api`
      : "http://localhost:5500/api",
  withCredentials: true,
});

export default instance;
