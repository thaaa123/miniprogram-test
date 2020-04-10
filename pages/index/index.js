//index.js
//获取应用实例
const app = getApp()
const myBehavior = require('../../behaviors/myBehavior')

Component({
  behaviors:[ myBehavior ],
  data: {
    motto: 'Hello World',
    userList: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    view: 'NIMA',
    userInfo: {},
    hasUserInfo: false,
    val: 'a'
  },
  methods: {
    onLoad: function () {
      console.log('page load');
      this.say()
    },
    tapName: function (e) {
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
