const app = getApp()

module.exports = Behavior({
    data: {
        isSafeArea: false
    },
    attached: function () {
        this.setData({
            isSafeArea: app.globalData.isSafeArea
        })
    },
    methods: {
    }
})