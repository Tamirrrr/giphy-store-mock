import {Router} from "express";
import GifController from "../controllers/gif.controller";

const gifRouter: Router = Router();

gifRouter.get('/trending', GifController.trending);

gifRouter.post('/search', GifController.search);

export default gifRouter;