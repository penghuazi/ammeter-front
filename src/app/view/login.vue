<template>
    <div>
        <div class="login-box pt40 pb40 pr30 pl30">
            <div class="row">
                <div class="col br1s">
                    <div class="row">
                        <div class="col">
                            <img src="../../assets/image/logo.png" style="width:160px;height160px; margin-left:80px;">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col cp tc">
                            <h2>十&nbsp;钉&nbsp;物&nbsp;联</h2>
                        </div>
                    </div>
                     
                </div>
                <div class="col w360">
                    <div class="row">
                        <div class="col tc" style="font-family: Microsoft Yahei; font-size:18px;color:rgba(22, 59, 101, 0.8);">系统登录</div>
                    </div>
                    <div class="row mt20">
                        <div class="col lh36 r pr10">用户名：</div>
                        <div class="col w260"><input type="text" class="kcp_text w260" v-model="user.username | trim"></div>
                    </div>
                    <div class="row mt20">
                        <div class="col lh36 r pr10">密&nbsp;&nbsp;&nbsp;码：</div>
                        <div class="col w260"><input type="password" class="kcp_text w260" v-model="user.password | trim"></div>
                    </div>
                    <div class="row mt20">
                        <div class="col lh36 r pr10"></div>
                        <div class="col w260"><button @click='login' class="kcp_nbtn w120">登录</button>
                            <a @click="" class="ml30">找回密码</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
 import bkMenu from '../config/mock/bank.js'
    export default {
        vuem:['common.login'],
        data (){
            return {
                show:false,
                errormsg:'',
                remember:'',
                user:{
                    username:'',
                    password:'',
                }
            }
        },
        methods:{
           
            // bknext(){
            //     // this.getDic()
            //     if(this.user.userName=='admin',this.user.password=='password@1'){
            //         this.$router.go({name:'bkhome'})
            //         Service.session.set('menu',bkMenu)
            //     }else{
            //         alert('用户名或者密码不正确！')
            //     }
                
            // },

            bknext(){           
                this.$router.go({name:'bkhome'})
                Service.session.set('menu',bkMenu)
            },

            login(){
                // this.$validate()
                // if(this.$validatorlogin.invalid) return;   
                this.getLogin()

            },
            
            getLogin(){
                // this.bknext()
                this.$m.common.login(this.user).then(res=>{
                    if(res.code===100001){
                        this.errormsg=res.message
                    }else{
                         !!this.remember?Service.cookie.set('login',JSON.stringify(this.user),10):Service.cookie.clear('login')                
                         let data=res.data

                         // this.getDic(data.dictionaryList)//状态数据

                         Service.session.set('kcpLesseeId',data.authToken)
                         Service.session.set('kcpLesseeType',data.channelId)
                         Service.session.set('user',data)
                         this.bknext()
                    }
                })
            },
            getDic(list){
                let dicList=list.reduce((obj,curr)=>{//类型分类
                   obj[curr.type]?obj[curr.type].push(curr):obj[curr.type]=new Array(curr)
                   return obj
                 },{})
                  Service.session.set('dictype',dicList)
            }                                    
        },
        ready (){
           let logincookie=Service.cookie.get('login')
            if(!!logincookie){
                this.loginName= JSON.parse(logincookie)
                this.remember=true
            }
        }        
    }
</script>
<style>
   /* .col{
        border: 1px solid red;
    }*/
   /* .cp{
        color: rgba(39, 41, 43, 0.8);
        font-size: 36px;
        font-family: "黑体";
    }*/
    .br1s{
        border-right: 1px solid #ccc;
    }
   .login-box{
        margin: 200px auto;
        border: 1px solid #ccc;
        width: 680px;
        height: auto;
        border-radius:5px;

   }
</style>
