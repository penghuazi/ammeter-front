export default {
	//获取电表列表
	get_ammeter_list:{save:'device/list'},
	get_ammeter_network_list:{save:'network/networkList'},
	update_status:{save:'/device/updateStatus'},

	//统计报表
	dailyReport:{get:'device/dailyReport/{ammeterId}/{reportDate}'},
	dailyNetworkReport:{get:'network/list/{imsi}/{queryDate}'},

	


}