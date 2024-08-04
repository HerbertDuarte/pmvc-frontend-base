import {
    Dialog,
    Loading,
    Notify,
    QSpinnerBall,
    QuasarPluginOptions,
} from 'quasar';
import quasarLang from 'quasar/lang/pt-BR';
import quasarIconSet from 'quasar/icon-set/svg-material-icons';

export const quasarOptions: Partial<QuasarPluginOptions> = {
    plugins: { Notify, Loading, Dialog },
    lang: quasarLang,
    iconSet: quasarIconSet,
    config: {
        brand: {
            // primary: '#e46262',
            // ... or all other brand colors
        },
        // loading: {...}, // default set of options for Loading Quasar plugin
        // loadingBar: { ... }, // settings for LoadingBar Quasar plugin
        // ..and many more (check Installation card on each Quasar component/directive/plugin)
    },
    components: {
        QSpinnerBall,
    },
};
