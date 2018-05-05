<template>
	<div class="kcp_info">
		<div class="kcp_router_title mb20">
			新增
		</div>

		<div class="header_title mb20">
			基本信息
		</div>
		<div class="base-box">
			<div class="form-column">
				IMEI
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text" style="width:669px"  v-model="position.imei"/>
			</div>
		</div>
		<div class="base-box form">
			<div class="form-column">
				电表编号
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.number"/>
			</div>
			<div class="form-column">
				电表名称
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.name"/>
			</div>
		</div>
		<div class="base-box form">
			<div class="form-column">
				GPS经度
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.gpsLongitude"/>
			</div>
			<div class="form-column">
				GPS纬度
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.gpsLatitude"/>
			</div>
		</div>
		<div class="base-box form">
			<div class="form-column">
				高德经度
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.amapLongitude"/>
			</div>
			<div class="form-column">
				高德纬度
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.amapLatitude"/>
			</div>
		</div>
		<div class="base-box form">
			<div class="form-column">
				电表地址
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.address"/>
			</div>
			<div class="form-column">
				备注
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.remark"/>
			</div>
		</div>

		<div class="header_title mb20 cb">
			配置信息
		</div>
		<div class="base-box form">
			<div class="form-column">
				NCD
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.address"/>
			</div>
			<div class="form-column">
				APN
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.remark"/>
			</div>
		</div>
		<div class="base-box form">
			<div class="form-column">
				NB
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.address"/>
			</div>
			<div class="form-column">
				
			</div>
			<div class="form-container ">
				
			</div>
		</div>

		<div class="header_title mb20 cb">
			告警信息
		</div>
		<div class="base-box">
			<div class="kcp_market_table">
			<div class="kcp_table-lister">
				<table>
					<tr class="header">
						<th>设备编号</th>
						<th>IMEI号</th>
						<th>设备名称</th>
						<th>告警日期</th>		
						<th>告警类别</th>
						<th>操作</th>
					</tr>
					<tr v-for="p in positionList">
						<td>{{p.id}}</td>
						<td>{{p.imei}}</td>
						<td>{{p.name}}</td>
						<td>{{p.installer}}</td>
						<td>{{p.createTime}}</td>
						<td>{{p.statusName}}</td>
						<td><a @click="getInfo(p.id)">消除告警</a></td>
					</tr>
				</table>
				<div class="kcp_table-pages">
					<div class="kcp_pager">
						<ks-page-group
						    :current.sync="queryData.pageIndex" 
						    :size.sync = "queryData.pageSize"
						    :total="total"
						    @change="getPositionList"></ks-page-group>
					</div>	
					</div>					
				</div>	
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