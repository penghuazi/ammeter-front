<template>
	<div class="kcp_info">
		<modal_center width="300px"  :show.sync="show">       
	       	<div  class="pb10 ovh" style="width:95%; margin:5px auto;">
	       		<div class="modal-taitle">
		
					<div class="kcp_router_title mb20">
						消除告警
					</div>
	       		</div>
	       		<div class="tc">
					<input type="text" class="kcp_text w260" placeholder="请输入消除原因" v-model="subData.reason">
				</div>
				<div class="mt30 mb10">
					
					<div class="modal-right tc">
						<button @click="submit" class="kcp_nbtn w120  mr10">保存</button>
						<button @click="showMoal" class="kcp_nbtn w120  ">取消</button>
					</div>
				</div>
	       	</div>
	    </modal_center>
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
					<th>消除原因</th>
					<th>操作</th>
				</tr>
				<tr v-for="w in warningList">
					<td>{{w.id}}</td>
					<!-- <td>{{w.imsi}}</td> -->
					<td>{{w.number}}</td>
					<td>{{w.warningDate}}</td>
					<td>{{w.statusName}}</td>
					<td>{{w.warningDesc}}</td>
					<td>{{w.reason}}</td>
					<td><a v-if="w.warningStatus==0" @click="showMoal(w.warningId)">消除告警</a></td>
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
				show:false,
				id:'',
				subData:{
					reason:''
				},
				warningId:'',
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
			submit:function(){
				this.avoid(this.warningId)
			},
			showMoal:function(id){
				this.show = !this.show
				this.warningId = id
				this.subData.reason = ''
			},
			back:function(){
				window.history.back();
			},
			avoid:function(id){
				this.$m.ammeter.avoid_warning({warningId:id,sn:'position',reason:this.subData.reason}).then(res =>{
					if (res.code === 10000) {
		              $KsDialog.success('消除成功!');
					  this.getWarningInfo(this.id)
					  this.showMoal()
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