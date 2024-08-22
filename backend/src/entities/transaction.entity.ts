import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import {User} from './user.entity';
import {TransactionStatus} from "../enums/transactions/transaction-status.enum";
import {TransactionType} from "../enums/transactions/transaction-type.enum";

@Entity({name: 'transactions', schema: 'giphy'})
@Unique(['provider', 'externalId'])
export class Transaction {
    @PrimaryGeneratedColumn({unsigned: true})
    id: number;

    @Column({type: 'enum', enum: ['mock']})
    provider: 'mock';

    @Column({name: 'external_id', type: 'varchar', length: 255})
    externalId: string;

    @Column({name: 'user_id', type: 'int', unsigned: true, nullable: false})
    userId: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column({type: 'decimal', precision: 10, scale: 2})
    amount: number;

    @Column({type: 'enum', enum: TransactionStatus})
    status: TransactionStatus;

    @Column({type: 'enum', enum: TransactionType})
    type: TransactionType;

    @CreateDateColumn({name: 'created_at', type: 'datetime'})
    private createdAtInternal: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'datetime'})
    private updatedAtInternal: Date;

    @Column({type: 'json', nullable: true})
    data: any;

    get createdAt(): number {
        return this.createdAtInternal ? this.createdAtInternal.getTime() : null;
    }

    get updatedAt(): number {
        return this.updatedAtInternal ? this.updatedAtInternal.getTime() : null;
    }
}