// 是否授权
const getSetting = (scopeName) => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success (res) {
                resolve(res.authSetting[scopeName])
            }
        })
    })
}

// 主动发起授权
const authorize = (scopeName) => {
    return new Promise((resolve, reject) => {
        wx.authorize({
            scope: scopeName,
            success (res) {
                resolve(res)
            },
            fail (res) {
                reject(res.errMsg)
            }
        })
    })
}

// 重新授权
const openSetting = () => {
    return new Promise ((resolve, reject) => {
        wx.openSetting({
            success (res) {
                resolve(res.authSetting)
            }
        })
    })
}

// 微信获取地理位置
const getWxLocation = () => {
    return new Promise ((resolve, reject) => {
        wx.getLocation({
            type: 'gcj02',
            success (res) {
                resolve(res)
            }
        })
    })
}

// 微信订阅消息
const wxRequestSubscribeMessage = (tmplIds) => {
    return new Promise((resolve, reject) => {
        wx.requestSubscribeMessage({
            tmplIds: tmplIds,
            success (res) {
                resolve(res)
            },
            fail (err) {
                reject(err)
            }
        })
    })
}

// 微信登录
const wxLogin = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success (res) {
              if (res.code) {
                resolve(res)
              } else {
                reject(res)
              }
            }
        })
    })
}

// 检查微信登录态是否过期
const wxCheckSession = () => {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success () {
                resolve()
            },
            fail () {
                reject()
            }
        })
    })
}

// 登录
const login = (cb) => {
    wxLogin().then(res => {
        if (res.code) {
            // http requst
            cb(res)
        }
    })
}


// 获取加密手机号
const getPhoneNumber = (detail, cb) => {
    // 校验Session
    wxCheckSession().then(() => {
        // http requst
    }).catch(() => {
        // 过期重新登陆
        login(res => {
            console.log(res)
            // http requst
        })
    })
}

// 获取地理位置
const getLocation = (cb) => {
    let scopeName = 'scope.userLocation'
    let result = {
        err: false,
        data: null,
        errMsg: ''
    }
    // 是否已授权
    getSetting(scopeName).then(res => {
        // 已授权
        if (res) {
            // 获取地理位置
            getWxLocation().then(res => {
                result.data = res
                cb(result)
            })
        } else {    
            // 未授权
            if (res === undefined) {
                // 提前向用户发起授权请求
                authorize(scopeName).then(res => {
                    // 获取地理位置
                    getWxLocation().then(res => {
                        result.data = res
                        cb(result)
                    })
                }).catch(errMsg => {
                    // 拒绝授权
                    result.err = true
                    result.errMsg = errMsg
                    cb(result)
                })
            } else {
                // 以拒绝授权
                result.err = true
                result.errMsg = '拒绝授权'
                cb(result)
            }
        }
    })
}

// 订阅消息
const requestSubscribeMessage = (tmplIds, cb) => {
    let result = {
        err: false,
        data: null,
        errMsg: ''
    }
    wxRequestSubscribeMessage(tmplIds).then(res => {
        result.data = res
        cb(result)
    }).catch(err => {
        result.err = false
        result.errCode = err.errCode
        result.errMsg = err.errMsg
        cb(result)
    })
}

module.exports = {
    getSetting: getSetting,
    authorize: authorize,
    getLocation: getLocation,
    authorize: authorize,
    openSetting: openSetting,
    login: login,
    getPhoneNumber: getPhoneNumber,
    requestSubscribeMessage: requestSubscribeMessage
}
  