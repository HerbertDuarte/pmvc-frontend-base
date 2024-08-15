<template>
    <q-dialog persistent ref="dialogRef" @hide="onDialogHide">
        <q-card class="p-3">
            <q-card-section align="center" class="colum items-center justify-between text-center">
                <q-avatar icon="live_help" color="warning" text-color="white" />
                <div class="text-h5">{{ mensagem }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
                <p v-if="description">{{ description }}</p>
                <p>Ao confirmar essa ação, você não poderá desfazê-la.</p>
            </q-card-section>

            <q-card-actions align="center">
                <q-btn color="primary" unelevated :label="buttonTitle ?? 'Confirmar'" @click="acao" />
                <q-btn label="Cancelar" class="bg-slate-100 text-slate-700" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
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
    description: {
        type: String,
        required: false,
    },
});
</script>