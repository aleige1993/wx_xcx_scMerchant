// pages/usCenter/addUser/index.js
let app = getApp();

import Dialog from '../../../ui-plugins/vant/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: []
  },
    switchChange(e){
        let _this = this;
        let mobile = e.target.dataset.mobile;
        let index = e.target.dataset.index;
        let status = e.target.dataset.status;
        let memberNo = e.target.dataset.memberno;
        let nickName = e.target.dataset.nickname;
        let userName = e.target.dataset.username;
        app.Formdata.post('/openapi/express/wechatapplet/express/manager/editChild', {
            mobile,
            status: status == '1' ? '2' : status == '2'? '1': '2',
            memberNo,
            nickName,
            userName
        }, function (res) {
            if (res.code == '0000') {
                let userList = _this.data.userList;
                _this.setData({
                    ['userList[' + index + '].status']: status == '1' ? '2' : status == '2' ? '1' : '2'
                })
                console.log(_this.data.userList)
                app.Tools.showToast('设置成功');
            }
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
      app.Formdata.get('/openapi/express/wechatapplet/express/manager/queryChildServer', {}, function(res) {
      if (res.success && res.success === 'true') {
        _this.setData({
          userList: res.data
        })
      }
    })

  },
  removeUser(e) {
    console.log(e);
    let _this = this;
    Dialog.confirm({
      title: '提示',
      message: '您确定要删除吗?'
    }).then(() => {
      // on confirm
      app.Formdata.post('/openapi/express/wechatapplet/express/manager/del', {
        mobile: e.target.dataset.mobile
      }, function(res) {
        if (res.success && res.success === 'true') {
          let userList = _this.data.userList;
          userList.splice(e.target.dataset.index, 1)
          _this.setData({
            userList: userList
          })
          app.Tools.showToast('删除成功');
        }
      })
    }).catch(() => {
      // on cancel
    });
  },
    goEdit(e){
        console.log(e)
        let items = e.currentTarget.dataset.items;
        console.log(items)
        wx.navigateTo({
            url: '/pages/usCenter/addUser/addUser?userItem=' + JSON.stringify(items),
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