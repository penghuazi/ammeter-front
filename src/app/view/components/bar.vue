
<template>	
		<div  v-el:bar class="kcp_bar"   @mousedown.prevent="movedown" @mousemove.prevent="moves" :style="{'height':barheight}">
			<div class="kcp_bar-bgline" :style="{'height':lineheight,'background-color':bgcolor}"></div>
			<template v-if='rate'>
				<div class="kcp_bar-maskline" :style="{'width':movewidth+'px','height':lineheight,'background-color':lingcolor}"></div>
				<div ondragstart="return false" class="kcp_bar-but"  :style="{'left':movewidth+'px'}" id='bar' ></div>
			</template>
			<div v-else class="kcp_bar-bgline" :style="{'width':currentrate+'%','height':lineheight,'background-color':lingcolor}"></div>
		</div>
</template>
<script>
	export default{
		data(){
			return{
				movewidth:0,//鼠标移动的px
				is_move:false,//鼠标点击事件是否开始
				downx:0//鼠标点击时x轴坐标
			}
		},
		props:{
			max:{type:null,default:0},//最大数值
			limitcurrent:{type:null,default:99999999},//限制最大值
			current:{type:null,default:0},//当前数值
			rate:{type:Boolean,default:true},//是否可以滑动 false不可交互
			barheight:{type:String,default:'24px'},//滑动条和组件高度
			lineheight:{type:String,default:'5px'},//线条高度
			currentrate:{type:null,default:'0'},//占百分比
			bgcolor:{type:String,default:'rgba(206, 221, 233,0.5)'},//背景色
			lingcolor:{type:String,default:'#163b65'},//线条色
			
		},
		computed:{
			curr:{
				get(){
					return	parseInt((this.movewidth/this.$els.bar.offsetWidth)*this.max)
				},
				set(newval){// 输入框数据影响滚动条
					this.movewidth=parseInt(newval/this.max*this.$els.bar.offsetWidth)
				}
			}
		},
		methods:{
			movedown(e){
				let event=e||window.event;
				this.is_move=this.rate;
				event.target.id!='bar'&&(this.movewidth=event.offsetX)
				this.downx=event.clientX;
			},
			removedoc(){
				this.is_move=false;
				this.current==0&&(this.movewidth=0)
			},
			moves(e){
				if(this.is_move){
					let event=e||window.event;		
					let movex=event.clientX;
					this.movewidth=movex-this.downx+this.movewidth
					this.downx=movex
				}
			}
		},
		watch:{
			'current':function(value){
				// 输入框数据影响滚动条
				this.is_move||(this.curr=value)
				if(value>this.limitcurrent){
					this.current=this.limitcurrent
					this.is_move=false
				}
			},
			'movewidth':function(move){
				move<0&&(this.movewidth=0)
				move>this.$els.bar.offsetWidth&&(this.movewidth=this.$els.bar.offsetWidth)
				// 拖动事件下影响滚动条
				this.is_move&&(this.current=parseInt((this.movewidth/this.$els.bar.offsetWidth)*this.max))
			}
		},
		ready(){
			Service.eventUtil.addHandler(document,'mouseup',this.removedoc)
			this.curr=this.current
		},
		detached(){
			Service.eventUtil.removeHandler(document,'mouseup',this.removedoc)
		}
	}
</script>
