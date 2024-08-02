import { Route } from './tabRoutes';

export const perfilRoutes: Route[] = [
    {
        path: '/perfil',
        component: () => import('../../pages/perfil/PerfilPage.vue'),
        children: [],
    },
];
