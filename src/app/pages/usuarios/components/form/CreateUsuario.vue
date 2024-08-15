<template>
    <q-dialog>
        <q-card class="sm:p-10 p-6 w-full">
            <p class="uppercase font-bold text-xl text-slate-800 pb-7">
                Cadastrar Usuário
            </p>
            <FormCreateUsuario />
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import FormCreateUsuario from './FormUsuario.vue';

</script>