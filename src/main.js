import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import ToastPlugin from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
// import 'vue-toast-notification/dist/theme-sugar.css';

// import './assets/main.css'

const app = createApp(App)

app.use(router)
    // app.use(ToastPlugin);

app.mount('#app')