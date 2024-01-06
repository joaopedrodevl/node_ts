import UsuarioService from "./Usuario.service";

jest.mock('../repositories/User.repository')
jest.mock('../database', () => {
    initialize: jest.fn()
})

const mockUserRepository = require('../repositories/User.repository').UserRepository;

describe('UsuarioService', () => {
    const usuarioService = new UsuarioService(mockUserRepository);

    it('Deve adicionar um novo usuário', async() => {
        mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve({
            id_user: '1',
            name: 'Teste',
            email: 'teste@dio.me',
            password: 'senha'
        }))

        const response = await usuarioService.criaUsuario('Teste', 'teste@dio.me', 'senha');
        expect(mockUserRepository.createUser).toHaveBeenCalled();
        expect(response).toMatchObject({
            id_user: '1',
            name: 'Teste',
            email: 'teste@dio.me',
            password: 'senha'
        })
    })
})