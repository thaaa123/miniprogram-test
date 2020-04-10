//app.js
const util = require('utils/util.js')

App({
  onLaunch: function () {
    console.log()
    util.isSafeArea().then(res =>  {
      this.globalData.isSafeArea = res
    })
  },
  globalData: {
    userInfo: null,
    isSafeArea: false
  }
})