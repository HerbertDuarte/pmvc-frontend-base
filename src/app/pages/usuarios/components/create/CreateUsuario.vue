<template>
    <q-dialog class="w-full">
        <q-card class="p-6">
            <div class="uppercase font-bold text-xl text-slate-800
            pb-7">Cadastrar Usuário</div>
            <FormCreateUsuario />
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import FormCreateUsuario from './FormCreateUsuario.vue';

</script>