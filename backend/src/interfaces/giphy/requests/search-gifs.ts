import {GiphyTrendingGifsRequest} from "./trending-gifs";

export interface GiphySearchGifsRequest extends GiphyTrendingGifsRequest {
    lang?: string;
    q: string;
}