//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sn:null,
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //单击扫描二维码处理函数
  click: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        if (res.result.length == 10) {
          var regNum = new RegExp('[0-9]', 'g');
          var rsNum = regNum.exec(res.result);
          if (rsNum) {
            wx.navigateTo({
              url: '../main/main?sn=' + res.result
            })
            return
          }
        }
        console.log('未知设备：' + res.result)
        wx.showModal({
          title: '未知设备',
          content: res.result,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      },

      fail: (res) => {
        console.log(res)
      },

      complete: (res) => {
        console.log("扫描二维码完成！")
      }

    })
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
        if (this.data.sn) {
          wx.navigateTo({
            url: '../main/main?sn=' + this.data.sn
          })
        }
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

    console.log('index hasUserInfo:' + this.data.hasUserInfo)
    console.log('index canIUse:' + this.data.canIUse)

    if (this.data.sn && this.data.hasUserInfo) {
      wx.navigateTo({
        url: '../main/main?sn=' + this.data.sn
      })
    }

  },

  onShow: function () {
    // Do something when show.
    console.log("index on show!")

    console.log('index onShow hasUserInfo:' + this.data.hasUserInfo)
    console.log('index onShow canIUse:' + this.data.canIUse)
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
      if (this.data.sn) {
        wx.navigateTo({
          url: '../main/main?sn=' + this.data.sn
        })
      }
    }
    else {
      this.setData({
        hasUserInfo: false
      })
    }
  }

})
