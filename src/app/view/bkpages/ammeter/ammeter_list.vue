<template>
	<div >
		<div class="kcp_router_title">
			电表终端管理
		</div>
		<div class="kcp_market_search mt20">
			<!-- <input type="text" class="kcp_text w260" placeholder="请输入表号" v-model="queryData.meterNo"> -->
			<input type="text" class="kcp_text w260" placeholder="请输入设备名称" v-model="queryData.name">
			<input type="text" class="kcp_text w260" placeholder="请输入安装人员" v-model="queryData.installer">

			<button class="kcp_nbtn w54 ml10" @click="search">查询</button>
		</div>
		<div class="kcp_market_table">
			<div class="kcp_table-lister">
				<table>
					<tr class="header">
						<th>设备编号</th>
						<th>设备名称</th>
						<!-- <th>电表编号</th>
						<th>电表型号</th> -->
						<!-- <th>经纬度信息</th> -->
						<th>电表位置</th>
						<th>备注</th>
						<th>在线状态</th>
						<th>电表即时度数</th>
						<th>用电单位</th>
						<th>合同状态</th>
						<th>联系人信息</th>
						<th>操作</th>
					</tr>
					<tr v-for="a in ammeterList">
						<td>{{a.id}}</td>
						<td :title="a.name">{{a.name && a.name.length > 10 ? a.name.substring(0,10)+'...' : a.name}}</td>
						
						<!-- <td>{{a.ammeterNumber}}</td>
						<td>{{a.deviceModel}}</td>
						<td>{{a.gisAmap}}</td> -->
						<td :title="a.address">{{a.address && a.address.length > 10 ? a.address.substring(0,10) + '...' : a.address}}</td>
						<td :title="a.remark">{{a.remark && a.remark.length > 10 ? a.remark.substring(0,10) + '...' : a.remark}}</td>
						<td>{{a.onlineStatus}}</td>
						<td>{{a.activePower}}</td>
						<td>{{a.companyName}}</td>
						<td>{{a.agreementStatus}}</td>
						<td>{{a.contactInfo}}</td>
						<td>
							<a @click="report(a)">查看详情</a>
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
					name:'',
					installer:'',
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

			report:function(obj){
				this.$router.go({name:'report_info',query:{imsi:obj.imsi, name:obj.name}});
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
