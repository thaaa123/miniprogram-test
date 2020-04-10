//index.js
//获取应用实例
const app = getApp()
// behaviors的引用
const safeArea = require('../../behaviors/safeArea')

// page使用Component构建函数
Component({
  // behaviors的使用
  behaviors:[ safeArea ],
  data: {
    motto: 'Hello World',
    userList: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    view: 'NIMA',
    userInfo: {},
    hasUserInfo: false,
    val: 'a'
  },
  methods: {
    onLoad: function () {},
    tapName: function (e) {
      // 获取元素data-属性数据
      let data = e.currentTarget.dataset
      this.setData({
        motto: data.item
      })
    },
    onDelUser: function (e) {
      let delUser = e.detail.user
      let newUserList = this.data.userList.filter(user => user !== delUser)
      this.setData({
        userList: newUserList
      })
    }
  },
})
