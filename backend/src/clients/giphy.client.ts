import axios, {AxiosInstance} from "axios";
import {buildResourcePath, prepareBaseUrl} from "../utils/giphy.utils";
import {GiphyApiVersion} from "../enums/giphy/api-version.enum";
import {GiphyEndpoint} from "../enums/giphy/endpoint.enum";
import {GiphyTrendingGifsRequest} from "../interfaces/giphy/requests/trending-gifs";
import {GiphySearchGifsResponse} from "../interfaces/giphy/responses/search-gifs.interface";
import {GiphySearchGifsRequest} from "../interfaces/giphy/requests/search-gifs";
import {GiphyTrendingGifsResponse} from "../interfaces/giphy/responses/trending-gifs.interface";

export default class GiphyClient {
    private readonly axios: AxiosInstance;

    constructor(apiKey: string, baseUrl: string = 'api.giphy.com') {
        this.axios = axios.create({
            baseURL: prepareBaseUrl(baseUrl),
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                api_key: apiKey,
            }
        });
    }

    async getTrendingGifs(request?: GiphyTrendingGifsRequest): Promise<GiphyTrendingGifsResponse> {
        const response = await this.axios.get(`${buildResourcePath(GiphyApiVersion.V1, GiphyEndpoint.GIFS)}/trending`, {
            params: request,
        });
        return response.data as GiphyTrendingGifsResponse;
    }

    async searchGifs(request: GiphySearchGifsRequest): Promise<GiphySearchGifsResponse> {
        const response = await this.axios.get(`${buildResourcePath(GiphyApiVersion.V1, GiphyEndpoint.GIFS)}/search`, {
            params: request,
        });
        return response.data as GiphySearchGifsResponse;
    }
}