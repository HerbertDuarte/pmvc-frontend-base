import { defineStore } from 'pinia';
import { api } from '../../../boot/axios';
import { Notify, Loading, QSpinnerBall } from 'quasar';
import { ref } from 'vue';
import { Usuario } from '../../entities/Usuario';

type UserLevel = 'Administrador' | 'Usuário';

type LoginPayload = {
    email: string;
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
        } catch (error: any) {
            notifyError(error);
        }
        Loading.hide();
    }

    function setToken(strToken: string) {
        api.defaults.headers.common.Authorization = 'Bearer ' + strToken;
        token.value = strToken;
        isAuthenticated.value = true;
        window.sessionStorage.setItem('token', token.value);
    }

    function setUser(userPayload: Usuario) {
        user.value = userPayload;
        setAccessLevel(userPayload.nivel);
        window.sessionStorage.setItem('user_id', userPayload.id);
        window.sessionStorage.setItem('name_user', userPayload.nome);
    }

    function setAccessLevel(level: UserLevel) {
        window.sessionStorage.setItem('access_level', level);
        if (level === 'Administrador') {
            isAdmin.value = true;
        }
    }

    function removeToken() {
        token.value = '';
        isAuthenticated.value = false;
        window.sessionStorage.removeItem('token');
    }

    function removeUser() {
        user.value = null;
        window.sessionStorage.removeItem('user_id');
        window.sessionStorage.removeItem('name_user');
    }

    function removeAccessLevel() {
        isAdmin.value = false;
        window.sessionStorage.removeItem('access_level');
    }

    async function initSystem() {
        const token = window.sessionStorage.getItem('token');
        if (token) {
            setToken(token);
        } else {
            removeToken();
        }
    }

    async function getUser(id: string) {
        api.defaults.headers.common.Authorization = 'Bearer ' + token.value;
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
        Notify.create({
            color: 'negative',
            icon: 'close',
            position: 'top',
            timeout: 2000,
            message: error.response.data.message,
        });
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
