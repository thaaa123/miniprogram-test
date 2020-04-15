const getSetting = (scopeName) => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success (res) {
                resolve(res.authSetting[scopeName])
            }
        })
    })
}

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

const _getLocation = () => {
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
    getSetting('scope.userLocation').then(res => {
        if (res) {
            _getLocation().then(res => {
                result.data = res
                cb(result)
            })
        } else {
            if (res === undefined) {
                authorize(scopeName).then(res => {
                    _getLocation().then(res => {
                        result.data = res
                        cb(result)
                    })
                }).catch(errMsg => {
                    result.err = true
                    result.errMsg = errMsg
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
}
  