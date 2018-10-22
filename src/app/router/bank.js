export default {
        component: function(resolve){
            require(['../view/bkpages/index.vue'],resolve)
        },
        subRoutes:{

            // 会员主页
            'home':{
                name:'bkhome',
                title:'主页',
                component: function(resolve){
                    require(['../view/bkpages/home/index.vue'],resolve)
                }
            },
            
             ////////////电表终端管理///////////////////////////////////////////
            'ammeter_list':{
                name:'ammeter_list',
                title:'电表终端管理',
                component: function(resolve){
                    require(['../view/bkpages/ammeter/ammeter_list.vue'],resolve)
                }
            },
             ////////////电表无线管理///////////////////////////////////////////
            'ammeter_wireless_list':{
                name:'ammeter_wireless_list',
                title:'采集终端管理',
                component: function(resolve){
                    require(['../view/bkpages/ammeter/ammeter_wireless_list.vue'],resolve)
                }
            },
            
             ////////////电表终端详情///////////////////////////////////////////
             
            'ammeter_info':{
                name:'ammeter_info',
                title:'电表终端详情',
                component: function(resolve){
                    require(['../view/bkpages/ammeter/ammeter_info.vue'],resolve)
                }
            },
            'report_info':{
                name:'report_info',
                title:'电表终端详情',
                component: function(resolve){
                    require(['../view/bkpages/ammeter/report_info.vue'],resolve)
                }
            },
             ////////////无线终端详情///////////////////////////////////////////
            'ammeter_wireless_info':{
                name:'ammeter_wireless_info',
                title:'电表终端详情',
                component: function(resolve){
                    require(['../view/bkpages/ammeter/ammeter_wireless_info.vue'],resolve)
                }
            },
             ////////////电表终端管理///////////////////////////////////////////
            'gis_ammeter_list':{
                name:'gis_ammeter_list',
                title:'电表终端管理',
                component: function(resolve){
                    require(['../view/bkpages/gis/gis_ammeter_list.vue'],resolve)
                }
            },
             ////////////无线终端详情///////////////////////////////////////////
             'add_position':{
                name:'add_position',
                title:'新增',
                component: function(resolve){
                    require(['../view/bkpages/gis/add_position.vue'],resolve)
                }
            },
            'edit_position':{
                name:'edit_position',
                title:'修改',
                component: function(resolve){
                    require(['../view/bkpages/gis/edit_position.vue'],resolve)
                }
            },
            'config_position':{
                name:'config_position',
                title:'配置',
                component: function(resolve){
                    require(['../view/bkpages/gis/config_position.vue'],resolve)
                }
            },
            'position_warning_list':{
                name:'position_warning_list',
                title:'配置',
                component: function(resolve){
                    require(['../view/bkpages/gis/position_warning_list.vue'],resolve)
                }
            },
            'gis_info_map':{
                name:'gis_info_map',
                title:'电表终端详情',
                component: function(resolve){
                    require(['../view/bkpages/gis/gis_info_map.vue'],resolve)
                }
            }, 
            ///////////////////////告警管理/////////////////////////////////////
            'warning_report':{
                name:'warning_report',
                title:'电表终端详情',
                component: function(resolve){
                    require(['../view/bkpages/warning/warning_report.vue'],resolve)
                }
            }, 
            'warning_list':{
                name:'warning_list',
                title:'电表终端详情',
                component: function(resolve){
                    require(['../view/bkpages/warning/warning_list.vue'],resolve)
                }
            },
            'warning_history':{
                name:'warning_history',
                title:'电表终端详情',
                component: function (resolve){
                    require(['../view/bkpages/warning/warning_history.vue'],resolve)
                }
            }, 
            'warning_current': {
                name: 'warning_current',
                title: '电表终端详情',
                component: function (resolve) {
                    require(['../view/bkpages/warning/warning_current.vue'],resolve)
                }
            }, 
            'edit': {
                name: 'edit',
                title: 'edit',
                component: function (resolve) {
                    require(['../view/bkpages/gis/edit.vue'], resolve)
                }
            },
            'device_import': {
                name: 'device_import',
                title: 'edit',
                component: function (resolve) {
                    require(['../view/bkpages/system/device_import.vue'], resolve)
                }
            },
            'system_config': {
                name: 'system_config',
                title: 'edit',
                component: function (resolve) {
                    require(['../view/bkpages/system/system_config.vue'], resolve)
                }
            }
        }
    }