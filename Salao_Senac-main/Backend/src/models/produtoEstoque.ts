import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Produto } from "./produto";

@Entity("ProdutoEstoque")
export class ProdutoEstoque {
    @PrimaryColumn({ name: "id_produto" })
    idProduto: number; // Chave primária

    @Column({ type: "int", default: 0 })
    quantidade: number;

    @OneToOne(() => Produto, { onDelete: "CASCADE" })
    @JoinColumn({ name: "id_produto" })
    produto?: Produto;

    constructor(idProduto: number, quantidade: number = 0) {
        this.idProduto = idProduto;
        this.quantidade = quantidade;
    }
}
