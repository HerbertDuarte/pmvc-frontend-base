<template>
    <main class="flex justify-center items-center">
        <CtiTable class="max-w-[1366px]" titulo="Usuários" :dados="usuarios" :colunas="colunas" />
    </main>
</template>

<script lang="ts" setup>
import { QTableColumn } from 'quasar';
import CtiTable from '../../ui/table/CtiTable.vue';
import { onMounted, ref } from 'vue';
import { useUsuarioStore } from './store/usuario.store';
import { storeToRefs } from 'pinia';

const usuarioStore = useUsuarioStore();
const { usuarios } = storeToRefs(usuarioStore);


const colunas: QTableColumn[] = [
    { name: 'nome', label: 'Nome', field: 'nome', align: 'center' },
    { name: 'login', label: 'Login', field: 'login', align: 'center' },
    { name: 'nivel', label: 'Nível', field: 'nivel', align: 'center' },
    { name: 'situacao', label: 'Situação', field: 'situacao', align: 'center' },
    { name: 'email', label: 'E-mail', field: 'email' },
];

onMounted(async () => {
    await usuarioStore.getUsuarios();
});
</script>
