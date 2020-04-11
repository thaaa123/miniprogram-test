//app.js
const util = require('utils/util.js')

App({
  onLaunch: function () {
    util.isSafeArea().then(res =>  {
      this.globalData.isSafeArea = res
    })
  },
  onReady: function () {
    // wx.switchTab({
    //   url: '/pages/authorization/authorization'
    // })
  },
  globalData: {
    userInfo: null,
    isSafeArea: false
  }
})