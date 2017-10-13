<template>
	<div class="ammeter-info">
		<div class="kcp_router_title">
			无线终端详情&nbsp;&nbsp;&nbsp;&nbsp;【imsi: &nbsp;&nbsp;{{imsi}}】
		</div>


		<div id="main" style="width:100%;height:600px;"></div>


		<div class=" row datePack mt20">
			<div class="col r pr10">统计日期</div>
			<div class="col ">
				<ks-date-picker type="date" v-bind:value.sync="toDay" class="l"></ks-date-picker>
			</div>
		</div>
		

		<div class="kcp_router_title"></div>

		<div class="base-box bgc">
			<div class="row mt20">
				<div class="col tr pr10">cellid</div>
				<div class="col"><input type="text" class="kcp_text w100" readonly="true" v-model="ammeter.cellid">&nbsp;&nbsp;    </div>
				<div class="col tr pr10">rssi</div>
				<div class="col"><input type="text" class="kcp_text w100" readonly="true" v-model="ammeter.rssi">&nbsp;&nbsp;    </div>
			</div>
		</div>

		
		<div class="kcp_router_title"></div>
		<div class="base-box tc">
			<button  @click="back()" class="kcp_lbtn w120 mt20 mr10">返回</button>
		</div>

		
	</div>
</template>
<script>
	var echarts = require('echarts');
	export default{
		vuem:['ammeter.dailyNetworkReport'],
		data(){
			return{
				imsi:'',
				toDay: new Date().toJSON().slice(0,10),
				toMonth:new Date().getMonth()+1,
				ammeter:{
					cellid:'',
					rssi:''
				},
				xAxis_data:[],
				report_data:{
	            	title : {
	                // text: '未来一周气温变化'
	            	},
		            tooltip : {
		                trigger: 'axis',
		                textStyle:{color:'red'},    
		                formatter:function(){
		                    return 'loading';
		                }
		            },
		            legend: {
		                orient:'vertical',
		                x:'left',
		                data:['rsrq']
		            },
	            	calculable : true,
		            xAxis : [
		                {
		                    type : 'category',
		                    boundaryGap : false,
		                    data : ['0h \n 9-17','1h','2h','3h','4h','5h'
		                    		,'6h','7h','8h','9h','10h','11h','12h'
		                    		,'13h','14h','15h','16h','17h','18h'
		                    		,'19h','20h','21h','22h','23h'
		                    ]
		                }
		            ],
		            yAxis : [
		                {
		                    type : 'value',
		                    axisLabel : {
		                        formatter: '{value} dBm'
		                    }
		                }
		            ],
		            series : [
		                {
		                    name:'rsrq',
		                    type:'line',
		                    data:[ ],
		                },
		                               
		            ]
		        },
			}
		},
		methods:{

			getReport:function(id){
				this.$m.ammeter.dailyNetworkReport({imsi:id,queryDate:this.toDay}).then(res=>{
					if (res.code==10000) {
						console.log(this.report_data.series);
						console.log('报表数据',res.data);
						this.report_data.series[0].data=res.data.rsrq;
						this.ammeter.cellid=res.data.celli;
						this.ammeter.rssi=res.data.rssi;
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
			this.getReport(this.$route.query.imsi);

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
