import {PaymentProvider} from "../../enums/transactions/payment-provider.enum";
import PaymentProviderAbstract from "./providers/payment-provider.abstract";
import MockPaymentProvider from "./providers/mock.provider";
import {Transaction} from "../../entities/transaction.entity";
import {User} from "../../entities/user.entity";
import {TransactionType} from "../../enums/transactions/transaction-type.enum";
import HttpException from "../../exceptions/http.exception";
import {PaymentProviderTransaction} from "../../interfaces/transaction/payment-provider-transaction.interface";
import {DatasourceDal} from "../../dal/datasource.dal";
import {Repository} from "typeorm";
import {TransactionStatus} from "../../enums/transactions/transaction-status.enum";
import logger from "../../utils/logger.utils";
import UserService from "../user/user.service";
import GifService from "../gif/gif.service";
import {Gif} from "../../entities/gif.entity";
import {TransactionCreateRequest} from "../../interfaces/transaction/transaction.interface";

type PaymentProvidersMap = { [provider: string]: PaymentProviderAbstract };

export default new class TransactionService {
    private readonly paymentProviders: PaymentProvidersMap = {};
    private readonly transactionRepository: Repository<Transaction>;

    constructor() {
        this.paymentProviders = {
            [PaymentProvider.MOCK]: new MockPaymentProvider(),
        }
        this.transactionRepository = DatasourceDal.getRepository(Transaction);
    }

    async create(user: User,
                 request: TransactionCreateRequest): Promise<Transaction> {
        this.validateTransactionAmount(request.type, request.amount);
        this.validateTransactionType(request.type, request.data);

        await this.prepareRequest(request);

        const paymentProvider: PaymentProviderAbstract = this.paymentProviders[request.provider];
        if (!paymentProvider) {
            throw new HttpException(400, 'Invalid Payment Provider');
        }

        const paymentProviderTransaction: PaymentProviderTransaction = await paymentProvider.createPayment(request.amount);

        const transaction: Transaction = this.transactionRepository.create({
            provider: request.provider,
            externalId: paymentProviderTransaction.externalId,
            userId: user.id,
            amount: paymentProviderTransaction.amount,
            status: paymentProviderTransaction.status,
            type: request.type,
            data: this.prepareTransactionData(request.data, paymentProviderTransaction.additionalData)
        });
        await this.transactionRepository.save(transaction);

        await this.processTransaction(transaction);

        return transaction;
    }

    async processTransaction(transaction: Transaction): Promise<void> {
        switch (transaction.status) {
            case TransactionStatus.COMPLETED:
                if (!await this.handleTransactionCompleted(transaction)) {
                    logger.error(`[TransactionService@processTransaction] Failed to process completed transaction: ${transaction.id}`);
                }
                break;
        }
    }

    private async handleTransactionCompleted(transaction: Transaction): Promise<boolean> {
        switch (transaction.type) {
            case TransactionType.GIF:
                const user: User = await UserService.findById(transaction.userId);
                if (!user) {
                    logger.error(`[TransactionService@handleTransactionCompleted] Failed to find user: ${transaction.userId}`);
                    return false;
                }
                const gif: Gif = await GifService.findBy({
                    id: +transaction.data.gifId
                })
                if (!gif) {
                    logger.error(`[TransactionService@handleTransactionCompleted] Failed to find gif: ${transaction.data.gifId}`);
                    return false;
                }
                return !!await UserService.addGifToUser(user, gif, transaction);
            default:
                return true;
        }
    }

    private prepareTransactionData(data: any, providerData: any): any {
        return {...data, ...providerData};
    }

    private async prepareRequest(request: TransactionCreateRequest): Promise<void> {
        switch (request.type) {
            case TransactionType.GIF:
                const gif: Gif = await GifService.findBy({id: request.data.gifId});
                if (!gif) {
                    throw new HttpException(400, 'Invalid Gif Data');
                }
                request.amount = +gif.price;
                break;
        }
    }

    private validateTransactionAmount(type: TransactionType, amount?: number): void {
        switch (type) {
            case TransactionType.GIF:
                if (amount) {
                    throw new HttpException(400, 'Invalid Parameter Amount');
                }
                break;
            default:
                break;
        }
    }

    private validateTransactionType(type: TransactionType, data?: any): void {
        switch (type) {
            case TransactionType.GIF:
                if (!data || !data.gifId) {
                    throw new HttpException(400, 'Invalid Gif Data');
                }
                break;
            default:
                throw new HttpException(400, 'Invalid Transaction Type');
        }
    }
}