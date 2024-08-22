import {Gif} from "../../entities/gif.entity";
import {CreateGifDto} from "../../interfaces/gif/gif.interface";
import {Repository} from "typeorm";
import {DatasourceDal} from "../../dal/datasource.dal";
import HttpException from "../../exceptions/http.exception";
import {GifProvider} from "../../enums/gif/gif-provider.enum";
import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";
import CacheService from "../cache/cache.service";
import logger from "../../utils/logger.utils";
import GiphyClient from "../../clients/giphy.client";
import giphyConfig from "../../configs/giphy.config";
import {GiphyTrendingGifsResponse} from "../../interfaces/giphy/responses/trending-gifs.interface";
import {GiphySearchGifsResponse} from "../../interfaces/giphy/responses/search-gifs.interface";

export default new class GifService {
    private readonly giphyClient: GiphyClient;
    private readonly gifRepository: Repository<Gif>;

    constructor() {
        this.gifRepository = DatasourceDal.getRepository(Gif);
        this.giphyClient = new GiphyClient(giphyConfig.apiKey);
    }

    async create(dto: CreateGifDto): Promise<Gif> {
        this.validateProviderExists(dto.provider);
        this.validateGifUrl(dto.url);

        const existingGif: Gif = await this.findByExternalId(dto.provider, dto.externalId);

        if (existingGif) {
            return existingGif;
        }

        const gif: Gif = this.gifRepository.create(dto);
        await this.gifRepository.save(gif);

        return gif;
    }

    /**
     * Get trending gifs from Giphy -> Please note that a more scalable approach would be
     * Creating an abstract factory for gif providers and then the ability to have a multi-provider
     * gif service that can fetch gifs from multiple providers.
     */
    async getTrending(): Promise<Gif[]> {
        // Check cache first
        const cachedGifs: Gif[] = await this.getTrendingFromCache();
        if (cachedGifs) {
            return cachedGifs;
        }

        // Get trending gifs from Giphy
        const giphyTrendingGifsResponse: GiphyTrendingGifsResponse = await this.giphyClient.getTrendingGifs();

        const gifs: Gif[] = [];
        for (const gifData of giphyTrendingGifsResponse.data) {
            try {
                const gif: Gif = await this.create({
                    provider: GifProvider.GIPHY,
                    externalId: gifData?.id,
                    url: gifData?.images?.original?.url,
                    price: Math.random() * 10,
                });
                gifs.push(gif);
            } catch (error) {
                logger.error('[GifService@getTrending] Failed to create gif', error);
            }
        }
        await this.setTrendingToCache(gifs);

        return gifs;
    }

    async search(query: string): Promise<Gif[]> {
        this.validateQuery(query);

        const cachedGifs: Gif[] = await this.getSearchFromCache(query);
        if (cachedGifs) {
            return cachedGifs;
        }

        const giphySearchGifsResponse: GiphySearchGifsResponse = await this.giphyClient.searchGifs({q: query});

        const gifs: Gif[] = [];
        for (const gifData of giphySearchGifsResponse.data) {
            try {
                const gif: Gif = await this.create({
                    provider: GifProvider.GIPHY,
                    externalId: gifData?.id,
                    url: gifData?.images?.original?.url,
                    price: Math.random() * 10,
                });
                gifs.push(gif);
            } catch (error) {
                logger.error('[GifService@search] Failed to create gif', error);
            }
        }
        await this.setSearchToCache(query, gifs);

        return gifs;
    }

    private async setTrendingToCache(gifs: Gif[]): Promise<boolean> {
        try {
            await CacheService.getDriver().set({key: 'trending_gifs', value: JSON.stringify(gifs), ttl: 60 * 60 * 24});
            return true;
        } catch (error) {
            logger.error('[GifService@setTrendingToCache] Failed to cache trending gifs', error);
            return false;
        }
    }

    private async getTrendingFromCache(): Promise<Gif[]> {
        try {
            const cachedGifs: string | null = await CacheService.getDriver().get({key: 'trending_gifs'});
            if (cachedGifs) {
                return JSON.parse(cachedGifs) as Gif[];
            }
        } catch (error) {
            logger.error('[GifService@getTrendingFromCache] Failed to get trending gifs from cache', error);
        }
        return null;
    }

    private async setSearchToCache(query: string, gifs: Gif[]): Promise<boolean> {
        try {
            await CacheService.getDriver().set({
                key: `search_gifs:${query}`,
                value: JSON.stringify(gifs),
                ttl: 60 * 60
            });
            return true;
        } catch (error) {
            logger.error('[GifService@setTrendingToCache] Failed to cache trending gifs', error);
            return false;
        }
    }

    private async getSearchFromCache(query: string): Promise<Gif[]> {
        try {
            const cachedGifs: string | null = await CacheService.getDriver().get({key: `search_gifs:${query}`});
            if (cachedGifs) {
                return JSON.parse(cachedGifs) as Gif[];
            }
        } catch (error) {
            logger.error('[GifService@getTrendingFromCache] Failed to get trending gifs from cache', error);
        }
        return null;
    }

    async findByExternalId(provider: GifProvider, externalId: string): Promise<Gif> {
        return await this.findBy({provider, externalId});
    }

    async findBy(where: FindOptionsWhere<Gif>): Promise<Gif> {
        return await this.gifRepository.findOne({where});
    }

    private validateQuery(query: string): void {
        if (!query) {
            throw new HttpException(400, 'Invalid Search Query');
        }
    }

    private validateProviderExists(provider: string): void {
        if (!Object.values(GifProvider).includes(provider as GifProvider)) {
            throw new HttpException(400, 'Invalid Gif Provider');
        }
    }

    private validateGifUrl(url: string): void {
        if (!url) {
            throw new HttpException(400, 'Invalid Gif URL');
        }
    }
}