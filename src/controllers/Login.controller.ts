import { Request, Response } from 'express';
import UsuarioService from '../services/Usuario.service';

interface IUser {
    id_user: string;
    name: string;
    email: string;
    password: string;
}

const user: IUser = {
    id_user: "12345",
    name: 'joao',
    email: 'joao@dio.me',
    password: '123456'
}

export class LoginController {
    private usuarioService: UsuarioService;

    constructor(usuarioService = new UsuarioService()) {
        this.usuarioService = usuarioService;
    }

    login = async(req: Request, res: Response): Promise<any> => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ mensagem: "Bad request! Email ou senha inválido!" });
        }

        const token = await this.usuarioService.getToken(email, password);

        if (!token) {
            return res.status(401).json({ mensagem: "Unauthorized!" });
        }

        return res.status(200).json({ token });
    }
}