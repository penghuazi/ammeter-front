<template>
	<div class="kcp_info">
		<div class="kcp_router_title mt20 mb20" style="height:auto;">
			<tab_line :list="list" :keys="key" @clicked="checked"></tab_line>
			<div  @click="back()" class="r"  style=" margin-top:-35px;cursor:pointer;">
				 <img src="../../../../assets/image/back_off.png"  style="width:35px;height:35px;">
			</div>
		</div>
		<div>
			<component :is="currentTabComponent"></component>
		</div>
	</div>
</template>
<script>
	import editPosition from './edit_position.vue'
	import configPosition from './config_position.vue'
	import positionWarning from './position_warning_list.vue'
	export default{
		data(){
			return{
				list:[
					{
						name:'基本信息',
						value:'editPosition'
					},
					{
						name:'配置信息',
						value:'configPosition'
					},
					{
						name:'告警信息',
						value:'positionWarning'
					}
				],
				key:'基本信息',
				currentTabComponent:'editPosition'
			}
		},
		methods:{
			back:function(){
				window.history.back();
			},
			checked(value){
				if(value.name !== undefined ){
					this.key=value.name
					this.currentTabComponent=value.value
				}
			}
		},
		components:{
			editPosition,configPosition,positionWarning
		},
		ready:function(){

		},
		watch:{

		}
	}
</script>
<style lang="sass" scoped>
	
</style>