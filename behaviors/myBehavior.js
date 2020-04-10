module.exports = Behavior({
    data: {
        name: 'chen'
    },
    attached: function () {
        console.log('my attached')
    },
    methods: {
        say: function () {
            console.log(`say${this.data.name}`)
        }
    }
})