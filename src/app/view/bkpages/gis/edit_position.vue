<template>
	<div>
		<div class="kcp_router_title">
			新增
		</div>
		<div class="row mt20">
			<div class="col pr10 tr">IMEI</div>
			<div class="col ">
				<input type="text" class="kcp_text w220"  v-model="position.imei"/>
			</div>
			<div class="col"></div>
			<div class="col"></div>
		</div>
		<div class="row mt20">
			<div class="col  pr10 tr">
				电表编号
			</div>
			<div class="col ">
				<input type="text" class="kcp_text w220"  v-model="position.number"/>
			</div>
			<div class="col  pr10 tr">
				电表名称
			</div>
			<div class="col ">
				<input type="text" class="kcp_text w220"  v-model="position.name"/>
			</div>
			<div class="col"></div>
		</div>
		<div class="row mt20">
			<div class="col  pr10 tr">
				GPS经度
			</div>
			<div class="col ">
				<input type="text" class="kcp_text w220"  v-model="position.gpsLongitude"/>
			</div>
			<div class="col  pr10 tr">
				GPS纬度
			</div>
			<div class="col ">
				<input type="text" class="kcp_text w220"  v-model="position.gpsLatitude"/>
			</div>
			<div class="col"></div>
		</div>
		<div class="row mt20">
			<div class="col  pr10 tr">
				高德经度
			</div>
			<div class="col ">
				<input type="text" class="kcp_text w220"  v-model="position.amapLongitude"/>
			</div>
			<div class="col  pr10 tr">
				高德纬度
			</div>
			<div class="col ">
				<input type="text" class="kcp_text w220"  v-model="position.amapLatitude"/>
			</div>
			<div class="col"></div>
		</div>
		<div class="row mt20">
			<div class="col  pr10 tr">
				电表地址
			</div>
			<div class="col ">
				<input type="text" class="kcp_text w220"  v-model="position.address"/>
			</div>
			<div class="col  pr10 tr">
				备注
			</div>
			<div class="col ">
				<input type="text" class="kcp_text w220"  v-model="position.remark"/>
			</div>
			<div class="col"></div>
		</div>
		<div class="row mt20">
			<div class="col  pr10 tc">
				<button  @click="save()" class="kcp_nbtn w120 mt20 mr10">保存</button>

				<button  @click="back()" class="kcp_lbtn w120 mt20 mr10">返回</button>
			</div>
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
					address:'', // (string, optional): 电表地址 ,
					amapLatitude:'', // (string, optional): 高德纬度 ,
					amapLongitude:'', // (string, optional): 高德经度 ,
					gpsLatitude:'', // (string, optional): GPS纬度 ,
					gpsLongitude:'', // (string, optional): GPS经度 ,
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
<style>
	.bgr{
		border: 1px solid red;
	}
</style>