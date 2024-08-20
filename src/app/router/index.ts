import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth/authStore';
import { getRoutes } from './routes';
import { UsuarioNivel } from '../../entities/usuario';
import { notifyError } from '../../lib/ui/notify/notify-error';

export const buildRouter = () => {
    const authStore = useAuthStore();
    const router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes: getRoutes(),
        history: createWebHistory('/'),
    });

    router.beforeEach(async (to, _from, next) => {
        try {
            //verifica a autenticação do usuário
            if (to.meta.requiredLogin && !authStore.isAuthenticated) {
                next({ name: 'login' });
                return;
            }

            //verifica os níveis de acesso
            if (to.path !== '/login') {
                const accessLevel = authStore.user?.nivel;

                if (
                    to.meta.requiredAdminLevel &&
                    accessLevel !== UsuarioNivel.Administrador
                    // || ((to?.meta.requiredOutroNivelDeAcesso) && accessLevel !== "OutroNivelDeAcesso")
                ) {
                    authStore.logout();
                    notifyError({
                        message:
                            'Você não tem permissão para acessar esta página',
                    });
                    return;
                }
            }
            next();
        } catch (error) {
            authStore.logout();
            notifyError({ error });
        }
    });

    return router;
};
