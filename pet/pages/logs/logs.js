//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: ''
  },
  
  onLoad: function () {

    var log = wx.getStorageSync('logs')

    this.setData({
      logs: util.formatTime(new Date(log))
    })
  }
})
