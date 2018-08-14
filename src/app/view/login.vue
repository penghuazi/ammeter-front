<template>
    <div id="login_page">
        <div class="login-box pt40 pb40 pr30 pl30">
            <div class="row">
                <div class="col br1s">
                    <div class="row">
                        <div class="col">
                            <img src="../../assets/image/logo3.png" style="width:160px;height160px; margin-left:80px;">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col cp tc">
                            <b>十&nbsp;钉&nbsp;物&nbsp;联</b>
                        </div>
                    </div>
                     
                </div>
                <div class="col w360">
                    <div class="row">
                        <div class="col tc" style="font-family: Microsoft Yahei; font-size:18px;color:rgba(22, 59, 101, 0.8);">系统登录</div>
                    </div>
                    <div class="row mt20">
                        <div class="col lh36 r pr10">用户名：</div>
                        <div class="col w260"><input style= "background-color:transparent " type="text" class="kcp_text w260" bcn v-model="user.username | trim"></div>
                    </div>
                    <div class="row mt20">
                        <div class="col lh36 r pr10">密&nbsp;&nbsp;&nbsp;码：</div>
                        <div class="col w260"><input style= "background-color:transparent " type="password" class="kcp_text w260 bcn" v-model="user.password | trim"></div>
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
        <div class="tc" style="">
                CopyRight 2018  版权所有  十钉(上海)  苏ICP备18031899号
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
  /*   .col{
        border: 1px solid red;
    } */
    .bcn {
        background-color: transparent;
    }
    #login_page {
        height: 100%;
       border: 1px solid #fff;
       /* background: url('../../assets/image/login_bg.jpg') no-repeat ;
       background-size:cover;   */
       background: -webkit-linear-gradient(#336699, #ccc); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#336699, #ccc); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#336699, #ccc); /* Firefox 3.6 - 15 */
        background: linear-gradient(#336699, #ccc); /* 标准的语法（必须放在最后） */
    }
    .cp{
        color: rgba(39, 41, 43, 0.8);
        font-size: 30px;
        font-family: "黑体";
    }
    .br1s{
        border-right: 1px solid #ccc;
    }
   .login-box{
        margin: 200px auto;
        border: 1px solid #ccc;
        /* border-left:1px solid #ccc;
        border-top:1px solid #ccc; */
        box-shadow: 10px 10px 5px #336699;
        width: 680px;
        height: auto;
        border-radius:5px;

   }
</style>
