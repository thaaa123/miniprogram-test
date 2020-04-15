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


const getWxLocation = () => {
    return new Promise ((resolve, reject) => {
        wx.getLocation({
            type: 'wgs84',
            success (res) {
                resolve(res)
            }
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
    getSetting(scopeName).then(res => {
        if (res) {
            getWxLocation().then(res => {
                result.data = res
                cb(result)
            })
        } else {
            if (res === undefined) {
                authorize(scopeName).then(res => {
                    getWxLocation().then(res => {
                        result.data = res
                        cb(result)
                    })
                }).catch(errMsg => {
                    result.err = true
                    result.errMsg = errMsg
                    cb(result)
                })
            } else {
                result.err = true
                result.errMsg = '拒绝授权'
                cb(result)
            }
        }
    })
}


module.exports = {
    getSetting: getSetting,
    authorize: authorize,
    getLocation: getLocation,
    authorize: authorize,
    openSetting: openSetting
}
  