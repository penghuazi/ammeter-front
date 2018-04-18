import bkkcp from'./bank.js'

export default {
    '/':{
        name:'login',
        component: function(resolve){
            require(['../view/login.vue'],resolve)
        },
    },
    'bkkcp':bkkcp,       

}