import axios from "axios";

console.log("mode", import.meta.env.MODE);

const instance = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? `/api`
      : "http://localhost:5500/api",
  withCredentials: true,
});

export default instance;
