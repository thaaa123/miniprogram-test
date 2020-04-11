// pages/weui-example/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialogShow: false,
    buttons: [],
  },
  openConfirm: function () {
    console.log('12323s');
    
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton: function (e) {
    this.setData({
        dialogShow: false,
    })
  },
})
