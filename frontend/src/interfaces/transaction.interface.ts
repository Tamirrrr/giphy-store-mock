export interface TransactionGifData {
    gifId: string;
}

export interface Transaction {
    id: number;
    provider: string;
    externalId: string;
    userId: number;
    amount: string;
    status: string;
    type: string;
    createdAtInternal: string;
    updatedAtInternal: string;
    data: TransactionGifData;
}