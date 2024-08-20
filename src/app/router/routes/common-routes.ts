import { Route } from './tab-routes';

export const commonRoutes: Route[] = [
    {
        path: '/perfil',
        component: () => import('../../pages/perfil/PerfilPage.vue'),
        children: [],
    },
    {
        path: '/:catchAll(.*)',
        name: 'PageNotFound',
        component: () => import('../../pages/404/PaginaNaoEncontrada.vue'),
    },
];
