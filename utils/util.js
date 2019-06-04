let app = getApp();

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const screenSize = () => {
    var that = this;
     wx.getSystemInfo({
         success: function (res) {
             setTimeout(function () {
                 app = getApp();
                 var ww = res.windowWidth;
                 var hh = res.windowHeight;
                 app.globalData.ww = ww;
                 app.globalData.hh = hh;
             })
         }
     })
}

 const bezier = (points, times) => {
    var bezier_points = [];
    var points_D = [];
    var points_E = [];
    const DIST_AB = Math.sqrt(Math.pow(points[1]['x'] - points[0]['x'], 2) + Math.pow(points[1]['y'] - points[0]['y'], 2));
    const DIST_BC = Math.sqrt(Math.pow(points[2]['x'] - points[1]['x'], 2) + Math.pow(points[2]['y'] - points[1]['y'], 2));
    const EACH_MOVE_AD = DIST_AB / times;
    const EACH_MOVE_BE = DIST_BC / times;
    const TAN_AB = (points[1]['y'] - points[0]['y']) / (points[1]['x'] - points[0]['x']);
    const TAN_BC = (points[2]['y'] - points[1]['y']) / (points[2]['x'] - points[1]['x']);
    const RADIUS_AB = Math.atan(TAN_AB);
    const RADIUS_BC = Math.atan(TAN_BC);
    for (var i = 1; i <= times; i++) {
        var dist_AD = EACH_MOVE_AD * i;
        var dist_BE = EACH_MOVE_BE * i;
        var point_D = {};
        point_D['x'] = dist_AD * Math.cos(RADIUS_AB) + points[0]['x'];
        point_D['y'] = dist_AD * Math.sin(RADIUS_AB) + points[0]['y'];
        points_D.push(point_D);
        var point_E = {};
        point_E['x'] = dist_BE * Math.cos(RADIUS_BC) + points[1]['x'];
        point_E['y'] = dist_BE * Math.sin(RADIUS_BC) + points[1]['y'];
        points_E.push(point_E);
        var tan_DE = (point_E['y'] - point_D['y']) / (point_E['x'] - point_D['x']);
        var radius_DE = Math.atan(tan_DE);
        var dist_DE = Math.sqrt(Math.pow((point_E['x'] - point_D['x']), 2) + Math.pow((point_E['y'] - point_D['y']), 2));
        var dist_DF = (dist_AD / DIST_AB) * dist_DE;
        var point_F = {};
        point_F['x'] = dist_DF * Math.cos(radius_DE) + point_D['x'];
        point_F['y'] = dist_DF * Math.sin(radius_DE) + point_D['y'];
        bezier_points.push(point_F);
    }
    return {
        'bezier_points': bezier_points
    };
}

const updateManager = () => {
    if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            if (res.hasUpdate) {
                updateManager.onUpdateReady(function () {
                    wx.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success: function (res) {
                            if (res.confirm) {
                                updateManager.applyUpdate()
                            } else if (res.cancel) {
                                wx.showModal({
                                    title: '已经有新版本',
                                    content: '不更新将会影响使用，删除当前小程序，重新搜索打开哟~',
                                    showCancel: false
                                })
                            }
                        }
                    })
                })
                updateManager.onUpdateFailed(function () {
                    wx.showModal({
                        title: '已经有新版本了哟~',
                        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                        showCancel: false
                    })
                })
            }
        })
    } else {
        wx.showModal({
            title: '提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
            showCancel: false
        })
    }
}


module.exports = {
  formatTime: formatTime,
    screenSize: screenSize,
    bezier: bezier,
    updateManager: updateManager
}
