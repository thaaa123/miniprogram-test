// pages/authorization/authorization.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initLoad()
    this.login()
  },
  initLoad() {
    wx.getSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log('userinfo', res)
            }
          })
        }
      }
    })
  },
  login() {
    wx.login({
      success: function (res) {
        console.log(res)
      }
    })
  },
  bindgetuserinfo: function (e) {
    console.log(e.detail.userInfo)
  }
})
