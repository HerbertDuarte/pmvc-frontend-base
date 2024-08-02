import { RouteRecordRaw } from 'vue-router';

export const loginRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../../pages/login/LoginPage.vue'),
    },
];
