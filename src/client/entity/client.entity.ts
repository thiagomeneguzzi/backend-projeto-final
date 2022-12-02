import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column({
        unique: true,
    })
    cpf: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column()
    cep: string;

    @Column()
    address_number: number;

    @Column()
    complement: string;
}
