import {BaseResponse} from "@/interfaces/api/api.interface.ts";
import {Gif} from "@/interfaces/gif.interface.ts";

export interface GifTrendingResponse extends BaseResponse {
    gifs: Gif[];
}

export interface GifSearchResponse extends BaseResponse {
    gifs: Gif[];
}