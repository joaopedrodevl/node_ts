import { DataSource } from "typeorm"
import { User } from "../entitites/User"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "./src/database/db.sqlite",
    entities: [
        User
    ],
    migrations: {
        directory: "./src/database/migrations/*.ts"
    }
})

AppDataSource.initialize()
    .then(() => {
        console.log("Banco de dados foi inicializado!")
    })
    .catch((err) => {
        console.error("Erro durante a inicialização do banco de dados", err)
    })
