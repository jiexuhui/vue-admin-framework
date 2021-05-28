/* eslint-disable */
import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
import { MessageBox } from "element-ui";
import router from "../router";

// create an axios instance
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 3 * 60 * 1000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/json";
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers.Authorization = getToken();
    }
    config.withCredentials = true;
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    const res = response.data;
    if (!res.success) {
      Message({
        message: res.error.message,
        type: "error",
        duration: 5 * 1000
      });
      console.log(res.error.message);
      if (res.error.code === -403) {
        router.replace({
          path: "/401"
        });
      }
      if (res.error.code === 404) {
        router.replace({
          path: "/404"
        });
      }
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.error.code === -200 || res.error.code === -202 || res.error.code === -203) {
        // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        store.dispatch("FedLogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      }
      return Promise.reject("error");
    } else {
      return response.data;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
