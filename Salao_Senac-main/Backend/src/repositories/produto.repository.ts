import { AppDataSource } from "../db/data-source";
import { ProdutoEstoque } from "../models/produtoEstoque";
import { Produto } from "../models/produto";

class ProdutoEstoqueRepository {
    produtoEstoqueRepository = AppDataSource.getRepository(ProdutoEstoque);

    // Salvar um produto no estoque
    async save(produtoEstoque: ProdutoEstoque): Promise<ProdutoEstoque> {
        try {
            const produto = await AppDataSource.getRepository(Produto).findOneBy({
                idProduto: produtoEstoque.idProduto,
            });

            if (!produto) {
                throw new Error("Produto não encontrado. O estoque não pode ser criado.");
            }

            await this.produtoEstoqueRepository.save(produtoEstoque);
            return produtoEstoque;
        } catch (error) {
            throw new Error("Falha ao salvar o estoque do produto!: " + error);
        }
    }

    // Recuperar todos os estoques
    async retrieveAll(): Promise<Array<ProdutoEstoque>> {
        try {
            return this.produtoEstoqueRepository.find({
                relations: ["produto"], // Se houver relacionamento com Produto
            });
        } catch (error) {
            throw new Error("Falha ao retornar os estoques de produtos!");
        }
    }

    // Recuperar estoque pelo id do produto
    async retrieveById(produtoId: number): Promise<ProdutoEstoque | null> {
        try {
            return this.produtoEstoqueRepository.findOne({
                where: {
                    idProduto: produtoId,
                },
                relations: ["produto"], // Relacinamento com Produto
            });
        } catch (error) {
            throw new Error("Falha ao buscar o estoque do produto!");
        }
    }

    // Atualizar o estoque de um produto
    async update(produtoEstoque: ProdutoEstoque): Promise<void> {
        try {
            // Verifica se o produto existe antes de atualizar o estoque
            const produto = await AppDataSource.getRepository(Produto).findOneBy({
                idProduto: produtoEstoque.idProduto,
            });

            if (!produto) {
                throw new Error("Produto não encontrado. Não é possível atualizar o estoque.");
            }

            await this.produtoEstoqueRepository.save(produtoEstoque);
        } catch (error) {
            throw new Error("Falha ao atualizar o estoque do produto!");
        }
    }

    // Deletar estoque de um produto específico
    async delete(produtoId: number): Promise<number> {
        try {
            const produtoEstoque = await this.produtoEstoqueRepository.findOne({
                where: {
                    idProduto: produtoId,
                },
                relations: ["produto"], //Garantindo que o produto existe
            });

            if (produtoEstoque) {
                await this.produtoEstoqueRepository.remove(produtoEstoque);
                return 1;
            }
            return 0;
        } catch (error) {
            throw new Error("Falha ao deletar o estoque do produto!");
        }
    }

    // Deletar todos os registros de estoque
    async deleteAll(): Promise<number> {
        try {
            const result = await this.produtoEstoqueRepository.query(
                "SELECT COUNT(id_produto) AS total FROM ProdutoEstoque;"
            );
            const total = result[0].total || 0;

            await this.produtoEstoqueRepository.query("DELETE FROM ProdutoEstoque;");
            
            return total;
        } catch (error) {
            throw new Error("Falha ao deletar todos os registros de estoque!");
        }
    }
}

export default new ProdutoEstoqueRepository();