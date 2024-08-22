import {BaseResponse} from "@/interfaces/api/api.interface.ts";
import {User} from "@/interfaces/user.interface.ts";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse extends BaseResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface RegisterRequest {
    email: string;
    password: string;
}

export interface RegisterResponse extends BaseResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}

export interface UserInformationResponse extends BaseResponse {
    user: User;
}