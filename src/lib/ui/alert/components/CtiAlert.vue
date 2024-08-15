<template>
    <q-dialog persistent ref="dialogRef">
        <q-card class="p-4">
            <div align="center" class="colum items-center justify-between text-center">
                <q-avatar icon="live_help" color="warning" text-color="white" />
                <div class="text-xl font-medium text-slate-800">{{ mensagem }}</div>
            </div>

            <div class="q-pt-none text-center">
                <p>Ao confirmar essa ação, você não poderá desfazê-la.</p>
            </div>

            <div class="flex items-center  justify-center pt-6 gap-2">
                <q-btn color="primary" unelevated :label="buttonTitle ?? 'Confirmar'" @click="() => acao()" />
                <q-btn label="Cancelar" class="bg-slate-100 text-slate-700" v-close-popup />
            </div>
        </q-card>
    </q-dialog>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
    mensagem: {
        type: String,
        required: true,
    },
    buttonTitle: {
        type: String,
        required: false,
    },
    acao: {
        type: Function,
        required: true,
    },

});
</script>