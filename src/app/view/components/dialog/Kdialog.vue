<template>
<div v-show='show'>
  <div class="sweet-overlay db" tabindex="-1" ></div>
  <div class="sweet-alert showSweetAlert" data-animation="pop" style="display: block;" >

    <div class="sa-icon sa-error animate"v-if="type === 'error'">
      <span class="sa-x-mark animateXMark">
        <span class="sa-line sa-left"></span>
        <span class="sa-line sa-right"></span>
      </span>
    </div>
    <div class="sa-icon ban" v-if="type === 'ban'" ></div>
    <div class="sa-icon sa-warning animate" v-if="type === 'warning'">
      <span class="sa-body"></span>
      <span class="sa-dot"></span>
    </div>
    <div class="sa-icon sa-warning animate" v-if="type === 'dates'">
      <span class="sa-body"></span>
      <span class="sa-dot"></span>
    </div>    
    <div class="sa-icon sa-info" v-if="type === 'info'"></div>

    <div class="sa-icon sa-success animate" v-if="type === 'success'" >
      <span class="sa-line sa-tip animateSuccessTip"></span>
      <span class="sa-line sa-long animateSuccessLong"></span>
      <div class="sa-placeholder"></div>
      <div class="sa-fix"></div>
    </div>
    <div class="sa-icon disable" v-if="type === 'disable'" ></div>
    <div class="sa-icon reset_bg" v-if="type === 'reset'" ></div>
    <h2 v-text="title"></h2>
    <p :title='content2' :class="{reset_content:type === 'reset'}">{{content}}</p>
    <div class="sa-button-container pt20">
      <div class="sa-confirm-button-container" v-if="showCancel">
        <button class="kcp_lbtn w73" tabindex="2" @click="m_cancel">取消</button>
      </div>
      <div class="sa-confirm-button-container" v-if="showTrue">
        <button class="kcp_nbtn w120" tabindex="1" @click="m_close">确定</button>
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
        type: 'info',
        title: '系统提示',
        content: 'Content',
        content2:'',
        showCancel: false,
        showTrue:false,
        callback: undefined,
        planId:[],//采购计划编号     
      }
    },
    methods: {
      ban(message,callback){
        this.m_show({
          type: 'ban',
          title:message,          
          content: ''
        }, callback);
      },
      success(message,callback){
        this.m_show({
          type: 'success',
          title:message,          
          content: ''
        }, callback);
      },
      disable(message,callback){
        this.m_show({
          type: 'disable',
          title:message,          
          content: ''
        }, callback);
      },
      reset(message,callback){
        this.m_show({
          type: 'reset',
          title:'密码已重置，默认密码为',          
          content: '888888'
        }, callback);
      },      
      info(message,callback){
        this.m_show({
          type: 'info',
          title:'系统提示',
          showTrue:true,          
          content: message
        }, callback);
      },     
      warning(message,callback){
        this.m_show({
          type: 'warning',
          title:'系统提示',
          showTrue:true,                    
          content: message
        }, callback);
      },      
      error(message,callback){
        this.m_show({
          type: 'error',
          title:'错误',
          showTrue:true,
          content: message
        }, callback);
      },
      /**
       * 将 通用的响应结果信息由 弹出窗口自动处理
       * 仅支持常规提示，自有业务需手动处理
       */
      proxy(response, callback){
        if(response && response.data){
          console.info(response.data);
          if(0 == response.data.code) {
            this.success(response.data.message || '操作成功', callback);
          } else if(response.data.code && response.data.code < 50000){
            this.info(response.data.message, callback);
          }
        }
      },
      /**
       * 代理 不成功的消息 提示
       */
      proxyUnsuccessful(response, callback){
        if(response && response.data){
          console.info(response.data);
          if(response.data.code && response.data.code < 50000){
            this.info(response.data.message, callback);
          }
        }
      },    


      // 判断请求成功后的行为
      proxysuccess(res,cb){
        if(res&&res.data){
          if(res.data.code==0&&cb !== undefined && typeof cb === 'function'){
            cb()
          }else if(res.data.code&&res.data.code<50000){
            this.info(res.data.message)
          }
        }
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
        opt.type && (_this.type = opt.type)
        opt.title && (_this.title = opt.title)
        _this.content = opt.content
        if(typeof opt.content!=='string'){
          console.error('请输入正确格式的提示语')
          return;
        }
        if(opt.content.length>200){
          _this.content2=opt.content;
          opt.content=opt.content.substring(0,200)+'...';
          _this.content=opt.content;
        }
        opt.callback && (_this.callback = opt.callback)
        _this.show = true  
        let typeArr=['success','disable','reset','ban'];
        if(typeArr.some(i=>i===opt.type)){
          setTimeout(this.m_close,2000)
        } 

        _this.showCancel = opt.showCancel
        _this.showTrue = opt.showTrue
        _this.callback = cb || undefined

      },
      m_cancel(){
        this.show = false;
      },
      m_close(){
        this.show = false
        if(this.callback !== undefined && typeof this.callback === 'function')
          this.callback();
      }
    }
  }
</script>
<style lang="sass" scoped>
  .disable{
    border-color:red;
  }

  .disable:after{
    content: '';
    display: block;
    width: 80%;
    margin:auto;
    border-bottom:4px solid red;
    margin-top: 38px;
  }
  .ban{
     border-color:#FF8C33;
  }
  .ban:after{
    content: '';
    display: block;
    margin:auto;
    border-bottom:4px solid #FF8C33;
    margin-top: 38px;
    transform: rotate(45deg);
  }  
  .reset_content{
    color: red;
    font-size: 16px;
    letter-spacing: 4px;
  }
  .reset_bg{
    border:none;
    // background-image:url('../../../../images/reset.jpg');
    width: 97px;
    height: 89px;
  }
</style>


