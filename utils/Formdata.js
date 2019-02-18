
let FormdataConfig = require('../config/index.js');
let HTTPOPENAPIURL = FormdataConfig.HTTPOPENAPIURL;
let HTTPHEADER_APPID = FormdataConfig.HTTPHEADER_APPID;
let HTTPHEADER_APPVERSION = FormdataConfig.HTTPHEADER_APPVERSION;
let HTTPHEADER_APPSIGN = FormdataConfig.HTTPHEADER_APPSIGN;

let app = getApp();
if (!app) {
  setTimeout(function () {
    app = getApp();
  })
}

let post = (url, data, callback) => {
  wx.request({
    method: 'POST',
    url: HTTPOPENAPIURL + url,
    data: {
      'message': JSON.stringify(data)
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'appId': HTTPHEADER_APPID,
      'version': HTTPHEADER_APPVERSION,
      'sign': HTTPHEADER_APPSIGN,
      'token': app.UserLogin.get('userInfo').token || ''
    },
    success(res) {
      let data = res.data;
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      if (data.code === '0004') {
        // app.Tools.showToast('登录失效，请重新登录');
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/login/index',
          })
        }, 2000);
        return false;
      }
      if (typeof data.success === 'boolean') {
        data.success = data.success ? 'true' : 'false';
      }
      if (data.success && data.success === 'false') {
        app.Tools.showToast(data.message);
      }
      callback(data);
    },
    fail(e) {
      app.Tools.showToast('系统繁忙, 请稍后再试');
    }
  });
}

let get = (url, data, callback) => {
  wx.request({
    method: 'GET',
    url: HTTPOPENAPIURL + url,
    data: {
      'message': JSON.stringify(data)
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded',
      'appId': HTTPHEADER_APPID,
      'version': HTTPHEADER_APPVERSION,
      'sign': HTTPHEADER_APPSIGN,
      'token': app.UserLogin.get('userInfo').token || ''
    },
    success(res) {
      let data = res.data;
      if (typeof data === 'string') {
        data = JSON.parse(data);
      }
      if (data.code === '0004') {
        // app.Tools.showToast('登录失效，请重新登录');
        setTimeout(function () {
          wx.redirectTo({
            url: '/pages/login/index',
          })
        }, 2000);
        return false;
      }
      if (typeof data.success === 'boolean') {
        data.success = data.success ? 'true' : 'false';
      }
      if (data.success && data.success === 'false') {
        app.Tools.showToast(data.message);
      }
      callback(data);
    },
    fail(e) {
      app.Tools.showToast('系统繁忙, 请稍后再试');
    }
  });
}

let uploadFile = (files, callback) => {
  let uploadFilePath = [];
  let uploadSuccessCount = 0;
  wx.showLoading({
    title: '上传中, 请稍后',
  });
  files.tempFilePaths.map((item, index) => {
    wx.uploadFile({
      url: HTTPOPENAPIURL + '/openapi/common/file/upload',
      filePath: item,
      header: {
        // 'content-type': 'application/x-www-form-urlencoded',
        'appId': HTTPHEADER_APPID,
        'version': HTTPHEADER_APPVERSION,
        'sign': HTTPHEADER_APPSIGN
      },
      name: 'files',
      formData: {
        'message': '{}'
      },
      success: function (res) {
        // console.log(res);
        wx.hideLoading();
        // if (res.statusCode !== 200) {
        //     app.Tools.showToast('系统繁忙, 请稍后再试');
        //     return false;
        // }
        let data = res.data;
        if (typeof data === 'string') {
          data = JSON.parse(data);
        }
        if (data.success && data.success === 'false') {
          app.Tools.showToast(data.message);
          return false;
        }
        uploadFilePath[index] = JSON.parse(res.data).data[0];
        uploadSuccessCount++;
        // 回调
        if (files.tempFilePaths.length === uploadSuccessCount) {
          callback(uploadFilePath);
        }
      },
      fail: function () {
        wx.hideLoading();
        app.Tools.showToast('上传失败, 请重新上传');
      }
    })
  });
}

module.exports = {
  post: post,
  get: get,
  uploadFile: uploadFile
} 