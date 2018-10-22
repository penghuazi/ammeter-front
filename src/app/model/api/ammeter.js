export default {
	//获取电表列表
	get_ammeter_list:{save:'device/list'},
	export_file:{get: 'device/export'},
	get_ammeter_network_list:{save:'network/networkList'},
	update_status:{save:'/device/updateStatus'},

	//统计报表
	dailyReport:{get:'device/dailyReport/{ammeterId}/{reportDate}'},

	get_i_report:{get:'device/currentReport/{ammeterId}/{reportDate}'},
	get_u_report:{get:'device/voltageReport/{ammeterId}/{reportDate}'},
	get_p_report:{get:'device/powerReport/{ammeterId}/{reportDate}'},


	dailyNetworkReport:{get:'network/list/{imsi}/{queryDate}'},

	// gis 列表
	get_position_list:{save:'/position/list'},
	// 新增 gis
	add_position:{save:'/position/create'},
	//修改gis
	update_position:{save:'/position/update'},
	//修改gis
	update_position_status:{save:'/position/updateStatus'},
	// gis 详情
	get_position_info:{get:'/position/ammeterPositionInfo/{positionId}/{sn}'},

	position_delete:{get:'/position/delete/{positionId}/{sn}'},
	// 配置信息
	get_position_config:{get: '/position/config/{positionId}'},

	save_position_config:{save: '/position/config/save'},

	//保存系统配置
	system_config:{save: '/command/saveConfig'},

	// 软重启
	reset:{save: '/command/reset'},
	// 设备恢复出厂设置
	restore:{save: '/command/restore'},

	// 设备总览
	get_position_all:{save: '/position/gisList'},


	get_warning_list:{save: '/warning/list'},

	get_warning_report:{save: '/warning/home'},

	avoid_warning:{get: '/warning/avoid/{warningId}/{sn}'},

	// 终端倒入列表
	get_imei_list:{save: '/position/queryImeiList'},
	add_imei:{save: '/position/saveIMEI'},
	delete_imei:{get: '/position/deleteImei/{imei}'},


	// 系统配置
	get_config: {get: '/system/getWellCoverList'},
	update_config: {save: '/system/updateWellCover'}



}