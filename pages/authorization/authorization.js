// pages/authorization/authorization.js
const authorize = require('../../utils/authorize.js')

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

  },
  login() {
    wx.login({
      success: function (res) {
        console.log(res)
      }
    })
  },
  bindgetuserinfo: function (e) {
    authorize.getLocation((res) => {
      if (res.err) {
        authorize.openSetting().then(res => {
          console.log(res)
        })
      }
    })
  }
})
