import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useAuthStore } from '../auth/authStore';
import { useRouter } from 'vue-router';

export const useFormLogin = defineStore('form-login', () => {
    const router = useRouter();
    const auth = useAuthStore();
    const { isAuthenticated } = storeToRefs(auth);
    const email = ref('');
    const password = ref('');

    function submit() {
        isAuthenticated.value = true;
        router.push('/');
    }

    return {
        email,
        password,
        submit,
    };
});
