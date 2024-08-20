import { App, createApp } from 'vue';
import { Quasar } from 'quasar';
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css';
import '@quasar/extras/material-icons-round/material-icons-round.css';
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css';
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css';
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css';
import '@quasar/extras/material-symbols-sharp/material-symbols-sharp.css';
import '@quasar/extras/mdi-v7/mdi-v7.css';
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css';
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css';
import '@quasar/extras/ionicons-v4/ionicons-v4.css';
import '@quasar/extras/eva-icons/eva-icons.css';
import '@quasar/extras/themify/themify.css';
import '@quasar/extras/line-awesome/line-awesome.css';
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css';
import 'quasar/src/css/index.sass';
import AppComponent from './app/App.vue';
import './styles/globals.css';
import { createPinia } from 'pinia';
import { buildRouter } from './app/router';
import { quasarOptions } from './config/quasar-options';
import { useAuthStore } from './app/store/auth/authStore';

const app = createApp(AppComponent);

async function bootstrap(app: App<Element>) {
    app.use(createPinia());
    const authStore = useAuthStore();
    await authStore.initSystem();
    app.use(buildRouter());
    app.use(Quasar, quasarOptions);
    app.mount('#app');
}

bootstrap(app);
