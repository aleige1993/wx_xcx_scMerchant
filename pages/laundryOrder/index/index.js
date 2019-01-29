// pages/laundryOrder/index/index.js

var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    banner: {
        imgUrls: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548386640&di=466e70e7237799a21cd250500d5fc6e0&imgtype=jpg&er=1&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F8%2F543797a594fe7.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548386741&di=129d92bb474496f163ab73cd653a44de&imgtype=jpg&er=1&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ffaf42968817f1f52cc0f22bae3c3d6761d630c0b1a501-XvH11G_fw658',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548386777&di=b8065cba980c34f48d08fb50db614872&imgtype=jpg&er=1&src=http%3A%2F%2Fseopic.699pic.com%2Fphoto%2F10029%2F9682.jpg_wh1200.jpg'
        ],
      indicatorDots: true,
      autoplay: true,
      interval: 5000,
      duration: 1000
    },
    activeFirst: 0,
    activeSecond: 0,
    count: 1,
    needAni: false,
    hide_good_box: true,
  },

  onChangeFirst() {

  },
  onChangeSecond() {

  },
    touchOnGoods: function (e) {
        // 如果good_box正在运动
        if (!this.data.hide_good_box) return;
        this.finger = {};
        var topPoint = {};
        this.finger['x'] = e.touches["0"].clientX;
        this.finger['y'] = e.touches["0"].clientY;
        if (this.finger['y'] < this.busPos['y']) {
            topPoint['y'] = this.finger['y'] - 150;
        } else {
            topPoint['y'] = this.busPos['y'] - 150;
        }
        topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2 + this.finger['x'];
        this.linePos = app.utils.bezier([this.finger, topPoint, this.busPos], 30);
        this.startAnimation();
    },
    startAnimation: function () {
        var index = 0,
            that = this,
            bezier_points = that.linePos['bezier_points'];
        this.setData({
            hide_good_box: false,
            bus_x: that.finger['x'],
            bus_y: that.finger['y']
        })
        this.timer = setInterval(function () {
            index++;
            that.setData({
                bus_x: bezier_points[index]['x'],
                bus_y: bezier_points[index]['y']
            })
            if (index >= 28) {
                clearInterval(that.timer);
                that.setData({
                    hide_good_box: true,
                    count: that.data.count += 1
                })
            }
        }, 33);
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      this.busPos = {};
      this.busPos['x'] = app.globalData.ww * 1;
      this.busPos['y'] = app.globalData.hh * 0.8;
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

  }
})