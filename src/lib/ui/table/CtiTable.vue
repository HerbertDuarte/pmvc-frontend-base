<template>
    <div class="w-full">

        <q-card class="rounded-lg p-6 space-y-4">
            <h2 class="font-bold text-slate-700 text-lg uppercase">
                {{ titulo }}
            </h2>
            <div class="flex w-full justify-between items-center gap-3">
                <slot name="header" />
            </div>
            <q-table :pagination="{ rowsPerPage: dados.data.length }" :rows="dados.data" :columns="colunasTratadas"
                @row-click="(row) => (rowClick ? rowClick(row) : null)">
                <template v-slot:header="props">
                    <q-tr :props="props">
                        <q-th v-for="coluna in colunasTratadas" :key="coluna.name" :props="props" :class="coluna.align">
                            <span class="font-bold text-slate-700">{{
                                coluna.label
                            }}</span>
                        </q-th>
                    </q-tr>
                </template>


                <template v-slot:body-cell-acoes="props">

                    <q-td v-if="acoes">
                        <div class="space-x-1.5 text-end">
                            <q-btn v-for="acao in acoes" :key="acao.label" dense :color="acao.color"
                                @click="acao.action(props.row)">
                                <q-icon size="20px" :name="acao.icon" />
                            </q-btn>
                        </div>
                    </q-td>
                </template>
                <template v-slot:bottom class="p-0">
                    <div class="flex items-center justify-between pt-5 w-full">
                        <slot name="bottom" />
                    </div>
                </template>

            </q-table>

        </q-card>
    </div>
</template>
<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { PaginateResponse } from '../../../lib/paginacao/paginate-response';

export type Acao = {
    label: string;
    icon: string;
    color: string;
    action: Function;
};



const props = defineProps<{
    dados: PaginateResponse<any>,
    colunas: QTableColumn[],
    acoes?: Acao[],
    titulo: string,
    rowClick?: (row: any) => void,

}>();

const colunasTratadas: Array<QTableColumn> =
    props.acoes
        ? [
            ...props.colunas,
            { name: 'acoes', label: 'Ações', field: "", align: 'right' },
        ]
        : props.colunas; 
</script>
