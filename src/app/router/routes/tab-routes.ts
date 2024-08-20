import { UsuarioNivel } from '../../../entities/usuario';
import { useAuthStore } from '../../store/auth/authStore';

export interface Route {
    path: string;
    component: () => Promise<any>;
    children?: Route[];
    title?: string;
    icon?: string;
    meta?: any;
    name?: string;
}
export const tabRoutes: Route[] = [
    {
        path: '/',
        component: () => import('../../pages/home/HomePage.vue'),
        title: 'Início',
        icon: 'home',
        name: 'home',
    },
    {
        path: '/usuario',
        component: () =>
            import('../../pages/usuarios/components/UsuariosPage.vue'),
        title: 'Usuários',
        icon: 'person',
        meta: {
            requiredAdminLevel: true,
        },
        name: 'usuario',
    },
];

export const getTabs = () => {
    const tabs: Route[] = [];
    const auth = useAuthStore();
    tabRoutes.forEach((tab) => {
        if (
            tab.meta?.requiredAdminLevel &&
            auth.user?.nivel !== UsuarioNivel.Administrador
        ) {
            return;
        }

        tabs.push(tab);
    });

    return tabs;
};
