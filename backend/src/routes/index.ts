import {Router} from 'express';
import gifRouter from "./gif.routes";
import authRouter from "./auth.routes";
import transactionRouter from "./transaction.routes";

const router: Router = Router();

router.use('/gifs', gifRouter);
router.use('/auth', authRouter);
router.use('/transactions', transactionRouter);

export default router;