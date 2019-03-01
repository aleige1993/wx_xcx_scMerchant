'use strict';
let DEV_CONFIG = {
  HTTPOPENAPIURL: 'http://192.168.202.145:10036'
  // HTTPOPENAPIURL: 'http://192.168.200.247:10001' // 请求OPENAPI的接口
};
let SIT_CONFIG = {
    //HTTPOPENAPIURL: 'https://dev.api.songchejr.com' // 请求OPENAPI的接口
    HTTPOPENAPIURL: 'https://pre.openapi.songchewang.com' // 请求OPENAPI的接口
};
let PROD_CONFIG = {
  HTTPOPENAPIURL: 'https://api.songchejr.com' // 请求OPENAPI的接口
};

let CONFIG = SIT_CONFIG; // 选取当前环境配置

module.exports = {
  PAGE_SIZE: 10,
  HTTPHEADER_APPID: '100006',
  HTTPHEADER_APPVERSION: '',
  HTTPHEADER_APPSIGN: 'SONGCHE',
  HTTPOPENAPIURL: CONFIG.HTTPOPENAPIURL // 请求OPENAPI的接口
};
