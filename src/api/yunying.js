import request from '@/utils/request'

/**
 * 获取礼包列表
 * @param {} params
 */
export const uploadH5 = file => {
  return request.post('/admin/server/uploadH5', file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}


/**
 * 游戏版本
 * @param {} params
 */
export const gameversions = params => {
  return request.post('/admin/gameversions/list', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 游戏版本
 * @param {} params
 */
export const dorelease = params => {
  return request.post('/admin/gameversions/release', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 功能列表
 * @param {} params
 */
export const caps = params => {
  return request.post('/admin/caps/list', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 添加功能
 * @param {} params
 */
export const addcap = params => {
  return request.post('/admin/caps/addcap', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 修改功能
 * @param {} params
 */
export const editcap = params => {
  return request.post('/admin/caps/editcap', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 删除功能
 * @param {} params
 */
export const delcap = params => {
  return request.post('/admin/caps/delcap', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 渠道列表
 */
export const channels = params => {
  return request.post('/admin/channel/list', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 新增渠道
 */
export const addChannel = params => {
  return request.post('/admin/channel/addchannel', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 编辑渠道
 */
export const editChannel = params => {
  return request.post('/admin/channel/editchannel', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 删除渠道
 */
export const delChannel = params => {
  return request.post('/admin/channel/delchannel', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 渠道功能列表
 */
export const channelCaps = params => {
  return request.post('/admin/channel/channelCaps', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 开启渠道功能
 */
export const addChannelCaps = params => {
  return request.post('/admin/channel/addChannelCaps', params, {
    headers: { 'Content-Type': 'application/json' }
  })
}

/**
 * 活动列表
 * @param {} params
 */
export const activity = params => {
  return request.post('/admin/activity/list', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 活动列表
 * @param {} params
 */
export const tasklist = params => {
  return request.post('/admin/activity/tasklist', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 活动列表
 * @param {} params
 */
export const taskedit = params => {
  return request.post('/admin/activity/taskedit', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 活动列表
 * @param {} params
 */
export const taskadd = params => {
  return request.post('/admin/activity/taskadd', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 添加活动
 * @param {} params
 */
export const addactivity = params => {
  return request.post('/admin/activity/addactivity', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 编辑活动
 * @param {} params
 */
export const editactivity = params => {
  return request.post('/admin/activity/editactivity', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 活动类型列表
 * @param {} params
 */
export const activitytypes = params => {
  return request.post('/admin/activitytypes/list', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 添加活动类型
 * @param {} params
 */
export const addacttype = params => {
  return request.post('/admin/activitytypes/addacttype', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 编辑活动类型
 * @param {} params
 */
export const editacttype = params => {
  return request.post('/admin/activitytypes/editacttype', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 删除活动类型
 * @param {} params
 */
export const delacttype = params => {
  return request.post('/admin/activitytypes/delacttype', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 活动参与日志
 * @param {} params
 */
export const actlogs = params => {
  return request.post('/admin/actlogs/list', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 活动参与日志
 * @param {} params
 */
export const tasklogs = params => {
  return request.post('/admin/tasklogs/list', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 公告列表
 * @param {} params
 */
export const notices = params => {
  return request.post('/admin/notices/list', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 添加公告
 * @param {} params
 */
export const addnotice = params => {
  return request.post('/admin/notices/addnotice', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 编辑公告
 * @param {} params
 */
export const editnotice = params => {
  return request.post('/admin/notices/editnotice', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 删除公告
 * @param {} params
 */
export const delnotice = params => {
  return request.post('/admin/notices/delnotice', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 游戏列表
 * @param {} params
 */
export const games = params => {
  return request.post('/admin/yunying/games', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 添加游戏
 * @param {} params
 */
export const addgame = params => {
  return request.post('/admin/yunying/addgame', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 编辑游戏
 * @param {} params
 */
export const editgame = params => {
  return request.post('/admin/yunying/editgame', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 删除游戏
 * @param {} params
 */
export const delgame = params => {
  return request.post('/admin/yunying/delgame', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 推送消息
 * @param {} params
 */
export const pushmsg = params => {
  return request.post('/admin/message/pushmsg', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 发送循环滚屏
 * @param {} params
 */
export const pushloopmsg = params => {
  return request.post('/admin/message/pushloopmsg', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 全局消息
 * @param {} paramsnews
 */
export const gm = params => {
  return request.post('/admin/news/gm', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 全局消息列表
 * @param {} paramsnews
 */
export const list = params => {
  return request.post('/admin/news/list', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 全局消息时间搜索s
 * @param {} paramsnewsaa
 */
export const ctimesearch = params => {
  return request.post('/admin/news/ctimesearch', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 全局消息开关
 * @param {} paramsnewsaa
 */
export const newswitch = params => {
  return request.post('/admin/news/switch', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 推送消息
 * @param {} params
 */
export const sendmail = params => {
  return request.post('/admin/message/sendmail', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 客服消息列表
 * @param {} params
 */
export const cslist = params => {
  return request.post('/admin/customerservice/cslist', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 指定用户客服消息列表
 * @param {} params
 */
export const usercustomerservicemsg = userid => {
  const params = { userid }
  return request.post('/admin/customerservice/usercustomerservicemsg', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 指定用户客服消息列表
 * @param {} params
 */
export const sendmsg = params => {
  return request.post('/admin/customerservice/sendmsg', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 福袋列表
 * @param {} params
 */
export const fudais = params => {
  return request.post('/admin/fudai/list', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 添加福袋
 * @param {} params
 */
export const addfudai = params => {
  return request.post('/admin/fudai/addfudai', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 编辑福袋
 * @param {} params
 */
export const editfudai = params => {
  return request.post('/admin/fudai/editfudai', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 福袋配置列表
 * @param {} params
 */
export const fudaigift = params => {
  return request.post('/admin/fudaigift/list', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 添加福袋配置
 * @param {} params
 */
export const addfudaigift = params => {
  return request.post('/admin/fudaigift/addfudaigift', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 编辑福袋配置
 * @param {} params
 */
export const editfudaigift = params => {
  return request.post('/admin/fudaigift/editfudaigift', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 删除福袋配置
 * @param {} params
 */
export const delfudaigift = params => {
  return request.post('/admin/fudaigift/delfudaigift', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 添加机器人
 * @param {} params
 */
export const addrobot = params => {
  return request.post('/admin/robot/add', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 添加机器人
 * @param {} params
 */
export const robotlist = params => {
  return request.post('/admin/robot/list', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 添加机器人
 * @param {} params
 */
export const editrobot = params => {
  return request.post('/admin/robot/edit', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 开启机器人
 * @param {} params
 */
export const robotstart = params => {
  return request.post('/admin/robot/start', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 关闭机器人
 * @param {} params
 */
export const robotstop = params => {
  return request.post('/admin/robot/stop', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 关闭机器人
 * @param {} params
 */
export const exportList = params => {
  return request.post('/admin/robot/exportList', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 三张牌luck列表
 * @param {} params
 */
export const szplucklist = params => {
  return request.post('/admin/szpluck/list', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 三张牌luck编辑
 * @param {} params
 */
export const szpluckedit = params => {
  return request.post('/admin/szpluck/edit', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 比赛配置列表
 * @param {} params
 */
export const matchCfgList = params => {
  return request.post('/admin/matchcfg/list', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 比赛配置编辑
 * @param {} params
 */
export const matchCfgEdit = params => {
  return request.post('/admin/matchcfg/edit', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 比赛配置编辑
 * @param {} params
 */
export const matchCfgAdd = params => {
  return request.post('/admin/matchcfg/add', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 比赛参加日志
 * @param {} params
 */
export const matchSignLogs = params => {
  return request.post('/admin/matchcfg/signLogs', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 德州变化
 * @param {} params
 */
export const warlogs = params => {
  return request.post('/admin/matchcfg/warlogs', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 比赛积分变化日志
 * @param {} params
 */
export const gameintegralchenglog = params => {
  return request.post('/admin/matchcfg/scorelogs', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}


/**
 * 王座发奖日志
 * @param {} params
 */
export const warprizeslogs = params => {
  return request.post('/admin/matchcfg/warPrizeLog', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

/**
 * 预扣变化日志
 * @param {} params
 */
export const withhold = params => {
  return request.post('/admin/matchcfg/withhold', params, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

