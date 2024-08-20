import { Notify } from 'quasar';

export function notifySuccess({ message }: { message: string }) {
    Notify.create({
        color: 'green-10',
        icon: 'done_all',
        position: 'top',
        timeout: 2000,
        message: message ?? 'Operação realizada com sucesso',
    });
}
