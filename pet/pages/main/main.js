//main.js
//获取应用实例
const app = getApp()

Page({
  data: {
    snNum: "",
    userData: {
      name: "",
      mobile: "",
    },
    registered: false,
    unregistered: true,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  //事件处理函数 注册
  regclick: function () {
    wx.navigateTo({
      url: '../register/register?sn=' + this.data.snNum
    })
  },

  //事件处理函数 删除
  delclick: function () {
    wx.removeStorageSync(this.data.snNum)
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 1000
    })
    this.setData({
      userData: null,
      registered: false,
      unregistered: true,
    })
  },

  //事件处理函数 修改
  modclick: function () {
    wx.navigateTo({
      url: '../modify/modify?sn=' + this.data.snNum
    })
  },

  onLoad: function (option) {
    console.log('main on load')
    console.log(option)

    var userd = wx.getStorageSync(option.sn) 
    if (userd == null || userd.name == null || userd.name.length == 0) {
      console.log('userd is null')
      this.setData({
        registered: false,
        unregistered: true,
      })
    }
    else {
      console.log(userd)
      this.setData({
        registered: true,
        unregistered: false,
      })
    }
  
    this.setData({
      snNum: option.sn,
      userData: userd
    })

    if (app.globalData.userInfo) {
      this.setData({
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            hasUserInfo: true
          })
        }
      })
    }

  },

  onShow: function () {
    // Do something when show.
    console.log("main on show!")

    var userd = wx.getStorageSync(this.data.snNum)
    console.log(userd)

    if (userd == null || userd.name == null || userd.name.length == 0) {
      console.log('userd is null')
      this.setData({
        registered: false,
        unregistered: true,
      })
    }
    else {
      console.log(userd)
      this.setData({
        registered: true,
        unregistered: false,
      })
    }
    this.setData({
      userData: userd
    })
  },
})
