<template>
    <q-dialog>
        <q-card class="sm:p-10 p-6 w-full">
            <p class="uppercase font-bold text-xl text-slate-800 pb-7">
                Editar Usuário
            </p>
            <FormUsuario :update="true" />
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import FormUsuario from './FormUsuario.vue';

</script>