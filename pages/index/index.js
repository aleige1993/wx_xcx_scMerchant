//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    searchValue: ''
  },

  onSearch() {
    console.log(this.data.searchValue);
  },
  onSearchChange(e) {
    // console.log(e);
    this.setData({
      searchValue: e.detail
    })
  },

  scanCode() {
    let _this = this;
    wx.scanCode({
      success(res) {
        // console.log(res);
        _this.setData({
          searchValue: res.result
        })
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  // onGotUserInfo(e) {
  //   let wxUserInfo = e.detail.userInfo
  //   if (wxUserInfo) {
  //     app.UserLogin.set('wxUserInfo', wxUserInfo);
  //     wx.showToast({
  //       title: '授权成功',
  //       icon: 'success',
  //       duration: 2000
  //     })
  //     this.setData({
  //       isShow: false
  //     })
  //   }
  // },

  onReady: function () {
  },

  onLoad: function () {
    // let wxInfo = app.UserLogin.get('wxUserInfo');
    // if (wxInfo == '') {
    //   this.setData({
    //     isShow: true
    //   })
    // } else {
    //   this.setData({
    //     isShow: false
    //   })
    // }
  }
})
