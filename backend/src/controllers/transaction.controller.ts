import {AuthenticatedRequest} from "../interfaces/authenticated-request";
import {User} from "../entities/user.entity";
import {TransactionCreateRequest} from "../interfaces/transaction/transaction.interface";
import logger from "../utils/logger.utils";
import {NextFunction, Response} from "express";
import {Transaction} from "../entities/transaction.entity";
import TransactionService from "../services/transaction/transaction.service";
import HttpException from "../exceptions/http.exception";
import {PaymentProvider} from "../enums/transactions/payment-provider.enum";
import {TransactionType} from "../enums/transactions/transaction-type.enum";

export default new class TransactionController {
    async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
        const user: User = req.user;
        const payload: TransactionCreateRequest = req.body;

        try {
            const transaction: Transaction = await TransactionService.create(user, {
                provider: payload.provider || PaymentProvider.MOCK,
                amount: payload.amount,
                type: payload.type || TransactionType.GIF,
                data: payload.data
            });

            return res.json({
                success: true,
                transaction,
            });
        } catch (error) {
            if (error instanceof HttpException) {
                next(error);
            } else {
                logger.error('[TransactionController@create] Failed to create transaction', error);
                next(new HttpException(500, 'Failed to create transaction'));
            }
        }
    }
}