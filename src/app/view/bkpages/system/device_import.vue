<template>
	<div class="kcp_info">
		<modal_center width="300px"  :show.sync="show">       
	       	<div  class="pb10 ovh" style="width:95%; margin:5px auto;">
	       		<div class="modal-taitle">
		
					<div class="kcp_router_title mb20">
						新增IMEI
					</div>
	       		</div>
	       		<div class="tc">
					<input type="number" class="kcp_text w260" placeholder="请输入IMEI号" v-model="subData.imei">
				</div>
				<div class="mt30 mb10">
					
					<div class="modal-right tc">
						<button @click="submit" class="kcp_nbtn w120  mr10">保存</button>
						<button @click="showAdd" class="kcp_nbtn w120  ">取消</button>
					</div>
				</div>
	       	</div>
	    </modal_center>

		<div class="kcp_router_title mb20">
			设备导入
		</div>
		<div class="kcp_market_search">
			<input type="text" class="kcp_text w260" placeholder="请输入IMEI号" v-model="queryData.imei">
			<button class="kcp_nbtn w54 ml10" @click="search">查询</button>
			<button class="kcp_lbtn w54 ml10" @click="showAdd">新增</button>
		</div>
		<div class="kcp_market_table">
			<div class="kcp_table-lister">
				<table>
					<tr class="header">
						<th>IMEI号</th>
						<th>创建人</th>
						<th>创建时间</th>
						<th>设备名称</th>
						<th>操作</th>
					</tr>
					<tr v-for="i in imeiList">
						<td>{{i.imei}}</td>
						<td>{{i.createBy}}</td>
						<td>{{i.createTime}}</td>
						<td :title="i.deviceName">{{i.deviceName  && i.deviceName.length > 10 ? i.deviceName.substring(0,10)+'...' : i.deviceName}}</td>
						<td><a @click='isDelete(i.imei)'>删除</a></td>
					</tr>
				</table>
				<div class="kcp_table-pages">
					<div class="kcp_pager">
						<ks-page-group
						    :current.sync="queryData.pageIndex" 
						    :size.sync = "queryData.pageSize"
						    :total="total"
						    @change="getImeiList"></ks-page-group>
					</div>	
				</div>					
			</div>	
		</div>
	</div>
</template>
<script>
	
	export default{
		vuem:['ammeter.get_imei_list','ammeter.delete_imei','ammeter.add_imei'],
		data(){
			return{
				id:'',
				pageGroupVal:1,
				show: false,
				subData: {
					imei: ''
				},
				queryData:{
					imei:''
				},
				total:0,
				imeiList:[],
			}
		},
		methods:{
			submit:function(){
				this.$m.ammeter.add_imei(this.subData).then(res => {
	            if (res.code === 10000) {
				   this.search()
				   this.showAdd()
				   this.subData.imei = ''
				   $KsDialog.success('新增成功!');
	            }
	          })
			},
			showAdd:function(){
				this.show= !this.show
				this.subData.imei = ''
			},
			//是否删除
			isDelete:function(imei){
				$KsModal.confirm({title:'系统提示',message:'确认要删除吗？'},()=>{
					 this.delet(imei);
				})
			},
			delet:function(imei){
				this.$m.ammeter.delete_imei({imei:imei}).then(res => {
	            if (res.code === 10000) {
	             this.search()
	            }
	          })
			},
			search:function(){
				this.queryData.pageIndex=1;
				this.getImeiList();
			},
			getImeiList:function(){
	          this.$m.ammeter.get_imei_list(this.queryData).then(res => {
	            if (res.code === 10000) {
	              this.imeiList = res.data
	              this.total=res.total
	            }
	          })
	        }
		},
		ready(){
      		this.getImeiList()
		},
	}
</script>
<style scoped lang="scss">
</style>