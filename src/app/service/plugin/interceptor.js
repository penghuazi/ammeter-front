export default function install(Vue){

    var requests = {}
    Vue.http.options.before = function(request){
        request.headers.set("If-Modified-Since","0"); 
        if(request.vuem && requests[request.vuem]){
            requests[request.vuem].abort()
        }
        requests[request.vuem] = request
    }
    
    Vue.http.interceptors.push(function(request,next){
        $KsLoad.show()
        auth(request)
        next(function(response){
             $KsLoad.hide()
        })
    })

}

function auth(request){
    // var app_key = 'cfda7cc5068caf908a72556a6c4116c5'
    // var secret_key = '1dcf0bd968afbee005f4b239cf2982e1'
    // var X_AUTH_TIME = now.format('YYYYMMDDhhmmss')
    // var X_AUTH_TOKEN = md5(app_key+X_AUTH_TIME+secret_key)
    var lesseeId=Service.session.get('kcpLesseeId');
    !!lesseeId&&request.headers.set('X-USER-TOKEN-ID',lesseeId.toString())
        
        // request.headers.set('X-AUTH-APPKEY', app_key)
        // request.headers.set('X-AUTH-TOKEN',X_AUTH_TOKEN)
        // !!sessionStorage.getItem('X-USER-TOKEN') && request.headers.set('X-USER-TOKEN', sessionStorage.getItem('X-USER-TOKEN'))
}