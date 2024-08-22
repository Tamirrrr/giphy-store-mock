import {TransactionStatus} from "../../enums/transactions/transaction-status.enum";

export interface PaymentProviderTransaction {
    externalId: string;
    status: TransactionStatus;
    amount: number;
    additionalData: any;
}