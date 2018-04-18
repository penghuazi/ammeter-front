import KsModal from './ksModal.vue'

export default function install(Vue){
	let KsTemplate=Vue.extend(KsModal),
		KsDialog;

	function init(){
		KsDialog=new KsTemplate({el:document.createElement('div')})
		KsDialog.$appendTo(document.body)
	}
	function KsModel(){
		init()	 
	}

	Object.keys(KsModal.methods).forEach(t=>{		
		KsModel[t]=function(message,callback){
			!KsDialog&&KsModel()
			KsDialog[t](message,callback)
		}
	})
	Window.prototype.$KsModal=KsModel
	// return KsModel
}




