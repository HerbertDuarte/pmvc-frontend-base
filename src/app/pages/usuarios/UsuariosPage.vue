<template>
    <main class="flex justify-center items-center">
        <CtiTable class="max-w-[1366px]" titulo="Usuários" :dados="usuarios" :colunas="colunas" :acoes="acoes"
            :busca="busca">
            <template v-slot:header>
                <SelectNivel />
                <BuscaUsuario :find-action="getUsuarios" :busca="busca" class="flex-1" />
            </template>

            <template v-slot:bottom>
                <Pagination :find-action="getUsuarios" :total-paginas="usuarios.maxPag" />
            </template>
        </CtiTable>
    </main>
</template>

<script lang="ts" setup>
import { QTableColumn } from 'quasar';
import CtiTable, { Acao } from '../../../lib/ui/table/CtiTable.vue';
import { onMounted } from 'vue';
import { useUsuarioStore } from './store/usuario.store';
import { storeToRefs } from 'pinia';
import SelectNivel from './components/SelectNivel.vue';
import Pagination from '../../../lib/ui/table/Pagination.vue';
import BuscaUsuario from './components/BuscaUsuario.vue';

const usuarioStore = useUsuarioStore();
const { deletaUsuario, atualizaUsuario, getUsuarios } = usuarioStore
const { usuarios, busca } = storeToRefs(usuarioStore);


const colunas: QTableColumn[] = [
    { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
    { name: 'login', label: 'Login', field: 'login', align: 'left' },
    { name: 'nivel', label: 'Nível', field: 'nivel', align: 'left' },
    { name: 'situacao', label: 'Situação', field: 'situacao', align: 'left' },
    { name: 'email', label: 'E-mail', field: 'email', align: 'left' },
    { name: 'acoes', label: 'Ações', field: "acoes", align: 'right' },
];

const acoes: Acao[] = [
    { label: 'Editar', icon: 'edit', color: 'primary', action: atualizaUsuario },
    { label: 'Excluir', icon: 'delete', color: 'negative', action: deletaUsuario },
];


onMounted(async () => {
    await getUsuarios()
});
</script>
