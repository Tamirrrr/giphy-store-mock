import {GiphyPagination} from "../pagination.interface";
import {GiphyMeta} from "../meta.interface";

export interface GiphyBaseResponse {
    data: any;
    meta: GiphyMeta;
}

export interface GiphyBaseResponseWithPagination extends GiphyBaseResponse {
    pagination: GiphyPagination;
}