<template>
    <div>
       <div class="kcp_router_title mb20">
           系统配置
	   </div>
       <div class="base-box">
           <div class="form-column">
				告警电量
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="currentLimit.ruleValue"/>
			</div>
			<div class="form-column">
				告警电流
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="electricLimit.ruleValue"/>
			</div>
       </div>
       <div class="base-box form tc">
			<button  @click="save()" class="kcp_nbtn w120 mt20 mr10">保存</button>
		</div>
    </div>
</template>
<script>
    export default{
        vuem:['ammeter.get_config','ammeter.update_config'],
        data () {
            return{
               currentLimit: {
                   ruleValue: ''
               },
               electricLimit: {
                   ruleValue: ''
               }
            }
        },
        ready() {
            this.getConfigInfo()
        },
        methods: {
            getConfigInfo: function () {
                this.$m.ammeter.get_config().then(res => {
                    if(res.code==10000){
                        this.currentLimit.ruleValue = res.data.currentLimit.ruleValue
		         	 	this.electricLimit.ruleValue = res.data.electricLimit.ruleValue
                           
		         	 }
                }, err => {
                    $KsDialog.err('数据初始化失败');
                })
            },
            save:function(){
                let args = {
                    currentLimit: this.currentLimit.ruleValue,
                    electricLimit: this.electricLimit.ruleValue
                }
				this.$m.ammeter.update_config(args).then(response=> {
		         	 if(response.code==10000){
		         	 	 $KsDialog.success('保存成功!');
		         	 }
		        },response=>{ console.log(response.data);} )
			}
        }
    }
</script>
<style scoped lang="scss">

</style>
