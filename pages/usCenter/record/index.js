// pages/usCenter/record/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page:1,
        limit:15,
        status:1,
        cordList:[],
        scrollTop:0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSettle();
    },
    // upper(e) {
    //     let _this = this;
    //     _this.setData({
    //        page:1,
    //        cordList:[]
    //    },()=>{
    //        _this.getSettle();
    //    })
    // },
    lower(e) {
        let _this = this;
        console.log(_this.data.page);
        _this.setData({
            page: ++_this.data.page
        }, () => {
            _this.getSettle();
        })
    },
    onChange(e){
        let _this = this;
        let arr = [1,4]
        let index = e.detail.index;
        _this.setData({
            status: arr[index],
            page:1,
            scrollTop:0,
            cordList:[]
        },()=>{
            _this.getSettle();
        })
    },
    getSettle(){
        let _this = this;
        let parman = {
            page: this.data.page,
            limit: this.data.limit,
            status: this.data.status
        }
        app.Formdata.post('/openapi/express/wechatapplet/express/settle/page',parman,(res)=>{
            if(res.code == '0000'){
                if(res.data.length>0){
                    _this.setData({
                        cordList: this.data.cordList.concat(res.data)
                    })
                }else{
                    wx.showToast({
                        title: '没有更多的数据',
                        icon: 'none'
                    })
                } 
            } 
        })
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