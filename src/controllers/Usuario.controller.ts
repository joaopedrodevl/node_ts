import { Request, Response } from "express";
import UsuarioService from "../services/Usuario.service";

class UsuarioController {

    private usuarioService: UsuarioService;

    constructor(usuarioService = new UsuarioService()) {
        this.usuarioService = usuarioService;
    }

    criaUsuario = (req: Request, res: Response): Response<any> => {
        const usuario = req.body;
        const erros: Array<string> = [];

        const validacoes = [
            {campo: usuario.nome, validacao: usuario.nome.trim() === "", mensagem: "Nome é obrigatório"},
            {campo: usuario.email, validacao: usuario.email.trim() === "", mensagem: "Email é obrigatório"},
        ];

        for (const campo of validacoes) {
            if (!campo.campo && campo.validacao) {
                erros.push(campo.mensagem);
            }
        }

        if (erros.length > 0) {
            return res.status(400).json({ mensagem: `Bad request!`, erros });
        }

        const novoUsuario = this.usuarioService.criaUsuario(usuario.nome, usuario.email);
        
        return res.status(201).json(novoUsuario);
    }

    listaUsuarios = (req: Request, res: Response): Response<any> => {
        return res.status(200).json(this.usuarioService.listaUsuarios());
    }

    listaUsuarioPorId = (req: Request, res: Response): Response<any> => {
        const id = Number(req.params.id);
        const usuario = this.usuarioService.listaUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        return res.status(200).json(usuario);
    }

    deletaUsuarioPorId = (req: Request, res: Response): Response<any> => {
        const id = Number(req.params.id);
        const usuario = this.usuarioService.deletaUsuarioPorId(id);
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        return res.status(200).json(usuario);
    }
}

export default UsuarioController;
