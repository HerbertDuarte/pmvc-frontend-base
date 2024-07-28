<template>
    <q-layout view="hHh Lpr lff">
        <q-page-container>
            <menu-options />
            <left-side-bar :tabs="tabsStore.tabs" />
            <main :class="`${sideBarStore.control}`">
                <q-page class="p-10">
                    Home page
                </q-page>
            </main>
        </q-page-container>
    </q-layout>
</template>

<script setup lang="ts">
import { useTabsStore } from '../states/tabs';
import leftSideBar from './LeftSideBar.vue';
import menuOptions from './MenuOptions.vue';
import { useSideBarStore } from '../states/side-bar.state';
const tabsStore = useTabsStore();
const sideBarStore = useSideBarStore();


</script>