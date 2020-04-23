const authorize = require('../../utils/authorize.js')

// components/map/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    markers: [],
    show: false,
    buttons: []
  },

  ready: function () {
    // 定位
    authorize.getLocation((res) => {
      if (!res.err) {
        // 获取成功
        let marker = this._getMaker(res)
        this.setData({
          latitude: res.data.latitude,
          longitude: res.data.longitude,
          markers: [marker]
        })
      } else {
        // 获取失败
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindmarkertap(e) {
      this.setData({
        show: true
      })
    },
    _getMaker(res) {
      let marker = {
        id: 2,
        latitude: res.data.latitude,
        longitude: res.data.longitude,
        title: '1122221',
      }
      return marker
    }
  }
})
