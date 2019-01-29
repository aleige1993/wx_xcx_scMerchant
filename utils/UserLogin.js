
let app = getApp();
if (!app) {
    setTimeout(function () {
        app = getApp();
    })
}

const set = (keys,data) => {
    wx.setStorage({
        key: keys,
        data: data,
    })
    // app.globalData.userInfo = data;
}

const get = (keys) => {
    return wx.getStorageSync(keys);
    // return app.globalData.userInfo;
}

const remove = (keys) => {
    return  wx.removeStorageSync(keys)
}

module.exports = {
    set: set,
    get: get,
    remove: remove
} 