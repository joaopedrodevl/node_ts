interface IUsuario {
    nome: string,
    email: string,
    id: number
}

const db: Array<IUsuario> = [
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

class UsuarioService {
    private db: Array<IUsuario>;

    constructor(database = db) {
        this.db = database;
    }

    criaUsuario = (nome: string, email: string): IUsuario => {
        const id = db.length + 1;
        
        const usuario: IUsuario = {
            id,
            nome,
            email
        };

        this.db.push(usuario);
        return usuario;
    }

    listaUsuarios = (): Array<IUsuario> => {
        return this.db;
    }

    listaUsuarioPorId = (id: number): IUsuario | boolean => {
        const usuario = db.find(usuario => usuario.id === id);
        if (!usuario) {
            return false;
        }

        return usuario;
    }

    deletaUsuarioPorId = (id: number): boolean | IUsuario => {
        const usuario = db.find(usuario => usuario.id === id);
        if (!usuario) {
            return false;
        }

        const index = db.indexOf(usuario);
        db.splice(index, 1);

        return usuario;
    }
}

export default UsuarioService;
export type { IUsuario };
