import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { DebitEntity } from '../../debit/entity/debit.entity';

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

    @OneToMany(() => DebitEntity, (debit) => debit.client)
    debits: DebitEntity[];
}
