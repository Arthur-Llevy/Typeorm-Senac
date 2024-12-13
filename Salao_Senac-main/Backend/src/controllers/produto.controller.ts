import { Request, Response } from 'express';
import produtoRepository from '../repositories/produto.repository';
import { Produto } from '../models/produto';
import { ProdutoEstoque } from '../models/produtoEstoque';

export class ProdutoController {
    async create(req: Request, res: Response) {
        try { 
            const { idProduto, quantidade } = req.body;
            const novoProduto = new ProdutoEstoque(idProduto, quantidade);

            produtoRepository.save(novoProduto)
            res.status(201).json({ message: 'Produto criado com sucesso!' });
        } catch(error) {
            console.log("Algo deu errado: ", error)
        }
    }

    async findAll(req: Request, res: Response) {
        // Lógica para encontrar todos os produtos
        try {
            const produtos = await produtoRepository.retrieveAll();
            res.status(200).json({ produtos });
        } catch (error) {
            console.log('Falha ao buscar todos os produtos: ', error)
        }
    }

    async findById(req: Request, res: Response) {
        // Lógica para encontrar um produto pelo ID
        const idProduto  = Number(req.params.id);
        try {
            const produtos = await produtoRepository.retrieveById(idProduto);
            res.status(200).json({ produtos });
        } catch (error) {
            console.log('Falha ao buscar produto por id: ', error)
        }
        res.status(200).json({ message: 'Produto encontrado' });
    }

    async update(req: Request, res: Response) {
        // Lógica para atualizar um produto
       // repensar na lógica mais tarde, atualizar as duas tabelas
    }

    async delete(req: Request, res: Response) {
        // Lógica para deletar um produto
        try {
            const idProduto = Number(req.params.id);
            const produto = await produtoRepository.delete(idProduto);
            res.status(200).json({ produto });
        } catch (error) {
            console.log('Falha ao excluir produtos: ', error)
        }
        res.status(200).json({ message: 'Produto deletado com sucesso!' });
    }
}
