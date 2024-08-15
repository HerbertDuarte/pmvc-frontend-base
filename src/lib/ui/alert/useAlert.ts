import { Dialog } from 'quasar';
import CtiAlert from './components/CtiAlert.vue';

type AlertProps = {
    message: string;
    description?: string;
    buttonTitle?: string;
    action?: () => void;
};

export function CreateAlert({ message, action, buttonTitle }: AlertProps) {
    Dialog.create({
        component: CtiAlert,
        componentProps: {
            message,
            buttonTitle,
            action,
        },
    });
}
