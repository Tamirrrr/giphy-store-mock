import {GiphyContentRating} from "../../../enums/giphy/content-rating.enum";

export interface GiphyTrendingGifsRequest {
    limit?: number;
    offset?: number;
    rating?: GiphyContentRating;
    random_id?: string;
    bundle?: string;
}