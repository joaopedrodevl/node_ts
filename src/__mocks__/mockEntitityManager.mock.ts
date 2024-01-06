import { EntityManager } from "typeorm";

interface MockManagerArgs {
    saveReturn?: object | Array<object>,
    findOneReturn?: object | null
}

export const getMockEntityManager = async({
    saveReturn = undefined,
    findOneReturn = undefined
}: MockManagerArgs): Promise<EntityManager> => {
    const manager: Partial<EntityManager> = {}

    manager.save = jest.fn().mockImplementation(() => Promise.resolve(saveReturn));
    manager.findOne = jest.fn().mockImplementation(() => Promise.resolve(saveReturn));

    return manager as EntityManager;
}