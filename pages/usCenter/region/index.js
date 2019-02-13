// pages/region/index.js
let city = [{
        id: '1',
        name: '江北'
    },
    {
        id: '2',
        name: '渝北'
    },
    {
        id: '3',
        name: '渝中'
    }
]
let area = [{
        id: '001',
        name: '江北一区'
    },
    {
        id: '002',
        name: '江北2区'
    },
    {
        id: '003',
        name: '江北3区'
    },
    {
        id: '004',
        name: '江北4区'
    },
    {
        id: '005',
        name: '江北5区'
    }
]
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: true,
        columns: [{
            values: city,
            className: '城区',
            defaultIndex:0
            },
            {
                values: area,
                className: '街道',
                defaultIndex: 0
            }
        ]
    },
    onClose() {
        this.setData({
            show: false
        });
    },
    onChangeShow(e) {
        console.log(e);
        this.setData({
            show: true
        });
    },
    onPicker(event) {
        console.log(event.detail);
        // const {
        //     picker,
        //     value,
        //     index
        // } = event.detail;
        // picker.setColumnValues(1, city[values[0]]);
    },
    bindChange(e) {
        console.log(e.detail.value)
    },
    onConfirm(e){
        this.setData({
            show: false
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})