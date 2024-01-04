import UsuarioService, {IUsuario} from "./Usuario.service";

describe('UsuarioService', () => {
    const db_test: Array<IUsuario> = [
        {
            id: 1,
            nome: "João",
            email: "joao@email.com"
        },
        {
            id: 2,
            nome: "Maria",
            email: "maria@email.com"
        },
    ];

    const usuarioService = new UsuarioService(db_test);

    it('Deve adicionar um novo usuário', () => {
        const usuario = usuarioService.criaUsuario('João', 'joao@dio.me');
        expect(usuario).toMatchObject({
            id: 3,
            nome: 'João',
            email: 'joao@dio.me'
        });
    })

    it('Deve retornar todos os usuários', () => {
        const usuarios = usuarioService.listaUsuarios();
        expect(usuarios).toMatchObject(db_test);
    })

    it('Deve retornar um usuário por id', () => {
        const usuario = usuarioService.listaUsuarioPorId(1);
        expect(usuario).toMatchObject({
            id: 1,
            nome: 'João',
            email: 'joao@email.com'
        });
    })

    it('Deve retornar false quando o usuário não for encontrado', () => {
        const usuario = usuarioService.listaUsuarioPorId(3);
        expect(usuario).toBeFalsy();
    })

    it('Deve deletar um usuário por id', () => {
        const usuario = usuarioService.deletaUsuarioPorId(1);
        expect(usuario).toMatchObject({
            id: 1,
            nome: 'João',
            email: 'joao@email.com'
        });
    })
})