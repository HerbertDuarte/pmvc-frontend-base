<template>
    <di class="w-full">
        <q-card class="rounded-lg p-6 space-y-4">
            <h2 class="font-bold text-slate-700 text-lg uppercase">
                {{ titulo }}
            </h2>
            <div class="flex w-full justify-between items-center gap-3">
                <slot name="selects" />
                <TableSearch class="flex-1" />
            </div>
            <q-table :rows="dados.data" :columns="colunas" @row-click="(row) => (rowClick ? rowClick(row) : null)">
                <template v-slot:header="props">
                    <q-tr :props="props">
                        <q-th v-for="coluna in colunas" :key="coluna.name" :props="props" :class="coluna.align">
                            <span class="font-bold text-slate-700">{{
                                coluna.label
                                }}</span>
                        </q-th>
                        <q-th v-if="acoes" class="text-center">Ações</q-th>
                    </q-tr>
                </template>

                <template v-slot:bottom>
                    <Pagination :total-paginas="dados.maxPag" />
                </template>
            </q-table>
        </q-card>
    </di>
</template>
<script setup lang="ts">
import { QTableColumn } from 'quasar';
import TableSearch from './TableSearch.vue';
import Pagination from './Pagination.vue';
import { PaginateResponse } from '../../../lib/paginacao/paginate-response';

defineProps({
    dados: {
        type: PaginateResponse,
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
    paginaAtual: {
        type: Number,
        required: false,
    },
    totalPaginas: {
        type: Number,
        required: false,
    },
});
</script>
