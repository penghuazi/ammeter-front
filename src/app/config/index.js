/**
 * [proxy_mock 代理、mock]
 * @param  {[type]} Vue [Vue]
 */
export default function install (Vue) {
    console.log('environment: ' + APP_ENV, 'version: ' + APP_VERSION)
    Vue.config.debug = false
    if (APP_ENV === 'dev') {
        require(['./proxy-mock'], function ({proxyMock}) {
            proxyMock(Vue)
        })
    }else{
    	Vue.http.options.root = location.protocol + '//' + location.host + '/kcp'
    }
}
