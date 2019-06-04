// pages/usCenter/addUser/addUser.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
    nickName:'',
      mobile: '',
      userName: '',
      pwd: ''
    },
    type:1,
  },

  selectUserIcon() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // console.log(res);
        app.Formdata.uploadFile(res, (path) => {
          console.log(path);
          _this.setData({
            'userInfo.image': path[0]
          })
        })
      },
    })
  },

  submitForm(e) {
      let nickName = e.detail.value.nickName;
    let userName = e.detail.value.userName;
    let mobile = e.detail.value.mobile;
      let pwd = e.detail.value ? e.detail.value.pwd:'';
      let url = '';
      if (nickName === '') {
          app.Tools.showToast('员工姓名不能为空');
          return false;
      }
    if (userName === '') {
      app.Tools.showToast('用户名不能为空');
      return false;
    }
    if (mobile === '') {
      app.Tools.showToast('手机号不能为空');
      return false;
    }
    if (pwd === '' && this.data.type == 1) {
      app.Tools.showToast('密码不能为空');
      return false;
    }
    if(this.data.type == 1){
        url = '/openapi/express/wechatapplet/express/manager/addChildServer';
        this.setData({
            'userInfo.nickName': nickName,
            'userInfo.userName': userName,
            'userInfo.mobile': mobile,
            'userInfo.pwd': pwd
        })
    }else{
        url = '/openapi/express/wechatapplet/express/manager/editChild';
        this.setData({
            'userInfo.nickName': nickName,
            'userInfo.userName': userName,
            'userInfo.mobile': mobile,
        })
    }
   
    let _this = this;
      app.Formdata.post(url, {
      ..._this.data.userInfo
    }, function(res) {
      if (res.success && res.success === 'true') {
        wx.showToast({
            title: _this.data.type == 1?'添加成功':'修改成功'
        })
        setTimeout(function() {
            wx.navigateBack({
                delta: 2
          })
        }, 2000)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if (options.userItem){
          let userInfo = JSON.parse(options.userItem);
          console.log(userInfo)
          this.setData({
              type:2,
              'userInfo.nickName': userInfo.nickName,
              'userInfo.mobile': userInfo.mobile,
              'userInfo.userName': userInfo.userName,
              'userInfo.status': userInfo.status,
              'userInfo.memberNo': userInfo.memberNo
          })
          wx.setNavigationBarTitle({
              title: '修改员工'
          })
      }
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
      if(this.data.type == 1){
          wx.setNavigationBarTitle({
              title: '添加员工'
          })
      }else{
          wx.setNavigationBarTitle({
              title: '修改员工'
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