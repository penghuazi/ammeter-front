<template>
    <div>
      <div class="kcp_router_title">
        首页
      </div>

      <div class="row tc welcome">
          <div class="col">
              <img src="../../../../assets/image/index.jpg" title="欢迎进入智能终端管理平台！">
          </div>
      </div>

      <div class="row tc">
          <div class="col">
              <h2>欢迎进入智能终端管理平台 </h2>
              <h3 class="eg">welcome come to intelligent terminal system</h3>
          </div>
      </div>

      
    </div>
</template>
<script>
    
    export default {
      vuem:[''],
        data(){
          return{
              
          }
        },
        methods:{

            ext:function(option){
                var myChart = echarts.init(document.getElementById('main'));        
                // 绘制图表
                myChart.setOption(option);
            }
          
        },
        ready(){
            
            
        }
    }
</script>
<style>
    .welcome{
        margin: 100px auto;
    }
    .eg{
        color: #ccc;
    }
</style>
