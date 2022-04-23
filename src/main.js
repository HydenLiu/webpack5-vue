import Vue from 'vue'
import App from './app.vue'
import { add } from './tools/add'
import './styles/index.css'

console.log(add(1, 2))
console.log('我是main.js')

new Vue({
  render: (h) => h(App),
}).$mount('#app')
