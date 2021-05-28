import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
// 初始化css
import 'normalize.css/normalize.css'
// element-plus
import installElementPlus from './plugins/element'
// 全局 css
import '@/styles/index.scss'
// svg icons
import initSvgIcon from '@/icons/index'

const app = createApp(App)
// 获取store里存储的size
const size = store.state.app.size

app
    .use(store, key)
    .use(router)
    .use(installElementPlus, {
        size
    })
    .use(initSvgIcon)
    .mount('#app')