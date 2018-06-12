//app.js
App({

  globalData: {
    userInfo: null,
    authorized: false,
  },

  onLaunch: function () {
    console.log("app on launch!")

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs')
    logs=Date.now()
    console.log(logs)
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          console.log('登录成功：' + res.code)
        }
        else {
          console.log('登录失败：' + res.errMsg)
        }
      }
    })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('authSetting.userInfo:' + res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.globalData.authorized = true
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                console.log("app getUserInfo userInfoReadyCallback!")
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  onShow:function(){
    // Do something when show.
    console.log("app on show!")
  },

  onHide:function(){
    // Do something when hide.
    console.log("app on hide!")
  },

  onError:function(msg){
    console.log("app on error!")
    console.log(msg)
  },

  onPageNotFound:function(){
    console.log("app on page not found!")
  },

})