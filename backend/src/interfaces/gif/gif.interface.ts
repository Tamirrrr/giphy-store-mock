import {Gif} from "../../entities/gif.entity";
import {BaseResponse} from "../base-response.interface";

export type CreateGifDto = Omit<Gif, 'id'>;

export interface GifTrendingResponse extends BaseResponse{
    gifs: Gif[];
}

export interface GifSearchResponse extends BaseResponse{
    gifs: Gif[];
}

export interface GifSearchRequest {
    query: string;
}