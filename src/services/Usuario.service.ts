import { sign } from "jsonwebtoken";
import { AppDataSource } from "../database";
import { User } from "../entitites/User";
import { UserRepository } from "../repositories/User.repository";

class UsuarioService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository = new UserRepository(AppDataSource.manager)) {
        this.userRepository = userRepository;
    }

    criaUsuario = (nome: string, email: string, password: string): Promise<User> => {
        const user = new User(nome, email, password);
        return this.userRepository.createUser(user);
    }

    listaUsuarios = async () => {
        return await this.userRepository.getAllUser();
    }

    listaUsuarioPorId = async (id: string): Promise<User | null> => {
        try {
            return await this.userRepository.getUser(id);
        } catch (error) {
            return null;
        }
    }

    getAuthUser = async (email: string, password: string): Promise<any> => {
        return await this.userRepository.getUserByEmailAndPassword(email, password);
    }

    getToken = async (email: string, password: string): Promise<any> => {
        try {
            const user = await this.getAuthUser(email, password);

            if (!user) {
                return null;
            }

            const tokenData = {
                name: user.name,
                email: user.email
            }

            const tokenKey = '748923897hjhg3u1y2GHG8y23g3'

            const tokenOptions = {
                subject: user.id_user,
                expiresIn: '1d'
            }

            const token = sign(tokenData, tokenKey, tokenOptions)

            return token;
        } catch (error) {
            return null;
        }
    }
}

export default UsuarioService;
