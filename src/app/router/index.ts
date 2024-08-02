import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth/authStore';
import { routes } from './routes';

export const buildRouter = () => {
    const router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,
        history: createWebHistory('/'),
    });

    const authStore = useAuthStore();

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
                    accessLevel !== 'Administrador'
                    // || ((to?.meta.requiredOutroNivelDeAcesso) && accessLevel !== "OutroNivelDeAcesso")
                ) {
                    next({
                        name: 'erro',
                    });
                    return;
                }
            }
            next();
        } catch (error) {
            next({ name: 'login' });
        }
    });

    return router;
};
