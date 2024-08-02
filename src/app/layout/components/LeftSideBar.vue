<script setup lang="ts">
import { tabRoutes } from '../../router/routes/tabRoutes';
import { useSideBarStore } from '../states/side-bar.state';
const sideBarStore = useSideBarStore();
</script>

<template>
    <q-drawer behavior="desktop" v-model="sideBarStore.control" show-if-above bordered class="bg-slate-100">
        <q-img
            src="https://cdn.shopify.com/s/files/1/0066/4574/3686/files/Abstract_LinkedIn_Background.png?v=1627912075"
            class="h-36">
            <div class="size-full bg-black/20">
                <q-avatar size="56px" class="q-mb-sm">
                    <img
                        src="https://media.licdn.com/dms/image/D4D03AQEA9ToGtXwYfQ/profile-displayphoto-shrink_200_200/0/1712106886747?e=1727913600&v=beta&t=0J6NLyJfNdUQtUiNsGyMc1nNrMOYO_Toeq6jCMhJX3I">
                </q-avatar>
                <div class="text-weight-bold">Herbert Duarte</div>
                <div>@herbert</div>
            </div>
        </q-img>
        <q-list class="p-4 text-slate-600">
            <q-item class="rounded" clickable v-for="tab in tabRoutes" :key="tab.path" :to="tab.path" exact>
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
