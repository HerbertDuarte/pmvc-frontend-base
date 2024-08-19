<script setup lang="ts">
import { PageProps } from '../../paginacao/page-props';

const props = defineProps({
    totalPaginas: {
        type: Number,
        required: true,
    },
    findAction: {
        type: Function,
        required: true,
    },
    pageProps: {
        type: PageProps,
        required: true,
    }
});

function prev() {
    if (props.pageProps.pagina.value > 1) {
        props.pageProps.setPagina(props.pageProps.pagina.value - 1);
        props.findAction();
    }
}

function next() {
    if (props.pageProps.pagina.value < props.totalPaginas) {
        props.pageProps.setPagina(props.pageProps?.pagina.value + 1);
        props.findAction();
    }
}

</script>

<template>
    <div class="flex items-center justify-center gap-2">
        <q-btn :disable="props.pageProps.pagina.value < props.totalPaginas" @click="prev()" flat dense
            icon="chevron_left" />

        <div class="flex gap-2 text-bold px-1">{{ pageProps?.pagina }} / {{ totalPaginas }}</div>

        <q-btn :disable="props.pageProps.pagina.value > 1" @click="next()" flat dense icon="chevron_right" />
    </div>
</template>
