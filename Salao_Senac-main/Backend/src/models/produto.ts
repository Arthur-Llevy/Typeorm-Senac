import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Produto")
export class Produto {
    @PrimaryGeneratedColumn({ name: "id_produto" })
    idProduto?: number;

    @Column({ type: "varchar", length: 150, unique: true })
    nome: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    custo: number;

    @Column({ type: "text", nullable: true })
    descricao?: string;

    constructor(nome: string, custo: number, descricao?: string) {
        this.nome = nome;
        this.custo = custo;
        this.descricao = descricao;
    }
}
