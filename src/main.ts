import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus, { Size } from './plugins/element'
// 挂载到vue实例上
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'
// 初始化css
import 'normalize.css/normalize.css'

// 全局 css
import '@/styles/index.scss'

// svg icons
import initSvgIcon from '@/icons/index'

const app = createApp(App)
installElementPlus(app)
app
  .use(store)
  .use(router)
  .use(initSvgIcon)
  .mount('#app')

// vue实例上挂载属性类型声明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage;
    $notify: typeof ElNotification;
    $confirm: typeof ElMessageBox.confirm;
    $alert: typeof ElMessageBox.alert;
    $prompt: typeof ElMessageBox.prompt;
    $ELEMENT: {
      size: Size;
    };
  }
}