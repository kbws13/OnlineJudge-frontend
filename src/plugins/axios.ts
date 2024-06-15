import axios from "axios";
import { OpenAPI } from "../../backend/user";
// 携带凭证
OpenAPI.WITH_CREDENTIALS = true;
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://ojbackend.kbws.xyz"
    : "http://ojbackend.kbws.xyz";

OpenAPI.BASE = baseUrl;
console.log("当前环境：", process.env.NODE_ENV, "请求地址：", baseUrl);

// 添加请求拦截器
// axios.interceptors.request.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// 携带token方式登录
axios.interceptors.request.use(
  (config) => {
    // 假设token存在localStorage中
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    console.log("全局响应", response);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
