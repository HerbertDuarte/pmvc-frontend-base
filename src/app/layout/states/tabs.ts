import { defineStore } from "pinia"
import { onMounted, ref } from "vue";

export type TabMenu = {
    title: string,
    icon: string,
    link: string,
}


export const useTabsStore = defineStore('tabs-menu',()=> {
    const accessLevel = window.sessionStorage.getItem('access_level');
    const tabs = ref<TabMenu[]>([]);


    onMounted(()=>{
        if (accessLevel === 'Administrador') {
            tabs.value = adminMenu;
        } else {
            tabs.value = userMenu;
        }
    })

    return { tabs }

})

const adminMenu: TabMenu[] = [
    {
        title: 'Início',
        icon: 'home',
        link: `/a/`,
    },
    {
        title: 'Perfil',
        icon: 'person',
        link: `/perfil`,
    },
    {
        title: 'Usuários',
        icon: 'group',
        link: '/usuarios',
    },
]

const userMenu: TabMenu[] = [
    {
        title: 'Início',
        icon: 'home',
        link: `/u/`,
    },
    {
        title: 'Perfil',
        icon: 'person',
        link: `/perfil`,
    },
]
