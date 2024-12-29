import { initPreference } from '@visuejs/schematics/composables'
import { createApp } from 'vue'
import App from './App.vue'
import '@visuejs/schematics/styles'

function bootstrap() {
  const app = createApp(App)

  initPreference()

  app.mount('#app')
}

bootstrap()
