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
	import iReport from './i_report.vue'
	import pReport from './p_report.vue'
	import uReport from './u_report.vue'
	export default{
		data(){
			return{
				list:[
					{
						name:'电量详情',
						value:'pReport'
					},
					{
						name:'电流详情',
						value:'iReport'
					},
					{
						name:'电压详情',
						value:'uReport'
					},
					
				],
				key:'电量详情',
				currentTabComponent:'pReport'
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
			iReport,pReport,uReport
		},
		ready:function(){

		},
		watch:{

		}
	}
</script>
<style>
	
</style>