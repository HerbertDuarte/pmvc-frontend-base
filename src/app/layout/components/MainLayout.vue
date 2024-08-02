<template>
    <q-layout view="hHh Lpr lff">
        <q-page-container>
            <q-toolbar class="flex justify-between bg-slate-100 border-b-[1px]">
                <div class="flex items-center gap-10 text-slate-600">
                    <q-btn
                        flat
                        dense
                        round
                        icon="menu"
                        aria-label="Menu"
                        @click="sideBarStore.handleClick()"
                    />
                    <div class="flex items-center gap-2">
                        <q-avatar class="size-7">
                            <img src="images/logo.png" />
                        </q-avatar>
                        <p class="text-lg text-slate-600 font-bold">PMVC</p>
                    </div>
                </div>
                <menu-options />
            </q-toolbar>
            <LeftSideBar />
            <main class="p-10">
                <slot />
            </main>
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import LeftSideBar from './LeftSideBar.vue';
import menuOptions from './MenuOptions.vue';
import { useSideBarStore } from '../states/side-bar.state';
const sideBarStore = useSideBarStore();
</script>
