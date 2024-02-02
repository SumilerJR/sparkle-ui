/*
 * @Author: 九日 mail@sumiler.com
 * @Date: 2024-01-29 16:35:27
 * @LastEditors: 九日 mail@sumiler.com
 * @LastEditTime: 2024-01-31 15:15:39
 * @FilePath: \v-element\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import './assets/main.css'
import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'


library.add(fas)
import './styles/index.css'

createApp(App)
    .mount('#app')
