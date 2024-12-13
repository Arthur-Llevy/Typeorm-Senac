import { todo } from "node:test";
import { AppDataSource } from "../db/data-source";
import { Produto } from "../models/produto";

class ProdutoRepository {
    produtoRepository = AppDataSource.getRepository(Produto);

    // Método assíncrono para salvar (inserir) o produto no banco de dados
    async save(produto: Produto): Promise<Produto> {
        try {
            this.produtoRepository.save(produto); //.save insere ou atualiza o registro, dependendo do objeto já possuir um id
            return produto; 
        } catch (error) { // Tratamento de erro
            console.error("Erro ao salvar o produto: ", error);
            throw new Error("Falha ao criar o produto!");
        }
    }

    // Método assíncrono para buscar e retornar todos os registros da entidade Produto no banco de dados
    async retrieveAll(): Promise<Array<Produto>> {
        try {
            return this.produtoRepository.find(); //.find recupera todos os registros da tabela
        } catch (error) { //Tratamento de erro
            console.error("Erro ao recuperar produtos: ", error);
            throw new Error("Falha ao buscar os produtos!");
        }
    }

    // Método assíncrono para buscar e retornar um registro específico de acordo com o id fornecido da entidade Produto no banco de dados
    async retrieveById(produtoId: number): Promise<Produto | null> { // Retorna o produto ou "null" em caso de não encontrado
        try {
            return this.produtoRepository.findOneBy({ //.findOneBy recupera um único registro da tabela pelo id
                idProduto: produtoId, // O parâmetro diz que os valores tem que ser iguais
            });
        } catch (error) { // Tratamento de erro
            console.error("Erro ao recuperar o produto pelo Id: ", error);
            throw new Error("Falha ao buscar o produto!");
        }
    }

    // Método assíncrono para buscar e retornar um registro específico de acordo com o nome fornecido
    async retrieveByName(n: string): Promise<Produto | null> {
        try {
            return this.produtoRepository.findOneBy({ //.findOneBy recupera um único registro da tabela pelo nome
                nome: n, // O parâmetro diz que os valores tem que ser iguais
            });
        } catch (error) { // Tratamento de erro
            console.error("Erro ao recuperar o produto pelo nome: ", error);
            throw new Error("Falha ao buscar produto!");
        }
    }

    // Método assíncrono para atualizar um registro na tabela Produto no banco de dados
    async update(produto: Produto) {
        // TODO: Verificar se o id é autoincrement e como isso funciona, tanto no meu banco como no banco de exemplo
        const { idProduto, nome, custo, descricao } = produto;
        try {
            this.produtoRepository.save(produto); // .save insere ou atualiza o registro, dependendo do objeto já possuir um id
        } catch (error) { // Tratamento de erro
            console.error("Erro ao atualizar o produto: ", error);
            throw new Error("Falha ao atualizar o filme!");
        }
    }

    // Método assíncrono para deletar um registro  específico na tabela Produto do banco de dados
    async delete(produtoId: number): Promise<number> {
        try {
            // Localizando o produto
            const produtoEncontrado = await this.produtoRepository.findOneBy ({
                idProduto: produtoId,
            });
            if (produtoEncontrado) {
                this.produtoRepository.remove(produtoEncontrado); // Removendo o produto se encontrado com .remove
                return 1; // Retorna 1 se for deletado com sucesso
            }
            return 0; // Retorna 0 se o produto não foi encontrado
        } catch (error) {
            console.error("Erro ao deletar o produto: ", error);
            throw new Error("Falha ao deletar o produto!");
        }
    }

    // Método assíncrono para deletar todos os registros na tabela Produto utilizando consulta SQL
    async deleteAll(): Promise<number> {
        try {
            // TODO: Se der erro, provavelmente é o nome da tabela que está com o P minúsculo
            // TODO: Verificar se num pode ser uma const
            let num = this.produtoRepository.query("select count(idProduto) from produto;"); // Utilizando .query para realizar uma consulta SQL e armazenando a Promise na variável num
            // await this.produtoRepository.clear(); // Outro método para excluir
            this.produtoRepository.query("delete from produto;"); // deletando todos os registros da tabela
            return num; // retornando a quantidade de registros antes da exclusão
        } catch (error) { // Tratamento de erro
            throw new Error("Falha ao deletar todos os produtos!");
        }
    }
}

export default new ProdutoRepository();