import { Ref, ref } from 'vue';
export interface PageProps {
    itensPorPagina: Ref<number>;
    pagina: Ref<number>;
}

export interface FullPageProps extends PageProps {
    setItensPorPagina: (value: number) => void;
    setPagina: (value: number) => void;
}

type PageDefaults = {
    itensPorPagina: number;
};
export const usePageProps = (defaults?: PageDefaults): FullPageProps => {
    const itensPorPagina = ref(defaults?.itensPorPagina ?? 5);
    const pagina = ref(1);

    function setItensPorPagina(value: number) {
        itensPorPagina.value = value;
    }

    function setPagina(value: number) {
        pagina.value = value;
    }

    return {
        itensPorPagina,
        pagina,
        setItensPorPagina,
        setPagina,
    };
};
