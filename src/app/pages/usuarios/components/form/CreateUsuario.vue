<template>
    <q-dialog ref="dialogRef">
        <q-card class="sm:p-10 p-6 w-full">
            <p class="uppercase font-bold text-xl text-slate-800 pb-7">
                <q-icon size="28px" name="person_add" /> Cadastrar Usuário
            </p>
            <FormUsuario :closeDialog="close" />
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import FormUsuario from './FormUsuario.vue';
const dialogRef = ref<any>(null);

function close() {
    dialogRef.value.hide();
}
</script>