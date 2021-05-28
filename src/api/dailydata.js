import request from '@/utils/request'

/*今日实时数据*/
export function datatdsummary(params) {
  return request.post('/admin/datatdsummary/list', params)
}

export function add(params) {
  return request.post('/admin/game/add', params)
}

export function edit(params) {
  return request.post('/admin/game/edit', params)
}

export function del(params) {
  return request.post('/admin/game/delete', params)
}

export function upload(params) {
  return request.post('/admin/game/upload', params)
}

/*每日游戏局数统计*/
export function dailyfights(params) {
  return request.post('/admin/dailyfights/list', params)
}

/*每日小游戏统计*/
export function dailyminigame(params) {
  return request.post('/admin/dailyminigame/list', params)
}

/**
 * 时时乐每日
 * @param {*} params
 */
export function dailyssl(params) {
  return request.post('/admin/dailyssl/list', params)
}

/**
 * 百家乐每日
 * @param {*} params
 */
export function dailybjl(params) {
  return request.post('/admin/dailybjl/list', params)
}

/**
 * 百人每日
 * @param {*} params
 */
export function dailybairen(params) {
  return request.post('/admin/dailybairen/list', params)
}

/**
 * 每日充值数据
 * @param {*} params
 */
export function dailyrecharge(params) {
  return request.post('/admin/dailyrecharge/list', params)
}

/**
 * 每日金币统计
 * @param {*} params
 */
export function dailycoinchange(params) {
  return request.post('/admin/dailycoinchange/list', params)
}

/**
 * 每日钻石统计
 * @param {*} params
 */
export function dailypointchange(params) {
  return request.post('/admin/dailypointchange/list', params)
}

/**
 * 每日奖券统计
 * @param {*} params
 */
export function dailyticketchange(params) {
  return request.post('/admin/dailyticketchange/list', params)
}

/**
 * 每日用户数据
 * @param {*} params
 */
export function dailyuser(params) {
  return request.post('/admin/dailyuser/list', params)
  // return request.post('http://jsonplaceholder.typicode.com/users', params)
}

/**
 * 每日留存数据
 * @param {*} params
 */
export function dailystay(params) {
  return request.post('/admin/dailystay/list', params)
}

/**
 * 渠道数据汇总
 * @param {*} params
 */
export function datachannelinfo(params) {
  return request.post('/admin/datachannelinfo/list', params)
}

/**
 * 月充值数据
 * @param {*} params
 */
export function monthrecharge(params) {
  return request.post('/admin/monthrecharge/list', params)
}

/**
 * 游戏版本数据
 * @param {*} params
 */
export function gameversion(params) {
  return request.post('/admin/gameversion/list', params)
}

/**
 * 风驰电掣每日
 * @param {*} params
 */
export function dailyfcdc(params) {
  return request.post('/admin/dailyfcdc/list', params)
}

/**
 * 百人拼十每日
 * @param {*} params
 */
export function dailydnwar(params) {
  return request.post('/admin/dailydnwar/list', params)
}

/**
 * 陪玩每日金币
 * @param {*} params
 */
export function pwcoinlog(params) {
  return request.post('/admin/pwcoinlog/list', params)
}

/**
 * 每日净盈利排行
 * @param {*} params
 */
export function dailynetprofit(params) {
  return request.post('/admin/dailynetprofit/list', params)
}

/**
 * 九线拉王
 * @param {*} params
 */
export function dailyjxlw(params) {
  return request.post('/admin/dailyjxlw/list', params)
}

/**
 * 时时彩每日
 * @param {*} params
 */
export function dailyssc(params) {
  return request.post('/admin/dailyssc/list', params)
}

/**
 * 红黑大战每日
 * @param {*} params
 */
export function dailyred(params) {
  return request.post('/admin/dailyred/list', params)
}

/**
 * 三张牌机器人
 * @param {*} params
 */
export function szrobot(params) {
  return request.post('/admin/szrobot/list', params)
}

/**
 * 红黑大战每日
 * @param {*} params
 */
export function dailychgreport(params) {
  return request.post('/admin/dailychgreport/list', params)
}
