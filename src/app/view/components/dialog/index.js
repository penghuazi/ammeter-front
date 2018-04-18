import Dialog from './Kdialog.vue'

export default function install(Vue){
	let KsTemplate=Vue.extend(Dialog),
		KsDialog;

	function init(){
		KsDialog=new KsTemplate({el:document.createElement('div')})
		KsDialog.$appendTo(document.body)
	}

	function KsDialogModal(){
		init()	 
	}

	Object.keys(Dialog.methods).forEach(t=>{		
		KsDialogModal[t]=function(message,callback){
			!KsDialog&&KsDialogModal()
			KsDialog[t](message,callback)
		}
	})
	Window.prototype.$KsDialog=KsDialogModal
	// return KsDialogModal
}




