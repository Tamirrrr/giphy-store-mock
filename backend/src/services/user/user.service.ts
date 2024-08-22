import {Repository} from "typeorm";
import {User} from "../../entities/user.entity";
import {DatasourceDal} from "../../dal/datasource.dal";
import {UserGif} from "../../entities/user-gifs.entity";
import {Transaction} from "../../entities/transaction.entity";
import {Gif} from "../../entities/gif.entity";

export default new class UserService {
    private readonly userRepository: Repository<User>;
    private readonly userGifRepository: Repository<UserGif>;

    constructor() {
        this.userRepository = DatasourceDal.getRepository(User);
        this.userGifRepository = DatasourceDal.getRepository(UserGif);
    }

    async create(email: string, password: string): Promise<User> {
        const user: User = this.userRepository.create({
            email,
            password,
        });
        await this.userRepository.save(user);

        return user;
    }

    async findById(id: number): Promise<User> {
        return this.userRepository.findOne({
            where: {id},
            relations: ['gifs', 'gifs.gif', 'transactions'],
        });
    }

    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({
            where: {email},
            relations: ['gifs', 'gifs.gif', 'transactions'],
        });
    }


    async addGifToUser(user: User, gif: Gif, transaction: Transaction): Promise<UserGif> {
        const userGif: UserGif = this.userGifRepository.create({
            user,
            gif,
            transaction,
        });

        await this.userGifRepository.save(userGif);

        return userGif;
    }
}