import {PaymentProviderTransaction} from "../../../interfaces/transaction/payment-provider-transaction.interface";
import PaymentProviderAbstract from "./payment-provider.abstract";
import {TransactionStatus} from "../../../enums/transactions/transaction-status.enum";
import {v4 as uuidv4} from 'uuid';

export default class MockPaymentProvider extends PaymentProviderAbstract {
    async createPayment(amount: number): Promise<PaymentProviderTransaction> {
        return {
            amount,
            status: TransactionStatus.COMPLETED,
            externalId: `mock-${uuidv4()}`,
            additionalData: {}
        } as PaymentProviderTransaction;
    }
}