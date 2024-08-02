<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth/authStore';
import { storeToRefs } from 'pinia';
const auth = useAuthStore();
const { isAuthenticated } = storeToRefs(auth)
defineEmits(['handleSideBar']);

const router = useRouter();
function perfil() {
    router.push('/perfil');
}

function sair() {
    isAuthenticated.value = false;
    router.push('/login');
    throw new Error('Sessão encerrada');
}
</script>

<template>
    <q-btn class="text-slate-600" flat dense round icon="more_vert">
        <q-menu class="text-slate-600" anchor="bottom right" self="top right">
            <q-item clickable tag="a" @click="perfil" class="row items-center">
                <q-icon class="pr-2" name="person" size="sm" />
                <q-item-section class="text-sm font-medium">Perfil</q-item-section>
            </q-item>
            <q-item clickable tag="a" @click="sair" class="row items-center">
                <q-icon class="pr-2" name="logout" size="sm" />
                <q-item-section class="text-sm font-medium">Encerrar sessão</q-item-section>
            </q-item>
        </q-menu>
    </q-btn>
</template>
