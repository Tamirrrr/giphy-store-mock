import ApiClient from "@/api/api.client.ts";
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    UserInformationResponse
} from "@/interfaces/api/auth.interface.ts";

export default new class AuthClient {
    async login(request: LoginRequest): Promise<LoginResponse> {
        return await ApiClient.post('/auth/login', request) as LoginResponse;
    }

    async register(request: RegisterRequest): Promise<RegisterResponse> {
        return await ApiClient.post('/auth/register', request) as RegisterResponse;
    }

    async information(): Promise<UserInformationResponse> {
        return await ApiClient.get('/auth/information') as UserInformationResponse;
    }
}