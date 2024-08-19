import { Route } from './tab-routes';

export const commonRoutes: Route[] = [
    {
        path: '/perfil',
        component: () => import('../../pages/perfil/PerfilPage.vue'),
        children: [],
    },
];
