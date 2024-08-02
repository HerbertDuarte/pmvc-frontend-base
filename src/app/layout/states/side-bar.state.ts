// stores/counter.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSideBarStore = defineStore('side-bar', () => {
    const control = ref<boolean>(false);

    function handleClick() {
        control.value = !control.value;
    }

    return { control, handleClick };
});
