<script lang="ts" setup>
import { ref } from 'vue';
const input = ref<HTMLInputElement | null>(null)
const search = ref('');
const props = defineProps({
    findAction: {
        type: Function,
        required: true,
    },
});

function searchClick() {
    props.findAction(search.value);
    if (input.value) {
        input.value.focus()
    }
}
</script>
<template>
    <form @submit.prevent="searchClick" class="flex w-full gap-2">
        <q-input label="Pesquisar" ref="input" class="inline flex-1 cti-input" dense borderless v-model="search"
            placeholder="Pesquisar" />
        <q-btn type="submit" flat icon="search" />
    </form>
</template>
