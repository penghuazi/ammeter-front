<template>
	<div class="kcp_info">
		<div class="kcp_router_title mb40">
			阀值配置
		</div>
		<div class="base-box form">
			<div class="form-column">
				电量阀值
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="setWarning.powerValue"/>
			</div>
			<div class="form-column">
				电流阀值
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="setWarning.currentValue"/>
			</div>
		</div>
		<div class="base-box form tc">
			<button  @click="warningSet()" class="kcp_nbtn w120 mt20 mr10">保存</button>
		</div>

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
				<button  @click="saveOrUpdate1()" class="kcp_nbtn w120">配置</button>
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
				<button  @click="saveOrUpdate2()" class="kcp_nbtn w120">配置</button>
			</div>
			<div class="form-container "></div>
		</div>



		<div class="kcp_router_title mb40" style="clear:both ;">
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
		<div class="base-box form tc">
			<div class="form-column">
				设备注销设置
			</div>
			<div class="form-container">
				<button  @click="this.delete" class="kcp_nbtn w120">配置</button>
			</div>
		</div>
	</div>
</template>
<script>
	
	export default{
		vuem:['ammeter.get_position_config','ammeter.save_position_config','ammeter.reset','ammeter.restore','ammeter.system_config', 'ammeter.position_delete','ammeter.save_config_warning'],
		data(){
			return{
				id:'',
				position:{},
				setWarning: {
					positionId: this.$route.query.id,
					currentValue: '',
					powerValue: ''
				}
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
			delete:function(){
				this.$m.ammeter.position_delete({positionId:this.id,sn:this.id}).then(res => {
					if(res.code==10000){
		         		$KsDialog.success('设备注销成功!')
		         	 }
				})
			},
			saveOrUpdate:function(){
				this.$m.ammeter.save_position_config({positionId:this.id, cdp:this.position.cdp}).then(res => {
					if(res.code==10000){
		         		$KsDialog.success('保存成功!');
		         	 	this.getPositionInfo(this.id)
		         	 }
				})
			},
			saveOrUpdate1:function(){
				this.$m.ammeter.save_position_config({positionId:this.id, apnAddress:this.position.apnAddress}).then(res => {
					if(res.code==10000){
		         		$KsDialog.success('保存成功!');
		         	 	this.getPositionInfo(this.id)
		         	 }
				})
			},
			saveOrUpdate2:function(){
				this.$m.ammeter.save_position_config({positionId:this.id, nb:this.position.nb}).then(res => {
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
				  this.setWarning = {
					  ...res.data
				  }
	            }
	          })
			},
			warningSet: function () {
				this.$m.ammeter.save_config_warning(this.setWarning).then(res => {
					if(res.code==10000){
						$KsDialog.success('保存成功!');
		         	 	this.getPositionInfo(this.id)
					}
				}, err => {
					console.log(err)
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