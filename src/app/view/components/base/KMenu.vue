<template>
  <nav>
    <ul class="kcp_menu_home">
          <li class="action" > 
              <span class="kcp_menu_icon">  
                <i class="ks kcp-gn"></i>     
              </span>                 
              <span>我的功能</span>
          </li>
          <li class="kcp_menu_content " @click="$router.go({name:'bkhome'})" :class="{kcp_active:$route.name=='bkhome'}">
              <span class="kcp_menu_icon">       
                <i class="ks kcp-home"> </i>
              </span>                 
              <span>首页</span>
              <i class=" icon-arrow-right13  kcp_menu_content r pr10" v-show="$route.name==='bkhome'"></i>              
          </li>
    </ul>  
    <ul class="kcp_menu_list">
          <li v-for="menu in MenuList" >
            <div class="kcp_menu_content kcp_menu_list-titles" @click="get_menu($index,menu.has_menu)">
              <span class="kcp_menu_icon">       
                <i :class="menu.has_menu?' icon-arrow-down22': ' icon-arrow-right22' "></i>
              </span>                 
              <span>{{menu.name}}</span>            
            </div>
            <ul v-show="menu.has_menu" transition="kcp_menu" >
              <li v-for="sub in menu.subMenu" class="kcp_menu_content ovh" @click="route_to(sub.link)" :class="{kcp_active:$route.name==sub.link}">
                <span class="kcp_menu_list-names l">{{sub.name}}</span>
                <i class=" icon-arrow-right13  kcp_menu_content r pr10" v-show="$route.name===sub.link"></i>
              </li>
            </ul>
          </li>
     </ul> 
          

          

  </nav>
</template>

<script>
 

  export default {
    data () {
      return {
        MenuList:[]
      }
    },
    methods:{
      get_menu(index,has_menu){
      this.MenuList.forEach((i,ins)=>{
        i.has_menu=(ins===index)?(!has_menu):false
      })     
      },
      route_to(link){
        this.$router.go({name:link})
      }
    },
    ready(){
      this.MenuList=Service.session.get('menu').map(i=>Object.assign({has_menu:i.subMenu.some(k=>k.link===this.$route.name)},i))
    }
  }
</script>
<style>

</style>
