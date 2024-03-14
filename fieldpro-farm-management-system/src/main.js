import { createApp, mounted } from 'vue'
//导入mock
//import './mock/'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
//引入初始化样式文件
import '@/styles/common.scss'
//import '@/styles/var.scss'




const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).use(store).use(router).use(ElementPlus).mount('#app')



