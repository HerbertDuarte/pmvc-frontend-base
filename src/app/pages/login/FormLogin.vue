<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFormLogin } from '../../store/login/form-login';

const form = useFormLogin();
const { password, username } = storeToRefs(form);

</script>

<template>
    <form @submit.prevent="form.submit()" class="flex flex-col max-w-[500px] w-full justify-start gap-4">
        <q-input class="inline flex-1 w-full cti-input" dense borderless placeholder="Digite seu login"
            v-model="username" type="text" required />
        <q-input class="inline flex-1 w-full cti-input" placeholder="Digite sua senha" borderless dense
            v-model="password" type="password" required />
        <q-btn type="submit" class="bg-slate-700 text-slate-50">Login</q-btn>
    </form>
</template>
