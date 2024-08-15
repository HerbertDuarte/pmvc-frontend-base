<template>
    <div class="flex w-full gap-2">
        <q-input class="inline flex-1 cti-input" dense borderless v-model="busca" placeholder="Pesquisar" />
        <q-btn flat icon="search" @click="getUsuarios" />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useUsuarioStore } from '../../store/usuario.store';


const usuarioStore = useUsuarioStore();
const { getUsuarios } = usuarioStore;
const { busca } = storeToRefs(usuarioStore);

</script>
