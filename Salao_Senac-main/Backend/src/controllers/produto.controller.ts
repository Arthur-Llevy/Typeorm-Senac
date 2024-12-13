import { Request, Response } from 'express';
import produtoRepository from '../repositories/produto.repository';
import { Produto } from '../models/produto';
import { ProdutoEstoque } from '../models/produtoEstoque';

export class ProdutoController {
    async create(req: Request, res: Response) {
        try {
            const produto = new Produto("abc", 1233, "descrição")
            const novoPro = new ProdutoEstoque(1, 1233)
            const novoProduto = {
                idProduto: 1,
                quantidade: 12,
                produto: produto
            };

            produtoRepository.save(novoProduto)
            res.status(201).json({ message: 'Produto criado com sucesso!' });
        } catch(error) {
            console.log("Algo deu errado: ", error)
        }
    }

    async findAll(req: Request, res: Response) {
        // Lógica para encontrar todos os produtos
        res.status(200).json({ message: 'Lista de produtos' });
    }

    async findById(req: Request, res: Response) {
        // Lógica para encontrar um produto pelo ID
        res.status(200).json({ message: 'Produto encontrado' });
    }

    async update(req: Request, res: Response) {
        // Lógica para atualizar um produto
        res.status(200).json({ message: 'Produto atualizado com sucesso!' });
    }

    async delete(req: Request, res: Response) {
        // Lógica para deletar um produto
        res.status(200).json({ message: 'Produto deletado com sucesso!' });
    }
}
