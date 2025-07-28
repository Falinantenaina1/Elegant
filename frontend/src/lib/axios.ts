import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5500/api",
  withCredentials: true,
  proxy: {
    protocol: "http",
    host: "localhost",
    port: 5500,
  },
});

export default instance;
