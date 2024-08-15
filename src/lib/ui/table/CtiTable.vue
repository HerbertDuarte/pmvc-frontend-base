<template>
    <div class="w-full">

        <q-card class="rounded-lg p-6 space-y-3">
            <div class="flex justify-between items-center py-2">
                <h2 class="font-bold text-slate-700 text-lg uppercase">
                    {{ titulo }}
                </h2>

            </div>
            <div class="flex w-full justify-between items-center gap-3">
                <slot name="header" />
            </div>
            <q-table hide-pagination :rows="dados.data" :columns="colunas"
                @row-click="(row) => (rowClick ? rowClick(row) : null)">
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



            </q-table>

            <div class="flex items-end py-3 justify-between w-full">
                <q-btn @click="add" class="bg-slate-100 text-slate-700" icon="add">
                    Adicionar
                </q-btn>

                <slot name="bottom" />
            </div>
        </q-card>
    </div>
</template>
<script setup lang="ts">
import { Dialog, QTableColumn } from 'quasar';
import Pagination from './Pagination.vue';
import { PaginateResponse } from '../../../lib/paginacao/paginate-response';
import FormCreateUsuario from '../../../app/pages/usuarios/componentes/FormCreateUsuario.vue';

export type Acao = {
    label: string;
    icon: string;
    color: string;
    action: Function;
};

function add() {
    Dialog.create({
        component: FormCreateUsuario,
        componentProps: {
            usuarioId: null,
            administrador: false,
            enviarBotao: 'Adicionar',
            exibirBotaoVoltar: true,
        },
    })
}
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

});
</script>
