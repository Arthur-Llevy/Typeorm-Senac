import { DataSourceOptions } from 'typeorm';

// db.config.ts
import { Produto } from '../models/produto';
import { ProdutoEstoque } from '../models/produtoEstoque';

export const config: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "Senac",
    entities: [Produto, ProdutoEstoque], // Adicione suas entidades aqui
    synchronize: true,
};
