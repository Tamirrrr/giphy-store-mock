import {GiphyApiVersion} from "../enums/giphy/api-version.enum";
import {GiphyEndpoint} from "../enums/giphy/endpoint.enum";

export function buildResourcePath(apiVersion: GiphyApiVersion, endpoint: GiphyEndpoint): string {
    return `${apiVersion}/${endpoint}`;
}

export function prepareBaseUrl(baseUrl: string): string {
    if (!baseUrl.startsWith('http')) {
        baseUrl = `https://${baseUrl}`;
    }
    return baseUrl
}