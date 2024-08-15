<script setup lang="ts">
import { ref } from 'vue';
const currentPage = ref(1);

defineProps({
    totalPaginas: {
        type: Number,
        required: true,
    },
    findAction: {
        type: Function,
        required: true,
    },
});
</script>

<template>
    <div class="w-full flex justify-end items-center pt-2 gap-2">

        <div class="flex items-center justify-center gap-2">
            <q-btn @click="() => findAction()" flat dense icon="chevron_left" />

            <div class="flex gap-2 text-bold px-1">{{ currentPage }} /{{ totalPaginas }}</div>

            <q-btn @click="() => findAction()" flat dense icon="chevron_right" />
        </div>
    </div>
</template>
