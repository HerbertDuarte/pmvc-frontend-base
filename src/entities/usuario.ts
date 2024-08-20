export interface Usuario {
    id?: string;
    nome: string;
    email: string;
    senha: string;
    nivel: UsuarioNivel;
    situacao: UsuarioSituacao;
    login: string;
}

export enum UsuarioNivel {
    Administrador = 'Administrador',
    Usuario = 'Usuario',
}

export enum UsuarioSituacao {
    Ativo = 'Ativo',
    Inativo = 'Inativo',
}
