const signature = require('./behaviors/signature')

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  behaviors:[ signature ],
  /**
   * 组件的方法列表
   */
  methods: {
    // 重写
    retDraw() {
      this.data.ctx.clearRect(0, 0, 700, 730)
      this.data.ctx.draw();
      //设置canvas背景
      this.setCanvasBg("#fff");
    },
    //完成
    subCanvas(){   
      this.canvasToTempFilePath(this.data.canvasName, 'jpg').then(res => {
        console.log('完成')
      })   
    },
    //预览
    previewCanvasImg(){
      this.canvasToTempFilePath(this.data.canvasName, 'jpg').then(res => {
        wx.previewImage({
          urls: [res.tempFilePath], //预览图片 数组
        })
      })
    },
  }
})
