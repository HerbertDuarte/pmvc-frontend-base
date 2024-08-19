import { Dialog } from 'quasar';
import CtiAlert from './components/CtiAlert.vue';

export type AlertProps = {
    mensagem: string;
    description?: string;
    buttonTitle?: string;
    action: (...args: any[]) => void | Promise<void>;
};

export function CreateAlert({ mensagem, action, buttonTitle }: AlertProps) {
    Dialog.create({
        component: CtiAlert,
        componentProps: {
            mensagem,
            buttonTitle,
            action,
        },
    });
}
