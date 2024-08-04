import { RouteRecordRaw } from 'vue-router';
import { tabRoutes } from './routes/tabRoutes';
import { perfilRoutes } from './routes/perfilRoutes';

export const routes: RouteRecordRaw[] = [...tabRoutes, ...perfilRoutes];
