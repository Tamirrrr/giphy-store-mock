import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from 'typeorm';
import {Exclude} from 'class-transformer';
import {Transaction} from "./transaction.entity";
import {UserGif} from "./user-gifs.entity";

@Entity({name: 'users', schema: 'giphy'})
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn({unsigned: true})
    id: number;

    @Column({type: 'varchar', length: 255})
    email: string;

    @Column({type: 'varchar', length: 64})
    @Exclude()
    password: string;

    @CreateDateColumn({name: 'created_at', type: 'datetime'})
    private createdAtInternal: Date;

    @UpdateDateColumn({name: 'updated_at', type: 'datetime'})
    private updatedAtInternal: Date;

    get createdAt(): number {
        return this.createdAtInternal ? this.createdAtInternal.getTime() : null;
    }

    get updatedAt(): number {
        return this.updatedAtInternal ? this.updatedAtInternal.getTime() : null;
    }

    @OneToMany(() => Transaction,
        transaction => transaction.user)
    transactions: Transaction[];

    @OneToMany(() => UserGif, UserGift => UserGift.user)
    gifs: UserGif[];
}
