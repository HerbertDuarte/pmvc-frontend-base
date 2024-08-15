import { api } from '../../boot/axios';
import { PageProps } from './page-props';
import { PaginateResponse } from './paginate-response';
import { Queries } from './queries';

export class PaginateUtil {
    public static async paginate<T>(
        path: string,
        pageProps: PageProps,
        queries?: Queries,
    ): Promise<PaginateResponse<T>> {
        let url = `/${path}?pagina=${pageProps.pagina.value}&itensPorPagina=${pageProps.itensPorPagina.value}`;

        if (queries) {
            for (const [key, value] of Object.entries(queries)) {
                if (value) {
                    url += `&${key}=${value}`;
                }
            }
        }

        const { data } = await api.get(url);

        return data;
    }
}
