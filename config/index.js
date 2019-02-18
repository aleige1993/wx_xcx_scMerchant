'use strict';
let DEV_CONFIG = {
  HTTPOPENAPIURL: 'http://192.168.202.145:10016'
  // HTTPOPENAPIURL: 'http://192.168.200.247:10001' // 请求OPENAPI的接口
};
let SIT_CONFIG = {
  HTTPOPENAPIURL: 'https://sit.api.songchejr.com' // 请求OPENAPI的接口
};
let PROD_CONFIG = {
  HTTPOPENAPIURL: 'https://api.songchejr.com' // 请求OPENAPI的接口
};

let CONFIG = DEV_CONFIG; // 选取当前环境配置

module.exports = {
  PAGE_SIZE: 10,
  HTTPHEADER_APPID: '100006',
  HTTPHEADER_APPVERSION: '',
  HTTPHEADER_APPSIGN: 'SONGCHE',
  HTTPOPENAPIURL: CONFIG.HTTPOPENAPIURL // 请求OPENAPI的接口
};
