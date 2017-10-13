import loading from './loading.vue'

export default function install(Vue){
	let KsLoad=Vue.extend(loading),instance;
	function init(){
		instance=new KsLoad({el:document.createElement('div')})
		instance.$appendTo(document.body)
	}

	function KsLoadModel(){
		init()	 
	}
	KsLoadModel.index=0
	KsLoadModel.show=function(){
		KsLoadModel.index++
		if(!instance){
			KsLoadModel()
			setTimeout(()=>{instance.ajax_loading=true},10)
		}else{
			instance.ajax_loading=true
		}
	}
	KsLoadModel.hide=()=>setTimeout(function(){
			KsLoadModel.index--
			if(KsLoadModel.index<=0){
				KsLoadModel.index=0
				instance.ajax_loading=false		
			}
	},200) 

	Window.prototype.$KsLoad=KsLoadModel
}




