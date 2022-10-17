import './interfaces/bootstrap'; // Подключаем глобальные интерфейсы
import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import './scss/common/bootstrap.scss';

createApp(App).use(store).mount('#app')
