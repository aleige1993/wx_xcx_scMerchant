//app.js
import WxValidate from '/utils/WxValidate.js';

App({
    onLaunch: function () {
        this.utils = require('/utils/util.js');
        this.Formdata = require('/utils/Formdata.js');
        this.UserLogin = require('/utils/UserLogin.js');
        this.Tools = require('/utils/Tools.js');
        this.Date = require('/utils/Date.js');
        this.WxValidate = WxValidate;

        // 展示本地存储能力
        // var logs = wx.getStorageSync('logs') || []
        // logs.unshift(Date.now())
        // wx.setStorageSync('logs', logs)
        // this.utils.screenSize();
        // 判断是否登录or是否点击获取权限
        // let wxInfo = this.UserLogin.get('wxUserInfo');
        // if (wxInfo == "") {
        //     wx.switchTab({
        //         url: '/pages/index/index',
        //     })
        // }
    },
    globalData: {
        userInfo: null
    }
})