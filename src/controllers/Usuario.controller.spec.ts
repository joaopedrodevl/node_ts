import UsuarioController from "./Usuario.controller";
import UsuarioService from "../services/Usuario.service";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { Request } from "express";

describe('UsuarioController', () => {
    const mockUsuarioService: Partial<UsuarioService> = {
        criaUsuario: jest.fn(),
        listaUsuarios: jest.fn(),
        listaUsuarioPorId: jest.fn(),
        deletaUsuarioPorId: jest.fn()
    }

    const usuarioController = new UsuarioController(mockUsuarioService as UsuarioService);

    it('Deve adicionar um novo usuario', () => {
        const mockRequest = {
            body: {
                nome: 'Teste',
                email: 'teste@dio.me'
            }
        } as Request;

        const mockResponse = makeMockResponse();
        usuarioController.criaUsuario(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
    })

    it('Deve retornar todos os usuarios', () => {
        const mockRequest = {} as Request;

        const mockResponse = makeMockResponse();
        usuarioController.listaUsuarios(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(200);
    })

    it('Deve retornar um erro 400 quando o nome não for informado', () => {
        const mockRequest = {
            body: {
                nome: '',
                email: 'joao@dio.me'
            }
        } as Request;

        const mockResponse = makeMockResponse();
        usuarioController.criaUsuario(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({
            "mensagem": "Bad request!",
            "erros": [
                "Nome é obrigatório"
            ]
        });
    })

    it('Deve retornar um erro 400 quando o email não for informado', () => {
        const mockRequest = {
            body: {
                nome: 'João',
                email: ''
            }
        } as Request;

        const mockResponse = makeMockResponse();
        usuarioController.criaUsuario(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
        expect(mockResponse.state.json).toMatchObject({
            "mensagem": "Bad request!",
            "erros": [
                "Email é obrigatório"
            ]
        });
    })

    it('Deve retornar um erro 404 quando o usuário não for encontrado', () => {
        const mockRequest = {
            params: {
                id: 3
            }
        } as unknown as Request;

        const mockResponse = makeMockResponse();
        usuarioController.listaUsuarioPorId(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(404);
        expect(mockResponse.state.json).toMatchObject({
            "mensagem": "Usuário não encontrado"
        });
    })

    it('Deve deletar um usuário por id', () => {
        const mockRequest = {
            params: {
                id: 1
            }
        } as unknown as Request;

        const mockResponse = makeMockResponse();
        usuarioController.deletaUsuarioPorId(mockRequest, mockResponse);
        console.log(mockResponse.state.json);
    })
});