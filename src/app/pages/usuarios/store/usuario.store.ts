import { defineStore } from 'pinia';
import { Usuario } from '../../../entities/Usuario';
import { ref } from 'vue';
import { api } from '../../../../boot/axios';
import { PageData } from '../../../ui/table/PageData';

type Usuarios = PageData<Usuario>;

export const useUsuarioStore = defineStore('usuario', () => {
    const usuarios = ref<Usuarios>({ data: [], maxPag: 0 });
    const usuario = ref<Usuario | null>(null);
    const itensPorPagina = ref(5);
    const pagina = ref(1);

    function setUsuarios(data: Usuarios) {
        usuarios.value = data;
    }

    function setUsuario(data: Usuario) {
        usuario.value = data;
    }

    async function getUsuarios() {
        const { data } = await api.get(
            `/usuarios?pagina=${pagina.value}&itensPorPagina=${itensPorPagina.value}`,
        );
        setUsuarios(data);
    }

    async function getUsuario(userId: string) {
        const { data } = await api.get<Usuarios>('/usuarios/' + userId);
        setUsuarios(data);
    }

    return {
        usuarios,
        usuario,
        setUsuarios,
        setUsuario,
        getUsuarios,
        getUsuario,
    };
});
