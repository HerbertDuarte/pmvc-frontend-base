import { defineStore } from 'pinia';
import { api } from '../../../boot/axios';
import { Notify, Loading, QSpinnerBall } from 'quasar';
import { ref } from 'vue';
import { Usuario } from '../../../entities/usuario';
import { buildRouter } from '../../router';
import { Axios, AxiosError } from 'axios';

type UserLevel = 'Administrador' | 'Usuário';

export type LoginPayload = {
    username: string;
    password: string;
};

type LoginResponse = {
    access_token: string;
    usuarioId: string;
    nivel: UserLevel;
};

export const useAuthStore = defineStore('auth', () => {
    const user = ref<Usuario | null>();
    const token = ref<string | null>();
    const isAuthenticated = ref(false);
    const isAdmin = ref(false);
    const router = buildRouter();
    const loadingProps = {
        message: 'Entrando em contato com servidor...',
        delay: 400,
        spinner: QSpinnerBall,
        spinnerColor: 'blue-10',
        spinnerSize: 140,
    };

    async function doLogin(payload: LoginPayload) {
        Loading.show(loadingProps);
        try {
            const response = await api.post<LoginResponse>(
                '/auth/login',
                payload,
            );
            setToken(response.data.access_token);
            getUser(response.data.usuarioId);
            setAccessLevel(response.data.nivel);
            if (response.data.access_token) {
                notifyWelcome();
            }
            if (router) {
                router.push('/');
            } else {
                console.error('Router is undefined');
            }
        } catch (error: any) {
            notifyError(error);
        }
        Loading.hide();
    }

    function setToken(strToken: string) {
        api.defaults.headers.common.Authorization = 'Bearer ' + strToken;
        token.value = strToken;
        isAuthenticated.value = true;
        window.localStorage.setItem('token', token.value);
    }

    function setUser(userPayload: Usuario) {
        user.value = userPayload;
        setAccessLevel(userPayload.nivel);
        window.localStorage.setItem('user_id', userPayload.id);
        window.localStorage.setItem('name_user', userPayload.nome);
    }

    function setAccessLevel(level: UserLevel) {
        window.localStorage.setItem('access_level', level);
        if (level === 'Administrador') {
            isAdmin.value = true;
        }
    }

    function removeToken() {
        token.value = '';
        isAuthenticated.value = false;
        window.localStorage.removeItem('token');
    }

    function removeUser() {
        user.value = null;
        window.localStorage.removeItem('user_id');
        window.localStorage.removeItem('name_user');
    }

    function removeAccessLevel() {
        isAdmin.value = false;
        window.localStorage.removeItem('access_level');
    }

    async function initSystem() {
        try {
            const token = window.localStorage.getItem('token');
            const userId = window.localStorage.getItem('user_id');

            if (token) {
                setToken(token);
            } else {
                removeToken();
            }

            if (userId) await getUser(userId);
        } catch (error) {
            logout();
            console.log(error);
        }
    }

    async function getUser(id: string) {
        const { data } = await api.get<Usuario>(`usuarios/${id}`);
        setAccessLevel(data.nivel);
        setUser(data);
        return data.nivel;
    }

    function logout() {
        api.defaults.headers.common.Authorization = '';
        removeUser();
        removeToken();
        removeAccessLevel();
    }

    function notifyWelcome() {
        Notify.create({
            color: 'green-10',
            icon: 'done_all',
            position: 'top',
            timeout: 2000,
            message: 'Bem vindo de volta',
        });
    }

    function notifyError(error: any) {
        if (error instanceof AxiosError) {
            console.log(error);
            if (error.response?.status === 401) {
                Notify.create({
                    color: 'negative',
                    position: 'top',
                    timeout: 2000,
                    message: 'Usuário ou senha inválidos',
                });
                return;
            }
            Notify.create({
                color: 'negative',
                position: 'top',
                timeout: 2000,
                message: error?.response?.data?.message ?? error.message,
            });
        }
    }

    return {
        doLogin,
        initSystem,
        getUser,
        logout,
        user,
        token,
        isAuthenticated,
        isAdmin,
    };
});
