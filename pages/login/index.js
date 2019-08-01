// pages/login/index.js

var md5 = require('../../utils/md5.js')
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitLoading: false
  },

  submitForm(e) {
    let account = e.detail.value.account;
    let password = e.detail.value.password;
    if (account === '') {
      app.Tools.showToast('请输入手机号码');
      return false;
    }
    if (password === '') {
      app.Tools.showToast('请输入密码');
      return false;
    }
    let _this = this;
    _this.setData({
      submitLoading: true
    })
    app.Formdata.post('/openapi/common/user/login', {
      "account": account,
      'password': md5.hexMD5(password),
      "code": "6"
    }, function (res) {
      _this.setData({
        submitLoading: false
      })
      if (res.success && res.success === 'true') {
        app.UserLogin.set('userInfo', res.data);
        app.UserLogin.set('loginCode', { 'account': account, 'password': password });
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
    });
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
      if (app.UserLogin.get('loginCode')) {
          this.setData({
              account: app.UserLogin.get('loginCode').account,
              password: app.UserLogin.get('loginCode').password
          })
      }
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