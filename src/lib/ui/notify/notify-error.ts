import { AxiosError } from 'axios';
import { Notify } from 'quasar';
type NotifyErrorProps = { error?: unknown; message?: string };
export function notifyError({ error, message }: NotifyErrorProps) {
    if (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            if (error.response?.status === 500) {
                Notify.create({
                    message:
                        'Erro interno de servidor. Tente novamente mais tarde.',
                    type: 'negative',
                });
                return;
            }

            Notify.create({
                message: error.response?.data.message,
                type: 'negative',
            });
        } else {
            Notify.create({
                message: message || 'Erro ao realizar a operação.',
                type: 'negative',
            });
        }
        return;
    }

    Notify.create({
        message: message || 'Erro ao realizar a operação.',
        type: 'negative',
    });
}
