import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

// kirim setiap request ke server dengan header Authorization yang berisi token
// api.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `${token}`;
//   }
//   return req;
// });

export default api;
