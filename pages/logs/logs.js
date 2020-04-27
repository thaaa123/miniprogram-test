//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    loading: false,
    color: '#000',
    show: true,
    animated: false,
    title: 'e',
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    navbarHeight: '138rpx'
  },
  onLoad: function () {
    let navBar = this.selectComponent("#navigationBar")
    navBar.getNavBarHeight((height) => {
      this.setData({
        navbarHeight: height + 'px'
      })
    })
  },
  onReady: function () {

  }
})
