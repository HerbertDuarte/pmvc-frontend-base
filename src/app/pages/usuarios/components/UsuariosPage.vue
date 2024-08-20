<template>
    <main class="flex justify-center items-center">
        <TabelaUsuario />
    </main>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUsuarioStore } from '../store/usuario.store';
import TabelaUsuario from './table/TabelaUsuario.vue';

const usuarioStore = useUsuarioStore();
const { getUsuarios } = usuarioStore


onMounted(async () => {
    await getUsuarios()
});
</script>
