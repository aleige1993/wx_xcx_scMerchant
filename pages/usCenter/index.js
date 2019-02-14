// pages/usCenter/index.js
let app = getApp();
import Dialog from '../../ui-plugins/vant/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    stationList: []
  },

  loginout() {
    Dialog.confirm({
      title: '提示',
      message: '确定要退出当前账号？'
    }).then(() => {
      // on confirm
      app.UserLogin.remove('userInfo');
      wx.redirectTo({
        url: '/pages/login/index'
      })
    }).catch(() => {
      // on cancel
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.UserLogin.get('userInfo'));
    this.setData({
      username: app.UserLogin.get('userInfo').mobile
    })
    let _this = this;
    app.Formdata.get('/openapi/express/wechatapplet/express/station/queryForServer', {}, function(res) {
      if (res.success && res.success === 'true') {
        _this.setData({
          stationList: res.data
        })
      }
    });
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