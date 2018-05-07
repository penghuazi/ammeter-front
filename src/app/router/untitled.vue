<template>
	<div class="kcp_info">
		<div class="kcp_router_title mb20">
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
	</div>
</template>
<script>
	
	export default{
		vuem:['get_position_info','ammeter.add_position'],
		data(){
			return{
				id:'',
				// position:{
				// 	imei:'',
				// 	address:'', // (string, optional): 电表地址 ,
				// 	amapLatitude:'', // (string, optional): 高德纬度 ,
				// 	amapLongitude:'', // (string, optional): 高德经度 ,
				// 	gpsLatitude:'', // (string, optional): GPS纬度 ,
				// 	gpsLongitude:'', // (string, optional): GPS经度 ,
				// 	id:'', // (integer, optional): 位置信息Id,创建时不需要传! ,
				// 	name:'', // (string, optional): 电表名称 ,
				// 	number:'', // (string, optional): 电表编号 ,
				// 	remark:'', // (string, optional): 备注 ,
				// 	status:'', // (integer, optional): 状态,创建时可不传!默认为0	
				// },
				position:{}
			}
		},
		methods:{
			back:function(){
				window.history.back();
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