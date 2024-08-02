<script setup lang="ts">
import { ref } from 'vue';

const currentPage = ref(1);
</script>

<template>
    <div class="w-full flex justify-between items-center pt-2 gap-2">
        <div>
            <p class="text-bold uppercase">
                Total de itens: <span class="font-medium">{{ 100 }}</span>
            </p>
        </div>
        <div class="flex items-center justify-center gap-2">
            <q-btn flat dense icon="chevron_left" />

            <div class="flex gap-2 text-bold px-1">{{ currentPage }} / 10</div>

            <q-btn flat dense icon="chevron_right" />
        </div>
    </div>
</template>
