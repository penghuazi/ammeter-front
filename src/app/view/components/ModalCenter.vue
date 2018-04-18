<template>
<div class="kcp_modal" v-show="show" transition="kcp_modal__expand">
	<div class="kcp_modal__div" >
		<div class="kcp_modal__div__box" >
			<div class="kcp_modal__div__box__intable" :style="{width:width}"  >
	            <slot>
	                
	            </slot>
	         </div>
		</div>

	</div>
</div>	
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		props:{
			width: {type: String, default:'100%'},
			show:{tyoe:Boolean,required:true,default:false,toway:true}
		},
		methods:{
			onesc(e){
				let event = e || window.event
				event.keyCode==27&&(this.show=false)
			}
		},
		ready(){
			Service.eventUtil.addHandler(document,'keydown',this.onesc)		
		},
		beforeDestroy(){
			Service.eventUtil.removeHandler(document,'keydown',this.onesc)
		}
		
	}
</script>
