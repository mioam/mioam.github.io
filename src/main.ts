import { createApp } from 'vue'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { ElEmpty, ElInput } from 'element-plus'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-empty.css'
import 'element-plus/theme-chalk/el-input.css'
import App from './App.vue'
import { router } from './app/router'
import './styles/main.css'
import './styles/github-markdown.css'

createApp(App)
  .use(router)
  .use(ElEmpty)
  .use(ElInput)
  .component('Sunny', Sunny)
  .component('Moon', Moon)
  .mount('#app')
