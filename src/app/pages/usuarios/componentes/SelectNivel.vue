<template>
    <q-select class="cti-input" dense borderless v-model="selectNivel" :options="selectProps" label="Nível" />
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useUsuarioStore } from '../store/usuario.store';

const usuarioStore = useUsuarioStore();
const selectProps = [
    { label: 'Selecione', value: null },
    { label: 'Administrador', value: 'Administrador' },
    { label: 'Usuário', value: 'Usuario' },
];
const selectNivel = ref(selectProps[0])

function selectNivelChange() {
    const nivel = selectNivel.value.value;
    usuarioStore.getUsuarios({ nivel });
}

watch(selectNivel, selectNivelChange);
</script>