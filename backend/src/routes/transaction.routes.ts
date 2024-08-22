import {Router} from "express";
import TransactionController from "../controllers/transaction.controller";
import jwtMiddleware from "../middlewares/jwt.middleware";

const transactionRouter: Router = Router();

transactionRouter.use(jwtMiddleware);
transactionRouter.post('/', TransactionController.create);

export default transactionRouter;