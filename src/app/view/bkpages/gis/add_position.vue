<template>
	<div class="kcp_info">
		<div class="kcp_router_title mb20">
			新增
		</div>

		<div class="base-box">
			<div class="form-column">
				IMEI
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="position.imei"/>
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
				<input type="text" class="kcp_text"  v-model="position.address"/>
			</div>
		</div>
		<div class="base-box form">
			<div class="form-column">
				备注
			</div>
			<div class="form-container ">
				<textarea placeholder="备注最多可以输入200字" style="width:40.8rem" maxlength="200" v-model="position.remark"></textarea>
			</div>
		</div>

		<div class="base-box form tc">
			<button  @click="save()" class="kcp_nbtn w120 mt20 mr10">保存</button>

			<button  @click="back()" class="kcp_lbtn w120 mt20 mr10">返回</button>
		</div>
	</div>
</template>
<script>
	
	export default{
		vuem:['ammeter.add_position'],
		data(){
			return{
				position:{
					imei:'',
					installer:'',// 安装人员
					address:'', // (string, optional): 电表地址 ,
					amapLatitude:'', // (string, optional): 高德纬度 ,
					amapLongitude:'', // (string, optional): 高德经度 ,
					gpsLatitude:'', // (string, optional): GPS纬度 ,
					gpsLongitude:'', // (string, optional): GPS经度 ,
					deviceModel:'',
					companyName:'',
					agreementStatus:'',
					contactInfo:'',
					id:'', // (integer, optional): 位置信息Id,创建时不需要传! ,
					name:'', // (string, optional): 电表名称 ,
					number:'', // (string, optional): 电表编号 ,
					remark:'', // (string, optional): 备注 ,
					status:'', // (integer, optional): 状态,创建时可不传!默认为0	
				},
			}
		},
		methods:{
			save:function(){
				console.log(this.position)
				this.$m.ammeter.add_position(this.position).then(response=> {
		         	 if(response.code==10000){
		         	 	 $KsDialog.success('保存成功!');
		         	 	 window.history.back();
		         	 }
		        },response=>{ console.log(response.data);} )
			},
			back:function(){
				window.history.back();
			}
		},
		ready(){
			
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
		width: 530px;
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