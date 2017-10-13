<template>
    <div>
            <h1></h1>
               

<!-- 
            <div class="login-box pb20">
                <div class="row-auto tc mt20 lh36">
                    <div class="col"><h3>系统登录</h3> </div>
                </div>
                <div class="row-auto mt120">
                    <div class="col w120 r">用户名：</div>
                    <div class="col"><input type="text" class="kcp_text w260" v-model="user.userName"> </div>
                </div>
                <div class="row-auto  mt20">
                    <div class="col w120 r">密&nbsp;&nbsp;&nbsp;码：</div>
                    <div class="col"><input type="password" class="kcp_text w260" v-model="user.password"> </div>
                     <div class="col-auto"></div>
                </div>
                <div class="row-auto  mt20 tc">
                    <div class="col-auto"><button @click='bknext' class="kcp_nbtn w120">登录</button> </div>
                </div>
            </div>        -->



    

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
                        <div class="col w260"><input type="text" class="kcp_text w260" v-model="user.userName"></div>
                    </div>
                    <div class="row mt20">
                        <div class="col lh36 r pr10">密&nbsp;&nbsp;&nbsp;码：</div>
                        <div class="col w260"><input type="password" class="kcp_text w260" v-model="user.password"></div>
                    </div>
                    <div class="row mt20">
                        <div class="col lh36 r pr10"></div>
                        <div class="col w260"><button @click='bknext' class="kcp_nbtn w120">登录</button>
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
        vuem:['common.dic_list'],
        data (){
            return {
                user:{
                    userName:'',
                    password:'',
                }
            }
        },
        methods:{
           
            bknext(){
                // this.getDic()
                if(this.user.userName=='admin',this.user.password=='password@1'){
                    this.$router.go({name:'bkhome'})
                    Service.session.set('menu',bkMenu)
                }else{
                    alert('用户名或者密码不正确！')
                }
                
            },
            
            getDic(){
                this.$m.common.dic_list().then(res=>{
                let dicList=res.data.reduce((obj,curr)=>{//类型分类
                   obj[curr.type]?obj[curr.type].push(curr):obj[curr.type]=new Array(curr)
                   return obj
                 },{})
                  Service.session.set('dictype',dicList)
                })
            }                                    
        },
        ready (){
           
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
