import { UsuarioNivel } from '../../../../entities/usuario';

export const nivelOptions = [
    { label: 'Todos', value: null },
    { label: 'Administrador', value: UsuarioNivel.Administrador },
    { label: 'Usuário', value: UsuarioNivel.Usuario },
];
