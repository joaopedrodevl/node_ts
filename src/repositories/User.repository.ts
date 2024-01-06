import { EntityManager } from "typeorm"; 
import { User } from "../entitites/User";

export class UserRepository {
    private manager: EntityManager;

    constructor(
        manager: EntityManager
    ) {
        this.manager = manager;
    }

    createUser = async (user: User): Promise<User> => {
        return await this.manager.save(user);
    }

    getUser = async (userId: string): Promise<User | null> => {
        try {
            return await this.manager.findOne(User, {
                where: {
                    id_user: userId
                }
            });
        } catch (error) {
            return null;
        }
    }

    getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
        try {
            return await this.manager.findOne(User, {
                where: {
                    email,
                    password
                }
            });
        } catch (error) {
            return null;
        }
    
    }

    getAllUser = async (): Promise<User[] | null> => {
        try {
            return await this.manager.find(User);
        } catch (error) {
            return null
        }
    }
}