//main.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    snNum: "",
    userData: {
      name: "",
      mobile: "",
      address: "",
    },

    registered: false,
    unregistered: true,
  },

  //事件处理函数 保存
  formSubmit: function (e) {
    console.log('main formReset')

    var name_text = null
    var mobile_text = null
    var address_text = null
    if (e.detail.value != null) {
      name_text = e.detail.value.rName;
      mobile_text = e.detail.value.rMobile;
      address_text = e.detail.value.rAddress;
    }

    if (name_text == null || name_text.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入萌宠昵称',
        showCancel: false
      })
      return
    }

    if (mobile_text == null || mobile_text.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入主人电话',
        showCancel: false
      })
      return
    }

    if (address_text == null || address_text.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入地址',
        showCancel: false
      })
      return
    }

    this.setData({
      'userData.name': name_text,
      'userData.mobile': mobile_text,
      'userData.address': address_text
    }),
      
    console.log(this.data.snNum)
    console.log(this.data.userData)

    wx.setStorageSync(this.data.snNum, this.data.userData)
    wx.showToast({
      title: '注册成功',
      icon: 'success',
      duration: 1000
    })

    this.setData({
      registered: true,
      unregistered: false,
    })
  },

  //事件处理函数 删除
  formReset: function () {
    console.log('main formReset')
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

    //用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: app.globalData.userInfo,
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
