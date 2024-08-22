import {BaseResponse} from "../base-response.interface";
import {User} from "../../entities/user.entity";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse extends BaseResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface RegisterResponse extends BaseResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface RefreshRequest {
    refreshToken: string;
}

export interface RefreshResponse extends BaseResponse {
    accessToken: string;
    newRefreshToken: string;
}