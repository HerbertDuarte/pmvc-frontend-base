import { defineStore } from 'pinia';
import { Usuario } from '../../../../entities/usuario';
import { ref } from 'vue';
import { api } from '../../../../boot/axios';
import { usePageProps } from '../../../../lib/paginacao/page-props';
import { PaginateUtil } from '../../../../lib/paginacao/paginate-util';
import { PaginateResponse } from '../../../../lib/paginacao/paginate-response';
import { Queries } from '../../../../lib/paginacao/queries';
import { Notify } from 'quasar';
type Usuarios = PaginateResponse<Usuario>;

export const useUsuarioStore = defineStore('usuario', () => {
    const usuarios = ref<Usuarios>({ data: [], maxPag: 0 });
    const usuario = ref<Usuario | null>(null);
    const pageProps = usePageProps();

    async function getUsuarios(queries?: Queries) {
        const data = await PaginateUtil.paginate<Usuario>(
            'usuarios',
            pageProps,
            queries,
        );
        usuarios.value = data;
    }

    async function getUsuario(row: { id: string }) {
        const { data } = await api.get<Usuario>('/usuarios/' + row.id);
        usuario.value = data;
    }

    async function deletaUsuario(row: { id: string }) {
        await api.delete('/usuarios/' + row.id);
        await getUsuarios();
        Notify.create({
            message: 'Usuário deletado com sucesso',
            type: 'positive',
        });
    }

    async function salvaUsuario(usuario: Usuario) {
        await api.post('/usuarios', usuario);
        Notify.create({
            message: 'Usuário salvo com sucesso',
            type: 'positive',
        });
    }

    async function atualizaUsuario(usuario: Usuario) {
        await api.put('/usuarios/' + usuario.id, usuario);
        Notify.create({
            message: 'Usuário atualizado com sucesso',
            type: 'positive',
        });
    }

    return {
        usuarios,
        usuario,
        getUsuarios,
        getUsuario,
        deletaUsuario,
        salvaUsuario,
        atualizaUsuario,
    };
});
