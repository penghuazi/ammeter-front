<template>
  <div class="kcp_header">
         <div class="kcp_header-log">
          <img src="../../../../assets/image/logo.png" >

          <b>十钉物联网</b>
          <span class="line"></span>
          <b>智能终端管理平台</b>
         </div> 
         <div  class="kcp_header-user" @click='show=!show' v-ks_click_outside="show=false">
           <img src="http://up.qqjia.com/z/01/tu3945_9.jpg" >     
           <b>Admin</b>
         </div>
         <ul class="kcp_header_basic" v-show='show'>
           <li @click="gout()">
            <i class="ks kcp-jibenxinxi mr10"></i>
            <span>基本信息</span>
           </li>
           <li @click="gout()">
            <i class="ks kcp-passward mr10"></i>
            <span>修改密码</span>
           </li>
           <li @click="gout('login')">
            <i class="ks kcp-exit mr10"></i>
            <span>退出系统</span>
           </li>
              
         </ul>   
  </div>
</template>

<script>

  export default {
    data () {
      return {
        show:false
      }
    },
    methods:{
      gout(names){
        this.$router.go({name:names})
      }
    }
  }
</script>
