// pages/usCenter/addShelf/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShow:false,
        inputName:'',
        types:1,
        id:'',
        shelfList:null,
        items:''
    },
    tapInput(e){
      let  vlas = e.detail.value;
      this.setData({
          inputName: vlas
      })
    } ,
    //获取衣架
    getShelf(){
        app.Formdata.get('/openapi/express/wechatapplet/wash/order/shelf/query', {limit: 10000,page: 1},(res)=>{
            if(res.code=='0000'){
                console.log(res)
                this.setData({
                    shelfList:res.data
                })
            }
        })
    },
//关闭
    clerAll(){
        this.setData({
            isShow:false,
            inputName:''
        })
    },
    //打开
    openShow(e){
        console.log(e)
        let types = e.target.dataset.types;
        let items = e.target.dataset ? e.target.dataset.items : '';
        this.setData({
            isShow:true,
            types,
            items,
            inputName: items ? items.name:''
        })
    },
    
    //确定
    comfime(e){
        console.log(this.data.inputName)
        let id='';
        let url='';
        let name ='';
        if (!this.data.inputName){
            app.Tools.showToast('请输入搁架名称');
            return false;
        }else{
            name = this.data.inputName;
            id = this.data.items ? this.data.items.id : '';
            if (this.data.types == '1') {
                url = '/openapi/express/wechatapplet/wash/order/shelf/save'
            } else if (this.data.types == '2'){
                url = '/openapi/express/wechatapplet/wash/order/shelf/edit'
            }
            app.Formdata.post(url, {id,name},(res)=>{
                if(res.code == '0000'){
                    console.log(res)
                    this.clerAll();
                    this.getShelf();
                }
            })
           
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getShelf();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})