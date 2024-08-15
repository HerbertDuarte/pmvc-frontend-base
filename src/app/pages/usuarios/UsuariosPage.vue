<template>
    <main class="flex justify-center items-center">
        <CtiTable class="max-w-[1366px]" titulo="Usuários" :dados="usuarios" :colunas="colunas"
            :find-action="findAction" :acoes="acoes">
            <template v-slot:selects>
                <SelectNivel />
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
import SelectNivel from './componentes/SelectNivel.vue';

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
    { name: 'nome', label: 'Nome', field: 'nome', align: 'center' },
    { name: 'login', label: 'Login', field: 'login', align: 'center' },
    { name: 'nivel', label: 'Nível', field: 'nivel', align: 'center' },
    { name: 'situacao', label: 'Situação', field: 'situacao', align: 'center' },
    { name: 'email', label: 'E-mail', field: 'email' },
];

const acoes: Acao[] = [
    { label: 'Editar', icon: 'edit', color: 'primary', action: atualizaUsuario },
    { label: 'Excluir', icon: 'delete', color: 'negative', action: deletaUsuario },
];

const findAction = async () => {
    const nivel = selectNivelModel.value.value;
    await usuarioStore.getUsuarios({ nivel });
};

onMounted(async () => {
    await findAction();
});
</script>
