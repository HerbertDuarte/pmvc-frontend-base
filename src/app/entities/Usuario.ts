export interface Usuario {
    id: string;
    nome: string;
    email: string;
    senha: string;
    nivel: 'Administrador' | 'Usuário';
}
