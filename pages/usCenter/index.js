// pages/usCenter/index.js
let app = getApp();
import Dialog from '../../ui-plugins/vant/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo: '',
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
    //点击上传头像
    selectUserIcon() {
        let _this = this;
        wx.chooseImage({
            count: 1,
            success: function (res) {
                app.Formdata.uploadFile(res, (path) => {
                    console.log(path);
                    if (path[0]) {
                        _this.setData({
                            'userInfo.avatarUri': path[0]
                        })
                        app.Formdata.post('/openapi/express/wechatapplet/express/manager/update', { avatarUri: path[0] }, (res) => {
                            let title = '';
                            if (res.code == '0000') {
                                title = '上传成功';
                            } else {
                                title = '上传失败';
                            }
                            wx.showToast({
                                title: title,
                                icon: 'none'
                            })
                        })

                    }

                })
            },
        })
    },
    //获取用户
    getUser(){
        let _this = this;
        app.Formdata.get('/openapi/express/wechatapplet/express/manager/detail', {}, function (res) {
            if (res.success && res.success === 'true') {
                _this.setData({
                    userInfo: res.data
                })
            }
        });
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        userInfo: app.UserLogin.get('userInfo')
    })
    let _this = this;
    app.Formdata.get('/openapi/express/wechatapplet/express/station/queryForServer', {}, function(res) {
      if (res.success && res.success === 'true') {
        _this.setData({
          stationList: res.data
        })
      }
    });
      this.getUser();
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