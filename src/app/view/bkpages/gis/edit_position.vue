<template>
	<div class="kcp_info">
		

		<div class="base-box">
			<div class="form-column">
				IMEI
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text " disabled="true"  v-model="position.imei"/>
			</div>
			<div class="form-column">
				电表编号
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="position.number"/>
			</div>
		</div>
		<div class="base-box form">
			<div class="form-column">
				电表名称
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="position.name"/>
			</div>
			<div class="form-column">
				安装人员
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="position.installer"/>
			</div>
		</div>

		<div class="base-box form">
			<div class="form-column">
				电表型号
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="position.deviceModel"/>
			</div>
			<div class="form-column">
				用电单位
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="position.companyName"/>
			</div>
		</div>
		<div class="base-box form">
			<div class="form-column">
				合同状态
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="position.agreementStatus"/>
			</div>
			<div class="form-column">
				联系人信息
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="position.contactInfo"/>
			</div>
		</div>

		<div class="base-box form">
			<div class="form-column">
				高德经度
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="position.amapLongitude"/>
			</div>
			<div class="form-column">
				高德纬度
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="position.amapLatitude"/>
			</div>
		</div>
		<div class="base-box form">
			<div class="form-column">
				设备项目
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text"  v-model="position.address"/>
			</div>
			<div class="form-column">
				电表地址
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text" v-model="position.address"/>
			</div>
		</div>
		<div class="base-box form">
			<div class="form-column">
				备注
			</div>
			<div class="form-container ">
				<textarea placeholder="备注最多可以输入200字" style="width:530px" maxlength="200" v-model="position.remark"></textarea>
			</div>
		</div>

		<div class="base-box form tc">
			<button  @click="saveOrUpdate()" class="kcp_nbtn w120 mt20 mr10">保存</button>
		</div>
	</div>
</template>
<script>
	
	export default{
		vuem:['ammeter.get_position_info','ammeter.update_position'],
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
			saveOrUpdate:function(){
				this.$m.ammeter.update_position(this.position).then(res => {
					if(res.code==10000){
		         	 	 $KsDialog.success('保存成功!');
		         	 }
				})
			},
			getPositionInfo:function(id){
	          this.$m.ammeter.get_position_info({positionId:id,sn:'position'}).then(res => {
	            if (res.code === 10000) {
	              this.position = res.data
	            }
	          })
	        }
		},
		ready(){
      		this.getPositionInfo(this.$route.query.id)
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