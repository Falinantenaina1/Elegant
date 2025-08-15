import axios from "axios";

const instance = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? `${window.location.hostname}/api`
      : "http://localhost:5500/api",
  withCredentials: true,
});

export default instance;
