import common from './common.js'
import market from './market.js'
import ammeter from './ammeter.js'
import transaction from './transaction.js'
import coupon from './coupon.js'
// ['Service.merge','Service.flatobj','logger']

var api = {
    common,
    market,
    ammeter,
    transaction,
    coupon
}


export default getFlatApi(api)


    

function getFlatApi(data){
    var res = {}
    Service.flatobj(api,function(keys,val){
        // console.log(keys,val)
        res[keys.join('.')] = Service.merge(val,getMU(val))
    })
    return res    
}

// console.log(getFlatApi(api))   

/**
 * [getMU 获取请求中的方法和资源地址]
 * @param  {[type]} data [请求配置]
 * @return {[type]}      [method and url]
 */
function getMU(data){

    var methods = ['get', 'put', 'post', 'patch', 'delete'
                    , 'jsonp','save' ,'query' ,'update' ,'remove'],
                method,url
            
    method = Object.keys(data).filter((val)=>{
        if(~methods.indexOf(val)) return val
    })[0];
    !method && Service.logger('error',data,'未找到请求方式')
    url = data[method]

    return {
        method:method,
        url:url
    }

}




