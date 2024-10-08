import {GiphyUser} from "./user.interface";
import {GiphyImages} from "./images.interface";

export interface GiphyGif {
    type: string;
    id: string;
    slug: string;
    url: string;
    bitly_url: string;
    embed_url: string;
    username: string;
    source: string;
    rating: string;
    content_url: string;
    user?: GiphyUser;
    source_tld: string;
    source_post_url: string;
    update_datetime: string;
    create_datetime: string;
    import_datetime: string;
    trending_datetime: string;
    images: GiphyImages;
    title: string;
    alt_text: string;
}