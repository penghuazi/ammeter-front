<template>
    <div>
       <div class="kcp_router_title mb20">
           联系人配置
	   </div>
       <div class="base-box">
           <div class="form-column">
               第一联系人
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="contacts.contactName1"/>
			</div>
			<div class="form-column">
			   联系人电话
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="contacts.contactPhone1"/>
			</div>
       </div>
       <div class="base-box">
           <div class="form-column">
               第二联系人
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="contacts.contactName2"/>
			</div>
			<div class="form-column">
			   联系人电话
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="contacts.contactPhone2"/>
			</div>
       </div>
       <div class="base-box">
           <div class="form-column">
               第三联系人
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="contacts.contactName3"/>
			</div>
			<div class="form-column">
			   联系人电话
			</div>
			<div class="form-container ">
				<input type="text" class="kcp_text "  v-model="contacts.contactPhone3"/>
			</div>
       </div>
       <div class="base-box form tc">
			<button  @click="save()" class="kcp_nbtn w120 mt20 mr10">保存</button>
		</div>
    </div>
</template>
<script>
    export default{
        vuem:['ammeter.get_contact','ammeter.update_contact'],
        data () {
            return{
                contacts:{
                    contactName1 : '',
                    contactName2 : '',
                    contactName3 : '',
                    contactPhone1 : '',
                    contactPhone2 : '',
                    contactPhone3 : ''
                }

            }
        },
        ready() {
            this.getContact()
        },
        methods: {
            getContact: function () {
                this.$m.ammeter.get_contact().then(res => {
                    if(res.code==10000){
                        this.contacts= {
                            ...res.data
                        }
		         	 }
                }, err => {
                    $KsDialog.err('数据初始化失败');
                })
            },
            save:function(){
                let args = {
                    ...this.contacts
                }
				this.$m.ammeter.update_contact(args).then(response=> {
		         	 if(response.code==10000){
                           $KsDialog.success('保存成功!');
                           this.getContact();
		         	 }
		        },err=>{ console.log(err.data);} )
			}
        }
    }
</script>
<style scoped lang="scss">

</style>
