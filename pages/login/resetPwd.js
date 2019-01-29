// pages/login/resetPwd.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '1.验证手机号码'
      },
      {
        text: '2.设置新密码'
      }
    ],
    active:0,
    isShow: true,
    tiemNum: 60,
    mobile: '',
    code: '',
    oldPaswd: '',
    newPaswd: ''
  },
  next(){
      if (!(/^1[34578]\d{9}$/.test(this.data.mobile))){
          app.Tools.showToast('请输入正确的手机号');
          return false;
      }
      if (this.data.code=='') {
          app.Tools.showToast('请输入验证码');
          return false;
      }
    this.setData({
      active:1
    })
  },
  onSubmit(){
      if (!(/^(\w){6,20}$/.test(this.data.oldPaswd))){
          app.Tools.showToast('请设置6-20位密码');
          return false;
      }
      if (!(this.data.oldPaswd === this.data.newPaswd)) {
          app.Tools.showToast('密码不一致');
          return false;
      }
      let parms = {
          mobile: this.data.mobile,
          verfiCode: this.data.code,
          pwd: this.data.oldPaswd,
          confirmPsw: this.data.newPaswd
      }
      app.Formdata.post('/openapi/express/wechatapplet/express/user/resetPsw', parms,(res)=>{
          if(res.code=="0000"){
              wx.showToast({
                  title: '修改成功！',
                  icon: 'success',
                  duration: 2000,
                  success: (res)=>{
                      setTimeout(()=>{
                          wx.navigateTo({
                              url: '/pages/login/index',
                          })
                      },2000)
                  }
              })
          }
      })
  },
    //获取电话
    getMobile(e) {
        this.setData({
            [e.target.dataset.name]: e.detail
        })
    },
    onCaptcha(e) {
        if (this.data.mobile == "") {
            app.Tools.showToast('请输入手机号码');
            return false;
        }
        let parms = {
            'mobile': this.data.mobile,
            'busiType': "2",
            "userType": "1"
        }
        app.Formdata.post('/openapi/members/express/sms/smsCaptcha', parms, (res) => {
            if (res.code == '0000') {
                app.Date.VerifCode(this, 'isShow', this.data.tiemNum)
            }
        })
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

  },
})