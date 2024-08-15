<template>
    <q-form @submit.prevent.stop="() => submit()" greedy>
        <div class="">
            <div class="">
                <q-input dense outlined v-model="form.nome" lazy-rules label="Nome" hint="Informe o nome completo sem
            abreviações" clearable clear-icon="close" :rules="nameRules" />
            </div>
            <div class="">
                <q-input dense outlined v-model="form.email" lazy-rules label="Email" hint="Informe o email" clearable
                    clear-icon="close" :rules="emailRules" />
            </div>
            <div class="">
                <q-select outlined dense v-model="form.nivel" :options="nivelAcesso" lazy-rules label="Nível"
                    hint="Informe o nível de acesso" clear-icon="close" :rules="campoVazioRules" />
            </div>
            <div class="">
                <q-select dense outlined v-model="form.situacao" :options="situacao" lazy-rules label="Situação"
                    hint="Informe a situação" clear-icon="close" :rules="campoVazioRules" />
            </div>

            <div class="">
                <q-input dense outlined v-model="form.login" lazy-rules label="Login" hint="Informe o nome para login"
                    clearable clear-icon="close" :rules="loginRules" />
            </div>
            <div class="">
                <q-input type="password" dense outlined v-model="form.senha" lazy-rules label="Senha"
                    hint="Informe uma senha" clear-icon="close" :rules="senhaRules" />
            </div>
            <div class="">
                <q-input dense outlined v-model="confirmacao_senha" lazy-rules label="Confirmação da senha"
                    hint="Informe novamente a senha" type="password" clear-icon="close" :rules="confirmarSenhaRules" />
            </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-6">
            <q-btn size="md" label="Salvar" type="submit" color="primary" />
            <q-btn v-close-popup label="Cancelar" color="grey-2" text-color="grey-10" />
        </div>
    </q-form>

</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUsuarioStore } from "../../store/usuario.store";
import { storeToRefs } from "pinia";
import { Usuario } from "../../../../../entities/usuario";
const usuarioStore = useUsuarioStore();
const { usuario } = storeToRefs(usuarioStore);

const formInitialState: Usuario = {
    nome: "",
    email: "",
    nivel: "Usuário",
    situacao: "Ativo",
    login: "",
    senha: "",
};

const props = defineProps({
    update: {
        type: Boolean,
    }
});

const form = ref<Usuario>(formInitialState);

const confirmacao_senha = ref("");

const nivelAcesso = ref(["Usuário", "Administrador"]);

const situacao = ref(["Ativo", "Inativo"]);


function validaNome(val: string) {
    const regex = /[!@#$%*()_+=-?°``''~©,.;<>:]|[0-9]/g;

    return !regex.test(val);
}

function validaEmail(val: string) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(val);
}

function validaLogin(val: string) {
    const regex = /[^a-zA-Zs]/g;

    return !regex.test(val);
}

function validaSenha() {
    if (props.update) return true;

    return !!form.value.senha.length;
}

function validaConfirmacaoSenha() {
    if (!!props.update && form.value.senha.length == 0) return true;

    const valoresIguais = form.value.senha === confirmacao_senha.value;

    if (valoresIguais) return true;
}

const campoVazioRules = [(val: string) => !!val || "*Campo obrigatório"];

const nameRules = [
    (val: string) => !!val || "*Campo obrigatório",
    (val: string) =>
        validaNome(val) ||
        "*Proibido o uso dos seguintes caracteres [!@#$%*()_+=-?°``''~©,.;<>:], valores numéricos ou espaços",
];

const emailRules = [
    (val: string) => !!val || "*Campo obrigatório",
    (val: string) => validaEmail(val) || "*Formato de email inválido",
];

const loginRules = [
    (val: string) => !!val || "*Campo obrigatório",
    (val: string) =>
        validaLogin(val) ||
        "*Proibido o uso dos seguintes caracteres [!@#$%*()_+=-?°``''~©,.;<>:], valores numéricos ou espaços",
];

const senhaRules = [() => validaSenha() || "*Campo obrigatório"];

const confirmarSenhaRules = [
    () =>
        validaConfirmacaoSenha() ||
        "*A senha deve ser igual a confirmação da senha",
];

function preencheCampos(data: Usuario) {
    form.value.nome = data.nome;
    form.value.email = data.email;
    form.value.nivel = data.nivel;
    form.value.situacao = data.situacao;
    form.value.login = data.login;
}

function submit() {
    if (props.update) {
        usuarioStore.atualizaUsuario(form.value)
        return;
    }
    usuarioStore.criarUsuario(form.value)
    form.value = formInitialState;
}

onMounted(async () => {
    if (props.update) {
        preencheCampos(usuario.value as Usuario);
    }
});
</script>