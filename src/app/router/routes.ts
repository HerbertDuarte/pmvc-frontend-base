import { RouteRecordRaw } from 'vue-router';
import { tabRoutes } from './routes/tab-routes';
import { commonRoutes } from './routes/common-routes';
import { useAuthStore } from '../store/auth/authStore';
import { UsuarioNivel } from '../../entities/usuario';

export const getRoutes = () => {
    const routes: RouteRecordRaw[] = [...tabRoutes, ...commonRoutes];
    const auth = useAuthStore();
    const newRoutes: RouteRecordRaw[] = [];

    routes.forEach((route) => {
        if (
            route.meta?.requiredAdminLevel &&
            auth.user?.nivel !== UsuarioNivel.Administrador
        ) {
            return;
        }

        newRoutes.push(route);
    });

    console.log(newRoutes);

    return newRoutes;
};
