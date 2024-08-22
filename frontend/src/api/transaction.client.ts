import ApiClient from "@/api/api.client.ts";
import {TransactionCreateRequest, TransactionCreateResponse} from "@/interfaces/api/transaction.interface.ts";

export default new class TransactionClient {
    async create(request: TransactionCreateRequest): Promise<TransactionCreateResponse> {
        return await ApiClient.post('/transactions', request) as TransactionCreateResponse;
    }
}