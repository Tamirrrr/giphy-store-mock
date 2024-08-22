import {GiphyBaseResponseWithPagination} from "./base.interface";
import {GiphyGif} from "../gif.interface";

export interface GiphyTrendingGifsResponse extends GiphyBaseResponseWithPagination {
    data: GiphyGif[];
}