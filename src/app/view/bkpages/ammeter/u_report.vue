<template>
	<div class="ammeter-info">
		<div class="kcp_router_title">
			电表终端详情&nbsp;&nbsp;&nbsp;&nbsp;【设备名称:&nbsp;&nbsp;{{name}}】
		</div>


		<div id="main" style="width:100%;height:400px;"></div>


		<div class=" row datePack mt20">
			<div class="col r pr10">统计日期</div>
			<div class="col ">
				<ks-date-picker type="date" v-bind:value.sync="toDay" class="l"></ks-date-picker>
			</div>
		</div>
		
		<!-- <div class=" row datePack mt20">
			<div class="col r pr10">统计月份</div>
			<div class="col">
				<ks-date-month type="datemulti" 
   					 v-bind:value.sync="toMonth" 
    				 v-on:change="">
    		    </ks-date-month>
			</div>
		</div> -->
	
	</div>
</template>
<script>
	var echarts = require('echarts');
	export default{
		vuem:['ammeter.get_ammeter_list','ammeter.update_status','ammeter.get_u_report'],
		data(){
			return{
				imsi:'',
				name: '',
				toDay: new Date().toJSON().slice(0,10),
				toMonth:new Date().getMonth()+1,
				ammeter:{},
				xAxis_data:[],
				report_data:{
	            	title : {
	                // text: '未来一周气温变化'
	            	},
		            tooltip : {
		                trigger: 'axis',
		                textStyle:{color:'#fff'}
		            },
		            legend: {
		                orient:'vertical',
		                x:'left',
		                data:['领取量','使用量']
		            },
	            	calculable : true,
		            xAxis : [
		                {
		                    type : 'category',
		                    boundaryGap : false,
		                    data : ['0h \n 9-17','1h','2h','3h','4h','5h','6h','7h','8h','9h','10h','11h','12h'
		                    		,'13h','14h','15h','16h','17h','18h'
		                    		,'19h','20h','21h','22h','23h'
		                    ]
		                }
		            ],
		            yAxis : [
		                {
		                    type : 'value',
		                    axisLabel : {
		                        formatter: '{value} V/h'
		                    }
		                }
		            ],
		            series : [
		                
		                {
		                    name:'使用量',
		                    type:'line',
		                    data:[

		                    	
		                    ],
		                    
		                }                
		            ]
		        },
			}
		},
		methods:{


			
			//获取电表数据列表
			getAmmeterList:function(data) {
				//请求api
	    		this.$m.ammeter.get_ammeter_list(data).then(response=> {
		         	 if(response.code==10000){
		         	 	 this.ammeter=response.data[0];
		         	 }
		        },response=>{ console.log(response.data);} )
			},
			getReport:function(id){
				this.$m.ammeter.get_u_report({ammeterId:id,reportDate:this.toDay}).then(res=>{
					if (res.code==10000) {
						console.log(this.report_data.series);
						console.log('报表数据',res.data);
						this.report_data.series[0].data=res.data;
						// this.report_data.series[1].data=res.data;

						console.log(this.report_data);
					}
				});
			},
			back:function(){
		        window.history.back();
		    },
		    ext:function(option){
		    	var myChart = echarts.init(document.getElementById('main'));        
	        	// 绘制图表
	            myChart.setOption(option);
		    }
			
		},
		ready(){
			this.imsi=this.$route.query.imsi;
			this.name=this.$route.query.name;
			this.getReport(this.$route.query.imsi);
			this.getAmmeterList({imsi:this.$route.query.imsi});
			
			setTimeout(()=>{
				this.ext(this.report_data);
			},500);

		},
		watch: {
			toDay:function(){
				this.getReport(this.$route.query.imsi);
				setTimeout(()=>{
					this.ext(this.report_data);
				},500);
			},
		}
	}
</script>
<style >
	.report{
		margin: 100px auto;
	}
</style>
