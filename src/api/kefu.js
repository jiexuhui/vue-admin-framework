import request from "@/utils/request";

/**
 * 金币变化日志
 * @param {} params
 */
export const coinchangelog = params => {
  return request.post("/admin/coinchangelog/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 德州变化日志
 * @param {} params
 */
export const texaschangelog = params => {
  return request.post("/admin/texaschangelog/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 奖券变化日志
 * */
export const prizeticketlog = params => {
  return request.post("/admin/prizeticketlog/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 金币变化汇总单局
 * @param {} params
 */
export const coinchangereport = params => {
  return request.post("/admin/coinchangereport/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 钻石变化日志
 * @param {} params
 */
export const pointchangelog = params => {
  return request.post("/admin/pointchangelog/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 时时乐记录
 * @param {} params
 */
export const sslrecord = params => {
  return request.post("/admin/ssl/sslrecord", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 时时乐押注记录
 * @param {} params
 */
export const sslyz = params => {
  return request.post("/admin/ssl/yz", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 时时乐返奖
 * @param {} params
 */
export const sslfj = params => {
  return request.post("/admin/ssl/fj", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 时时乐返奖
 * @param {} params
 */
export const sslhz = params => {
  return request.post("/admin/ssl/hz", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 百人牌型
 * @param {} params
 */
export const warlog = params => {
  return request.post("/admin/warlog/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 百家乐记录
 * @param {} params
 */
export const bjlresult = params => {
  return request.post("/admin/bjl/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 百家乐金币变化
 * @param {} params
 */
export const bjlcoinchange = params => {
  return request.post("/admin/kefu/bjlcoinchange", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 每日金币变化
 * @param {} params
 */
export const dailycoinchangelog = params => {
  return request.post("/admin/dailycoinchangelog/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};


/**
 * 贵族体验卡使用记录
 * @param {} params
 */
export const useviprecord = params => {
  return request.post("/admin/useviprecord/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 贵族购买记录
 * @param {} params
 */
export const buyviplog = params => {
  return request.post("/admin/buyviplog/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 礼物赠送记录
 * @param {} params
 */
export const giftlogs = params => {
  return request.post("/admin/giftlogs/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 福袋购买记录
 * @param {} params
 */
export const fudailogs = params => {
  return request.post("/admin/fudailogs/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 百人拼十
 * @param {} params
 */
export const dnwarresult = params => {
  return request.post("/admin/dnwarresult/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 风驰电掣
 * @param {} params
 */
export const fcdclogs = params => {
  return request.post("/admin/fcdclogs/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 时时彩
 * @param {} params
 */
export const ssclogs = params => {
  return request.post("/admin/ssc/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 红黑大战
 * @param {} params
 */
export const redwar = params => {
  return request.post("/admin/redwar/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 银行转账记录
 * @param {} params
 */
export const logBoxTransfer = params => {
  return request.post("/admin/logBoxTransfer/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/**
 * 小游戏统计
 */
export const minigame = params => {
  return request.post('/admin/minigame/list', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}
