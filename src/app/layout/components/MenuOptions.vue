<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSideBarStore } from '../states/side-bar.state';
const sideBarStore = useSideBarStore();


defineEmits(['handleSideBar']);

const router = useRouter();
function perfil() {
    router.push('/perfil');
}

function sair() {
    router.push('/login');
    throw new Error('Sessão encerrada');
}

</script>

<template>
    <q-toolbar class="flex justify-between bg-slate-100 border-b-[1px]">
        <div class="flex items-center gap-10 text-slate-600 ">
            <q-btn flat dense round icon="menu" aria-label="Menu" @click="sideBarStore.handleClick()" />
            <div class="flex items-center gap-2">
                <q-avatar class="size-7">
                    <img src="../../../../public/images/logo.png">
                </q-avatar>
                <p class="text-lg text-slate-600 font-bold">PMVC</p>
            </div>
        </div>
        <q-btn class="text-slate-600 " flat dense round icon="more_vert">

            <q-menu class="text-slate-600" anchor="bottom right" self="top right">
                <q-item clickable tag="a" @click="perfil" class="row items-center ">
                    <q-icon class="pr-2" name="person" size="sm" />
                    <q-item-section class="text-sm font-medium">Perfil</q-item-section>
                </q-item>
                <q-item clickable tag="a" @click="sair" class="row items-center">
                    <q-icon class="pr-2" name="logout" size="sm" />
                    <q-item-section class="text-sm font-medium">Encerrar sessão</q-item-section>
                </q-item>
            </q-menu>
        </q-btn>
    </q-toolbar>
</template>