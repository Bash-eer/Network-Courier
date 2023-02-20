import axios from "axios";
const { URL } = require("../../config/const");
// base url
const config = {
  baseURL: URL.BACKEND_BASEURL,
};

// axios instance
const httpClient = axios.create(config);

// bearer authoriazation for the instance
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("AccessToken");

    if (token) {
      config.headers["Authorization"] = `bearer ${localStorage.getItem("AccessToken")}`
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const loggerInterceptor = (config) => {
  /** Add logging here */
  return config;
};

httpClient.interceptors.request.use(loggerInterceptor);

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error.response;
  }
);

export { httpClient };
