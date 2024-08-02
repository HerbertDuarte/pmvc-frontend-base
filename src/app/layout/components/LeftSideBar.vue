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
            <div class="absolute-bottom bg-transparent">
                <q-avatar size="56px" class="q-mb-sm">
                    <img
                        src="https://media.licdn.com/dms/image/C4E03AQFpbjnnW6dm6Q/profile-displayphoto-shrink_800_800/0/1575046662258?e=1727913600&v=beta&t=nko2U_EUo6aXSjLa-NtL6NVCK6e7wWOsoZhz5VRG2B4">
                </q-avatar>
                <div class="text-weight-bold">Jaquionias Ferraz</div>
                <div>@jac</div>
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
