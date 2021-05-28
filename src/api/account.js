import request from '@/utils/request'

/**
 * 获取用户列表
 * @param {} params
 */
export const accounts = params => {
  return request.post('/admin/account/list', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 获取用户总数
 * @param {} params
 */
export const accountstatal = params => {
  return request.post('/admin/account/accountstatal', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 编辑用户
 */
export const editaccount = params => {
  return request.post('/admin/account/editaccount', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 封号
 */
export const kickout = params => {
  return request.post('/admin/account/kickout', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 礼包列表
 * @param {*} params
 */
export const giftlist = params => {
  return request.post('/admin/account/giftlist', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 礼包详情
 * @param {*} params
 */
export const gifttips = pid => {
  const params = { pid }
  return request.post('/admin/account/gifttips', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 赠送礼包
 * @param {*} params
 */
export const sendgift = params => {
  return request.post('/admin/account/sendgift', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 登录日志
 */
export const loginlogs = params => {
  return request.post('/admin/account/loginlogs', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 赠送经验
 */
export const sendExp = params => {
  return request.post('/admin/account/sendExp', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 重置保险箱密码
 */
export const resetBoxpassword = params => {
  return request.post('/admin/account/resetBoxpassword', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 个人基础信息
 */
export const profit = params => {
  return request.post('/admin/account/profit', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}
/**
 * ip地址
 */
export const ddip = params => {
  return request.post('http://ip.taobao.com/service/getIpInfo.php?ip=', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 背包数据
 */
export const backpack = params => {
  return request.post('/admin/account/backpack', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 统计类数据
 */
export const statistics = params => {
  return request.post('/admin/account/statistics', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 今日实时数据
 */
export const dodaylive = params => {
  return request.post('/admin/account/dodaylive', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 充值记录
 */
export const order = params => {
  return request.post("/admin/orders/list", params, {
    headers: { "Content-Type": "application/json" }
  });
};

/**
 * 统计类数据
 */
export const censuslogs = params => {
  return request.post("/admin/censuslogs/list", params, {
    headers: { "Content-Type": "application/json" }
  });
};

/**
 * 兑换记录
 */
export const exchange = params => {
  return request.post("/admin/exorders/list", params, {
    headers: { "Content-Type": "application/json" }
  });
};

/**
 * 礼物赠送记录
 */
export const giftlogs = params => {
  return request.post("/admin/giftlogs/list", params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

