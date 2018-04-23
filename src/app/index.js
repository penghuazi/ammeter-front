import config from './config'
import serviceInstall from './service/install.js'
import model from './model'
import components from './view/components'
import directives from './view/directives'
import router from './router'
import Filters from './view/filters'


Vue.use(config)
Vue.use(components)
Vue.use(directives)
Vue.use(Filters)


let app = Vue.extend({
    store:model
})
Service.router = router(Vue)
Service.router.start(app,'#app')

console.log(Service)
