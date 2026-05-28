import { createApp } from 'vue'
import {
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElCheckbox,
  ElEmpty,
  ElInput,
} from 'element-plus'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-breadcrumb.css'
import 'element-plus/theme-chalk/el-breadcrumb-item.css'
import 'element-plus/theme-chalk/el-button.css'
import 'element-plus/theme-chalk/el-checkbox.css'
import 'element-plus/theme-chalk/el-empty.css'
import 'element-plus/theme-chalk/el-input.css'
import App from './App.vue'
import { router } from './app/router'
import './styles/main.css'

createApp(App)
  .use(router)
  .use(ElBreadcrumb)
  .use(ElBreadcrumbItem)
  .use(ElButton)
  .use(ElCheckbox)
  .use(ElEmpty)
  .use(ElInput)
  .mount('#app')
