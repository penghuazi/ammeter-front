<template>
	<div class="kcp_info">
		<div class="kcp_router_title mb20">
			配置信息
		</div>

		<div class="base-box form">
			<div class="form-column">
				NCD
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.address"/>
			</div>
			<div class="form-column">
				APN
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.remark"/>
			</div>
		</div>
		<div class="base-box form">
			<div class="form-column">
				NB
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text w220"  v-model="position.address"/>
			</div>
			<div class="form-column">
				
			</div>
			<div class="form-container ">
				
			</div>
		</div>

		<div class="base-box form tc">
			<button  @click="saveOrUpdate()" class="kcp_nbtn w120 mt20 mr10">保存</button>

			<button  @click="back()" class="kcp_lbtn w120 mt20 mr10">返回</button>
		</div>
	</div>
</template>
<script>
	
	export default{
		vuem:['ammeter.get_position_info'],
		data(){
			return{
				id:'',
				position:{}
			}
		},
		methods:{
			back:function(){
				window.history.back();
			},
			saveOrUpdate:function(){
				this.$m.ammeter.update_position(this.position).then(res => {
					if(response.code==10000){
		         	 	 $KsDialog.success('保存成功!');
		         	 	 window.history.back();
		         	 }
				})
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
      		this.getPositionInfo(this.$route.query.id)
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