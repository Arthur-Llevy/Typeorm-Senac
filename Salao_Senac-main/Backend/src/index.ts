import express, { Request, Response } from 'express';
import { DataSource } from "typeorm";
import { Produto } from './models/produto';
import { config } from './config/db.config';
import produtoRoutes from './routes/produto.route';
import "reflect-metadata"
import { AppDataSource } from './db/data-source';

// Inicialização do DataSource
AppDataSource.initialize()
    .then(() => {
        const app = express();

        app.use(express.json());

        app.use('/', produtoRoutes)
        
        app.listen(3000, () => console.log("Server on"));
    })
    .catch((error) => console.log('Erro na inicialização do banco de dados:', error));
