<template>
	<div class="kcp_info">
		<div class="kcp_router_title mb40">
			设备运行参数配置
		</div>

		<div class="base-box form">
			<div class="form-column">
				物联网定向服务IP
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.cdp"/>
			</div>
			<div class="form-column">
				<button  @click="saveOrUpdate()" class="kcp_nbtn w120">配置</button>
			</div>
		</div>
		<div class="base-box form">
			<div class="form-column">
				物联服务接入参数
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.apnAddress"/>
			</div>
			<div class="form-column">
				<button  @click="saveOrUpdate()" class="kcp_nbtn w120">配置</button>
			</div>
		</div>
		<div class="base-box form">
			<div class="form-column">
				设备保活时间参数
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.nb"/>
			</div>
			<div class="form-column">
				<button  @click="saveOrUpdate()" class="kcp_nbtn w120">配置</button>
			</div>
			<div class="form-container "></div>
		</div>



		<div class="kcp_router_title mb40">
			设备系统运行设置
		</div>

		<div class="base-box form tc">
			<div class="form-column">
				保存系统设置
			</div>
			<div class="form-container">
				<button  @click="systemConfig()" class="kcp_nbtn w120">配置</button>
			</div>
		</div>
		<div class="base-box form tc">
			<div class="form-column">
				恢复出厂设置
			</div>
			<div class="form-container">
				<button  @click="reset" class="kcp_nbtn w120">配置</button>
			</div>
		</div>
		<div class="base-box form tc">
			<div class="form-column">
				设备重启设置
			</div>
			<div class="form-container">
				<button  @click="restart" class="kcp_nbtn w120">配置</button>
			</div>
		</div>
	</div>
</template>
<script>
	
	export default{
		vuem:['ammeter.get_position_config','ammeter.save_position_config','ammeter.reset','ammeter.restore','ammeter.system_config'],
		data(){
			return{
				id:'',
				position:{}
			}
		},
		methods:{
			back:function(){
				window.history.back();
			},
			systemConfig:function(){
				this.$m.ammeter.system_config(this.position).then(res => {
					if(res.code==10000){
						$KsDialog.success('保存系统设置成功!')
		         	 }
				})
			},
			restart:function(){
				this.$m.ammeter.reset(this.position).then(res => {
					if(res.code==10000){
						$KsDialog.success('设备重启设置成功!')
		         	 }
				})
			},
			reset:function(){
				this.$m.ammeter.restore(this.position).then(res => {
					if(res.code==10000){
		         		$KsDialog.success('恢复出厂设置成功!')
		         	 }
				})
			},
			saveOrUpdate:function(){
				this.$m.ammeter.save_position_config(this.position).then(res => {
					if(res.code==10000){
		         		$KsDialog.success('保存成功!');
		         	 	this.getPositionInfo(this.id)
		         	 }
				})
			},
			getPositionInfo:function(id){
	          this.$m.ammeter.get_position_config({positionId:id}).then(res => {
	            if (res.code === 10000) {
	              this.position = res.data
	            }
	          })
	        }
		},
		ready(){
			this.id = this.$route.query.id
      		this.getPositionInfo(this.id)
		},
	}
</script>
<style scoped lang="scss">
	.cb{
		clear:both ;
	}
	.programme-name{
		width: 620px;
	}

	.form-container textarea{
		width: 620px;
		height: 110px;
		outline: none;
		resize: none;
		background: rgba(206,221,233,0.10);
		border: 1px solid #CBDDE9;
		border-radius: 2px;
	}
	.btns{
		width: 620px;
	}
	.kcp-textlength{
		position: relative;
		right: 60px;
		top:20px;
	}
</style>