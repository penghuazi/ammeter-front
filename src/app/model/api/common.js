export default {
   	/**
	 * 通用接口
	 */
	'dic_list':{get:'dic/list'},//获取状态信息
	'login':{save:'login/login'}, // login
	/**
	 * 省市区
	 */
	get_province:{get:'address/province'},
	get_district:{get:'address/districtId/{cityId}'},
	get_city:{get:'address/city/{provinceId}'}
}