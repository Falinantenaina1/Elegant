import axios from "axios";

const instance = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? `/api`
      : "https://3legant-roan.vercel.app/api/",
  withCredentials: true,
});

export default instance;
