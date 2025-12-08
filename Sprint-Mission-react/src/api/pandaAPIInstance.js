import axios from "axios";

const pandaAPIInstance = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
  headers: { "Content-Type": "application/json" },
});

export default pandaAPIInstance;
