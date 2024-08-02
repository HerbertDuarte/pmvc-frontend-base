<script setup lang="ts">
import { tabRoutes } from '../../router/routes/tabRoutes';
import { useSideBarStore } from '../states/side-bar.state';
const sideBarStore = useSideBarStore();
</script>

<template>
    <q-drawer
        behavior="desktop"
        v-model="sideBarStore.control"
        show-if-above
        bordered
        class="bg-slate-100"
    >
        <q-list class="p-4 text-slate-600">
            <q-item
                class="rounded"
                clickable
                v-for="tab in tabRoutes"
                :key="tab.path"
                :to="tab.path"
                exact
            >
                <q-item-section avatar>
                    <q-icon :name="tab.icon" />
                </q-item-section>
                <q-item-section>
                    <q-item-label class="text-sm font-medium">{{
                        tab.title
                    }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-drawer>
</template>
