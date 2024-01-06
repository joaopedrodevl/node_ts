import { Request, Response } from "express";
import UsuarioService from "../services/Usuario.service";

class UsuarioController {

    private usuarioService: UsuarioService;

    constructor(usuarioService = new UsuarioService()) {
        this.usuarioService = usuarioService;
    }

    criaUsuario = async(req: Request, res: Response): Promise<any> => {
        const usuario = req.body;
        const erros: Array<string> = [];

        const validacoes = [
            {campo: usuario.nome, validacao: usuario.nome.trim() === "", mensagem: "Nome é obrigatório"},
            {campo: usuario.email, validacao: usuario.email.trim() === "", mensagem: "Email é obrigatório"},
            {campo: usuario.password, validacao: usuario.password.trim() === "", mensagem: "Password é obrigatório"}
        ];

        for (const campo of validacoes) {
            if (!campo.campo && campo.validacao) {
                erros.push(campo.mensagem);
            }
        }

        if (erros.length > 0) {
            return res.status(400).json({ mensagem: `Bad request!`, erros });
        }

        try {
            const usuarioCriado = await this.usuarioService.criaUsuario(usuario.nome, usuario.email, usuario.password)
            return res.status(201).json(usuarioCriado);
        } catch (error) {
            return res.status(500).json({ mensagem: `Erro interno no servidor!`, error });
        }
        
    }

    listaUsuarios = async(req: Request, res: Response): Promise<any> => {
        const usuarios = await this.usuarioService.listaUsuarios();
        return res.status(200).json(usuarios);
    }

    listaUsuarioPorId = async(req: Request, res: Response): Promise<any> => {
        const usuario = await this.usuarioService.listaUsuarioPorId(req.params.id);
        return res.status(200).json({
            id_user: usuario?.id_user,
            name: usuario?.name,
            email: usuario?.email
        });
    }

    deletaUsuarioPorId = (req: Request, res: Response): Response<any> => {
        return res.status(200).json({msg: "delete"});
    }
}

export default UsuarioController;
