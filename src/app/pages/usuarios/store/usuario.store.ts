import { defineStore } from 'pinia';
import { Usuario } from '../../../../entities/usuario';
import { ref, watch } from 'vue';
import { api } from '../../../../boot/axios';
import { usePageProps } from '../../../../lib/paginacao/page-props';
import { PaginateUtil } from '../../../../lib/paginacao/paginate-util';
import { PaginateResponse } from '../../../../lib/paginacao/paginate-response';
import { Queries } from '../../../../lib/paginacao/queries';
import { Dialog, Notify } from 'quasar';
import { CreateAlert } from '../../../../lib/ui/alert/useAlert';
import { nivelOptions } from '../options/select-nivel-options';

type Usuarios = PaginateResponse<Usuario>;

export const useUsuarioStore = defineStore('usuario', () => {
    const usuarios = ref<Usuarios>({ data: [], maxPag: 0 });
    const usuario = ref<Usuario | null>(null);
    const busca = ref('');
    const selectNivel = ref(nivelOptions[0]);
    const pageProps = usePageProps({ itensPorPagina: 10 });

    async function getUsuarios() {
        const queries: Queries = {
            busca: busca.value,
            nivel: selectNivel.value.value,
        };

        const { data, maxPag } = await PaginateUtil.paginate<Usuario>({
            pageProps,
            path: 'usuarios',
            queries,
        });
        usuarios.value = { data, maxPag };
    }

    async function getUsuario(id: string) {
        const { data } = await api.get<Usuario>('/usuarios/' + id);
        usuario.value = data;
    }

    async function deletaUsuario(id: string) {
        await api.delete('/usuarios/' + id);
        await getUsuarios();
        Notify.create({
            message: 'Usuário deletado com sucesso',
            type: 'positive',
        });
    }

    function criarUsuario(form: Usuario) {
        api.post('/usuarios', form).then(async () => {
            await getUsuarios();
        });
        Notify.create({
            message: 'Usuário salvo com sucesso',
            type: 'positive',
        });
    }

    async function atualizaUsuario(data: Usuario) {
        console.log(data);
        await api.put('/usuarios/' + usuario.value?.id, data);
        await getUsuarios();
        Notify.create({
            message: 'Usuário atualizado com sucesso',
            type: 'positive',
        });
    }

    watch(selectNivel, getUsuarios);

    return {
        usuarios,
        usuario,
        getUsuarios,
        getUsuario,
        deletaUsuario,
        criarUsuario,
        atualizaUsuario,
        busca,
        selectNivel,
    };
});
