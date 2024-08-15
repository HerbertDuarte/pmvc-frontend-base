export interface Route {
    path: string;
    component: () => Promise<any>;
    children?: Route[];
    title?: string;
    icon?: string;
    meta?: any;
}

export const tabRoutes: Route[] = [
    {
        path: '/',
        component: () => import('../../pages/home/HomePage.vue'),
        title: 'Início',
        icon: 'home',
    },
    {
        path: '/usuario',
        component: () =>
            import('../../pages/usuarios/components/UsuariosPage.vue'),
        title: 'Usuários',
        icon: 'person',
    },
];
