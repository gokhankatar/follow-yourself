import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router/router';
import store from './store/store';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

loadFonts();

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
library.add(fas) 
library.add(far)

app.use(vuetify);
app.use(router);
app.use(store);
app.mount('#app');
