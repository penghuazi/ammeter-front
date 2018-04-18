<template>
      <!-- loading tips -->
        <div class="kcp_ajax_load " :class="{kcp_load_out:ajax_loading}" >
            <div>
                <span class="icon-spinner4 spinner"></span> 
                <span>加载中, 请稍等 ···</span>
            </div>         
        </div>	
</template>
<script>
	  export default{
	  	data(){
	  		return{
	  			ajax_loading:false
	  		}
	  	}
	  }
</script>