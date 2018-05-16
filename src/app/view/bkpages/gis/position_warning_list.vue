<template>
	<div class="kcp_info">
		<div class="kcp_market_table">
		<div class="kcp_table-lister">
			<table>
				<tr class="header">
					<th>设备编号</th>
					<th>IMEI号</th>
					<th>设备名称</th>
					<th>告警日期</th>
					<th>告警状态</th>		
					<th>告警类别</th>
					<th>操作</th>
				</tr>
				<tr v-for="w in warningList">
					<td>{{w.id}}</td>
					<td>{{w.imsi}}</td>
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
					    @change="getWarningInfo"></ks-page-group>
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
				queryData:{
					positionId:'',
					pageIndex:1,
					pageSize:10,
				},
				total:0,
				warningList:[],
			}
		},
		methods:{
			back:function(){
				window.history.back();
			},
			avoid:function(id){
				this.$m.ammeter.avoid_warning({warningId:id,sn:'position'}).then(res =>{
					if (res.code === 10000) {
		              $KsDialog.success('消除成功!');
		              this.getWarningInfo(this.id)
		            }
				})
			},
			getWarningInfo:function(){
	          this.$m.ammeter.get_warning_list(this.queryData).then(res => {
	            if (res.code === 10000) {
	              this.warningList = res.data
	              this.total=res.total
	            }
	          })
	        }
		},
		ready(){
			this.queryData.positionId = this.$route.query.id
      		this.getWarningInfo()
		},
	}
</script>
<style scoped lang="scss">
</style>