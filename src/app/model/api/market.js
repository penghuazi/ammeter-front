export default {

	/**
	* 首页
	*/
	index_top:{get:'coupon/indexTop'},
	get_homeinfo:{get:'program/getHomePageInfo/{id}'},

	/**
	 * 我的营销方案
	 */





	/**
	 * ************************************************************************************
	 */







	//设置方案
	create_programme:{save:'/program/createOrUpdateProgramBase'},
	//获取结算率
	init_rate:{get:'/coupon/getRate/{id}'},
	//券码规则设置
	coupon_insert:{save:'coupon/insert'},

}