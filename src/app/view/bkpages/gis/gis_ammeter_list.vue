<template>
	<div >
		<div class="kcp_router_title">
			电表终端管理
		</div>
		<div class="kcp_market_search">
			<!-- <input type="text" class="kcp_text w260" placeholder="请输入表号" v-model="queryData.meterNo"> -->
			<input type="text" class="kcp_text w260" placeholder="请输入编号" v-model="queryData.number">
			<input type="text" class="kcp_text w260" placeholder="请输入名称" v-model="queryData.name">
			<input type="text" class="kcp_text w260" placeholder="请输地址" v-model="queryData.address">

			<button class="kcp_nbtn w54 ml10" @click="search">查询</button>
			<button class="kcp_lbtn w54 ml10" @click="add">新增</button>
		</div>
		<div class="kcp_market_table">
			<div class="kcp_table-lister">
				<table>
					<tr class="header">
						<th>终端编号</th>
						<th>终端名称</th>
						<th>终端地址</th>
						<th>GPS经度</th>
						<th>GPS纬度</th>		
						<th>状态</th>
						<th>操作</th>
					</tr>
					<tr v-for="p in positionList">
						<td>{{p.number}}</td>
						<td>{{p.name}}</td>
						<td>{{p.address}}</td>
						<td>{{p.gpsLongitude}}</td>
						<td>{{p.gpsLatitude}}</td>
						<td>
							<span v-if="p.status==0" >未注册</span>
							<span v-if="p.status==1" >已注册</span>
							<span v-if="p.status==2" >注册失败</span>
							<span v-if="p.status==3" >已注销</span>
						</td>
						<td><a @click="getInfo(p.id)">查看详情</a></td>
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
					address:'', // (string, optional): 通讯地址 ,
					name:'', //  (string, optional): 电表名称 ,
					number:'', //  (string, optional): 电表编号 ,
					pageIndex:1,
					pageSize:10,
				},
				total:0,
				positionList:[]
			}
		},
		methods:{

			add:function(){
				this.$router.go({name:'edit_position'})
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
