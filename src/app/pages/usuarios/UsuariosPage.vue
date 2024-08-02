<template>
    <main class="flex justify-center items-center">
        <CtiTable
            class="max-w-[1366px]"
            titulo="Usuários"
            :dados="usuarios"
            :colunas="colunas"
        >
            <!-- <template v-slot:header>
                <q-select dense outlined :model-value="1"></q-select>
            </template> -->
        </CtiTable>
    </main>
</template>

<script lang="ts" setup>
import { QTableColumn } from 'quasar';
import CtiTable from '../../ui/table/CtiTable.vue';
import { ref } from 'vue';

const usuarios = ref([
    { id: 1, nome: 'Fulano', email: 'fulano@email.com' },
    { id: 2, nome: 'Ciclano', email: 'ciclano@email.com' },
]);

const colunas: QTableColumn[] = [
    { name: 'id', label: 'ID', field: 'id', align: 'left' },
    { name: 'nome', label: 'Nome', field: 'nome', align: 'center' },
    { name: 'email', label: 'E-mail', field: 'email' },
];
</script>
