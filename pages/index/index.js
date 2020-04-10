//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userList: ['a', 'b', 'c', 'd'],
    view: 'NIMA',
    userInfo: {},
    hasUserInfo: false,
    val: 'a'
  },
  onLoad: function () {
  },
  tapName: function (e) {
    console.log(this.data.val)
    let data = e.currentTarget.dataset
    this.setData({
      motto: data.item
    })
  }
})
