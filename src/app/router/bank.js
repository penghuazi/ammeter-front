

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
                title:'电表无线管理',
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
             ////////////无线终端详情///////////////////////////////////////////
            'ammeter_wireless_info':{
                name:'ammeter_wireless_info',
                title:'电表终端详情',
                component: function(resolve){
                    require(['../view/bkpages/ammeter/ammeter_wireless_info.vue'],resolve)
                }
            },                                          
        }
    }