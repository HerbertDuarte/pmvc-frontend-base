<script setup lang="ts">
import MainLayout from './layout/components/MainLayout.vue';
import LoginPage from './pages/login/LoginPage.vue';
import { useAuthStore } from './store/auth/authStore';

const auth = useAuthStore()
</script>

<template>
    <MainLayout v-if="auth.isAuthenticated">
        <router-view />
    </MainLayout>

    <LoginPage v-else />
</template>
