import {PaymentProvider} from "../../enums/transactions/payment-provider.enum";
import {TransactionType} from "../../enums/transactions/transaction-type.enum";

export interface TransactionCreateRequest {
    provider?: PaymentProvider;
    type?: TransactionType;
    amount: number;
    data?: any;
}