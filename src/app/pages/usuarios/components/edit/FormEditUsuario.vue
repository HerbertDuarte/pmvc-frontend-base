<template>
    <q-dialog>
        <q-card>
            <p>editar usuário</p>
            <pre>
                {{ usuario }}
            </pre>
        </q-card>
    </q-dialog>
</template>
<script lang="ts" setup>
defineProps({
    usuario: {
        required: true
    },
    acao: {
        type: Function,
        required: true
    }
})
</script>