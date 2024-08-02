import { RouteRecordRaw } from 'vue-router';
import { tabRoutes } from './routes/tabRoutes';
import { perfilRoutes } from './routes/perfilRoutes';
import { loginRoutes } from './routes/loginRoutes';

export const routes: RouteRecordRaw[] = [
    ...tabRoutes,
    ...perfilRoutes,
    ...loginRoutes,
];
