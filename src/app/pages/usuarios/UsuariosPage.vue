<template>
    <main class="flex justify-center items-center">
        <CtiTable class="max-w-[1366px]" titulo="Usuários" :findAction="getAll" :dados="usuarios" :colunas="colunas"
            :acoes="acoes">
            <template v-slot:selects>
                <q-select class="cti-input" dense borderless v-model="selectNivelModel" :options="nivelOptions"
                    label="Nível" />
            </template>
        </CtiTable>
    </main>
</template>

<script lang="ts" setup>
import { QTableColumn } from 'quasar';
import CtiTable, { Acao } from '../../../lib/ui/table/CtiTable.vue';
import { onMounted, ref } from 'vue';
import { useUsuarioStore } from './store/usuario.store';
import { storeToRefs } from 'pinia';

const usuarioStore = useUsuarioStore();
const { deletaUsuario, atualizaUsuario } = usuarioStore
const { usuarios } = storeToRefs(usuarioStore);

const nivelOptions = [
    { label: 'Todos', value: null },
    { label: 'Administrador', value: 'Administrador' },
    { label: 'Usuário', value: 'Usuario' },
];

const selectNivelModel = ref(nivelOptions[0]);


const colunas: QTableColumn[] = [
    { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
    { name: 'login', label: 'Login', field: 'login', align: 'left' },
    { name: 'nivel', label: 'Nível', field: 'nivel', align: 'left' },
    { name: 'situacao', label: 'Situação', field: 'situacao', align: 'left' },
    { name: 'email', label: 'E-mail', field: 'email', align: 'left' },
    { name: 'acoes', label: 'Ações', field: "acoes", align: 'right' },
];

const acoes: Acao[] = [
    { label: 'Editar', icon: 'edit', color: 'primary', action: atualizaUsuario },
    { label: 'Excluir', icon: 'delete', color: 'negative', action: deletaUsuario },
];

async function getAll(search: string = "") {
    const nivel = selectNivelModel.value.value;
    await usuarioStore.getUsuarios({ nivel, busca: search });
}

onMounted(async () => {
    await getAll()
});
</script>
