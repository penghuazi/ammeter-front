<template>
<div v-show='show'>
  <div class="sweet-overlay db" tabindex="-1" ></div>
  <div class="sweet-alert showSweetAlert kcp_sweet_btc" data-animation="pop" style="display: block" >
  <div class="center_model_titel tl">
        <div class="f18 ">{{title}}</div>
        <!-- <span class="icon-cross2 ic " @click='m_cancel'></span> -->
        <div  class="f14 mt25">{{message}}</div>
  </div> 
  <div class="sa-button-container pt60 tr" >
    <div class="sa-confirm-button-container mr10">
      <button class="kcp_lbtn w73" tabindex="2" @click="m_cancel">取消</button>
    </div>
    <div class="sa-confirm-button-container" >
      <button class="kcp_rgbtn w120" tabindex="1" @click="m_close" >确认</button>
    </div>
  </div>
  </div>
</div>  
</template>

<script>

  export default{ 
    data(){
      return{
        show: false,
        type: '',
        message:'',
        title:'',
        callback: undefined,
        response:undefined  
      }
    },
    methods: {       
      // {title:'title',message:'message'}
      confirm(obj,callback){
        this.m_show({
          type:'confirm',
          title:obj.title,
          message: obj.message
        }, callback);
      },
          
      /**
       * @description 打开对话框
       * @param opt {Object} 对话框参数
       *  #type# 对话框类型
       *  #title# 对话框显示标题
       *  #content# 对话框显示内容
       * @param {Function} [cb] [回调函数]
       */
      m_show(opt, cb){
        var _this = this
        // *** 设置对话框参数
        _this.type = opt.type; 
        _this.title = opt.title;
        _this.message = opt.message;   
        _this.show = true  
        _this.callback = cb || undefined
      },
      m_cancel(){
        this.show = false;
      },
      m_close(){
        this.m_cancel()
        if(this.callback !== undefined && typeof this.callback === 'function')
          this.callback(this.response);
          this.response=undefined;
      }
    }
  }
</script>



