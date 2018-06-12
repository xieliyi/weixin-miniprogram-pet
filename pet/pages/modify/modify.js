//modify.js

Page({
  data: {
    snNum: "",
    inputName: "",
    inputMobile: "",
    userData:{
      name: "",
      mobile: "",
    },
  },

  //事件处理函数
  formSubmit: function (e) {
    var name_text = null
    var mobile_text = null
    if (e.detail.value != null) {
      name_text = e.detail.value.rName;
      mobile_text = e.detail.value.rMobile;
    }

    if (name_text == null || name_text.length == 0){
      wx.showModal({
        title: '提示',
        content: '请输入用户姓名',
        showCancel: false
      })
      return
    }
    
    if (mobile_text == null || mobile_text.length == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入电话号码',
        showCancel: false
      })
      return
    }

    this.setData({
      'userData.name': name_text,
      'userData.mobile': mobile_text
    }),

    console.log(this.data.snNum)
    console.log(this.data.userData)

    wx.setStorageSync(this.data.snNum, this.data.userData)
    wx.showToast({
      title: '注册成功',
      icon: 'success',
      duration: 1000
    })
    wx.navigateBack({
      delta: 1
    })
  },

  formReset: function () {
    console.log('formReset')
  },

  onLoad: function (option) {
    console.log(option)

    var userd = wx.getStorageSync(option.sn) 

    if (userd == null || userd.name == null || userd.name.length ==0 ){
      console.log('userd is null' )
      this.setData({
        snNum: option.sn,
        inputName: '',
        inputMobile: ''
      })
    }
    else {
      console.log(userd)
      this.setData({
        snNum: option.sn,
        userData: userd,
        inputName: userd.name,
        inputMobile: userd.mobile
      })
    }

  }

})
