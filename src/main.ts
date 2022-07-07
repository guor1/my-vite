import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import type { AppContext } from './types'
import generatedRoutes from '~pages'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

(async () => {
  // 创建应用
  const app = createApp(App)

  // 创建路由
  const routes = setupLayouts(generatedRoutes)
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  })

  const context: AppContext<true> = {
    app,
    router,
  }
  // 安装插件
  Object.values(import.meta.globEager('./plugins/*.ts')).map(i => i.install?.(context))

  app.use(router)

  await router.isReady()
  app.mount('#app', true)
})()
