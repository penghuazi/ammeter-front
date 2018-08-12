<template>
	<div >
		<div class="kcp_router_title">
			采集终端管理
		</div>
		<div class="kcp_market_search">
			<!-- <input type="text" class="kcp_text w260" placeholder="请输入表号" v-model="queryData.meterNo"> -->
			<input type="text" class="kcp_text w260" placeholder="请输入IMEI号" v-model="queryData.imsi">

			<button class="kcp_nbtn w54 ml10" @click="search">查询</button>
		</div>
		<div class="kcp_market_table">
			<div class="kcp_table-lister">
				<table>
					<tr class="header">
						<th>设备编号</th>
						<th>设备名称</th>
						<th>IMEI号</th>
						<th>RSRQ</th>
						<th>RSSI</th>
						<th>操作</th>
					</tr>
					<tr v-for="a in ammeterList">
						<td>{{a.id}}</td>
						<td>{{a.name}}</td>
						<td>{{a.imsi}}</td>
						<td>{{a.rsrq}}</td>
						<td>{{a.rssi}}</td>
						<td>
							<a @click="getInfo(a.imsi)">查看详情</a>
						</td>
					</tr>
				</table>
				<div class="kcp_table-pages">
					<div class="kcp_pager">
						<ks-page-group
						    :current.sync="queryData.pageIndex" 
						    :size.sync = "queryData.pageSize"
						    :total="total"
						    @change="getNetworkList"></ks-page-group>
					</div>	
					</div>					
				</div>	
			</div>
		</div>
	</div>
</template>
<script>
	
	export default{
		vuem:['ammeter.get_ammeter_network_list'],
		data(){
			return{
				show:false,
				show1:false,
				pageGroupVal:1,
				queryData:{
					imsi:'',
					pageIndex:1,
					pageSize:10,
				},
				total:0,
				p:{
					id:'',
					status:''
				},
				ammeterList:[]
			}
		},
		methods:{
			pageGroupChange(){
				console.log(this.size)
			},
			stores(id){
				this.show1=true;
			},
			check(id){
				this.show=true;
			},
			search:function(){
				this.queryData.pageIndex=1;
				this.getNetworkList();
			},
			//获取电表数据列表
			getNetworkList:function() {
				//请求api
	    		this.$m.ammeter.get_ammeter_network_list(this.queryData).then(response=> {
		         	 if(response.code==10000){
		         	 	 this.ammeterList=response.data;
		         	 	 this.total=response.total;
		         	 }
		        },response=>{ console.log(response.data);} )
			},
			getInfo:function(i){
				this.$router.go({name:'ammeter_wireless_info',query:{imsi:i}});
			}
		},
		ready(){
			this.getNetworkList();
		}
	}
</script>
<style >

</style>
