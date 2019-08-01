'use strict';
let app = getApp();
let DEV_CONFIG = {
    HTTPOPENAPIURL: 'http://192.168.203.173:10036'
  // HTTPOPENAPIURL: 'http://192.168.200.247:10001' // 请求OPENAPI的接口
};
let SIT_CONFIG = {
    HTTPOPENAPIURL: 'https://dev.api.songchejr.com' // 请求OPENAPI的接口
};
let PRE_CONFIG = {
    HTTPOPENAPIURL: 'https://pre.openapi.songchewang.com' // 请求OPENAPI的接口
};
let OPEN_CONFIG = {
    HTTPOPENAPIURL: 'https://openapi.songchewang.com' // 请求OPENAPI的接口
};
let OPEN_API = {
    HTTPOPENAPIURL: app.OPEN_API //切换域名
}

var CONFIG = OPEN_CONFIG; // 选取当前环境配置
module.exports = {
  PAGE_SIZE: 10,
  HTTPHEADER_APPID: '100006',
  HTTPHEADER_APPVERSION: '',
  HTTPHEADER_APPSIGN: 'SONGCHE',
  HTTPOPENAPIURL: CONFIG.HTTPOPENAPIURL // 请求OPENAPI的接口
};
