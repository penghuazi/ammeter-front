<template>
	<div >
		<div class="kcp_router_title">
			智能设备维护
		</div>
		<div class="kcp_market_search">
			<!-- <input type="text" class="kcp_text w260" placeholder="请输入表号" v-model="queryData.meterNo"> -->
			<input type="text" class="kcp_text w260" placeholder="请输入IMEI号" v-model="queryData.imei">
			<input type="text" class="kcp_text w260" placeholder="请输入名称" v-model="queryData.name">

			<button class="kcp_nbtn w54 ml10" @click="search">查询</button>
			<button class="kcp_lbtn w54 ml10" @click="add">新增</button>
		</div>
		<div class="kcp_market_table">
			<div class="kcp_table-lister">
				<table>
					<tr class="header">
						<th>设备编号</th>
						<th>IMEI号</th>
						<th>设备名称</th>
						<th>安装人员</th>
						<th>安装日期</th>		
						<th>位置信息</th>
						<th>位置备注</th>
						<th>在线状态</th>
						<th>操作</th>
					</tr>
					<tr v-for="p in positionList">
						<td>{{p.id}}</td>
						<td>{{p.imei}}</td>
						<td>{{p.name}}</td>
						<td>{{p.installer}}</td>
						<td>{{p.createTime}}</td>
						<td>{{'(' +p.amapLongitude +','+p.amapLatitude+ ')'}}</td>
						<td>{{p.remark}}</td>
						<td>{{p.statusName}}</td>
						<td>
							<a @click="getInfo(p.id)">定位信息</a>&nbsp;
							<a @click='edit(p.id)'>修改</a>&nbsp;
							<a @click='config(p.id)'>配置</a>&nbsp;
							<a @click='warning(p.deviceId)'>告警</a>
						</td>
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
		vuem:['ammeter.get_position_list'],
		data(){
			return{
				pageGroupVal:1,
				queryData:{
					name:'', //  (string, optional): 电表名称 ,
					imei:'', //  (string, optional): 电表编号 ,
					pageIndex:1,
					pageSize:10,
				},
				total:0,
				positionList:[]
			}
		},
		methods:{

			add:function(){
				this.$router.go({name:'add_position'})
			},
			edit:function(i){
				this.$router.go({name:'edit_position',query:{id:i}})
			},
			config:function(i){
				this.$router.go({name:'config_position',query:{id:i}})
			},
			warning:function(i){
				this.$router.go({name:'position_warning_list',query:{id:i}})
			},
			search:function(){
				this.queryData.pageIndex=1;
				this.getPositionList();
			},
			//获取电表数据列表
			getPositionList:function() {
				//请求api
	    		this.$m.ammeter.get_position_list(this.queryData).then(response=> {
		         	 if(response.code==10000){
		         	 	 this.positionList=response.data;
		         	 	 this.total=response.total;
		         	 }
		        },response=>{ console.log(response.data);} )
			},
			
			getInfo:function(i){
				this.$router.go({name:'gis_info_map',query:{id:i}});
			}
		},
		ready(){
			this.getPositionList();
		}
	}
</script>
<style >

</style>
