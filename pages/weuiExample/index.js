// pages/weui-example/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: false,
    buttons: [],
    error: '',
    formData: {
      radio: '0',
      mobile: ''
    },
    rules: [],
    formRules: [
      {
        name: 'radio',
        rules: {required: true, message: '单选列表是必选项'},
      },
      {
        name: 'mobile',
        rules: [{required: true, message: 'mobile必填'}, {mobile: true, message: 'mobile格式不对'}],
      },
      {
        name: 'vcode',
        rules: {required: true, message: '验证码必填'},
      }
    ],
    mobileRles: [
      {
        name: 'mobile',
        rules: [{required: true, message: 'mobile必填'}, {mobile: true, message: 'mobile格式不对'}],
      }
    ],
    radioItems: [
      {name: 'cell standard', value: '0', checked: true},
      {name: 'cell standard', value: '1'}
    ],
    wait: 60,
    toView: '',
    scrollTop: 0,
    formScrollTopList: [
      {
        name: 'radio',
        scrollTop: 0
      },
      {
        name: 'mobile',
        scrollTop: 0
      },
      {
        name: 'vcode',
        scrollTop: 0
      },
    ]
  },
  onReady: function () {
    let query = wx.createSelectorQuery()
    // top必须要一开始就拿到
    this.data.formScrollTopList.forEach((item) => {
      query.select('#' + item.name).boundingClientRect((rect) => {
        item.scrollTop = rect.top + -250
      }).exec()
    })
    console.log(this.data.formScrollTopList);
    
  },
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton: function (e) {
    this.setData({
        dialogShow: false,
    })
  },
  // radio 双向绑定
  radioChange: function (e) {
    let selectedValue = e.detail.value
    let radioItems = this.data.radioItems
    radioItems.forEach(item => {
      item.checked = item.value === selectedValue
    })
    this.setData({
      radioItems: radioItems,
      'formData.radio': selectedValue
    })
  },
  // input 双向绑定
  formInputChange(e) {
    const {field} = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  // 发送验证码点击事件
  handelsendVcodeTop: function (e) {
    if (this.data.wait !== 60) {
      return
    }
    // 发送验证码只需要校验手机号
    this.setData({
      rules: this.data.mobileRles
    })
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this._showError(errors[firstError[0]].message)
        }
      } else {
        this._countDown()
      }
    })
  },
  // 表单提交
  submitForm: function (e) {
    this.setData({
      rules: this.data.formRules
    })
    this.selectComponent('#form').validate((valid, errors) => {
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this._showError(errors[firstError[0]].message)
          this._setScrollTop(errors[firstError[0]].name)
        }
      } else {
        this.checkVcode(this.data.formData.vcode)
      }
    })
  },
  // 校验验证码
  checkVcode(vcode) {
    if (vcode !== '1234') {
      this.setData({
        error: '验证码错误'
      })
      this._setScrollTop('vcode')
    }
  },
  // 倒计时
  _countDown: function() {
    if (this.data.wait === 0) {
      this.setData({
        wait: 60
      })
    } else {
      this.setData({
        wait: this.data.wait - 1
      })
      let num = setTimeout(() => {
        this._countDown()
        clearTimeout(num)
      }, 1000)
    }
  },
  // 展示错误信息
  _showError: function(message) {
    this.setData({
      error: message
    })
  },
  // 校验err区域滚动
  _setScrollTop(name) {
    let formScrollTop = this.data.formScrollTopList.find(item => item.name === name)
    this.setData({
      scrollTop: formScrollTop.scrollTop
    })
  }
})
