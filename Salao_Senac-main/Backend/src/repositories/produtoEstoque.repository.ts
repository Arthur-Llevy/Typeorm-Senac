import { AppDataSource } from "../db/data-source";
import { ProdutoEstoque } from "../models/produtoEstoque";

class ProdutoEstoqueRepository {
    produtoEstoqueRepository = AppDataSource.getRepository(ProdutoEstoque);

    // Salvar um produto no estoque
    async save(produtoEstoque: ProdutoEstoque): Promise<ProdutoEstoque> {
        try {
            await this.produtoEstoqueRepository.save(produtoEstoque);
            return produtoEstoque;
        } catch (error) {
            throw new Error("Falha ao salvar o estoque do produto!");
        }
    }

    // Recuperar todos os estoques
    async retrieveAll(): Promise<Array<ProdutoEstoque>> {
        try {
            return this.produtoEstoqueRepository.find();
        } catch (error) {
            throw new Error("Falha ao retornar os estoques de produtos!");
        }
    }

    // Recuperar estoque pelo id do produto
    async retrieveById(produtoId: number): Promise<ProdutoEstoque | null> {
        try {
            return this.produtoEstoqueRepository.findOneBy({
                idProduto: produtoId,
            });
        } catch (error) {
            throw new Error("Falha ao buscar o estoque do produto!");
        }
    }

    // Atualizar o estoque de um produto
    async update(produtoEstoque: ProdutoEstoque): Promise<void> {
        try {
            await this.produtoEstoqueRepository.save(produtoEstoque);
        } catch (error) {
            throw new Error("Falha ao atualizar o estoque do produto!");
        }
    }

    // Deletar estoque de um produto específico
    async delete(produtoId: number): Promise<number> {
        try {
            const produtoEstoque = await this.produtoEstoqueRepository.findOneBy({
                idProduto: produtoId,
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
