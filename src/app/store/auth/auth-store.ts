import { defineStore } from 'pinia';
import { api } from '../../../boot/axios';
import { Notify, Loading, QSpinnerBall } from 'quasar';

type UserLevel = 'Administrador' | 'Usuário';

type LoginPayload = {
    email:string,
    password: string
}

type LoginResponse = {
    access_token: string,
    usuarioId: string,
    nivel: UserLevel
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    idUser: '',
    nameUser: '',
    token: '',
    isAuthenticated: false,
    isAdmin: false,
  }),

  actions: {
    async doLogin(payload: LoginPayload) {
      Loading.show({
        message: 'Entrando em contato com servidor...',
        delay: 400,
        spinner: QSpinnerBall,
        spinnerColor: 'blue-10',
        spinnerSize: 140,
      });
      try {
        const response = await api.post<LoginResponse>('/auth/login', payload);
        this.setToken(response.data.access_token);
        this.setUser(response.data.usuarioId);
        this.setAccessLevel(response.data.nivel);
        if (response.data.access_token) {
          Notify.create({
            color: 'green-10',
            icon: 'done_all',
            position: 'top',
            timeout: 2000,
            message: 'Bem vindo de volta',
          });
        }
        api.defaults.headers.common.Authorization =
          'Bearer ' + response.data.access_token;
        Loading.hide();
      } catch (error: any) {
        console.log('Erro ao fazer login', error);
        Loading.hide();
        Notify.create({
          color: 'negative',
          icon: 'close',
          position: 'top',
          timeout: 2000,
          message: error.response.data.message,
        });
      }
    },

    setToken(token:string) {
      this.token = token;
      this.isAuthenticated = true;
      window.sessionStorage.setItem('token', token);
    },

    setUser(userId: string) {
      this.idUser = userId;
    //buscar usuário aqui
      this.nameUser = "";
      window.sessionStorage.setItem('user_id', userId);
      window.sessionStorage.setItem('name_user', "");
    },

    setAccessLevel(level: UserLevel) {
      window.sessionStorage.setItem('access_level', level);
      if (level === 'Administrador') {
        this.isAdmin = true;
      }
    },

    removeToken() {
      this.token = '';
      this.isAuthenticated = false;
      window.sessionStorage.removeItem('token');
    },

    removeUser() {
      this.idUser = '';
      this.nameUser = '';
      window.sessionStorage.removeItem('user_id');
      window.sessionStorage.removeItem('name_user');
    },

    removeAccessLevel() {
      this.isAdmin = false;
      window.sessionStorage.removeItem('access_level');
    },

    async initSystem() {
      const token = window.sessionStorage.getItem('token');
      if (token) {
        this.setToken(token);
      } else {
        this.removeToken();
      }
    },

    async getUser(id: string, token:string) {
      api.defaults.headers.common.Authorization = 'Bearer ' + token;
      const { data } = await api.get(`usuarios/${id}`);
      this.setAccessLevel(data.nivel);
      this.setUser(data.id);
      return data.nivel;
    },

    logout() {
      api.defaults.headers.common.Authorization = '';
      this.removeUser();
      this.removeToken();
      this.removeAccessLevel();
    },
  },
});
