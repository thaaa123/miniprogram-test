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
    authorize.getLocation((res) => {
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
    console.log(e);
  },
  formSubmit: (e) => {
    authorize.requestSubscribeMessage(['8b72kPUeDoyuVh07HfKOSpInMpdw9v0vntUPzmjoxko'], (res) => {
      console.log(res)
    })
  },
  getPhoneNumber: (res) => {
    console.log(res)
    authorize.getPhoneNumber(res.detail, () => {

    })
  }
})
