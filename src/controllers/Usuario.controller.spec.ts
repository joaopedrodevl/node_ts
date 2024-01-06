import UsuarioController from "./Usuario.controller";
import UsuarioService from "../services/Usuario.service";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { Request } from "express";

const mockUserService = {
    criaUsuario: jest.fn(),
}

jest.mock('../services/Usuario.service', () => {
    return {
        UsuarioService: jest.fn().mockImplementation(() => {
            return mockUserService;
        })
    }
});

describe('UsuarioController', () => {
    const mockUsuarioService: Partial<UsuarioService> = {
        criaUsuario: jest.fn(),
    }

    const usuarioController = new UsuarioController(mockUsuarioService as UsuarioService);

    it('Deve adicionar um novo usuario', () => {
        const mockRequest = {
            body: {
                nome: 'Teste',
                email: 'teste@dio.me',
                password: "123456"
            }
        } as Request;

        const mockResponse = makeMockResponse();
        usuarioController.criaUsuario(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(201);
    })

    it('Deve retornar erro 400 quando o nome não for informado', () => {
        const mockRequest = {
            body: {
                nome: '',
                email: 'teste@email.com',
                password: ""
            }
        } as Request;

        const mockResponse = makeMockResponse();
        usuarioController.criaUsuario(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
    })

    it('Deve retornar erro 400 quando o email não for informado', () => {
        const mockRequest = {
            body: {
                nome: 'teste',
                email: '',
                password: ""
            }
        } as Request;

        const mockResponse = makeMockResponse();
        usuarioController.criaUsuario(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
    })

    it('Deve retornar erro 400 quando o password não for informado', () => {
        const mockRequest = {
            body: {
                nome: 'teste',
                email: 'teste@email.com',
                password: ""
            }
        } as Request;

        const mockResponse = makeMockResponse();
        usuarioController.criaUsuario(mockRequest, mockResponse);
        expect(mockResponse.state.status).toBe(400);
    })
});