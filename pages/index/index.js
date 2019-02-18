// pages/laundryOrder/index.js
let app = getApp();

import Dialog from '../../ui-plugins/vant/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: ['3', '4'],
    tabStatusActive: 0,
    searchForm: {
      limit: app.Config.PAGE_SIZE,
      page: 1,
      status: '3',
      orderNo: ""
    },
    orderList: []
  },

  onChange(e) {
    // console.log(e);
    this.setData({
      'searchForm.orderNo': e.detail
    })
  },

  onSearch() {
    this.setData({
      "searchForm.page": 1,
      'orderList': []
    })
    this.loadOrderList();
  },

  scanCode() {
    let _this = this;
    wx.scanCode({
      success(res) {
        // console.log(res);
        _this.setData({
          'searchForm.orderNo': res.result
        })
        _this.onSearch();
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  tabStatus(e) {
    // console.log(e);
    this.setData({
      'searchForm.page': 1,
      'searchForm.status': this.data.orderStatus[e.detail.index],
      'searchForm.orderNo': '',
      'orderList': []
    })
    this.loadOrderList();
  },

  editOrderStatus(e) {
    // console.log(e);
    let status = e.currentTarget.dataset.status;
    let msg = e.currentTarget.dataset.msg;
    let orderno = e.currentTarget.dataset.orderno;
    let _this = this;
    if (status === '9') {
      Dialog.confirm({
        title: '提示',
        message: '你确定要拒绝该单吗？'
      }).then(() => {
        // on confirm
        _this.submitOrderStatus(status, msg, orderno);
      }).catch(() => {
        // on cancel
      });
    } else {
      this.submitOrderStatus(status, msg, orderno);
    }
  },

  submitOrderStatus(status, msg, orderNo) {
    let _this = this;
    wx.showLoading({
      title: '',
      mask: true
    });
    app.Formdata.post('/openapi/express/wechatapplet/express/wash/order/editStatus', {
      status,
      orderNo
    }, function (res) {
      if (res.success && res.success === 'true') {
        // console.log(msg);
        _this.setData({
          "searchForm.page": 1,
          'orderList': []
        })
        _this.loadOrderList();
        wx.hideLoading();
        app.Tools.showToast(msg, 'success');
      }
    });
  },

  loadOrderList() {
    let _this = this;
    wx.showLoading({
      title: '加载中...',
    });
    app.Formdata.get('/openapi/express/wechatapplet/express/wash/order/query', this.data.searchForm, function (res) {
      // console.log(res);
      if (res.success && res.success === 'true') {
        if (!res.data || !res.data.length) {
          if (_this.data.searchForm.page > 1) {
            app.Tools.showToast('没有更多的数据了')
          }
        } else {
          _this.setData({
            orderList: _this.data.orderList.concat(res.data)
          })
        }
        setTimeout(function () {
          wx.hideLoading();
        }, 500);
        setTimeout(function () {
          wx.stopPullDownRefresh();
        }, 1000);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadOrderList();
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
    this.setData({
      "searchForm.page": 1,
      'orderList': []
    })
    this.loadOrderList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      "searchForm.page": ++this.data.searchForm.page
    })
    this.loadOrderList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})