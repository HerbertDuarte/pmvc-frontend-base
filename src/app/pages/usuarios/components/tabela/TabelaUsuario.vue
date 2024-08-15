<template>
    <CtiTable class="max-w-[1366px]" titulo="Usuários" :dados="usuarios" :colunas="colunas" :acoes="acoes"
        :busca="busca">
        <template v-slot:header>
            <SelectNivel />
            <BuscaUsuario :find-action="getUsuarios" :busca="busca" class="flex-1" />
        </template>

        <template v-slot:bottom>
            <q-btn class="bg-slate-200" label="Novo Usuário" @click="() => abrirModalCriacao()" />
            <Pagination :find-action="getUsuarios" :total-paginas="usuarios.maxPag" />
        </template>
    </CtiTable>
</template>

<script lang="ts" setup>
import { Dialog, QTableColumn } from 'quasar';
import CtiTable, { Acao } from '../../../../../lib/ui/table/CtiTable.vue';
import { useUsuarioStore } from '../../store/usuario.store';
import { storeToRefs } from 'pinia';
import SelectNivel from './SelectNivel.vue';
import Pagination from '../../../../../lib/ui/table/Pagination.vue';
import BuscaUsuario from './BuscaUsuario.vue';
import CreateUsuario from '../form/CreateUsuario.vue';
import { CreateAlert } from '../../../../../lib/ui/alert/useAlert';
import UpdateUsuario from '../form/UpdateUsuario.vue';

const usuarioStore = useUsuarioStore();
const { getUsuarios } = usuarioStore
const { usuarios, busca } = storeToRefs(usuarioStore);


const colunas: QTableColumn[] = [
    { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
    { name: 'login', label: 'Login', field: 'login', align: 'left' },
    { name: 'email', label: 'E-mail', field: 'email', align: 'left' },
    { name: 'nivel', label: 'Nível', field: 'nivel', align: 'left' },
];

const acoes: Acao[] = [
    { label: 'Editar', icon: 'edit', color: 'primary', action: abrirModalEdicao },
    { label: 'Excluir', icon: 'delete', color: 'negative', action: abrirModalDelecao },
];


function abrirModalCriacao() {
    Dialog.create({
        component: CreateUsuario
    });
}

async function abrirModalEdicao(row: { id: string }) {
    await usuarioStore.getUsuario(row.id);
    Dialog.create({
        component: UpdateUsuario,
    });
}

function abrirModalDelecao(row: { id: string, nome: string }) {
    CreateAlert({
        mensagem: `Tem certeza que deseja deletar ${row.nome}?`,
        buttonTitle: 'Deletar',
        action: () => usuarioStore.deletaUsuario(row.id),
    });
}

</script>
