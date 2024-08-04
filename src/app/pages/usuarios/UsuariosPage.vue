<template>
    <main class="flex justify-center items-center">
        <CtiTable class="max-w-[1366px]" titulo="Usuários" :dados="usuarios" :colunas="colunas">
            <template v-slot:selects>
                <q-select class="cti-input" dense borderless v-model="selectNivel" :options="selectProps"
                    label="Nível" />
            </template>
        </CtiTable>
    </main>
</template>

<script lang="ts" setup>
import { QTableColumn } from 'quasar';
import CtiTable from '../../ui/table/CtiTable.vue';
import { onMounted, ref } from 'vue';
import { useUsuarioStore } from './store/usuario.store';
import { storeToRefs } from 'pinia';

const usuarioStore = useUsuarioStore();
const { deletaUsuario, atualizaUsuario } = usuarioStore
const { usuarios } = storeToRefs(usuarioStore);
const selectProps = [
    { label: 'Selecione', value: null },
    { label: 'Administrador', value: 'Administrador' },
    { label: 'Usuário', value: 'Usuario' },
];

const selectNivel = ref(selectProps[0])


const colunas: QTableColumn[] = [
    { name: 'nome', label: 'Nome', field: 'nome', align: 'center' },
    { name: 'login', label: 'Login', field: 'login', align: 'center' },
    { name: 'nivel', label: 'Nível', field: 'nivel', align: 'center' },
    { name: 'situacao', label: 'Situação', field: 'situacao', align: 'center' },
    { name: 'email', label: 'E-mail', field: 'email' },
];

const actions = [
    { label: 'Editar', icon: 'edit', color: 'primary', action: atualizaUsuario },
    { label: 'Excluir', icon: 'delete', color: 'negative', action: deletaUsuario },
];

onMounted(async () => {
    await usuarioStore.getUsuarios();
});
</script>
