import './assets/main.css'
import '@/tailwind.css'
import '@/css/app.css'

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

let vueThat = new Vue({
  render: h => h(App)
}).$mount('#app')


if (/iphone/i.test(navigator.platform)) {
  document.body.addEventListener('focusout', () => {
    setTimeout(function() {
      var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
      window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 500);
  })
}

export default vueThat;
