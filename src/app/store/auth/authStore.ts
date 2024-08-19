import { defineStore } from 'pinia';
import { api } from '../../../boot/axios';
import { Notify, Loading, QSpinnerBall } from 'quasar';
import { ref } from 'vue';
import { Usuario, UsuarioNivel } from '../../../entities/usuario';
import { buildRouter } from '../../router';
import { AxiosError } from 'axios';
import { notifyError } from '../../../lib/ui/notify/notify-error';
import { notifySuccess } from '../../../lib/ui/notify/notify-success';

export type LoginPayload = {
    username: string;
    password: string;
};

type LoginResponse = {
    access_token: string;
    usuarioId: string;
    nivel: UsuarioNivel;
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
                notifySuccess({ message: 'Login efetuado com sucesso' });
            }
        } catch (error: any) {
            notifyError({ error });
        }
        Loading.hide();
    }

    function setToken(strToken: string) {
        api.defaults.headers.common.Authorization = 'Bearer ' + strToken;
        token.value = strToken;
        isAuthenticated.value = true;
        window.localStorage.setItem('token', token.value);
    }

    function setUser(usuario: Usuario) {
        user.value = usuario;
        setAccessLevel(usuario.nivel);
        if (usuario.id) {
            window.localStorage.setItem('user_id', usuario.id);
            window.localStorage.setItem('name_user', usuario.nome);
        }
    }

    function setAccessLevel(nivel: UsuarioNivel) {
        window.localStorage.setItem('access_level', nivel);
        if (nivel === UsuarioNivel.Administrador) {
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
        return data;
    }

    function logout() {
        api.defaults.headers.common.Authorization = '';
        removeUser();
        removeToken();
        removeAccessLevel();
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
