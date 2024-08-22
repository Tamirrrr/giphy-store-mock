import {GiphyBaseResponseWithPagination} from "./base.interface";
import {GiphyGif} from "../gif.interface";

export interface GiphySearchGifsResponse extends GiphyBaseResponseWithPagination {
    data: GiphyGif[];
}