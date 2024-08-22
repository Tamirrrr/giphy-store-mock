import {NextFunction, Request, Response} from "express";
import GifService from "../services/gif/gif.service";
import {Gif} from "../entities/gif.entity";
import logger from "../utils/logger.utils";
import HttpException from "../exceptions/http.exception";
import {GifSearchRequest, GifSearchResponse, GifTrendingResponse} from "../interfaces/gif/gif.interface";

class GifController {
    async trending(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const gifs: Gif[] = await GifService.getTrending();

            return res.json({
                success: true,
                gifs,
            } as GifTrendingResponse);
        } catch (error) {
            if (error instanceof HttpException) {
                next(error)
            } else {
                logger.error('[GifController@trending] Failed to get trending gifs', error);
                next(new HttpException(500, 'Failed to get trending gifs'));
            }
        }
    }

    async search(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const searchRequest: GifSearchRequest = req.body;
            const gifs: Gif[] = await GifService.search(searchRequest.query);

            return res.json({
                success: true,
                gifs,
            } as GifSearchResponse);
        } catch (error) {
            if (error instanceof HttpException) {
                next(error);
            } else {
                logger.error('[GifController@search] Failed to search gifs', error);
                return res.status(500).json({
                    success: false,
                    message: 'Failed to search gifs'
                } as GifSearchResponse);
            }
        }
    }
}

export default new GifController();
