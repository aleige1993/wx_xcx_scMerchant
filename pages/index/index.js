// pages/laundryOrder/index.js
let app = getApp();

import Dialog from '../../ui-plugins/vant/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderStatus: ['3', '4','4'],
    tabStatusActive:0,
    searchForm: {
      limit: 10,
      page: 1,
      status: '3',
      orderNo: '',
      productCode:''
    },
    orderList: [],
      shelfList: null,
      itemlist: {
          itmedata: '',
          index: ''
      }
  },

  onChange(e) {
    this.setData({
      'searchForm.productCode': e.detail
    })
  },
    previewImage(e) {
        let current = e.currentTarget.dataset.current;
        let items = e.currentTarget.dataset.items;
        let arr = [];
        items.map((data, index) => {
            arr.push(data.imageUri)
        })
        wx.previewImage({
            current: current,
            urls: arr
        })
    },
    //订单选择的层架
    pickerChange(e) {
        let number = e.detail.value;
        let shelfArr = this.data.shelfList[number];
        let { itmedata, index } = this.data.itemlist;
        console.log(itmedata, index, shelfArr)
        let key = 'orderList[' + index + '].numberindex';
        let key2 = 'orderList[' + index + '].shelfArr';
        let key3 = 'orderList[' + index + '].serverShelf';
        this.setData({
            [key]: number,
            [key2]: shelfArr,
            [key3]: shelfArr.name
        })
        app.Formdata.post('/openapi/express/wechatapplet/wash/order/shelf/choose', { orderNo: itmedata.orderNo, id: shelfArr.id }, (res) => {
            if (res.code == '0000') {
                app.Tools.showToast('设置成功')
            }
        })
    },
    getItme(e) {
        let itmedata = e.target.dataset.items;
        let index = e.target.dataset.index;
        this.setData({
            'itemlist.itmedata': itmedata,
            'itemlist.index': index
        })
    },
  onSearch() {
      let _this = this;
      if (! _this.data.searchForm.productCode){
          app.Tools.showToast('请输入编码');
          return false
      }
      _this.setData({
      "searchForm.page": 1,
      'orderList': []
    },()=>{
            _this.loadOrderList();
    })
    //
  },
prodEditCode(){
    let _this = this;
    app.Formdata.get('/openapi/express/wechatapplet/express/wash/order/editCode', { productCode: _this.data.searchForm.productCode },(res)=>{
        if(res.code == '0001'){
           wx.showToast({
               title: res.message,
               icon:'none'
           })
        }
       
    })
},
  scanCode() {
    let _this = this;
      wx.scanCode({
      success(res) {
          if (res.result.length>=10){
              _this.setData({
                  'searchForm.productCode': res.result
              })
              _this.onSearch();
        }else{
            wx.showToast({
                title: '请重新扫码',
                icon:'none'
            })
        }
      },
      fail(err) {
          wx.showToast({
              title: '扫码失败,请重新扫码',
              icon: 'none'
          })
      }
    })
  },

  tabStatus(e) {
      if (e.detail.index == 0){
          this.setData({
              'tabStatusActive': e.detail.index,
              'searchForm.page': 1,
              'searchForm.status': this.data.orderStatus[e.detail.index],
              'searchForm.orderNo': '',
              'searchForm.productCode': '',
              'searchForm.isAllClean': '',
              'orderList': []
          })
      } else if (e.detail.index == 1){
          this.setData({
              'tabStatusActive': e.detail.index,
              'searchForm.page': 1,
              'searchForm.status': this.data.orderStatus[e.detail.index],
              'searchForm.orderNo': '',
              'searchForm.productCode': '',
              'searchForm.isAllClean':0,
              'orderList': []
          })
      } else if (e.detail.index == 2){
          this.setData({
              'tabStatusActive': e.detail.index,
              'searchForm.page': 1,
              'searchForm.status': this.data.orderStatus[e.detail.index],
              'searchForm.orderNo': '',
              'searchForm.productCode': '',
              'searchForm.isAllClean': 1,
              'orderList': []
          })
    }
    this.loadOrderList();
  },

  editOrderStatus(e) {
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
      if (res.success && res.success === 'true') {
        if (!res.data || !res.data.length) {
          if (_this.data.searchForm.page > 1) {
                  app.Tools.showToast('没有更多的数据了')
          }
        } else {
          _this.setData({
            // orderList: _this.data.orderList.concat(res.data)
              orderList: res.data
          },()=>{
              if (_this.data.tabStatusActive == 1 && _this.data.searchForm.productCode != '') {
                  wx.showModal({
                      title: '温馨提示',
                      content: '确认衣服已清洗?',
                      success(res) {
                          if (res.confirm) {
                              _this.prodEditCode();
                              setTimeout(() => {
                                  _this.setData({
                                      'searchForm.productCode': ''
                                  })
                                  _this.loadOrderList();
                              }, 1500)
                          } else if (res.cancel) {
                          }
                      }
                  })
              }
          })
        }
        setTimeout(function () {
          wx.hideLoading();
        }, 500);
        // setTimeout(function () {
        //   wx.stopPullDownRefresh();
        // }, 1000);
      }else if(res.code == '0001'){
            _this.newDoging();
      }
    })
  },
 newDoging(){
     app.Formdata.get('/openapi/express/wechatapplet/express/wash/order/query', this.data.searchForm, (res)=>{
         if(!res.data){
             this.setData({
                 orderList:[]
             }, () => {
                 app.Tools.showToast(res.message)
             })
         }
     })
 },



    //搁架列表
    shelfList() {
        app.Formdata.get('/openapi/express/wechatapplet/wash/order/shelf/query', { limit: 10000, page: 1 }, (res) => {
            if (res.code == '0000') {
                this.setData({
                    shelfList: res.data
                })
            }
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if (app.globalData.employId && app.globalData.employId != '') {
          this.loadOrderList();
          this.shelfList();
      } else {
          app.employIdCallback = employId => {
              if (employId != '') {
                  this.loadOrderList();
                  this.shelfList();
              }
          }
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
      this.shelfList();
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