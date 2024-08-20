<template>
    <q-select class="cti-input" dense v-model="selectNivel" borderless :options="nivelOptions" label="Nível" />
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUsuarioStore } from '../../store/usuario.store';
import { nivelOptions } from '../../options/select-nivel-options';

const usuarioStore = useUsuarioStore();
const { selectNivel } = storeToRefs(usuarioStore);

</script>