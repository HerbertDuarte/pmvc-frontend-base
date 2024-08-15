<template>
    <main class="flex justify-center items-center">
        <CtiTable class="max-w-[1366px]" titulo="Usuários" :dados="usuarios" :colunas="colunas">
            <template v-slot:selects>
                <SelectNivel />
            </template>
        </CtiTable>
    </main>
</template>

<script lang="ts" setup>
import { QTableColumn } from 'quasar';
import CtiTable from '../../ui/table/CtiTable.vue';
import { onMounted } from 'vue';
import { useUsuarioStore } from './store/usuario.store';
import { storeToRefs } from 'pinia';
import SelectNivel from './componentes/SelectNivel.vue';

const usuarioStore = useUsuarioStore();
const { deletaUsuario, atualizaUsuario } = usuarioStore
const { usuarios } = storeToRefs(usuarioStore);

const colunas: QTableColumn[] = [
    { name: 'nome', label: 'Nome', field: 'nome', align: 'center' },
    { name: 'login', label: 'Login', field: 'login', align: 'center' },
    { name: 'nivel', label: 'Nível', field: 'nivel', align: 'center' },
    { name: 'situacao', label: 'Situação', field: 'situacao', align: 'center' },
    { name: 'email', label: 'E-mail', field: 'email' },
];

const actions = [
    { label: 'Editar', icon: 'edit', color: 'primary', action: atualizaUsuario },
    { label: 'Excluir', icon: 'delete', color: 'negative', action: deletaUsuario },
];

onMounted(async () => {
    await usuarioStore.getUsuarios();
});
</script>
