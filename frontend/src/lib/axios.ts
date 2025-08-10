import axios from "axios";

console.log(import.meta.mode);

const instance = axios.create({
  baseURL:
    import.meta.mode === "development" ? "/api" : "http://localhost:5500/api",
  withCredentials: true,
});

export default instance;
