//app.js
// const  Config = require('/config/index.js');
App({
    onLaunch:function () {
         var Promis = require('/utils/wxPromisify.js');
        Promis.wxPromisify(wx.request)({
            method: 'GET',
            url: 'https://openapi.songchewang.com/openapi/common/versions/version/host',
            data: {
                'message': JSON.stringify({ "versionNo": 101 })
            },
            header: {
                'appId': '100006',
                'sign': 'sign'
            },
        }).then((res)=>{
            let data = res.data;
                if (data.code == '0000') {
                    console.log(data.data[0]);
                    this.OPEN_API = data.data[0];
                    this.Config = require('/config/index.js');
                    this.Formdata = require('/utils/Formdata.js');
                    this.globalData.employId = 1;
                    if (this.employIdCallback) {
                        this.employIdCallback(1);
                    }
                } else {
                    wx.showToast({
                        title: data.message,
                        icon: 'none'
                    })
                }
        })
        this.utils = require('/utils/util.js');
        this.UserLogin = require('/utils/UserLogin.js');
        this.Tools = require('/utils/Tools.js');
        this.Date = require('/utils/Date.js');
        this.utils.updateManager();
        // wx.request({
        //     method: 'GET',
        //     url: 'https://openapi.songchewang.com/openapi/common/versions/version/host',
        //     data: {
        //         'message': JSON.stringify({ "versionNo": 100 })
        //     },
        //     header: {
        //         'appId': '100006',
        //         'sign': 'sign'
        //     },
        //     success(res) {
        //         let data = res.data;
        //         if (data.code == '0000') {
        //             console.log('OPEN_API', data.data[0])
        //             this.OPEN_API = data.data[0];
        //             this.Config = require('/config/index.js');
        //             this.Formdata = require('/utils/Formdata.js');
        //         } else {
        //             wx.showToast({
        //                 title: data.message,
        //                 icon: 'none'
        //             })
        //         }
        //     }
        // })
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
        userInfo: null,
        employId:null
    }
})