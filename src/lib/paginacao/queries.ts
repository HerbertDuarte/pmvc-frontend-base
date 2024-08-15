import { Ref } from 'vue';

export type Queries = Record<
    string,
    | string
    | number
    | boolean
    | null
    | undefined
    | Ref<string | number | boolean | null | undefined>
>;
