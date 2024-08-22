

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_ELECTRICITY
// ? '' :"http://localhost:8080";
console.log(baseURL)
const instance = axios.create({ baseURL: baseURL, timeout: 5000, headers: { 'Content-Type': 'application/json' } });


// window.location.href = 'http://localhost:4000/client';
// Thêm một request interceptor
// instance.interceptors.request.use(
//     (config) => {
//       if (!accountId) {
        
        
//         // // Chuyển hướng đến trang đăng nhập nếu người dùng chưa đăng nhập
//         // return Promise.reject(new Error('User is not authenticated'));
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

export default instance;