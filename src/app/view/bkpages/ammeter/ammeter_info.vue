<template>
	<div class="ammeter-info">
		<div class="kcp_router_title">
			电表终端详情&nbsp;&nbsp;&nbsp;&nbsp;【imsi:&nbsp;&nbsp;{{imsi}}】
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

		<div class="kcp_router_title"></div>

		<div class="base-box bgc">
			<div class="row mt20">
				<div class="col tr pr10">零线电流</div>
				<div class="col"><input type="text" class="kcp_text w100" readonly="true" v-model="ammeter.zeroLineCurrent">&nbsp;&nbsp;    A</div>
				<div class="col tr pr10">电网频率</div>
				<div class="col"><input type="text" class="kcp_text w100" readonly="true" v-model="ammeter.gridFrequency">&nbsp;&nbsp;    Hz</div>
			</div>
			<div class="row  mt20">
				<div class="col tr pr10">一分钟有功总平均功率</div>
				<div class="col"><input type="text" class="kcp_text w100" readonly="true" v-model="ammeter.averagePowerMinute">&nbsp;&nbsp;    kW</div>
				<div class="col tr pr10">当前有功需量</div>
				<div class="col"><input type="text" class="kcp_text w100" readonly="true" v-model="ammeter.activeDemand">&nbsp;&nbsp;   kW</div>
			</div>
			<div class="row  mt20">
				<div class="col tr pr10">当前无功需量</div>
				<div class="col"><input type="text" class="kcp_text w100" readonly="true" v-model="ammeter.reactiveDemand">&nbsp;&nbsp;    kvar</div>
				<div class="col tr pr10">当前视在需量</div>
				<div class="col"><input type="text" class="kcp_text w100" readonly="true" v-model="ammeter.apparentDemand">&nbsp;&nbsp;    kVA</div>
			</div>
			<div class="row  mt20">
				<div class="col tr pr10">表内温度</div>
				<div class="col"><input type="text" class="kcp_text w100" readonly="true" v-model="ammeter.temperature">&nbsp;&nbsp;    ℃</div>
				<div class="col tr pr10">时钟电池电压(内部)</div>
				<div class="col"><input type="text" class="kcp_text w100" readonly="true" v-model="ammeter.clockCellVoltage">&nbsp;&nbsp;    V</div>
			</div>
			<div class="row  mt20">
				<div class="col tr pr10">停电抄表电池电压 (外部)</div>
				<div class="col"><input type="text" class="kcp_text w100" readonly="true" v-model="ammeter.noPowerCellVoltage">&nbsp;&nbsp;    V</div>
				<div class="col tr pr10">内部电池工作时间</div>
				<div class="col"><input type="text" class="kcp_text w100" readonly="true" v-model="ammeter.batteryWorkingTime">&nbsp;&nbsp;    分</div>
			</div>
			<div class="row  mt20">
				<div class="col tr pr10">(当前)正向有功总电能</div>
				<div class="col"><input type="text" class="kcp_text w100" readonly="true" v-model="ammeter.activePower">&nbsp;&nbsp;    kWh</div>
				<div class="col tr pr10">(当前)反向有功总电能</div>
				<div class="col"><input type="text" class="kcp_text w100" readonly="true" v-model="ammeter.reverseActivePower">&nbsp;&nbsp;    kWh</div>
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
		vuem:['ammeter.get_ammeter_list','ammeter.update_status','ammeter.dailyReport'],
		data(){
			return{
				imsi:'',
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
		                textStyle:{color:'red'},    
		                formatter:function(){
		                    return 'loading';
		                }
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
		                        formatter: '{value} kW/h'
		                    }
		                }
		            ],
		            series : [
		                // {
		                //     name:'领取量',
		                //     type:'line',
		                //     symbol:'line',
		                //     itemStyle:{
		                //             normal:{
		                //                 lineStyle:{
		                //                     color:'blue',
		                //                     type:'dashed'
		                //                 }
		                //             }                            
		                            
		                //     },                    
		                //     data:[11, 11, 15, 13, 12, 13, 10],
		                //     // markPoint : {
		                //     //     data : [
		                //     //         {type : 'max', name: '最大值'},
		                //     //         {type : 'min', name: '最小值'}
		                //     //     ]
		                //     // }                                    
		                // },
		                {
		                    name:'使用量',
		                    type:'line',
		                    data:[

		                    	
		                    ],
		                    
		                    // markPoint : {
		                    //     data : [
		                    //         {name : '周最低', value : -2, xAxis: 1, yAxis: 0},
		                    //         {name : '周最低', value : -2, xAxis: 3, yAxis: 5}
		                    //     ]
		                    // }
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
				this.$m.ammeter.dailyReport({ammeterId:id,reportDate:this.toDay}).then(res=>{
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
