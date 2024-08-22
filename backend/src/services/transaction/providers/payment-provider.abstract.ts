import {PaymentProviderTransaction} from "../../../interfaces/transaction/payment-provider-transaction.interface";

export default abstract class PaymentProviderAbstract {
    abstract createPayment(amount: number): Promise<PaymentProviderTransaction>;
}