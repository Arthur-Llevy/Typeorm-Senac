import "reflect-metadata"
import { DataSource } from "typeorm"
import { config, dialect } from "../config/db.config"
import { ProdutoEstoque } from "../models/produtoEstoque"
import { Produto } from "../models/produto"

export const AppDataSource = new DataSource({
    type: dialect,
    host: config.HOST,
    port: config.PORT,
    username: config.USER,
    password: config.PASSWORD,
    database: config.DB,
    entities: [ProdutoEstoque, Produto],
    synchronize: true,
    logging: false,
});