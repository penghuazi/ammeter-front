export default function install(Vue){

    var requests = {}
    Vue.http.options.before = function(request){
        if(request.vuem && requests[request.vuem]){
            requests[request.vuem].abort()
        }
        requests[request.vuem] = request
    }
    
    Vue.http.interceptors.push(function(request,next){
        $KsLoad.show()
        
        next(function(response){
             $KsLoad.hide()
        })
    })

}