import ks_click_outside from './KsClickOutside.js'
import limit_number_fixed from './limit-number-fixed.js'
import auth from './auth.js'
var directives = {
    ks_click_outside,limit_number_fixed,auth
}
export default function install(Vue) {
    if(!Vue) {console.error('please install Vue')}
    Object.keys(directives).forEach(k => Vue.directive(k, directives[k]));
};
