import {DataSourceOptions} from "typeorm/data-source/DataSourceOptions";
import mysqlConfig from "./mysql.config";
import {User} from "../entities/user.entity";
import {Transaction} from "../entities/transaction.entity";
import {Gif} from "../entities/gif.entity";
import {UserGif} from "../entities/user-gifs.entity";

const config: DataSourceOptions = {
    type: "mysql",
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    username: mysqlConfig.username,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
    synchronize: false,
    entities: [User, Transaction, Gif, UserGif],
}

export default config;