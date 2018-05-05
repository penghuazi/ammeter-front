export default {
	//获取电表列表
	get_ammeter_list:{save:'device/list'},
	get_ammeter_network_list:{save:'network/networkList'},
	update_status:{save:'/device/updateStatus'},

	//统计报表
	dailyReport:{get:'device/dailyReport/{ammeterId}/{reportDate}'},
	dailyNetworkReport:{get:'network/list/{imsi}/{queryDate}'},

	// gis 列表
	get_position_list:{save:'/position/list'},
	// 新增 gis
	add_position:{save:'/position/create'},
	// gis 详情
	get_position_info:{get:'/position/ammeterPositionInfo/{positionId}/{sn}'},

	// 设备总览
	get_position_all:{save: '/position/gisList'}

}