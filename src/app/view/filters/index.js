import {todate,todatetime} from './date.js'
import substring from './substr.js'
import trim from './trim.js'
const Filters={
trim,substring,todate,todatetime
}

export default function install(Vue) {
	if(!Vue) {console.error('please install Vue')}
	// *** register filter
	Object.keys(Filters).forEach(k => Vue.filter(k, Filters[k]))
}