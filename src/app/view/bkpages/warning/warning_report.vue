<template>
	<div class="kcp_info">
		<div class="kcp_router_title mb20">
			告警总览
		</div>


		<ul class="kcp_home_nav">
           <li @click="$router.go({name:'my_market',query:{status:'2'}})">
              <ul>
                <li>{{0}}</li>
                <li>待审核的方案</li>
              </ul>
             <i class="ks kcp-check"></i>
           </li>
           <li @click="$router.go({name:'my_market',query:{status:'4'}})">
              <ul>
                <li>{{0}}</li>
                <li>未开始的方案</li>
              </ul>
             <i class="ks kcp-wait_time"></i>
           </li>
           <li @click="$router.go({name:'my_market',query:{status:'5'}})">
              <ul>
                <li>{{0}}</li>
                <li>进行中的方案</li>
              </ul>
             <i class="ks kcp-ongoing"></i>
           </li>
           <li> </li>
      </ul>


		<div id="main" style="width:100%;height:300px;"></div>

		<ul class="kcp_home_nav">
            <li @click="$router.go({name:'my_market',query:{status:'2'}})">
              <ul>
                <li>{{res_data.historyWarnings}}</li>
                <li>历史告警</li>
              </ul>
             <i class="ks kcp-check"></i>
           </li>
           <li @click="$router.go({name:'my_market',query:{status:'4'}})">
              <ul>
                <li>{{res_data.onlineDevices}}</li>
                <li>在线设备</li>
              </ul>
             <i class="ks kcp-wait_time"></i>
           </li>
           <li @click="$router.go({name:'my_market',query:{status:'5'}})">
              <ul>
                <li>{{res_data.totalDevices}}</li>
                <li>总设备</li>
              </ul>
             <i class="ks kcp-ongoing"></i>
           </li>
          
      	</ul>
	</div>
</template>
<script>
	var echarts = require('echarts');
	export default{
		vuem:['ammeter.get_warning_report'],
		data(){
			return{
				res_data:{},
				report_data:{
				    title : {
				        text: '当前告警总览',
				        // subtext: '纯属虚构',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data: ['不在线设备','信号弱设备','正常设备']
				    },
				    series : [
				        {
				            name: '访问来源',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:[
				            	
				            	{value:0, name:'不在线设备'},
				            	{value:0.1, name:'信号弱设备'},
				            	{value:0.9, name:'正常设备'}
				                
				            ],
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
				},
			}
		},
		methods:{
			ext:function(option){
		    	var myChart = echarts.init(document.getElementById('main'));        
	        	// 绘制图表
	            myChart.setOption(option);
		    },
		    getWarningReport:function(){
	          this.$m.ammeter.get_warning_report({}).then(res => {
	            if (res.code === 10000) {
	            	this.res_data= res.data
	            	this.report_data.series[0].data[0].value = res.data.warningCategories.warningOfflineDevices
	            	this.report_data.series[0].data[1].value=res.data.warningCategories.warningRsrqDevices
	            	this.report_data.series[0].data[2].value=res.data.warningCategories.normalDevices
	              	this.ext(this.report_data)
	            }
	          })
	        },
		},
		ready(){
			this.getWarningReport()
		},
	}
</script>
<style scoped lang="scss">
.bgc{
	background-color: rgba(22, 59, 101, 1);
}
.b1{
	border:1px solid red;
}
</style>