import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './user.entity';
import {Gif} from './gif.entity';
import {Transaction} from './transaction.entity';

@Entity({name: 'user_gifs', schema: 'giphy'})
export class UserGif {
    @PrimaryGeneratedColumn({unsigned: true})
    id: number;

    @ManyToOne(() => User, {nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(() => Gif, {nullable: false})
    @JoinColumn({name: 'gif_id'})
    gif: Gif;

    @ManyToOne(() => Transaction, {nullable: false})
    @JoinColumn({name: 'transaction_id'})
    transaction: Transaction;
}
