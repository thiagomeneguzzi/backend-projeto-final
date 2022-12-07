import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClientEntity } from '../../client/entity/client.entity';

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
    status: string;

    @Column()
    process_number: number;

    // @IsString()
    // complement: string;
}
