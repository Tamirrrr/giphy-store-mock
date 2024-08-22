import {Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';
import {GifProvider} from "../enums/gif/gif-provider.enum";
import {Exclude} from "class-transformer";

@Entity({name: 'gifs', schema: 'giphy'})
@Unique(['provider', 'externalId'])
export class Gif {
    @PrimaryGeneratedColumn({unsigned: true})
    id: number;

    @Exclude()
    @Column({type: 'enum', enum: GifProvider})
    provider: GifProvider;

    @Exclude()
    @Column({name: 'external_id', type: 'varchar', length: 255})
    externalId: string;

    @Column({type: 'varchar', length: 255})
    url: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;
}
