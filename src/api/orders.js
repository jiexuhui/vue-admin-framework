import request from "@/utils/request";

/**
 * 订单列表
 */
export const list = params => {
  return request.post("/admin/orders/list", params, {
    headers: { "Content-Type": "application/json" }
  });
};

/**
 * 补单
 */
export const recharge = params => {
  return request.post("/admin/orders/recharge", params, {
    headers: { "Content-Type": "application/json" }
  });
};
