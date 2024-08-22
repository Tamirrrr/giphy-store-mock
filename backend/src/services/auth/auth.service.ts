import * as jwt from 'jsonwebtoken';
import {User} from "../../entities/user.entity";
import UserService from "../user/user.service";
import {hashPassword, verifyPassword} from "../../utils/auth.utils";
import HttpException from "../../exceptions/http.exception";
import CacheService from "../cache/cache.service";
import generalConfig from "../../configs/general.config";
import {instanceToPlain} from "class-transformer";

export default new class AuthService {
    private readonly jwtSecret: string = generalConfig.jwtSecret;
    private readonly jwtExpiresIn: number = generalConfig.jwtExpire;
    private readonly refreshSecret: string = generalConfig.jwtRefreshSecret;
    private readonly refreshExpiresIn: number = generalConfig.jwtRefreshExpire;

    async login(email: string, password: string): Promise<{ user: User, accessToken: string, refreshToken: string }> {
        this.validateEmail(email);
        
        const user: User = await UserService.findByEmail(email);

        if (!user || !(await verifyPassword(password, user.password))) {
            throw new HttpException(401, 'Invalid Credentials');
        }

        const accessToken: string = this.generateJwtToken(user);
        const refreshToken: string = await this.generateAndStoreRefreshToken(user);

        user.password = undefined;

        return {user: instanceToPlain(user) as User, accessToken, refreshToken};
    }

    async register(email: string, password: string): Promise<{
        user: User,
        accessToken: string,
        refreshToken: string
    }> {
        this.validateEmail(email);

        const existingUser: User = await UserService.findByEmail(email);

        if (existingUser) {
            throw new HttpException(400, 'User already exists');
        }

        const hashedPassword: string = await hashPassword(password);
        const user: User = await UserService.create(email, hashedPassword);

        const accessToken: string = this.generateJwtToken(user);
        const refreshToken: string = await this.generateAndStoreRefreshToken(user);

        user.password = undefined;

        return {user: instanceToPlain(user) as User, accessToken, refreshToken};
    }

    async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; newRefreshToken: string; }> {
        try {
            const decoded: { id: number } = jwt.verify(refreshToken, this.refreshSecret) as { id: number };

            const cachedToken: string = await CacheService.getDriver().get({key: `refresh_token:${decoded.id}`});
            if (cachedToken !== refreshToken) {
                throw new HttpException(401, 'Invalid refresh token');
            }

            const user: User = await UserService.findById(decoded.id);
            if (!user) {
                throw new HttpException(401, 'User not found');
            }

            const token: string = this.generateJwtToken(user);
            const newRefreshToken: string = await this.generateAndStoreRefreshToken(user);

            return {accessToken: token, newRefreshToken};
        } catch (err) {
            throw new HttpException(401, 'Invalid or expired refresh token');
        }
    }

    async jwtVerify(token: string): Promise<User> {
        try {
            const decoded = jwt.verify(token, this.jwtSecret);

            if (decoded.exp && Date.now() >= decoded.exp * 1000) {
                throw new HttpException(401, 'Token expired');
            }

            const user: User = await UserService.findById(decoded.id);
            if (!user) {
                throw new HttpException(401, 'User not found');
            }
            user.password = undefined;
            return instanceToPlain(user) as User;
        } catch (err) {
            throw new HttpException(401, 'Invalid or expired token');
        }
    }

    private generateJwtToken(user: User): string {
        const payload = {
            id: user.id,
            email: user.email,
        };

        return jwt.sign(payload, this.jwtSecret, {expiresIn: this.jwtExpiresIn});
    }

    private async generateAndStoreRefreshToken(user: User): Promise<string> {
        const refreshToken = jwt.sign({id: user.id}, this.refreshSecret, {expiresIn: this.refreshExpiresIn});

        await CacheService.getDriver().set({
            key: `refresh_token:${user.id}`,
            value: refreshToken,
            ttl: this.refreshExpiresIn,
        });

        return refreshToken;
    }

    private validateEmail(email: string): void {
        if (!email) {
            throw new HttpException(400, 'Email is required');
        }
    }
}
