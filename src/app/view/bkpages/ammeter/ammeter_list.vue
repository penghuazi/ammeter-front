<template>
	<div >
		<div class="kcp_router_title">
			电表终端管理
		</div>
		<div class="kcp_market_search">
			<!-- <input type="text" class="kcp_text w260" placeholder="请输入表号" v-model="queryData.meterNo"> -->
			<input type="text" class="kcp_text w260" placeholder="请输入imsi" v-model="queryData.imsi">
			<input type="text" class="kcp_text w260" placeholder="请输入通讯地址" v-model="queryData.address">

			<button class="kcp_nbtn w54 ml10" @click="search">查询</button>
		</div>
		<div class="kcp_market_table">
			<div class="kcp_table-lister">
				<table>
					<tr class="header">
						<th>通信模块imsi</th>
						<th>表号</th>
						<th>资产管理编码</th>
						<th>电表型号</th>
						<th>生产日期</th>	
						<th>协议版本号</th>	
						<th>状态</th>
						<th>操作</th>
					</tr>
					<tr v-for="a in ammeterList">
						<td>{{a.imsi}}</td>
						<td>{{a.meterNo}}</td>
						<td>{{a.assManageCode}}</td>
						<td>{{a.type}}</td>
						<td>{{a.productDate | todate}}</td>
						<td>{{a.protocolNo}}</td>
						<td>
							<template v-if="a.status==1">拉闸</template>
							<template v-if="a.status==2"><i class="ks kcp-success"></i>合闸</template>
							<template v-if="a.status==3">拉闸进行中...</template>
							<template v-if="a.status==4">合闸进行中...</template>
						</td>
						<td>
							<a class="mr10"  v-if="a.status==2" @click="tOFF(a.id,1)">拉闸</a>
							<a class="mr10"  v-if="a.status==1" @click="tON(a.id,2)">合闸</a>
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
						    @change="getAmmeterList"></ks-page-group>
					</div>	
					</div>					
				</div>	
			</div>
		</div>
	</div>
</template>
<script>
	
	export default{
		vuem:['ammeter.get_ammeter_list','ammeter.update_status'],
		data(){
			return{
				show:false,
				show1:false,
				pageGroupVal:1,
				queryData:{
					meterNo:'',
					imsi:'',
					address:'',
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
				this.getAmmeterList();
			},
			//获取电表数据列表
			getAmmeterList:function() {
				//请求api
	    		this.$m.ammeter.get_ammeter_list(this.queryData).then(response=> {
		         	 if(response.code==10000){
		         	 	 this.ammeterList=response.data;
		         	 	 this.total=response.total;
		         	 }
		        },response=>{ console.log(response.data);} )
			},
			//拉闸
			tOFF:function(i,s){
				$KsModal.confirm({title:'系统提示',message:'确认执行拉闸操作吗？'},()=>{
					 this.action(i,s);
				})
			},
			//合闸
			tON:function(i,s){
				let _this=this;
				$KsModal.confirm({title:'系统提示',message:'确认执行合闸操作吗？'},()=>{
					 this.action(i,s);
				})
			},
			action:function(i,s){
				this.p.id=i;
				this.p.status=s;	
				this.$m.ammeter.update_status(this.p).then(response=> {
		         	 if(response.code==10000){
		         	 	 $KsDialog.success('操作成功!');
		         	 	 this.getAmmeterList();
		         	 }
		        },response=>{ console.log(response.data);} )
			},
			getInfo:function(i){
				this.$router.go({name:'ammeter_info',query:{imsi:i}});
			}
		},
		ready(){
			this.getAmmeterList();
		}
	}
</script>
<style >

</style>
