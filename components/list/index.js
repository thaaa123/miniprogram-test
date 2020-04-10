// components/list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    innerText: {
      type: String,
      value: 'inner Text'
    },
    userList: {
      type: Array,
      value: () => {
        return []
      }
    }
  },

  observers: {
    'userList': function (list) {
      let processUserList = list.reduce((total, el, index) => {
        let item = {
          name: el,
          id: index
        }
        total.push(item)
        return total
      }, [])

      this.setData({
        processUserList: processUserList
      })
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    processUserList: []
  },

  attached: function () {
    this.initLoad()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initLoad: function () {
      console.log('lalal'); 
    },
    delUser: function (e) {
      let user = e.currentTarget.dataset.user
      this.triggerEvent('delUser', {user: user})
    }
  }
})