import { defineStore } from 'pinia';
import { LoginPayload, useAuthStore } from '../auth/authStore';
import { ref } from 'vue';

export const useFormLogin = defineStore('form-login', () => {
    const auth = useAuthStore();

    const username = ref('');
    const password = ref('');

    async function submit() {
        await auth.doLogin({
            username: username.value,
            password: password.value,
        });
    }

    return {
        username,
        password,
        submit,
    };
});
