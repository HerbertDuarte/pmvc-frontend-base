<template>
    <di class="w-full">
        <q-card class="rounded-lg p-6 space-y-4">
            <h2 class="font-bold text-slate-700 text-lg uppercase">
                {{ titulo }}
            </h2>
            <div class="flex w-full justify-between items-center gap-3">
                <slot name="header" />
                <TableSearch class="flex-1" />
            </div>
            <q-table
                :rows="dados"
                :columns="colunas"
                @row-click="(row) => (rowClick ? rowClick(row) : null)"
            >
                <template v-slot:header="props">
                    <q-tr :props="props">
                        <q-th
                            v-for="coluna in colunas"
                            :key="coluna.name"
                            :props="props"
                            :class="coluna.align"
                        >
                            <span class="font-bold text-slate-700">{{
                                coluna.label
                            }}</span>
                        </q-th>
                        <q-th v-if="acoes" class="text-center">Ações</q-th>
                    </q-tr>
                </template>

                <template v-slot:bottom>
                    <Pagination />
                </template>
            </q-table>
        </q-card>
    </di>
</template>
<script setup lang="ts">
import { QTableColumn } from 'quasar';
import TableSearch from './TableSearch.vue';
import { ref } from 'vue';
import Pagination from './Pagination.vue';

const page = ref(1);

defineProps({
    dados: {
        type: Array,
        required: true,
    },
    colunas: {
        type: Array<QTableColumn>,
        required: true,
    },
    acoes: {
        type: Array,
        required: false,
    },
    titulo: {
        type: String,
        required: false,
    },
    rowClick: {
        type: Function,
        required: false,
    },
});
</script>
