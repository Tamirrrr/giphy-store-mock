import ApiClient from "@/api/api.client.ts";
import {GifTrendingResponse} from "@/interfaces/api/gif.interface.ts";

export default new class GifClient {
    async trending(): Promise<GifTrendingResponse> {
        return await ApiClient.get('/gifs/trending') as GifTrendingResponse;
    }

    async search(query: string): Promise<GifTrendingResponse> {
        return await ApiClient.post('/gifs/search', {
            query
        }) as GifTrendingResponse;
    }
}