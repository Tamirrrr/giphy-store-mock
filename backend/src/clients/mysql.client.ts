import mysql, {Connection, Pool, PoolOptions} from "mysql2/promise";
import mysqlConfig from "../configs/mysql.config";
import logger from "../utils/logger.utils";

export default new class MysqlClient {
    private pool: Pool;

    async init(): Promise<void> {
        this.pool = mysql.createPool(this.prepareConnectionConfig());
        if (!await this.isConnectionAlive()) {
            throw new Error("MySQL connection is not alive");
        }
        logger.info("[MysqlClient] Initialized")
    }

    getPool(): Pool {
        if (!this.pool) {
            throw new Error("MySQL pool is not initialized");
        }
        return this.pool;
    }

    async getConnection(): Promise<Connection> {
        return await this.getPool().getConnection();
    }

    async isConnectionAlive(): Promise<boolean> {
        try {
            const connection: Connection = await this.getConnection();
            await connection.query("SELECT 1");
            return true;
        } catch (error) {
            logger.error(`[MysqlClient] Connection is not alive: ${error.message}`);
            return false;
        }
    }

    private prepareConnectionConfig(): PoolOptions {
        return {
            host: mysqlConfig.host,
            port: mysqlConfig.port,
            user: mysqlConfig.username,
            password: mysqlConfig.password,
            database: mysqlConfig.database,
            connectTimeout: 30 * 1000,
        } as PoolOptions;
    }
}