<template>
    <div class="w-full">

        <q-card class="rounded-lg p-6 space-y-4">
            <h2 class="font-bold text-slate-700 text-lg uppercase">
                {{ titulo }}
            </h2>
            <div class="flex w-full justify-between items-center gap-3">
                <slot name="selects" />
                <TableSearch :find-action="findAction" class="flex-1" />
            </div>
            <q-table :rows="dados.data" :columns="colunas" @row-click="(row) => (rowClick ? rowClick(row) : null)">
                <template v-slot:header="props">
                    <q-tr :props="props">
                        <q-th v-for="coluna in colunas" :key="coluna.name" :props="props" :class="coluna.align">
                            <span class="font-bold text-slate-700">{{
                                coluna.label
                                }}</span>
                        </q-th>
                    </q-tr>
                </template>


                <template v-slot:body-cell-acoes="props">

                    <q-td v-if="acoes">
                        <div class="gap-1 flex justify-end">
                            <q-btn v-for="acao in acoes" :key="acao.label" dense :color="acao.color"
                                @click="acao.action(props.row)">
                                <q-icon size="20px" :name="acao.icon" />
                            </q-btn>
                        </div>
                    </q-td>
                </template>

                <template v-slot:bottom>
                    <Pagination :findAction="findAction" :total-paginas="dados.maxPag" />
                </template>
            </q-table>
        </q-card>
    </div>
</template>
<script setup lang="ts">
import { QTableColumn } from 'quasar';
import TableSearch from './TableSearch.vue';
import Pagination from './Pagination.vue';
import { PaginateResponse } from '../../../lib/paginacao/paginate-response';

export type Acao = {
    label: string;
    icon: string;
    color: string;
    action: Function;
};

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
        type: Array<Acao>,
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
    findAction: {
        type: Function,
        required: true,
    },
});
</script>
