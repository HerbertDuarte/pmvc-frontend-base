<script lang="ts" setup>
import { ref } from 'vue';

const search = ref('');

function searchClick() {
    console.log(search.value);
}
</script>
<template>
    <div class="flex w-full gap-2">
        <q-input class="inline flex-1 cti-input" dense borderless v-model="search" placeholder="Pesquisar" />
        <q-btn flat icon="search" @click="searchClick" />
    </div>
</template>
