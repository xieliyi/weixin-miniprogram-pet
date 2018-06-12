//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: '',
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //单击扫描二维码处理函数
  click:function() {
    var that = this;
    var show_res = '';
    wx.scanCode({
      success: (res) => {
        console.log(res)
        //show_res = '结果：'+ res.result + '\n' + ' 二维码类型：' + res.scanType + '\n 字符集：' + res.charSet + '\n 路径：' +res.path
        this.setData({
          show: show_res
        })

        if (res.result.length == 10){
          var regNum = new RegExp('[0-9]', 'g');
          var rsNum = regNum.exec(res.result);
          if (rsNum){

            show_res = 'SN：' + res.result
            this.setData({
              show: show_res
            })

            wx.navigateTo({
              url: '../main/main?sn=' + res.result
            })
            return
          }
        }
        show_res = '未知设备：' + res.result
        this.setData({
          show: show_res
        })
      },

      fail: (res) => {
        console.log(res)
        show_res = "扫描失败"
        this.setData({
          show: show_res
        })
      },

      complete: (res) => {
        console.log("扫描二维码完成！")
      }

    })
  },

  onLoad: function (options) {
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
    console.log('scene')
    console.log(scene)
    console.log('options')
    console.log(options)

    if (options.sn != null){
      if (options.sn.length == 10) {
        var regNum = new RegExp('[0-9]', 'g');
        var rsNum = regNum.exec(options.sn);
        if (rsNum) {

          var show_res = 'SN：' + options.sn
          this.setData({
            show: show_res
          })

          wx.navigateTo({
            url: '../main/main?sn=' + options.sn
          })
          return
        }
      }
    }


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
    }
    else {
      this.setData({
        hasUserInfo: false
      })
    }
  }
})
