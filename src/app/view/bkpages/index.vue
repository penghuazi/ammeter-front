<template>
  <div class="kcpapp">
    <k-header></k-header>
    <div class="kcp_content">
      <div class="kcp_content-intable">

        <div class="kcp-menu">
          <div class="kcp_content-intable-rel">
            <k-menu></k-menu>
          </div>
        </div>
        
        <div class="kcp_work" >
            <div class="kcp_content-intable-rel">
              <div class="kcp_work__router">
                <router-view class="kcp_min_w"></router-view>
              </div>
                
            </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  import base from '../components/base'
  export default{
    components: base,
    data () {
      return { }
    },
    methods:{

    },
    ready(){
      
    }
    
  }
</script>
