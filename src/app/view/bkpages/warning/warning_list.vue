<template>
	<div class="kcp_info">
		<div class="kcp_router_title mb20">
			告警总览
		</div>
		<div class="kcp_market_search">
			<!-- <input type="text" class="kcp_text w260" placeholder="请输入表号" v-model="queryData.meterNo"> -->
			<input type="text" class="kcp_text w260" placeholder="请输入IMEI号" v-model="queryData.imei">
			<input type="text" class="kcp_text w260" placeholder="请输入设备名称" v-model="queryData.name">

			<button class="kcp_nbtn w54 ml10" @click="search">查询</button>
		</div>
		<div class="kcp_market_table">
			<div class="kcp_table-lister">
				<table>
					<tr class="header">
						<th>设备编号</th>
						<!-- <th>IMEI号</th> -->
						<th>设备名称</th>
						<th>告警日期</th>
						<th>告警状态</th>		
						<th>告警类别</th>
						<th>操作</th>
					</tr>
					<tr v-for="w in warningList">
						<td>{{w.id}}</td>
						<!-- <td>{{w.imsi}}</td> -->
						<td>{{w.number}}</td>
						<td>{{w.warningDate}}</td>
						<td>{{w.statusName}}</td>
						<td>{{w.warningDesc}}</td>
						<td><a v-if="w.warningStatus==0" @click="avoid(w.warningId)">消除告警</a></td>
					</tr>
				</table>
				<div class="kcp_table-pages">
					<div class="kcp_pager">
						<ks-page-group
						    :current.sync="queryData.pageIndex" 
						    :size.sync = "queryData.pageSize"
						    :total="total"
						    @change="getWarningList"></ks-page-group>
					</div>	
				</div>					
			</div>	
		</div>
	</div>
</template>
<script>
	
	export default{
		vuem:['ammeter.get_warning_list','ammeter.avoid_warning'],
		data(){
			return{
				id:'',
				pageGroupVal:1,
				queryData:{
					name:'', //  (string, optional): 电表名称 ,
					imei:'', //  (string, optional): 电表编号 ,
					status:'',
					pageIndex:1,
					pageSize:10,
				},
				total:0,
				warningList:[],
			}
		},
		methods:{
			search:function(){
				this.queryData.pageIndex=1;
				this.getWarningList();
			},
			avoid:function(id){
				this.$m.ammeter.avoid_warning({warningId:id,sn:'position'}).then(res =>{
					if (res.code === 10000) {
		              $KsDialog.success('消除成功!');
		              this.getWarningInfo(this.id)
		            }
				})
			},
			getWarningList:function(){
	          this.$m.ammeter.get_warning_list(this.queryData).then(res => {
	            if (res.code === 10000) {
	              this.warningList = res.data
	              this.total=res.total
	            }
	          })
	        }
		},
		ready(){
      		this.getWarningList()
		},
	}
</script>
<style scoped lang="scss">
</style>