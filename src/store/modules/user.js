/* eslint-disable */
import { loginByUsername, logout, getUserInfo } from "@/api/login";
import { editsystemuser, addsystemuser } from "@/api/system";
import { getToken, setToken, removeToken } from "@/utils/auth";
import crypto from "crypto";
const _start = "1k1wgr7f1s469jgt6r1wefco7ho23hw6";
const _end = "3s06zl89tvbxfs9xamhm26ae2h239wtp";

const user = {
  state: {
    user: "",
    status: "",
    code: "",
    token: getToken(),
    name: "",
    avatar: "",
    introduction: "",
    roles: "",
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim();
      const password = userInfo.password.trim();
      const md5password = crypto
        .createHash("md5")
        .update(`${_start}.${password}.${_end}`)
        .digest("hex");
      return new Promise((resolve, reject) => {
        loginByUsername(username, md5password)
          .then(response => {
            const data = response.data;
            console.log("login token>>>>", data);
            commit("SET_TOKEN", data);
            setToken(data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then(response => {
            // if (!response.data) {
            //   // 由于mockjs 不支持自定义状态码只能这样hack
            //   reject("error");
            // }
            const data = response.data;

            if (data.role) {
              // 验证返回的roles是否是一个非空数组
              commit("SET_ROLES", data.role);
            } else {
              reject("未分配权限，请联系管理员!");
            }

            commit("SET_NAME", data.name);
            commit("SET_AVATAR", data.avatar);
            commit("SET_INTRODUCTION", data.introduction);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    AddAdminUser({ commit, state }, params) {
      console.log("password:" + params.password);
      if (params.password === "undefined") {
        params.password = "";
      }
      if (params.password !== "" && params.password !== null) {
        params.password = crypto
          .createHash("md5")
          .update(`${_start}.${params.password}.${_end}`)
          .digest("hex");
      }
      console.log("password2:" + params.password);
      return new Promise((resolve, reject) => {
        addsystemuser(params)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    EditAdminUser({ commit, state }, params) {
      console.log("password:" + params.password);
      if (params.password === "undefined") {
        params.password = "";
      }
      if (params.password !== "" && params.password !== null) {
        params.password = crypto
          .createHash("md5")
          .update(`${_start}.${params.password}.${_end}`)
          .digest("hex");
      }
      console.log("password2:" + params.password);
      return new Promise((resolve, reject) => {
        editsystemuser(params)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", "");
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", "");
        removeToken();
        resolve();
      });
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit("SET_TOKEN", role);
        setToken(role);
        getUserInfo(role).then(response => {
          const data = response.data;
          commit("SET_ROLES", data.roles);
          commit("SET_NAME", data.name);
          commit("SET_AVATAR", data.avatar);
          commit("SET_INTRODUCTION", data.introduction);
          resolve();
        });
      });
    }
  }
};

export default user;
