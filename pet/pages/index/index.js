//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sn:null,
  },

  onLoad: function (options) {
    console.log('index onLoad')

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    //参数二维码传递过来的scene参数
    var scene = decodeURIComponent(options.scene)
    console.log('index scene')
    console.log(scene)
    console.log('index options')
    console.log(options)
    if (options.sn != null) {
      if (options.sn.length == 10) {
        var regNum = new RegExp('[0-9]', 'g');
        var rsNum = regNum.exec(options.sn);
        if (rsNum) {
          this.setData({
            sn: options.sn,
          })
        }
      }
    }

    console.log('hasUserInfo:' + this.data.hasUserInfo)
    console.log('canIUse:' + this.data.canIUse)
    var userinfo = wx.getStorageSync('hasUserInfo')
    userinfo = false

    if (app.globalData.userInfo || this.data.hasUserInfo || userinfo) {
      wx.redirectTo({
        url: '../scan/scan?sn=' + this.data.sn
      })
    }

  },

  onShow: function () {
    // Do something when show.
    console.log("index on show!")

    console.log('hasUserInfo:' + this.data.hasUserInfo)
    console.log('canIUse:' + this.data.canIUse)
  },

  getUserInfo: function(e) {
    console.log('index getUserInfo:')
    console.log(e)
    if (e.detail.userInfo != null) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.setStorageSync('hasUserInfo', true)
      wx.redirectTo({
        url: '../scan/scan?sn=' + this.data.sn
      })
    }
    else {
      this.setData({
        hasUserInfo: false
      })
    }
  }

})
