import request from "@/utils/request";

/**
 * 订单列表
 */
export const list = params => {
  return request.post("/admin/exorders/list", params, {
    headers: { "Content-Type": "application/json" }
  });
};

/**
 * 补单
 */
export const modify = params => {
  return request.post("/admin/exorders/modify", params, {
    headers: { "Content-Type": "application/json" }
  });
};
