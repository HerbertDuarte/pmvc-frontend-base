<script setup lang="ts">
import { useFormLogin } from '../../store/login/form-login';
const form = useFormLogin();

</script>

<template>
    <main class="flex justify-center items-stretch h-dvh">
        <div class="flex-1 h-dvh bg-cover hide"
            style="background-image: url('https://gantthub.pmvc.ba.gov.br/img/imagem-de-fundo.b0cba8ad.svg');">
        </div>
        <div class="p-10 flex-1 flex flex-col items-center justify-center">
            <h1 class="text-2xl font-bold py-10 text-slate-700">PMVC</h1>
            <form class="flex flex-col max-w-[500px] w-full justify-start gap-4">
                <q-input class="inline flex-1 w-full cti-input" dense borderless placeholder="Digite seu email"
                    :model-value="form.email" type="email" required />
                <q-input class="inline flex-1 w-full cti-input" placeholder="Digite sua senha" borderless dense
                    :model-value="form.password" type="password" required />
                <q-btn class="bg-slate-700 text-slate-50" @click="form.submit()">Login</q-btn>
            </form>

            <p class="text-sm pt-8">v1.0.0</p>

        </div>
    </main>
</template>

<style>
.hide {
    display: none;
}

@media screen and (min-width: 1024px) {
    .hide {
        display: block;
    }
}
</style>