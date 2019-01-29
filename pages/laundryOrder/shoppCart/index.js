// pages/laundryOrder/shoppCart/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        result:[],
        list:[
            {
                id:1,
                title:'西装',
                pirce:20,
                val:1
            },
             {
                id: 2,
                title: '裤子',
                pirce: 20,
                val: 1
            }
        ],
        isAll:[]
    },
    onCheckbox(e){
        this.setData({
            result: e.detail
        });
        console.log(this.data.result)
    },
    allCheckbox(e) {
        this.setData({
            isAll: e.detail
        });
    },
    onStepper(e){
        console.log('e', e.detail)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})