import {BaseResponse} from "@/interfaces/api/api.interface.ts";
import {Transaction} from "@/interfaces/transaction.interface.ts";

export enum PaymentProvider {
    MOCK = 'mock',
}

export enum TransactionType {
    GIF = 'gif',
}

export interface TransactionGiftData {
    gifId: number;
}

export interface TransactionCreateRequest {
    provider: PaymentProvider;
    type: TransactionType;
    amount?: number;
    data: TransactionGiftData;
}

export interface TransactionCreateResponse extends BaseResponse {
    transaction: Transaction;
}