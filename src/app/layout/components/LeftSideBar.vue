<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { getTabs, Route, tabRoutes } from '../../router/routes/tab-routes';
import { useAuthStore } from '../../store/auth/authStore';
import { useSideBarStore } from '../states/side-bar.state';
import { UsuarioNivel } from '../../../entities/usuario';
const sideBarStore = useSideBarStore();
const authStore = useAuthStore();

const { user } = storeToRefs(authStore);
function canShow(tab: Route) {
    return !(tab.meta?.requiredAdminLevel && user.value?.nivel !== UsuarioNivel.Administrador)
}

</script>

<template>
    <q-drawer behavior="desktop" v-model="sideBarStore.control" show-if-above bordered class="bg-slate-100">
        <q-img
            src="https://cdn.shopify.com/s/files/1/0066/4574/3686/files/Abstract_LinkedIn_Background.png?v=1627912075"
            class="h-36">
            <div class="size-full bg-black/20">
                <q-avatar size="48px" class="q-mb-sm">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541">
                </q-avatar>
                <div class="text-weight-bold">{{ user?.nome }}</div>
                <div>{{ user?.email }}</div>
            </div>
        </q-img>
        <q-list class="p-4 text-slate-600">
            <q-item v-for="tab in tabRoutes" :key="tab.path" :to="tab.path" clickable exact class="rounded">
                <div v-if="canShow(tab)" class="flex items-center justify-start">
                    <q-item-section avatar>
                        <q-icon :name="tab.icon" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-sm font-medium">{{
                            tab.title
                        }}</q-item-label>
                    </q-item-section>
                </div>
            </q-item>
        </q-list>
    </q-drawer>
</template>
