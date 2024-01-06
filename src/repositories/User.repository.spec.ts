import { EntityManager } from "typeorm";
import { getMockEntityManager } from "../__mocks__/mockEntitityManager.mock";
import { User } from "../entitites/User";
import { UserRepository } from "./User.repository";

describe('UserRepository', () => {
    let userRepository: UserRepository; 
    let managerMock: Partial<EntityManager>;

    const mockUser: User = {
        id_user: '1',
        name: 'Teste User',
        email: 'teste@dio.me',
        password: 'password'
    }

    beforeAll(async () => {
        managerMock = await getMockEntityManager({
            saveReturn: mockUser
        });
        userRepository = new UserRepository(managerMock as EntityManager);
    })

    it('Deve cadastrar um novo usuário no banco de dados', async() => {
        const response = await userRepository.createUser(mockUser)
        expect(managerMock.save).toHaveBeenCalled();
        expect(response).toMatchObject(mockUser);
    });
});