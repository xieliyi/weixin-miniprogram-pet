//scan.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  //单击扫描二维码处理函数
  click:function() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        if (res.result.length == 10){
          var regNum = new RegExp('[0-9]', 'g');
          var rsNum = regNum.exec(res.result);
          if (rsNum) {
            wx.navigateTo({
              url: '../main/main?sn=' + res.result
            })
            return
          }
        }
        console.log('未知设备：' + res.result )
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
    console.log('scan onLoad')
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    }

    //参数二维码传递过来的scene参数
    var scene = decodeURIComponent(options.scene)
    console.log('scan scene')
    console.log(scene)
    console.log('scan options')
    console.log(options)

    if (options.sn != null){
      if (options.sn.length == 10) {
        var regNum = new RegExp('[0-9]', 'g');
        var rsNum = regNum.exec(options.sn);
        if (rsNum) {
          wx.navigateTo({
            url: '../main/main?sn=' + options.sn
          })
          return
        }
      }
    }

  },

})
