"use server";

import axios from "axios";

// 创建 Axios 实例
const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api", // 基础 URL
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data } = response;
    console.log("data", data);
    if (data.code !== 200) {
      console.error("Response error:", data.message || "Unknown error");
      return Promise.reject(new Error(data.message || "Error"));
    }
    return data; // 返回数据部分
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

// 导出常用的请求方法，方便直接调用
export const get = async (url, params = null) => {
  return await service.get("GET", url, params);
};

export const post = async (url, data = {}, config = {}) => {
  return await service.post(url, data, { ...config });
};

export const put = async (url, data) => {
  return await service.put(url, { ...data });
};

export const del = async (url, data) => {
  return await service.delete(url, { data });
};

// export default request;
