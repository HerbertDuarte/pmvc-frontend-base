import { Ref, ref } from 'vue';

export class PageProps {
    itensPorPagina!: Ref<number>;
    pagina!: Ref<number>;
    setItensPorPagina!: (value: number) => void;
    setPagina!: (value: number) => void;
    next!: () => number;
    prev!: () => number;
}

type PageDefaults = {
    itensPorPagina: number;
};
export const usePageProps = (defaults?: PageDefaults): (() => PageProps) => {
    const itensPorPagina = ref<number>(defaults?.itensPorPagina ?? 5);
    const pagina = ref(1);

    function setItensPorPagina(value: number) {
        itensPorPagina.value = value;
    }

    function setPagina(value: number) {
        pagina.value = value;
    }

    function next() {
        pagina.value++;
        return pagina.value;
    }

    function prev() {
        pagina.value--;
        return pagina.value;
    }

    function getPageProps() {
        return {
            itensPorPagina,
            pagina,
            setItensPorPagina,
            setPagina,
            next,
            prev,
        };
    }

    return getPageProps;
};
