import KsPageGroup from 'KsComponents/KsPageGroup/index.1.1.0.js'
import KsDatePicker from 'KsComponents/KsDatePicker/index.1.0.0.js'
import KsDateMonth from 'KsComponents/KsDateMonth/index.1.0.0.js'
import KsSwitch from 'KsComponents/KsSwitch/index.js'
import KsCheckbox from 'KsComponents/KsCheckbox/index.js'
import KsCheckboxGroup from 'KsComponents/KsCheckboxGroup/index.js'
import KsRadio from 'KsComponents/KsRadio/index.1.0.0.js'

import modal_center from './ModalCenter.vue'
import bar from './bar.vue'
import ordernumber from './orderNumber.vue'

const compontent={
	modal_center,KsDatePicker,KsDateMonth,KsPageGroup,KsSwitch,KsCheckbox,KsCheckboxGroup,KsRadio,bar,ordernumber
}
	

// 插件
import loading from './loading'
import dialog from './dialog'
import KsModal from './KsModal'
const Plugins = {
  loading,dialog,KsModal
};

export default function install(Vue){
	let template=Object.keys(compontent).reduce((arr,k)=>{
		let temp;
		if(compontent[k].template){
			temp={name:k,val:compontent[k]}
		}else{
			temp=Object.keys(compontent[k]).map(key=>{
				return {name:key,val:compontent[k][key]}
			})
		}
		return arr.concat(temp)
	},[])
	template.forEach(i => Vue.component(i.name,i.val))

	 // install plugins.
	  Object.keys(Plugins).forEach(k => {
	    	Plugins[k](Vue);
	  });
}