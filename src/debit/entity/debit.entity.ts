import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientEntity } from '../../client/entity/client.entity';
import { STATUS } from '../dtos/create-debit.dto';

@Entity()
export class DebitEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => ClientEntity, (client) => client.debits)
    client: ClientEntity;

    @Column()
    value: number;

    @Column()
    description: string;

    @Column()
    status: STATUS;

    @Column({
        nullable: true,
    })
    process_number: number;

    @Column({
        nullable: true,
    })
    filename: string;
}
